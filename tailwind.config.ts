import type { Config } from 'tailwindcss';

/** Colours resolve to RGB channel variables (app/globals.css) so opacity modifiers and scoped themes both work. */
const c = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: c('bg'),
        surface: c('surface'),
        raised: c('raised'),
        // `ink` is cream: the primary text colour on the dark paper. `night` is text on light/coloured fills.
        ink: c('ink'),
        soft: c('soft'),
        muted: c('muted'),
        night: c('night'),
        line: 'rgb(var(--c-ink) / 0.14)',
        accent: { DEFAULT: c('accent'), 2: c('accent-2') },
        teal: { DEFAULT: c('teal'), deep: c('teal-deep'), light: c('teal-light') },
        blue: { DEFAULT: c('blue'), light: c('blue-light') },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-display)', 'Georgia', 'serif'],
      },
      fontSize: {
        'step--1': 'var(--step--1)',
        'step-0': 'var(--step-0)',
        'step-1': 'var(--step-1)',
        'step-2': 'var(--step-2)',
        'step-3': 'var(--step-3)',
        'step-4': 'var(--step-4)',
        'step-5': 'var(--step-5)',
      },
      borderRadius: {
        card: '18px',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0, 0, 0, 0.5)',
        lift: '0 24px 48px -16px rgba(0, 0, 0, 0.6)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
