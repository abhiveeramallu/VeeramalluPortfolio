'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { duration, ease } from '@/lib/motion';

const IS_PROD = process.env.NODE_ENV === 'production';

/**
 * Recommendations carousel. Placeholder entries (content.ts → placeholder: true) only appear in
 * development, badged, so an invented quote can never reach a recruiter. No real quotes → no section.
 */
export function Testimonials() {
  const items = SITE_CONFIG.testimonials.filter((t) => !IS_PROD || !t.placeholder);
  const [index, setIndex] = useState(0);
  if (items.length === 0) return null;

  const go = (dir: number) => setIndex((i) => (i + dir + items.length) % items.length);
  const t = items[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-labelledby="testimonials-title"
      className="mx-auto max-w-6xl px-6 py-24 sm:px-12"
    >
      <div
        className="relative grid gap-8 overflow-hidden rounded-card border border-line bg-soft-purple p-8 sm:p-12 lg:grid-cols-[1fr_auto]"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(-1);
          if (e.key === 'ArrowRight') go(1);
        }}
      >
        <div>
          <p className="eyebrow mb-6 text-indigo-800" id="testimonials-title">
            Kind words
          </p>
          <Quote className="mb-4 h-8 w-8 text-indigo-700" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: duration.base, ease: ease.out }}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}`}
            >
              {t.placeholder && (
                <span className="mb-4 inline-block rounded-pill bg-orange-500 px-3 py-1 font-mono text-[11px] font-bold text-[#111]">
                  Placeholder — replace in data/content.ts (hidden in production)
                </span>
              )}
              <blockquote className="max-w-3xl font-display text-step-2 font-medium leading-snug text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 font-mono text-sm text-ink">
                <strong>{t.name}</strong> <span className="text-indigo-800">· {t.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        {items.length > 1 && (
          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="btn-secondary h-12 w-12 p-0"
              aria-label="Previous recommendation"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="btn-secondary h-12 w-12 p-0"
              aria-label="Next recommendation"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
