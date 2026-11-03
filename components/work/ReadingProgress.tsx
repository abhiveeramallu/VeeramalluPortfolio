'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { spring } from '@/lib/motion';

/** Progress through the article body (not the whole page). */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, spring.snappy);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      progress.set(total <= 0 ? 1 : Math.min(1, Math.max(0, -r.top / total)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [targetId, progress]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="no-print fixed inset-x-0 top-0 z-[61] h-1 origin-left bg-accent"
    />
  );
}
