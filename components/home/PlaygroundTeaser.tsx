import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ExperimentThumb } from '@/components/playground/ExperimentThumb';
import { cn } from '@/lib/utils';

// 2×2 feature + four singles fills a 4×2 grid exactly.
const SPANS = ['md:col-span-2 md:row-span-2', '', '', '', ''];

export function PlaygroundTeaser() {
  return (
    <section aria-labelledby="play-title" className="mx-auto max-w-6xl px-6 py-24 sm:px-12">
      <SectionHeader
        eyebrow="03 — Playground"
        lines={[
          <span key="a" id="play-title">
            Small toys that show
          </span>,
          <span key="b">
            the <span className="accent-word text-orange-600">range.</span>
          </span>,
        ]}
        intro="Shaders, algorithms, sound and tools — each with a write-up and source."
        action={
          <Link href="/playground" className="btn-secondary">
            Open the playground
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />
      <ul className="grid auto-rows-[220px] grid-cols-1 gap-5 md:grid-cols-4">
        {SITE_CONFIG.experiments.map((exp, i) => (
          <li key={exp.slug} className={cn(SPANS[i] ?? '')}>
            <Link
              href={`/playground/${exp.slug}`}
              data-cursor-label="Play"
              className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-soft transition-shadow hover:shadow-lift"
            >
              <div className="min-h-0 flex-1 overflow-hidden">
                <ExperimentThumb
                  exp={exp}
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3.5">
                <div className="min-w-0">
                  <p className="truncate font-display font-bold text-ink">{exp.title}</p>
                  <p className="font-mono text-[11px] text-muted">
                    {exp.kind} · {exp.year}
                  </p>
                </div>
                {exp.isNew ? (
                  <span className="shrink-0 rounded-pill bg-lime-500 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#111]">
                    New
                  </span>
                ) : (
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-ink"
                    aria-hidden="true"
                  />
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
