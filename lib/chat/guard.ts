import { CHAT_LIMITS, type ChatTurn } from './protocol';

const INJECTION_PATTERNS = [
  /ignore (all |any |the )?(previous|prior|above|earlier) (instructions|prompts?|rules)/i,
  /(reveal|show|print|repeat|leak) (me )?(your|the) (system )?(prompt|instructions)/i,
  /\byou are now\b/i,
  /\b(developer|dan|jailbreak|god) mode\b/i,
  /<\/?(system|visitor_message|portfolio)>/i,
];

export function looksLikeInjection(text: string): boolean {
  return INJECTION_PATTERNS.some((re) => re.test(text));
}

/** Strip control characters and our own delimiter tags; collapse whitespace. */
export function sanitize(text: string, max: number): string {
  return text
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<\/?(system|visitor_message|portfolio)[^>]*>/gi, '')
    .replace(/\s{3,}/g, '  ')
    .trim()
    .slice(0, max);
}

/**
 * Client-supplied history is untrusted: validate shape, cap length, keep it alternating and starting with a
 * user turn so the API request is always well-formed.
 */
export function cleanHistory(raw: unknown): ChatTurn[] {
  if (!Array.isArray(raw)) return [];
  const turns: ChatTurn[] = [];
  for (const item of raw.slice(-CHAT_LIMITS.maxHistoryTurns)) {
    if (!item || typeof item !== 'object') continue;
    const { role, content } = item as Record<string, unknown>;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue;
    const text = sanitize(content, CHAT_LIMITS.maxTurnChars);
    if (!text) continue;
    if (turns.length === 0 && role !== 'user') continue;
    if (turns.length > 0 && turns[turns.length - 1].role === role) continue;
    turns.push({ role, content: text });
  }
  if (turns.length > 0 && turns[turns.length - 1].role === 'user') turns.pop();
  return turns;
}
