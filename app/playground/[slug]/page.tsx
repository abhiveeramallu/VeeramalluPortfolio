import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Github } from 'lucide-react';
import { SITE_CONFIG, getExperiment } from '@/data/content';
import { sourceUrl } from '@/lib/site';
import { breadcrumbJsonLd, experimentJsonLd } from '@/lib/seo';
import { ExperimentHost } from '@/components/playground/ExperimentHost';
import { JsonLd } from '@/components/ui/JsonLd';

interface PageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SITE_CONFIG.experiments.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const exp = getExperiment(params.slug);
  if (!exp) return {};
  return {
    title: `${exp.title} — Playground`,
    description: exp.tagline,
    alternates: { canonical: `/playground/${exp.slug}` },
    openGraph: { title: exp.title, description: exp.tagline, url: `/playground/${exp.slug}` },
  };
}

export default function ExperimentPage({ params }: PageProps) {
  const index = SITE_CONFIG.experiments.findIndex((e) => e.slug === params.slug);
  if (index === -1) notFound();
  const exp = SITE_CONFIG.experiments[index];
  const next = SITE_CONFIG.experiments[(index + 1) % SITE_CONFIG.experiments.length];

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-12">
      <JsonLd
        data={[
          experimentJsonLd(exp),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Playground', path: '/playground' },
            { name: exp.title, path: `/playground/${exp.slug}` },
          ]),
        ]}
      />
      <Link
        href="/playground"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Playground
      </Link>
      <header className="mb-10 mt-6 max-w-3xl">
        <p className="eyebrow mb-3 text-orange-600">
          {exp.kind} · {exp.year}
        </p>
        <h1 className="type-h1 text-ink">{exp.title}</h1>
        <p className="mt-4 text-step-1 text-muted">{exp.tagline}</p>
      </header>

      <section
        aria-label="Experiment"
        className="rounded-card border border-line bg-surface p-4 shadow-card sm:p-8"
      >
        <ExperimentHost slug={exp.slug} />
      </section>

      <div className="mt-14 grid gap-10 md:grid-cols-12">
        <section aria-labelledby="how-title" className="md:col-span-8">
          <h2 id="how-title" className="type-h3 text-ink">
            How I <span className="accent-word text-orange-600">built</span> it
          </h2>
          <ul className="mt-5 space-y-3">
            {exp.howIBuiltIt.map((line) => (
              <li key={line} className="flex gap-3 leading-relaxed text-ink">
                <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-orange-600" aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>
        </section>
        <aside className="space-y-5 md:col-span-4">
          <div>
            <h2 className="eyebrow mb-2 text-muted">Stack</h2>
            <ul className="flex flex-wrap gap-2">
              {exp.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-pill border border-line bg-surface px-3 py-1 font-mono text-xs text-ink"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={sourceUrl(exp.sourcePath)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Github className="h-4 w-4" aria-hidden="true" /> View source
          </a>
        </aside>
      </div>

      <Link
        href={`/playground/${next.slug}`}
        className="group mt-16 flex items-center justify-between rounded-card border border-line bg-surface p-6 hover:shadow-lift"
      >
        <span>
          <span className="eyebrow block text-muted">Next experiment</span>
          <span className="font-display text-xl font-bold text-ink">{next.title}</span>
        </span>
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  );
}
