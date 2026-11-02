import type { Config } from 'tailwindcss';

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
const scale = (name: string) => Object.fromEntries(STEPS.map((s) => [s, `var(--${name}-${s})`]));

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        orange: scale('orange'),
        indigo: scale('indigo'),
        lime: scale('lime'),
        accent: {
          DEFAULT: 'var(--accent)',
          2: 'var(--accent-2)',
          3: 'var(--accent-3)',
        },
        soft: {
          pink: 'var(--soft-pink)',
          blue: 'var(--soft-blue)',
          yellow: 'var(--soft-yellow)',
          green: 'var(--soft-green)',
          purple: 'var(--soft-purple)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
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
        card: '24px',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0, 0, 0, 0.04)',
        card: '0 12px 36px -4px rgba(17, 17, 17, 0.06), 0 2px 8px -2px rgba(17, 17, 17, 0.03)',
        lift: '0 24px 48px -12px rgba(17, 17, 17, 0.14), 0 8px 16px -8px rgba(17, 17, 17, 0.06)',
        bloom: '0 16px 40px -10px rgba(255, 90, 31, 0.45)',
        'bloom-indigo': '0 18px 45px -8px rgba(91, 91, 255, 0.3)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      animation: {
        'marquee-left': 'marquee-left 40s linear infinite',
        'marquee-right': 'marquee-right 40s linear infinite',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
