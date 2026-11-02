import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/data/content';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const systemPrompt = `You are the digital AI design assistant for ${SITE_CONFIG.name}, a ${SITE_CONFIG.role} based in ${SITE_CONFIG.location}.
Your voice is friendly, sharp, humble, playful-premium, and concise. You speak on behalf of Abhiram about his design engineering approach, projects, tools, background, and availability.

Here is the verified context:
- Name: ${SITE_CONFIG.name} (${SITE_CONFIG.brandName})
- Role: ${SITE_CONFIG.role}
- Tagline: "${SITE_CONFIG.tagline}"
- Subline: "${SITE_CONFIG.subline}"
- Location: ${SITE_CONFIG.location}
- Availability: ${SITE_CONFIG.status} (${SITE_CONFIG.availability})
- Tools: ${SITE_CONFIG.tools.map((t) => t.name).join(', ')}
- Projects:
${SITE_CONFIG.projects.map((p) => `  * ${p.title} (${p.category}, ${p.year}): ${p.tagline} Problem: ${p.problem} Solution: ${p.solution}`).join('\n')}
- Side Projects: ${SITE_CONFIG.sideProjects.map((s) => `${s.title} (${s.tag}): ${s.tagline}`).join(', ')}
- Values: ${SITE_CONFIG.values.map((v) => `${v.title}: ${v.description}`).join(' | ')}
- Email: ${SITE_CONFIG.email}

Rules:
1. Keep answers short, helpful, and under 3-4 sentences.
2. If asked about rates or hiring, invite them to email ${SITE_CONFIG.email} or use the contact form.
3. Highlight his combination of mathematical algorithmic rigor with tactile, soft 3D design.`;

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (apiKey) {
      // Call Anthropic API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 300,
          system: systemPrompt,
          messages: [
            ...(history || []).map((h: { sender: string; text: string }) => ({
              role: h.sender === 'user' ? 'user' : 'assistant',
              content: h.text,
            })),
            { role: 'user', content: message },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.content?.[0]?.text;
        if (reply) {
          return NextResponse.json({ reply });
        }
      }
    }

    // Fallback contextual intelligence engine (works without API key)
    const lower = message.toLowerCase();
    let reply = `Thanks for asking! I'm ${SITE_CONFIG.name}'s virtual studio assistant. ${SITE_CONFIG.tagline} Feel free to ask about my projects like RouteFusion or ThreatLens, design process, or tools!`;

    if (lower.includes('hire') || lower.includes('role') || lower.includes('job') || lower.includes('freelance') || lower.includes('available')) {
      reply = `Abhiram is currently ${SITE_CONFIG.status} for ${SITE_CONFIG.availability}. He specializes in product design, design systems, and design engineering (React/Three.js). You can reach him directly at ${SITE_CONFIG.email}!`;
    } else if (lower.includes('project') || lower.includes('routefusion') || lower.includes('threatlens') || lower.includes('work')) {
      reply = `Abhiram's featured projects include RouteFusion (a ride & parcel optimization engine with Hungarian bipartite matching) and ThreatLens AI (real-time biometric bot detection). Check out the /work tab for full interactive case studies!`;
    } else if (lower.includes('tool') || lower.includes('stack') || lower.includes('tech') || lower.includes('figma') || lower.includes('code')) {
      reply = `His core toolkit spans Figma, Framer, Next.js, TypeScript, Three.js / React Three Fiber, Tailwind CSS, and FastAPI. He believes designing in code leads to more honest, resilient interfaces.`;
    } else if (lower.includes('process') || lower.includes('how you work') || lower.includes('method')) {
      reply = `Abhiram follows a 7-step process: Research, Framing, Wireframes, Systems, Prototype, Handoff, and Shipping. Every phase focuses on tactile clarity and user delight.`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { reply: `Hi there! I'm ${SITE_CONFIG.name}'s assistant. Send a note to ${SITE_CONFIG.email} and he'll get right back to you!` },
      { status: 200 }
    );
  }
}
