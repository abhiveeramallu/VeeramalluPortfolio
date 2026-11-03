/**
 * Colour tokens — a warm editorial palette (dark olive paper, cream type, teal, mustard, coral, dusty blue).
 * Tailwind reads these (so opacity modifiers like `bg-bg/80` work); app/globals.css mirrors them as CSS
 * variables for raw CSS and SVG artwork, and tests/unit/contrast.test.ts asserts the two stay identical.
 */
export const COLORS = {
  bg: '#171811',
  surface: '#22231b',
  raised: '#2b2c23',
  ink: '#f4f0de',
  soft: '#d6d1bc',
  muted: '#a9a69a',
  night: '#171811',
  accent: '#e5c542',
  'accent-2': '#e98b72',
  teal: '#328477',
  'teal-deep': '#20594f',
  'teal-light': '#5fb3a3',
  blue: '#4f85a7',
  'blue-light': '#86b3cf',
} as const;
