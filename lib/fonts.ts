import { Alfa_Slab_One, Bangers, Fraunces, Inter, JetBrains_Mono } from 'next/font/google';

// Self-hosted at build time by next/font: no render-blocking Google Fonts request.
// Fraunces' SOFT and WONK axes give the oversized, slightly quirky editorial display type; its italic is the
// accent face for one word per headline.
export const fontDisplay = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  // The main page's headline is the slab face; Fraunces loads without preload so it never delays first paint.
  preload: false,
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
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});

// Heavy slab for the riso-poster main page ("Hello!", the giant name), after printed portfolio zines.
export const fontSlab = Alfa_Slab_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-slab',
  display: 'swap',
});

// Comic lettering for the speech bubbles in the illustrations.
export const fontComic = Bangers({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-comic',
  display: 'swap',
  preload: false,
});

export const fontVariables = [fontDisplay, fontSans, fontMono, fontSlab, fontComic]
  .map((f) => f.variable)
  .join(' ');
