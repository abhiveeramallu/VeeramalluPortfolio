'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { spring } from '@/lib/motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, spring.snappy);
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="no-print fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-orange-500"
    />
  );
}
