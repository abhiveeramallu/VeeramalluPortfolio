'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Turns a pop-up illustration towards the pointer: writes --rx / --ry on itself while hovered, so the layers
 * inside (each at its own translateZ) separate with real parallax. Off hover the card rests at an angle and
 * sways slowly (CSS); with reduced motion it stays still.
 */
export function Tilt3D({
  children,
  label,
  side = 'right',
  className,
}: {
  children: ReactNode;
  label: string;
  side?: 'left' | 'right';
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      data-side={side}
      className={cn('pop illustration', className)}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 2 - 1;
        const y = ((e.clientY - r.top) / r.height) * 2 - 1;
        el.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(x * 16).toFixed(2)}deg`);
        el.dataset.tilting = 'true';
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.removeProperty('--rx');
        el.style.removeProperty('--ry');
        delete el.dataset.tilting;
      }}
    >
      {children}
    </div>
  );
}
