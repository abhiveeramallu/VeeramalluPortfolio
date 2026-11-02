import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { ExperimentThumb } from '@/components/playground/ExperimentThumb';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Shaders, algorithm games, sound toys and design tools — each with a write-up and source.',
  alternates: { canonical: '/playground' },
};

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Playground', path: '/playground' },
        ])}
      />
      <header className="mb-14 max-w-3xl">
        <p className="eyebrow mb-3 text-orange-600">
          Playground · {SITE_CONFIG.experiments.length} experiments
        </p>
        <h1 className="type-h1 text-ink">
          Things I built to <span className="accent-word text-orange-600">learn.</span>
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">
          Each experiment has its own page, a short “how I built it”, and a link to the source.
        </p>
      </header>
      <ul className="grid auto-rows-[260px] grid-cols-1 gap-6 md:grid-cols-3">
        {SITE_CONFIG.experiments.map((exp, i) => (
          <li key={exp.slug} className={cn(i === 0 && 'md:col-span-2 md:row-span-2')}>
            <Link
              href={`/playground/${exp.slug}`}
              data-cursor-label="Play"
              className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-soft transition-shadow hover:shadow-lift"
            >
              <div className="min-h-0 flex-1 overflow-hidden">
                <ExperimentThumb
                  exp={exp}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between gap-3 border-t border-line p-5">
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">{exp.title}</h2>
                  <p className="mt-1 text-sm text-muted">{exp.tagline}</p>
                </div>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-muted group-hover:text-ink"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
