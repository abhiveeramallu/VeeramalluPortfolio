/**
 * pdf-lib's standard fonts only encode WinAnsi. Map the typographic characters used in content.ts to safe
 * equivalents and drop anything else, so a stray glyph can never crash the résumé route.
 */
const REPLACEMENTS: Record<string, string> = {
  '−': '-',
  '→': '->',
  '←': '<-',
  '≥': '>=',
  '≤': '<=',
  '✳': '*',
  ' ': ' ',
};

export function toWinAnsi(input: string): string {
  let out = '';
  for (const ch of input) {
    if (REPLACEMENTS[ch] !== undefined) {
      out += REPLACEMENTS[ch];
      continue;
    }
    const code = ch.codePointAt(0) ?? 0;
    // Printable ASCII + Latin-1, plus the WinAnsi extras in 0x80–0x9F that content uses.
    if ((code >= 0x20 && code <= 0x7e) || (code >= 0xa0 && code <= 0xff) || '–—‘’“”•…€'.includes(ch))
      out += ch;
  }
  return out;
}

/** Greedy word wrap against a measuring function (font.widthOfTextAtSize). */
export function wrapText(text: string, maxWidth: number, measure: (s: string) => number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (measure(candidate) <= maxWidth || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}
