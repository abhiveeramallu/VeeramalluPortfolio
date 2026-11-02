import { Instrument_Serif, Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';

// Self-hosted at build time by next/font: no render-blocking Google Fonts request.
export const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Body copy is never the LCP element, so Inter loads without preload and doesn't compete with the hero.
export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: false,
});

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});

export const fontSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic', // only ever used for the italic accent word
  variable: '--font-serif',
  display: 'swap',
});

export const fontVariables = [fontDisplay, fontSans, fontMono, fontSerif].map((f) => f.variable).join(' ');
