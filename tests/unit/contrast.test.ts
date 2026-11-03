import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { contrastRatio, hexToRgb, luminance, wcagLevel } from '@/lib/contrast';

describe('contrast maths', () => {
  it('matches WCAG reference values', () => {
    expect(luminance('#FFFFFF')).toBeCloseTo(1, 5);
    expect(luminance('#000000')).toBeCloseTo(0, 5);
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrastRatio('#777777', '#FFFFFF')).toBeCloseTo(4.48, 2);
  });

  it('is symmetric and parses short hex', () => {
    expect(contrastRatio('#111', '#F5F7FA')).toBeCloseTo(contrastRatio('#F5F7FA', '#111111'), 6);
    expect(hexToRgb('#abc')).toEqual([170, 187, 204]);
    expect(() => hexToRgb('nope')).toThrow();
  });

  it('labels WCAG levels', () => {
    expect(wcagLevel(7.1)).toBe('AAA');
    expect(wcagLevel(4.5)).toBe('AA');
    expect(wcagLevel(3.2)).toBe('AA Large');
    expect(wcagLevel(2)).toBe('Fail');
  });
});

/** Tokens are read from globals.css itself, so a palette change that breaks contrast fails CI. */
const css = readFileSync('app/globals.css', 'utf8');
const root = css.slice(css.indexOf(':root {'), css.indexOf('}', css.indexOf(':root {')));
const token = (name: string) => {
  const m = root.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,6})`));
  if (!m) throw new Error(`token --${name} not found`);
  return m[1];
};

const PAIRS: [string, string, string][] = [
  ['ink on bg', 'ink', 'bg'],
  ['ink on surface', 'ink', 'surface'],
  ['ink on raised', 'ink', 'raised'],
  ['soft on bg', 'soft', 'bg'],
  ['soft on surface', 'soft', 'surface'],
  ['muted on bg', 'muted', 'bg'],
  ['muted on surface', 'muted', 'surface'],
  ['mustard accent text on bg', 'accent', 'bg'],
  ['coral accent text on bg', 'accent-2', 'bg'],
  ['coral accent text on surface', 'accent-2', 'surface'],
  ['light teal text on bg', 'teal-light', 'bg'],
  ['light blue text on bg', 'blue-light', 'bg'],
  ['ink on the deep-teal about section', 'ink', 'teal-deep'],
  ['mustard on the deep-teal about section', 'accent', 'teal-deep'],
  ['night on mustard (primary button)', 'night', 'accent'],
  ['night on cream (chips, window chrome)', 'night', 'ink'],
];

describe('design token contrast (WCAG 2.2 AA)', () => {
  it.each(PAIRS)('%s', (_label, fg, bg) => {
    expect(contrastRatio(token(fg), token(bg))).toBeGreaterThanOrEqual(4.5);
  });

  it('documents why plain teal and dusty blue are fills, never small text', () => {
    expect(contrastRatio(token('teal'), token('bg'))).toBeLessThan(4.5);
    expect(contrastRatio(token('blue'), token('bg'))).toBeLessThan(4.5);
  });
});

describe('token sources stay in sync', () => {
  it('globals.css variables match lib/tokens.ts', async () => {
    const { COLORS } = await import('@/lib/tokens');
    for (const [name, hex] of Object.entries(COLORS)) expect(token(name).toLowerCase()).toBe(hex);
  });
});

/** The main page's pop theme and its purple panel override the channels; check those pairings too. */
const block = (selector: string) => {
  const start = css.indexOf(`${selector} {`);
  return css.slice(start, css.indexOf('}', start));
};
const channel = (scope: string, name: string) => {
  const m = scope.match(new RegExp(`--c-${name}:\\s*(\\d+) (\\d+) (\\d+)`));
  if (!m) throw new Error(`--c-${name} not found`);
  return `#${[m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, '0')).join('')}`;
};

describe('pop theme contrast (WCAG 2.2 AA)', () => {
  const pop = block('.theme-pop');
  const purpleInk = block('.panel-ink');
  it.each([
    ['ink on paper', pop, 'ink', 'bg'],
    ['soft on paper', pop, 'soft', 'bg'],
    ['muted on paper', pop, 'muted', 'bg'],
    ['muted on surface', pop, 'muted', 'surface'],
    ['orange accent on paper', pop, 'accent', 'bg'],
    ['purple accent on paper', pop, 'accent-2', 'bg'],
    ['cream on orange button', pop, 'night', 'accent'],
    ['cream on purple sticker', pop, 'night', 'accent-2'],
    ['cream on purple panel', purpleInk, 'ink', 'bg'],
    ['yellow accent on purple panel', purpleInk, 'accent', 'bg'],
  ] as const)('%s', (_l, scope, fg, bg) => {
    expect(contrastRatio(channel(scope, fg), channel(scope, bg))).toBeGreaterThanOrEqual(4.5);
  });
});
