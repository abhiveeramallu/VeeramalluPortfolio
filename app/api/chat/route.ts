import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, detectSources } from '@/lib/chat/prompt';
import { faqAnswer } from '@/lib/chat/faq';
import { cleanHistory, looksLikeInjection, sanitize } from '@/lib/chat/guard';
import { CHAT_LIMITS, encodeEvent, type ChatEvent, type ChatSource } from '@/lib/chat/protocol';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import { SITE_CONFIG } from '@/data/content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MODEL = process.env.CLAUDE_MODEL || 'claude-opus-5-5';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-flash-lite-latest';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// Server-side refusal fallback ("default" routing) is only accepted by these models.
const SUPPORTS_DEFAULT_FALLBACK = [
  'claude-opus-5-5',
  'claude-opus-5',
  'claude-fable-5-1',
  'claude-sonnet-5-5',
];

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;

const HEADERS = {
  'Content-Type': 'text/event-stream; charset=utf-8',
  'Cache-Control': 'no-cache, no-transform',
  Connection: 'keep-alive',
  'X-Accel-Buffering': 'no',
};

/** Streams from Google Gemini via Server-Sent Events */
async function streamGemini(
  apiKey: string,
  model: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>,
  message: string,
  signal: AbortSignal,
  onDelta: (text: string) => void,
) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal,
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [
        ...history.map((t) => ({
          role: t.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: t.content }],
        })),
        {
          role: 'user',
          parts: [{ text: `<visitor_message>${message}</visitor_message>` }],
        },
      ],
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => '');
    throw new Error(`Gemini API error ${res.status}: ${errorBody.slice(0, 200)}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error('No readable stream from Gemini API');

  const decoder = new TextDecoder();
  let buf = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split('\n');
    buf = lines.pop() || '';
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const json = JSON.parse(line.slice(6));
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) onDelta(text);
        } catch {
          // ignore partial json
        }
      }
    }
  }
}

/** Streams a canned answer word by word so the UI behaves identically with or without an API key. */
function cannedStream(text: string, sources: ChatSource[]) {
  const encoder = new TextEncoder();
  const words = text.split(/(\s+)/);
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const w of words) {
        controller.enqueue(encoder.encode(encodeEvent({ type: 'delta', text: w })));
        await new Promise((r) => setTimeout(r, 12));
      }
      if (sources.length)
        controller.enqueue(encoder.encode(encodeEvent({ type: 'sources', items: sources })));
      controller.enqueue(encoder.encode(encodeEvent({ type: 'done', mode: 'faq' })));
      controller.close();
    },
  });
}

export async function POST(req: Request) {
  const limit = await rateLimit(`chat:${clientIp(req)}`, 20, 60 * 60);
  if (!limit.ok) {
    return new Response(
      cannedStream(`That's a lot of questions! Let's continue over email: ${SITE_CONFIG.email}.`, [
        { title: 'Contact', href: '/contact' },
      ]),
      {
        status: 429,
        headers: { ...HEADERS, 'Retry-After': String(limit.resetSeconds) },
      },
    );
  }

  let body: { message?: unknown; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (typeof body.message !== 'string' || !body.message.trim()) {
    return Response.json({ error: 'Message is required' }, { status: 400 });
  }

  const message = sanitize(body.message, CHAT_LIMITS.maxInputChars);
  const history = cleanHistory(body.history);

  if (looksLikeInjection(message)) {
    return new Response(
      cannedStream(
        `I can only help with questions about ${SITE_CONFIG.shortName}'s work — projects, skills or education.`,
        [],
      ),
      { headers: HEADERS },
    );
  }

  const hasLiveAI = Boolean(GEMINI_API_KEY || client);

  if (!hasLiveAI) {
    const faq = faqAnswer(message);
    return new Response(cannedStream(faq.text, faq.sources), { headers: HEADERS });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (ev: ChatEvent) => controller.enqueue(encoder.encode(encodeEvent(ev)));
      let full = '';
      try {
        if (GEMINI_API_KEY) {
          await streamGemini(
            GEMINI_API_KEY,
            GEMINI_MODEL,
            history,
            message,
            req.signal,
            (chunk) => {
              full += chunk;
              send({ type: 'delta', text: chunk });
            },
          );
        } else if (client) {
          const claude = client.beta.messages.stream(
            {
              model: MODEL,
              max_tokens: 4000,
              output_config: { effort: 'low' },
              ...(SUPPORTS_DEFAULT_FALLBACK.includes(MODEL)
                ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' as const }
                : {}),
              system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
              messages: [
                ...history.map((t) => ({ role: t.role, content: t.content })),
                { role: 'user', content: `<visitor_message>${message}</visitor_message>` },
              ],
            },
            { signal: req.signal },
          );

          for await (const event of claude) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              full += event.delta.text;
              send({ type: 'delta', text: event.delta.text });
            }
          }
          const final = await claude.finalMessage();
          if (final.stop_reason === 'refusal' && !full) {
            full = `I can't help with that one, but I'm happy to answer questions about ${SITE_CONFIG.shortName}'s projects or skills.`;
            send({ type: 'delta', text: full });
          }
        }

        const sources = detectSources(full);
        if (sources.length) send({ type: 'sources', items: sources });
        send({ type: 'done', mode: 'live' });
      } catch (err) {
        if (req.signal.aborted) return controller.close();
        if (err instanceof Anthropic.RateLimitError) console.warn('[chat] Anthropic rate limit');
        else if (err instanceof Anthropic.APIError) console.error('[chat] Anthropic API error', err.status);
        else console.error('[chat] stream failed', (err as Error).message);
        // Degrade to the canned FAQ rather than an error bubble.
        if (!full) {
          const faq = faqAnswer(message);
          send({ type: 'delta', text: faq.text });
          if (faq.sources.length) send({ type: 'sources', items: faq.sources });
        }
        send({ type: 'done', mode: 'faq' });
      }
      controller.close();
    },
  });

  return new Response(stream, { headers: HEADERS });
}
