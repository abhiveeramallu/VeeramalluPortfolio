import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { Illustration } from '@/components/illustrations/Illustration';
import { ILLUSTRATION_DESCRIPTIONS } from '@/lib/illustrations';
import { StatusChips } from '@/components/work/ProjectMeta';
import { ProjectFilter, type AreaId } from '@/components/work/ProjectFilter';
import { RepoCards } from '@/components/work/RepoCards';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Every project — RouteFusion, ThreatLensAI, ImageGuard, VisionRAG-X, Secure Messaging and more — with honest status labels, case studies and GitHub links.',
  alternates: { canonical: '/work' },
};

/** Which filter areas each featured project belongs to. */
const PROJECT_AREAS: Record<string, AreaId[]> = {
  routefusion: ['fullstack'],
  'threatlens-ai': ['ml', 'security', 'fullstack'],
  imageguard: ['security', 'fullstack'],
  'visionrag-x': ['ml'],
  'honeypot-attack-classification': ['ml', 'security'],
  'edge-ai-thermal-management': ['ml', 'embedded'],
  'greenhouse-microclimate-forecasting': ['ml'],
  'smart-document-intelligence': ['ml', 'fullstack'],
  stockmind: ['ml', 'fullstack'],
  'secure-messaging': ['fullstack', 'security'],
};

const STICKERS = ['#ffb21a', '#8fb4ff', '#7cc96a'];

export default function WorkPage() {
  const { projects, archive } = SITE_CONFIG;
  const live = projects.filter((p) => p.liveUrl).length + archive.filter((r) => r.liveUrl).length;
  const stats = [
    { value: projects.length, label: 'case studies' },
    { value: archive.length, label: 'more repos' },
    { value: live, label: 'live demos' },
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-32 md:px-10 md:pt-40">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/work' },
        ])}
      />

      <header className="grid items-end gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="label mb-4 text-accent">Projects</p>
          <div className="relative mb-6 inline-block rounded-[22px] border-[3px] border-[#16121f] bg-[#fff8ee] px-5 py-2 shadow-[5px_5px_0_0_#16121f]">
            <p className="font-[family-name:var(--font-comic)] text-2xl leading-none tracking-wide text-[#a8380a]">
              Pow! Everything I’ve shipped.
            </p>
            <span
              aria-hidden
              className="absolute -bottom-[12px] left-8 h-5 w-5 rotate-45 border-b-[3px] border-r-[3px] border-[#16121f] bg-[#fff8ee]"
            />
          </div>
          <h1 className="type-h1">
            Things I’ve <span className="accent-word">built</span>.
          </h1>
          <p className="mt-6 max-w-xl text-step-0 leading-relaxed text-soft">
            Every repository on my GitHub, from full case studies to weekend experiments. Status labels say
            what each one is: a live demo, a working prototype, research, or still in development.
          </p>
        </div>
        <ul className="grid grid-cols-3 gap-3 sm:gap-5" aria-label="At a glance">
          {stats.map((s, i) => (
            <li
              key={s.label}
              style={{ rotate: `${(i - 1) * 3}deg`, background: STICKERS[i] }}
              className="flex flex-col items-center rounded-[20px] border-[3px] border-[#16121f] px-2 py-4 text-center text-[#16121f] shadow-[5px_5px_0_0_#16121f]"
            >
              <span className="font-[family-name:var(--font-comic)] text-[clamp(2.4rem,1.6rem+3vw,4rem)] leading-none">
                {s.value}
              </span>
              <span className="label mt-2 text-[10px]">{s.label}</span>
            </li>
          ))}
        </ul>
      </header>

      <section aria-labelledby="featured-title" className="mt-20">
        <h2 id="featured-title" className="sr-only">
          Featured projects
        </h2>
        <ProjectFilter>
          <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((p, i) => (
              <li
                key={p.slug}
                data-areas={(PROJECT_AREAS[p.slug] ?? []).join(' ')}
                className="group relative flex flex-col rounded-[26px] [&[hidden]]:hidden border-[3px] border-[#16121f] bg-[#fff8ee] p-4 shadow-[7px_7px_0_0_#16121f] transition-[transform,box-shadow] duration-200 hover:-translate-y-1.5 hover:shadow-[11px_11px_0_0_#16121f] motion-reduce:transition-none"
              >
                <Illustration
                  priority={i === 0}
                  scene={p.illustration}
                  label={`Illustration for ${p.title}: ${ILLUSTRATION_DESCRIPTIONS[p.illustration]}`}
                  className="rounded-[18px] shadow-none"
                />
                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                  <p className="label flex items-center gap-3 text-[10px] text-[#a8380a]">
                    <span className="font-[family-name:var(--font-comic)] text-2xl leading-none tracking-wide text-[#16121f]">
                      #{String(i + 1).padStart(2, '0')}
                    </span>
                    {p.category}
                  </p>
                  <h3 className="mt-2 font-display text-step-2 font-semibold leading-tight text-[#16121f]">
                    <Link
                      href={`/work/${p.slug}`}
                      className="after:absolute after:inset-0 after:rounded-[26px] after:content-['']"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <StatusChips project={p} className="mt-3" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[#3d3547]">{p.summary}</p>
                  <div className="relative z-10 mt-6 flex flex-wrap gap-2.5">
                    <Link
                      href={`/work/${p.slug}`}
                      className="label inline-flex min-h-[38px] items-center gap-1.5 rounded-pill border-2 border-[#16121f] bg-[#16121f] px-4 text-[11px] text-[#fff8ee] shadow-[3px_3px_0_0_#ff5a1f] transition-transform hover:-translate-y-0.5"
                    >
                      Case study <ArrowRight size={13} aria-hidden />
                      <span className="sr-only">: {p.title}</span>
                    </Link>
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label inline-flex min-h-[38px] items-center gap-1.5 rounded-pill border-2 border-[#16121f] bg-[#fff8ee] px-4 text-[11px] text-[#16121f] shadow-[3px_3px_0_0_#16121f] transition-transform hover:-translate-y-0.5"
                    >
                      <Github size={13} aria-hidden /> GitHub
                      <span className="sr-only"> repository for {p.title}</span>
                    </a>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label inline-flex min-h-[38px] items-center gap-1.5 rounded-pill border-2 border-[#16121f] bg-[#ffb21a] px-4 text-[11px] text-[#16121f] shadow-[3px_3px_0_0_#16121f] transition-transform hover:-translate-y-0.5"
                      >
                        Live demo <ArrowUpRight size={13} aria-hidden />
                        <span className="sr-only"> of {p.title}</span>
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </ProjectFilter>
      </section>

      <section id="archive" aria-labelledby="archive-title" className="mt-32">
        <p className="label mb-4 text-accent">Also on GitHub</p>
        <h2 id="archive-title" className="type-h2">
          Smaller &amp; earlier <span className="accent-word">repositories</span>
        </h2>
        <div className="mt-12">
          <RepoCards />
        </div>
      </section>
    </div>
  );
}
