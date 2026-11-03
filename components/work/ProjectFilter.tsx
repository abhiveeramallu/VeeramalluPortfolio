'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const AREAS = [
  { id: 'all', label: 'All' },
  { id: 'ml', label: 'AI / ML' },
  { id: 'fullstack', label: 'Full-stack' },
  { id: 'security', label: 'Security' },
  { id: 'embedded', label: 'Embedded' },
] as const;

export type AreaId = (typeof AREAS)[number]['id'];

/**
 * Comic filter pills above the project grid. Cards are server-rendered with `data-areas`; this only hides the
 * ones that don't match, so every project is in the HTML and visible without JavaScript.
 */
export function ProjectFilter({ children }: { children: ReactNode }) {
  const [area, setArea] = useState<AreaId>('all');
  const [shown, setShown] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll<HTMLElement>('[data-areas]') ?? [];
    let count = 0;
    cards.forEach((el) => {
      const match = area === 'all' || (el.dataset.areas ?? '').split(' ').includes(area);
      el.hidden = !match;
      if (match) count++;
    });
    setShown(count);
  }, [area]);

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-center gap-3">
        <div role="group" aria-label="Filter projects by area" className="flex flex-wrap gap-2.5">
          {AREAS.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-pressed={area === a.id}
              onClick={() => setArea(a.id)}
              className={cn(
                'label min-h-[40px] rounded-pill border-2 border-[#16121f] px-4 text-[11px] transition-transform hover:-translate-y-0.5',
                area === a.id
                  ? 'bg-[#16121f] text-[#fff8ee] shadow-[3px_3px_0_0_#ff5a1f]'
                  : 'bg-[#fff8ee] text-[#16121f] shadow-[3px_3px_0_0_#16121f]',
              )}
            >
              {a.label}
            </button>
          ))}
        </div>
        {shown !== null && (
          <p aria-live="polite" className="label text-[11px] text-muted">
            Showing {shown}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
