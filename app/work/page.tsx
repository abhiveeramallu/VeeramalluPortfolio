import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { Illustration } from '@/components/illustrations/Illustration';
import { ILLUSTRATION_DESCRIPTIONS } from '@/lib/illustrations';
import { StatusChips } from '@/components/work/ProjectMeta';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Every project in the archive — RouteFusion, ThreatLensAI, ImageGuard, VisionRAG-X and more — with honest status labels, case studies and GitHub links.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  const { projects, archive } = SITE_CONFIG;
  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-32 md:px-10 md:pt-40">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/work' },
        ])}
      />
      <header className="max-w-3xl">
        <p className="label mb-4 text-accent">Index</p>
        <h1 className="type-h1">
          The full <span className="accent-word">archive</span>.
        </h1>
        <p className="mt-6 max-w-xl text-step-0 leading-relaxed text-soft">
          {projects.length} projects with case studies and {archive.length} smaller repositories. Status
          labels say what each one is: a live demo, a working prototype, research, or still in development.
        </p>
      </header>

      <ul className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <li
            key={p.slug}
            className="group relative flex flex-col bg-bg p-6 transition-colors hover:bg-surface"
          >
            <Illustration
              priority={i === 0}
              scene={p.illustration}
              label={`Illustration for ${p.title}: ${ILLUSTRATION_DESCRIPTIONS[p.illustration]}`}
              className="mb-6 rounded-[18px] shadow-none"
            />
            <p className="label text-[10px] text-muted">
              {String(i + 1).padStart(2, '0')} · {p.category}
            </p>
            <h2 className="mt-2 font-display text-step-2 font-semibold">
              <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
                {p.title}
              </Link>
            </h2>
            <StatusChips project={p} className="mt-4" />
            <p className="mt-4 flex-1 text-sm leading-relaxed text-soft">{p.summary}</p>
            <div className="relative z-10 mt-6 flex flex-wrap gap-4 text-sm">
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[32px] items-center gap-1.5 text-soft hover:text-ink"
              >
                <Github size={14} aria-hidden /> GitHub
                <span className="sr-only"> repository for {p.title}</span>
              </a>
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[32px] items-center gap-1.5 text-soft hover:text-ink"
                >
                  Live demo <ArrowUpRight size={14} aria-hidden />
                  <span className="sr-only"> of {p.title}</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      <section id="archive" aria-labelledby="archive-title" className="mt-24">
        <p className="label mb-4 text-accent">Also on GitHub</p>
        <h2 id="archive-title" className="type-h2">
          Smaller &amp; earlier <span className="accent-word">repositories</span>
        </h2>
        <ul className="mt-10 border-t border-line">
          {archive.map((r) => (
            <li
              key={r.url}
              className="grid gap-2 border-b border-line py-6 md:grid-cols-[1fr_2fr_auto] md:gap-8"
            >
              <div>
                <h3 className="font-display text-step-1 font-semibold">{r.name}</h3>
                <p className="label mt-1 text-[10px] text-muted">{r.stack}</p>
              </div>
              <p className="leading-relaxed text-soft">{r.description}</p>
              <div className="flex gap-4 text-sm md:justify-end">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[32px] items-center gap-1.5 text-soft hover:text-ink"
                >
                  <Github size={14} aria-hidden /> Code<span className="sr-only"> for {r.name}</span>
                </a>
                {r.liveUrl && (
                  <a
                    href={r.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[32px] items-center gap-1.5 text-soft hover:text-ink"
                  >
                    Demo <ArrowUpRight size={14} aria-hidden />
                    <span className="sr-only"> of {r.name}</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
