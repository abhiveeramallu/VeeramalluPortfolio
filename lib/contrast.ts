/** WCAG 2.x relative luminance + contrast helpers. Shared by the playground tool and the token tests. */

export type Rgb = [number, number, number];

export function hexToRgb(hex: string): Rgb {
  const h = hex.replace('#', '').trim();
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) throw new Error(`Invalid hex colour: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as Rgb;
}

export function rgbToHex([r, g, b]: Rgb): string {
  return `#${[r, g, b]
    .map((v) =>
      Math.round(Math.min(255, Math.max(0, v)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`.toUpperCase();
}

const channel = (v: number) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export type WcagLevel = 'AAA' | 'AA' | 'AA Large' | 'Fail';

export function wcagLevel(ratio: number): WcagLevel {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
}

/** Mix two colours in sRGB; t=0 → a, t=1 → b. */
export function mix(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return rgbToHex([0, 1, 2].map((i) => ca[i] + (cb[i] - ca[i]) * t) as Rgb);
}

/** 50–900 ramp around a base (500). Light steps tint toward white, dark steps shade toward ink. */
export function tonalRamp(base: string, ink = '#111111'): Record<number, string> {
  const light: Record<number, number> = { 50: 0.92, 100: 0.84, 200: 0.68, 300: 0.5, 400: 0.26 };
  const dark: Record<number, number> = { 600: 0.2, 700: 0.38, 800: 0.55, 900: 0.7 };
  const ramp: Record<number, string> = { 500: base.toUpperCase() };
  for (const [k, t] of Object.entries(light)) ramp[Number(k)] = mix(base, '#FFFFFF', t);
  for (const [k, t] of Object.entries(dark)) ramp[Number(k)] = mix(base, ink, t);
  return ramp;
}

/** First step in the ramp that reaches the target ratio against `bg`, scanning darker. */
export function firstAccessibleStep(ramp: Record<number, string>, bg: string, target = 4.5): number | null {
  const steps = Object.keys(ramp)
    .map(Number)
    .sort((a, b) => a - b);
  const bgIsLight = luminance(bg) > 0.5;
  const ordered = bgIsLight ? steps : [...steps].reverse();
  return ordered.find((s) => contrastRatio(ramp[s], bg) >= target) ?? null;
}
