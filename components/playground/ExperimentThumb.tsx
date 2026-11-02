import type { Experiment } from '@/data/content';
import { cn } from '@/lib/utils';

/** Lightweight CSS previews for experiments — the real (often WebGL) toy only loads on its own page. */
export function ExperimentThumb({ exp, className }: { exp: Experiment; className?: string }) {
  switch (exp.slug) {
    case 'flow-gradient':
      return (
        <div
          aria-hidden="true"
          className={cn('h-full w-full', className)}
          style={{
            background:
              'radial-gradient(at 20% 30%, #5B5BFF 0, transparent 50%), radial-gradient(at 80% 20%, #FF5A1F 0, transparent 45%), radial-gradient(at 60% 80%, #C6F432 0, transparent 45%), radial-gradient(at 10% 90%, #FFB8D6 0, transparent 50%), #1B1664',
          }}
        />
      );
    case 'hungarian-matrix':
      return (
        <div
          aria-hidden="true"
          className={cn('grid h-full w-full grid-cols-3 gap-2 bg-soft-yellow p-6', className)}
        >
          {[9, 2, 7, 6, 4, 3, 5, 8, 1].map((n, i) => (
            <span
              key={i}
              className={cn(
                'flex items-center justify-center rounded-xl font-mono text-lg font-bold',
                [1, 5, 6].includes(i) ? 'bg-orange-500 text-[#111]' : 'bg-white text-ink',
              )}
            >
              {n}
            </span>
          ))}
        </div>
      );
    case 'contrast-ramps':
      return (
        <div
          aria-hidden="true"
          className={cn('flex h-full w-full items-end gap-1 bg-soft-green p-6', className)}
        >
          {['#F3FDCF', '#E8FB9F', '#DBF86E', '#C6F432', '#8FB30A', '#617A03', '#4B5E08', '#354401'].map(
            (c, i) => (
              <span
                key={c}
                className="flex-1 rounded-md"
                style={{ background: c, height: `${30 + i * 9}%` }}
              />
            ),
          )}
        </div>
      );
    case 'chroma-synth':
      return (
        <div
          aria-hidden="true"
          className={cn('grid h-full w-full grid-cols-6 gap-1.5 bg-soft-blue p-6', className)}
        >
          {['#FFD6E8', '#D6E6FF', '#FFF0C2', '#E4F4D6', '#E9E4FF', '#C6F432'].map((c, i) => (
            <span
              key={c}
              className="rounded-lg border border-white"
              style={{ background: c, transform: `translateY(${i % 2 ? 8 : 0}px)` }}
            />
          ))}
        </div>
      );
    default:
      return (
        <div
          aria-hidden="true"
          className={cn('flex h-full w-full items-center justify-center bg-soft-pink', className)}
        >
          <span
            className="h-24 w-24 rounded-[38%] shadow-lift"
            style={{ background: 'radial-gradient(circle at 32% 28%, #fff 0%, #FF815B 30%, #FF5A1F 75%)' }}
          />
        </div>
      );
  }
}
