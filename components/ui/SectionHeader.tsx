import type { ReactNode } from 'react';
import { SplitReveal } from './SplitReveal';
import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  lines,
  intro,
  action,
  inverted = false,
  id,
}: {
  eyebrow: string;
  lines: ReactNode[];
  intro?: string;
  action?: ReactNode;
  inverted?: boolean;
  id?: string;
}) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <p className={cn('eyebrow mb-3', inverted ? 'text-accent' : 'text-accent')}>{eyebrow}</p>
        <SplitReveal lines={lines} className="type-h2 text-ink" />
        {intro && <p className="mt-4 max-w-xl text-step-0 leading-relaxed text-muted">{intro}</p>}
      </div>
      {action && (
        <div className="shrink-0" id={id}>
          {action}
        </div>
      )}
    </div>
  );
}
