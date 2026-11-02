import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion system. Every animation in the app pulls from here so timing feels
 * like one hand made it. CSS equivalents live in globals.css (--ease-out, --ease-in-out).
 */
export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  in: [0.55, 0, 1, 0.45],
} as const satisfies Record<string, readonly [number, number, number, number]>;

export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
  reveal: 0.8,
} as const;

export const spring = {
  /** Snappy UI elements: pills, toggles, active indicators. */
  snappy: { type: 'spring', stiffness: 380, damping: 30, mass: 0.6 },
  /** Soft follow: cursor, magnetic buttons. */
  soft: { type: 'spring', stiffness: 220, damping: 22, mass: 0.5 },
  /** Gentle settle for large surfaces: drawers, modals. */
  gentle: { type: 'spring', stiffness: 160, damping: 24 },
} as const satisfies Record<string, Transition>;

export const stagger = (step = 0.06, delayChildren = 0): Transition => ({
  staggerChildren: step,
  delayChildren,
});

/** Default whileInView viewport: fire once, slightly before the element is fully visible. */
export const viewport = { once: true, margin: '0px 0px -12% 0px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
};

export const lineReveal: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: duration.reveal, ease: ease.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
};
