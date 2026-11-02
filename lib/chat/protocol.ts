/** Server-sent event payloads streamed by /api/chat. Shared by the route and the client parser. */
export interface ChatSource {
  title: string;
  href: string;
}

export type ChatEvent =
  | { type: 'delta'; text: string }
  | { type: 'sources'; items: ChatSource[] }
  | { type: 'done'; mode: 'live' | 'faq' }
  | { type: 'error'; message: string };

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

export const CHAT_LIMITS = {
  maxInputChars: 500,
  maxHistoryTurns: 6,
  maxTurnChars: 1200,
} as const;

export function encodeEvent(event: ChatEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

/** Incremental SSE parser: feed chunks, get complete events back. */
export function createEventParser() {
  let buffer = '';
  return (chunk: string): ChatEvent[] => {
    buffer += chunk;
    const events: ChatEvent[] = [];
    let idx: number;
    while ((idx = buffer.indexOf('\n\n')) !== -1) {
      const raw = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      const data = raw
        .split('\n')
        .filter((l) => l.startsWith('data:'))
        .map((l) => l.slice(5).trimStart())
        .join('\n');
      if (!data) continue;
      try {
        events.push(JSON.parse(data) as ChatEvent);
      } catch {
        // Ignore malformed frames rather than breaking the stream.
      }
    }
    return events;
  };
}
