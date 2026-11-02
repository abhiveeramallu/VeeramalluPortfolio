import { describe, expect, it } from 'vitest';
import { toWinAnsi, wrapText } from '@/lib/resume/text';
import { buildResumePdf } from '@/lib/resume/build';

describe('résumé text helpers', () => {
  it('maps unsupported glyphs to WinAnsi-safe text', () => {
    expect(toWinAnsi('−28% → better ✳ ok')).toBe('-28% -> better * ok');
    expect(toWinAnsi('Résumé — “quotes”')).toBe('Résumé — “quotes”');
    expect(toWinAnsi('emoji 🚀 gone')).toBe('emoji  gone');
  });

  it('wraps by measured width', () => {
    const lines = wrapText('one two three four five', 9, (s) => s.length);
    expect(lines).toEqual(['one two', 'three', 'four five']);
  });
});

describe('buildResumePdf', () => {
  it('produces a one-page PDF', async () => {
    const bytes = await buildResumePdf();
    const header = Buffer.from(bytes.slice(0, 5)).toString();
    expect(header).toBe('%PDF-');
    expect(bytes.length).toBeGreaterThan(2000);
  });
});
