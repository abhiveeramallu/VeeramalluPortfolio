/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#101014',
        surface: {
          DEFAULT: '#16161c',
          subtle: '#1a1a23',
          border: '#262633',
          hover: '#22222d',
        },
        primary: {
          DEFAULT: '#F4F0E6',
          muted: '#A7A3AD',
        },
        accent: {
          orange: '#FF5B35',
          'orange-glow': 'rgba(255, 91, 53, 0.35)',
          purple: '#8B5CF6',
          'purple-glow': 'rgba(139, 92, 246, 0.35)',
          sage: '#C7D9B5',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
