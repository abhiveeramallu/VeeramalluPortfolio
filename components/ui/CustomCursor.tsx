'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { spring } from '@/lib/motion';

type CursorState = 'default' | 'link' | 'label' | 'drag' | 'text';

const LINK_SELECTOR = 'a, button, [role="button"], summary, label, select';
const TEXT_SELECTOR =
  'input:not([type="range"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"], [data-cursor="text"]';

/**
 * Follower cursor with five states. The native cursor stays visible (accessibility + precision);
 * this layer adds intent: "View" on cards, "Drag" on sliders, an I-beam on fields.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>('default');
  const [label, setLabel] = useState('');
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, spring.soft);
  const sy = useSpring(y, spring.soft);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const drag = el.closest('[data-cursor="drag"]');
      if (drag) {
        setState('drag');
        return;
      }
      const labelled = el.closest('[data-cursor-label]');
      if (labelled) {
        setLabel(labelled.getAttribute('data-cursor-label') ?? '');
        setState('label');
        return;
      }
      if (el.closest(TEXT_SELECTOR)) setState('text');
      else if (el.closest(LINK_SELECTOR)) setState('link');
      else setState('default');
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const pill = state === 'label' || state === 'drag';

  return (
    <motion.div
      aria-hidden="true"
      className="no-print pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-wider text-[#111]"
        animate={{
          width: pill ? 'auto' : state === 'link' ? 40 : state === 'text' ? 3 : 12,
          height: pill ? 32 : state === 'link' ? 40 : state === 'text' ? 26 : 12,
          borderRadius: state === 'text' ? 2 : 999,
          backgroundColor: state === 'link' ? 'rgba(255,90,31,0)' : state === 'text' ? '#5B5BFF' : '#FF5A1F',
          borderWidth: state === 'link' ? 1.5 : 0,
          paddingLeft: pill ? 14 : 0,
          paddingRight: pill ? 14 : 0,
          scale: pressed ? 0.85 : 1,
        }}
        style={{ borderColor: '#FF5A1F', borderStyle: 'solid' }}
        transition={spring.snappy}
      >
        {state === 'label' && <span>{label}</span>}
        {state === 'drag' && <span>← Drag →</span>}
      </motion.div>
    </motion.div>
  );
}
