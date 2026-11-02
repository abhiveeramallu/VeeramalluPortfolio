import { describe, expect, it } from 'vitest';
import {
  contrastRatio,
  firstAccessibleStep,
  hexToRgb,
  luminance,
  tonalRamp,
  wcagLevel,
} from '@/lib/contrast';

describe('contrast maths', () => {
  it('matches WCAG reference values', () => {
    expect(luminance('#FFFFFF')).toBeCloseTo(1, 5);
    expect(luminance('#000000')).toBeCloseTo(0, 5);
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrastRatio('#777777', '#FFFFFF')).toBeCloseTo(4.48, 2);
  });

  it('is symmetric and parses short hex', () => {
    expect(contrastRatio('#111', '#F6F4EF')).toBeCloseTo(contrastRatio('#F6F4EF', '#111111'), 6);
    expect(hexToRgb('#abc')).toEqual([170, 187, 204]);
    expect(() => hexToRgb('nope')).toThrow();
  });

  it('labels WCAG levels', () => {
    expect(wcagLevel(7.1)).toBe('AAA');
    expect(wcagLevel(4.5)).toBe('AA');
    expect(wcagLevel(3.2)).toBe('AA Large');
    expect(wcagLevel(2)).toBe('Fail');
  });

  it('builds a monotonic ramp and finds a text-safe step', () => {
    const ramp = tonalRamp('#FF5A1F');
    const steps = Object.keys(ramp)
      .map(Number)
      .sort((a, b) => a - b);
    const lums = steps.map((s) => luminance(ramp[s]));
    for (let i = 1; i < lums.length; i++) expect(lums[i]).toBeLessThan(lums[i - 1]);
    const step = firstAccessibleStep(ramp, '#F6F4EF');
    expect(step).not.toBeNull();
    expect(contrastRatio(ramp[step!], '#F6F4EF')).toBeGreaterThanOrEqual(4.5);
  });
});

/**
 * Every foreground/background pairing the UI actually uses for text. If a token changes and a pair drops
 * below its threshold, this fails — the same gate Lumina Tokens runs in CI.
 */
const LIGHT = { bg: '#F6F4EF', surface: '#FFFFFF', ink: '#111111', muted: '#6B6B66' };
const DARK = { bg: '#111111', surface: '#1B1B1A', ink: '#F6F4EF', muted: '#A3A39C' };
const PAIRS: [string, string, string, number][] = [
  ['ink on bg', LIGHT.ink, LIGHT.bg, 4.5],
  ['muted on bg', LIGHT.muted, LIGHT.bg, 4.5],
  ['muted on surface', LIGHT.muted, LIGHT.surface, 4.5],
  ['orange-600 text on bg', '#BD3D0C', LIGHT.bg, 4.5],
  ['orange-700 error text on surface', '#942C03', LIGHT.surface, 4.5],
  ['indigo-600 text on bg', '#5353ED', LIGHT.bg, 4.5],
  ['indigo-800 on soft-purple', '#2C2891', '#E9E4FF', 4.5],
  ['lime-800 label on surface', '#4B5E08', LIGHT.surface, 4.5],
  ['ink on orange-500 (primary button)', LIGHT.ink, '#FF5A1F', 4.5],
  ['ink on lime-500 (badges)', LIGHT.ink, '#C6F432', 4.5],
  ['indigo-800 on indigo-100 (prototype badge)', '#2C2891', '#E8ECFF', 4.5],
  ['orange-800 on orange-100 (self-initiated badge)', '#6C1F04', '#FFE7DF', 4.5],
  ['inverted: ink on ink-bg', DARK.ink, DARK.bg, 4.5],
  ['inverted: muted', DARK.muted, DARK.bg, 4.5],
  ['inverted: orange-500 eyebrow', '#FF5A1F', DARK.bg, 4.5],
  ['inverted: lime-500 accent', '#C6F432', DARK.bg, 4.5],
  ['dark theme: remapped orange-600', '#FF815B', DARK.bg, 4.5],
  ['dark theme: remapped indigo-600', '#94A2FF', DARK.bg, 4.5],
  ['dark theme: muted on surface', DARK.muted, DARK.surface, 4.5],
];

describe('design token contrast (WCAG 2.2 AA)', () => {
  it.each(PAIRS)('%s', (_label, fg, bg, min) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(min);
  });

  it('documents the brand pairings that are NOT text-safe (and so are never used for text)', () => {
    expect(contrastRatio('#FF5A1F', LIGHT.bg)).toBeLessThan(3); // orange-500 text on off-white
    expect(contrastRatio('#FFFFFF', '#FF5A1F')).toBeLessThan(4.5); // white on orange button
    expect(contrastRatio('#5B5BFF', LIGHT.bg)).toBeLessThan(4.5); // indigo-500 text on off-white
    expect(contrastRatio('#C6F432', LIGHT.bg)).toBeLessThan(1.5); // lime text on off-white
  });
});
