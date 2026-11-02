'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { lineReveal, stagger, viewport } from '@/lib/motion';

/**
 * Line-by-line masked reveal for headings. Pass each visual line as an array item so the markup stays
 * semantic (one heading element) and screen readers hear a single sentence.
 */
export function SplitReveal({
  lines,
  as: Tag = 'h2',
  className,
}: {
  lines: ReactNode[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={stagger(0.08)}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={lineReveal}>
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
