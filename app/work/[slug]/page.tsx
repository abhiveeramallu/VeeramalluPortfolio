import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SITE_CONFIG, getProject } from '@/data/content';
import { projectIllustration, projectMedia } from '@/lib/assets';
import { breadcrumbJsonLd, projectJsonLd } from '@/lib/seo';
import { ReadingProgress } from '@/components/work/ReadingProgress';
import { TableOfContents } from '@/components/work/TableOfContents';
import { ProjectLinks, StatusChips } from '@/components/work/ProjectMeta';
import { Illustration } from '@/components/illustrations/Illustration';
import { ILLUSTRATION_DESCRIPTIONS } from '@/lib/illustrations';
import { JsonLd } from '@/components/ui/JsonLd';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return SITE_CONFIG.projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const title = `${project.title} — case study`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { type: 'article', title, description: project.summary, url: `/work/${project.slug}` },
    twitter: { card: 'summary_large_image', title, description: project.summary },
  };
}

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'goals', label: 'Goals & constraints' },
  { id: 'contribution', label: 'My contribution' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'implementation', label: 'Implementation' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'status', label: 'Status & results' },
  { id: 'limitations', label: 'Limitations' },
  { id: 'learned', label: 'What I learned' },
];

function Block({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-12">
      <p className="label mb-3 text-accent">{String(index).padStart(2, '0')}</p>
      <h2 id={`${id}-title`} className="type-h3 mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-soft">
          <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudyPage({ params }: PageProps) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const index = SITE_CONFIG.projects.findIndex((p) => p.slug === project.slug);
  const next = SITE_CONFIG.projects[(index + 1) % SITE_CONFIG.projects.length];
  const cover = projectMedia(project.slug, 'cover');

  return (
    <article>
      <JsonLd
        data={[
          projectJsonLd(project),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/work' },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        ]}
      />
      <ReadingProgress targetId="case-body" />

      <header className="mx-auto max-w-[1440px] px-4 pb-12 pt-32 md:px-10 md:pt-40">
        <Link
          href="/work"
          className="label inline-flex min-h-[44px] items-center gap-2 text-soft hover:text-ink"
        >
          <ArrowLeft size={14} aria-hidden /> All projects
        </Link>
        <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="label mb-4 text-accent">
              Feature {String(index + 1).padStart(2, '0')} · {project.category}
            </p>
            <h1 className="type-h1">{project.title}</h1>
            <StatusChips project={project} className="mt-6" />
            <p className="mt-6 max-w-xl text-step-1 leading-snug text-soft">{project.summary}</p>
            <dl className="mt-8 grid max-w-xl grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
              <div>
                <dt className="label text-[10px] text-muted">Timeline (repository)</dt>
                <dd className="mt-1">{project.period}</dd>
              </div>
              <div>
                <dt className="label text-[10px] text-muted">Role</dt>
                <dd className="mt-1">Sole developer</dd>
              </div>
            </dl>
            <div className="mt-8">
              <ProjectLinks project={project} showCaseStudy={false} location="case-study" />
            </div>
          </div>
          {cover ? (
            <Image
              src={cover}
              alt={`${project.title} screenshot`}
              width={1600}
              height={1000}
              priority
              className="w-full rounded-card border border-line"
            />
          ) : (
            <div className="group">
              <Illustration
                priority
                scene={project.illustration}
                image={projectIllustration(project.slug)}
                label={`Illustration for ${project.title}: ${ILLUSTRATION_DESCRIPTIONS[project.illustration]}`}
              />
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 pb-24 md:px-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <TableOfContents items={TOC} />
          </div>
        </aside>

        <div id="case-body" className="max-w-3xl">
          <section id="overview" aria-labelledby="overview-title" className="pb-12">
            <p className="label mb-3 text-accent">01</p>
            <h2 id="overview-title" className="type-h3 mb-6">
              Overview
            </h2>
            <p className="text-step-0 leading-relaxed text-soft">{project.overview}</p>
            <div className="mt-8">
              <h3 className="label mb-3 text-muted">Technology stack</h3>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Block id="problem" index={2} title="The problem">
            <p className="leading-relaxed text-soft">{project.problem}</p>
            <h3 className="label mb-2 mt-8 text-muted">Why it matters</h3>
            <p className="leading-relaxed text-soft">{project.whyItMatters}</p>
          </Block>

          <Block id="goals" index={3} title="Goals and constraints">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="label mb-4 text-muted">Goals</h3>
                <Bullets items={project.goals} />
              </div>
              <div>
                <h3 className="label mb-4 text-muted">Constraints</h3>
                <Bullets items={project.constraints} />
              </div>
            </div>
          </Block>

          <Block id="contribution" index={4} title="My contribution">
            <p className="leading-relaxed text-soft">{project.contribution}</p>
          </Block>

          <Block id="architecture" index={5} title="Architecture">
            <p className="mb-6 leading-relaxed text-soft">{project.architecture.summary}</p>
            <ol className="relative space-y-3 border-l border-line pl-6">
              {project.architecture.flow.map((step, i) => (
                <li key={step} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rotate-45 border border-accent bg-bg"
                  />
                  <span className="label mr-3 text-[10px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-mono text-sm text-ink">{step}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block id="implementation" index={6} title="Implementation">
            <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line">
              {project.implementation.map((it) => (
                <div key={it.title} className="bg-bg p-6">
                  <h3 className="font-display text-step-1 font-semibold">{it.title}</h3>
                  <p className="mt-2 leading-relaxed text-soft">{it.body}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block id="decisions" index={7} title="Important technical decisions">
            <dl className="space-y-6">
              {project.decisions.map((d) => (
                <div key={d.decision} className="grid gap-2 md:grid-cols-[1fr_1.2fr] md:gap-8">
                  <dt className="font-medium">{d.decision}</dt>
                  <dd className="leading-relaxed text-soft">{d.because}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block id="challenges" index={8} title="Challenges">
            <Bullets items={project.challenges} />
          </Block>

          <Block id="status" index={9} title="Current status and results">
            <p className="leading-relaxed text-soft">{project.currentStatus}</p>
            {project.facts.length > 0 && (
              <dl className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
                {project.facts.map((f) => (
                  <div key={f.label} className="flex flex-col-reverse justify-end bg-bg p-5">
                    <dt className="mt-2 text-sm text-soft">
                      {f.label}
                      <span className="label mt-2 block text-[10px] text-muted">Source: {f.source}</span>
                    </dt>
                    <dd className="font-display text-step-2 font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Block>

          <Block id="limitations" index={10} title="Limitations">
            <Bullets items={project.limitations} />
          </Block>

          <Block id="learned" index={11} title="What I learned">
            <Bullets items={project.learned} />
            <div className="mt-10 rounded-card border border-line bg-surface p-6">
              <p className="label mb-4 text-muted">Source and demo</p>
              <ProjectLinks project={project} showCaseStudy={false} location="case-study-footer" />
            </div>
          </Block>
        </div>
      </div>

      <nav aria-label="Next project" className="border-t border-line bg-surface">
        <Link
          href={`/work/${next.slug}`}
          className="group mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-16 md:flex-row md:items-end md:justify-between md:px-10"
        >
          <div>
            <p className="label text-accent">Next feature</p>
            <p className="type-h2 mt-3 transition-colors group-hover:text-accent">{next.title}</p>
            <p className="mt-2 max-w-xl text-soft">{next.summary}</p>
          </div>
          <ArrowRight
            size={36}
            aria-hidden
            className="shrink-0 transition-transform group-hover:translate-x-2"
          />
        </Link>
      </nav>
    </article>
  );
}
