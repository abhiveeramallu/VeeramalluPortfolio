'use client';

import { useEffect } from 'react';

/**
 * Publishes the pointer position as --px / --py (-1…1) on <html>, throttled to one write per frame. CSS uses
 * it for parallax (`float-layer`) — no React renders on pointer movement.
 */
export function PointerVars() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      x = (e.clientX / window.innerWidth) * 2 - 1;
      y = (e.clientY / window.innerHeight) * 2 - 1;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        root.style.setProperty('--px', x.toFixed(3));
        root.style.setProperty('--py', y.toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
