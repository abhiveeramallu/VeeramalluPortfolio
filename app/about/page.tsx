import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileDown } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { HeroFallback } from '@/components/3d/HeroFallback';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About',
  description: `How ${SITE_CONFIG.name} works: background, principles, experience and tools.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-28 px-6 pb-24 pt-32 sm:px-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-3 text-orange-600">About</p>
          <h1 className="type-h1 text-ink">
            Designer by training, <span className="accent-word text-indigo-600">engineer</span> by habit.
          </h1>
          <div className="mt-8 max-w-xl space-y-5 text-step-0 leading-relaxed text-muted">
            <p>
              I’m <strong className="font-semibold text-ink">{SITE_CONFIG.name}</strong>, a{' '}
              {SITE_CONFIG.role.toLowerCase()} in {SITE_CONFIG.location}. I study computer science at VIT and
              spend most evenings shipping things.
            </p>
            <p>
              My favourite problems have maths under the hood — a matching algorithm, a classifier, a local
              LLM — and a person on top who needs to understand it in one glance. I sketch the interface, then
              build it in React so I can test it with real data and real latency.
            </p>
            <p>
              I care about accessibility budgets as much as springs and shaders. The best compliment I get is
              “that was obvious”.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/work" className="btn-primary">
              See the work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <TrackedLink
              href="/resume.pdf"
              event="resume_download"
              props={{ location: 'about' }}
              className="btn-secondary"
              download
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              Résumé
            </TrackedLink>
          </div>
        </div>
        {/* TODO: replace with a real portrait at /public/about/portrait.webp */}
        <div className="relative rounded-card border border-line bg-soft-yellow p-8 lg:col-span-5">
          <HeroFallback className="mx-auto w-full max-w-sm" />
        </div>
      </section>

      <section aria-labelledby="principles-title">
        <p className="eyebrow mb-3 text-orange-600">Principles</p>
        <h2 id="principles-title" className="type-h2 mb-10 text-ink">
          Three things I <span className="accent-word text-orange-600">won’t</span> compromise on.
        </h2>
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {SITE_CONFIG.values.map((v, i) => (
            <li
              key={v.title}
              className={`rounded-card border border-line bg-surface p-7 ${i === 0 ? 'md:col-span-6 md:row-span-2 md:bg-soft-pink' : 'md:col-span-6'}`}
            >
              <span className="font-mono text-sm font-semibold text-orange-600">0{i + 1}</span>
              <h3 className="type-h3 mt-3 text-ink">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{v.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="journey-title">
        <p className="eyebrow mb-3 text-orange-600">Experience</p>
        <h2 id="journey-title" className="type-h2 mb-10 text-ink">
          Where I’ve <span className="accent-word text-indigo-600">learned.</span>
        </h2>
        <ol className="border-l-2 border-line">
          {SITE_CONFIG.journey.map((item) => (
            <li key={item.role} className="relative pb-10 pl-8 last:pb-0">
              <span
                className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-orange-500"
                aria-hidden="true"
              />
              <p className="font-mono text-xs text-muted">
                {item.period} · {item.location}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-ink">
                {item.role} <span className="font-normal text-muted">— {item.company}</span>
              </h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted">{item.description}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-pill border border-line bg-surface px-3 py-1 font-mono text-xs text-ink"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="tools-title">
        <p className="eyebrow mb-3 text-orange-600">Toolkit</p>
        <h2 id="tools-title" className="type-h2 mb-10 text-ink">
          What I <span className="accent-word text-orange-600">reach</span> for.
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SITE_CONFIG.tools.map((t) => (
            <li key={t.name} className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{t.category}</p>
              <p className="mt-2 font-display font-bold text-ink">{t.name}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
