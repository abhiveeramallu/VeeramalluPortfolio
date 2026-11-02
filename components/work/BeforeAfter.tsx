'use client';

import { useId, useRef, useState, type ReactNode } from 'react';
import { ArrowLeftRight } from 'lucide-react';

/**
 * Before/after comparison. Drag anywhere, or focus the slider and use ←/→ (Home/End jump).
 * The native range input provides the accessible slider semantics.
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
}: {
  before: ReactNode;
  after: ReactNode;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const id = useId();

  const fromPointer = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      data-cursor="drag"
      className="relative aspect-[16/10] w-full touch-pan-y select-none overflow-hidden rounded-2xl bg-surface"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        fromPointer(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      <div className="absolute inset-0 bg-soft-yellow">{after}</div>
      <div className="absolute inset-0 bg-[#ECE9E2]" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before}
      </div>
      <span className="absolute left-3 top-3 rounded-pill bg-[#111] px-3 py-1 font-mono text-[11px] font-semibold text-[#f6f4ef]">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 rounded-pill bg-lime-500 px-3 py-1 font-mono text-[11px] font-semibold text-[#111]">
        {afterLabel}
      </span>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-[#111]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#111] font-mono text-xs text-[#f6f4ef] shadow-lift">
          <ArrowLeftRight className="h-4 w-4" />
        </span>
      </div>
      <label htmlFor={id} className="sr-only">
        Comparison position: {beforeLabel} on the left, {afterLabel} on the right
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        className="peer absolute inset-x-0 bottom-0 h-8 w-full cursor-ew-resize opacity-0"
        aria-valuetext={`${Math.round(pos)}% ${beforeLabel}`}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-indigo-500 ring-offset-2 peer-focus-visible:ring-2"
      />
    </div>
  );
}
