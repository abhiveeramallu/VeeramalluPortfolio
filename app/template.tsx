'use client';

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { pageTransition } from '@/lib/motion';

// The first page view must paint at full opacity straight from the server (LCP); only client-side
// navigations afterwards get the enter transition.
let hasNavigated = false;

/** Route-level enter transition. Templates remount per navigation. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const animate = hasNavigated && !reduce;
  useEffect(() => {
    hasNavigated = true;
  }, []);
  return (
    <motion.div variants={pageTransition} initial={animate ? 'hidden' : false} animate="show">
      {children}
    </motion.div>
  );
}
