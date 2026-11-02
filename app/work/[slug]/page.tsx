import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { SITE_CONFIG, getProject, type GalleryItem, type MediaSlot, type ProjectItem } from '@/data/content';
import { projectMedia } from '@/lib/assets';
import { blurDataUrl } from '@/lib/blur';
import { breadcrumbJsonLd, projectJsonLd } from '@/lib/seo';
import { ProjectCover } from '@/components/work/ProjectCover';
import { ProjectArt, type ArtScene } from '@/components/work/ProjectArt';
import { PROVENANCE_STYLE } from '@/components/work/ProjectCard';
import { ReadingProgress } from '@/components/work/ReadingProgress';
import { TableOfContents } from '@/components/work/TableOfContents';
import { Gallery, type GalleryEntry } from '@/components/work/Gallery';
import { BeforeAfter } from '@/components/work/BeforeAfter';
import { TokenInspector } from '@/components/work/TokenInspector';
import { JsonLd } from '@/components/ui/JsonLd';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { cn } from '@/lib/utils';

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
  const title = `${project.title} — ${project.category} case study`;
  return {
    title,
    description: `${project.tagline} ${project.description}`,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { type: 'article', title, description: project.tagline, url: `/work/${project.slug}` },
    twitter: { card: 'summary_large_image', title, description: project.tagline },
  };
}

const TOC = [
  { id: 'tldr', label: 'TL;DR' },
  { id: 'problem', label: 'Problem' },
  { id: 'constraints', label: 'Constraints' },
  { id: 'process', label: 'Process' },
  { id: 'decisions', label: 'Key decisions' },
  { id: 'solution', label: 'Solution' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'retro', label: 'Next time' },
];

const GALLERY_SCENES: Record<string, ArtScene> = {
  'gallery-1': 1,
  'gallery-2': 2,
  'gallery-3': 'after',
  'process-1': 1,
  'process-2': 2,
  'process-3': 0,
};

function Media({ project, slot, scene }: { project: ProjectItem; slot: MediaSlot; scene: ArtScene }) {
  const src = projectMedia(project.slug, slot.id);
  if (src) {
    return (
      <div className="relative aspect-[16/10]">
        <Image
          src={src}
          alt={slot.alt}
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={blurDataUrl(project.color)}
        />
      </div>
    );
  }
  return <ProjectCover project={project} scene={scene} alt={`Illustrative mockup: ${slot.alt}`} />;
}

function toEntry(project: ProjectItem, item: GalleryItem): GalleryEntry {
  if (item.kind === 'before-after') {
    return {
      id: item.id,
      caption: item.caption,
      span: 'full',
      zoomable: false,
      node: (
        <BeforeAfter
          beforeLabel={item.beforeLabel}
          afterLabel={item.afterLabel}
          before={
            <ProjectArt
              art={project.art}
              color={project.color}
              scene="before"
              label={`Before: ${item.beforeLabel}`}
              uid={`${project.slug}-before`}
            />
          }
          after={
            <ProjectArt
              art={project.art}
              color={project.color}
              scene="after"
              label={`After: ${item.afterLabel}`}
              uid={`${project.slug}-after`}
            />
          }
        />
      ),
    };
  }
  if (item.kind === 'token-inspector') {
    return {
      id: item.id,
      caption: item.caption,
      span: 'full',
      zoomable: false,
      node: <TokenInspector slug={project.slug} />,
    };
  }
  return {
    id: item.id,
    caption: item.caption,
    span: item.span,
    zoomable: true,
    illustrative: !projectMedia(project.slug, item.id),
    node: <Media project={project} slot={item} scene={GALLERY_SCENES[item.id] ?? 0} />,
  };
}

function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('scroll-mt-28', className)}>
      <p className="eyebrow mb-2 text-orange-600">{eyebrow}</p>
      <h2 id={`${id}-title`} className="type-h3 mb-5 text-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}

function MetricRow({ metrics, large = false }: { metrics: ProjectItem['metrics']; large?: boolean }) {
  return (
    <dl className={cn('grid gap-4', metrics.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col-reverse rounded-2xl border border-line bg-surface p-5">
          <dt className="mt-1 text-sm text-muted">
            {m.label}
            {m.context && <span className="block font-mono text-[11px]">{m.context}</span>}
          </dt>
          <dd
            className={cn(
              'font-display font-bold tracking-tight text-ink',
              large ? 'text-step-4' : 'text-step-2',
            )}
          >
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function CaseStudyPage({ params }: PageProps) {
  const index = SITE_CONFIG.projects.findIndex((p) => p.slug === params.slug);
  if (index === -1) notFound();
  const project = SITE_CONFIG.projects[index];
  const next = SITE_CONFIG.projects[(index + 1) % SITE_CONFIG.projects.length];
  const coverSrc = projectMedia(project.slug, 'cover');

  return (
    <>
      <JsonLd
        data={[
          projectJsonLd(project),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        ]}
      />
      <ReadingProgress targetId="case-study" />

      <article id="case-study" className="pb-24 pt-32">
        <header className="mx-auto max-w-6xl px-6 sm:px-12">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All work
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs">
            <span
              className={cn('rounded-pill px-3 py-1 font-semibold', PROVENANCE_STYLE[project.provenance])}
            >
              {project.provenance}
            </span>
            <span className="rounded-pill border border-line bg-surface px-3 py-1 text-ink">
              {project.category}
            </span>
            <span className="text-muted">{project.year}</span>
          </div>
          <h1 className="type-display mt-4 text-ink">{project.title}</h1>
          <p className="mt-4 max-w-3xl font-display text-step-2 font-medium leading-snug text-ink">
            {project.tagline}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 text-sm md:grid-cols-5">
            {[
              ['Role', project.role],
              ['Team', project.team],
              ['Timeline', project.timeline],
              ['Tools', project.tools.join(', ')],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{k}</dt>
                <dd className="mt-1 text-ink">{v}</dd>
              </div>
            ))}
            <div className="col-span-2 md:col-span-1">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Links</dt>
              <dd className="mt-1 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <TrackedLink
                    href={project.liveUrl}
                    external
                    event="case_study_live_click"
                    props={{ slug: project.slug }}
                    className="inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-4"
                  >
                    Live site <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </TrackedLink>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-4"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" /> Code
                  </a>
                )}
              </dd>
            </div>
          </dl>
        </header>

        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-8">
          <ProjectCover
            project={project}
            src={coverSrc}
            priority
            sizes="100vw"
            className="rounded-card border border-line"
          />
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-12 px-6 sm:px-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <TableOfContents items={TOC} />
            </div>
          </aside>

          <div className="space-y-20 lg:col-span-9">
            <Section
              id="tldr"
              eyebrow="TL;DR"
              title={
                <>
                  The short <span className="accent-word text-orange-600">version.</span>
                </>
              }
            >
              <p className="mb-8 max-w-2xl text-step-1 leading-relaxed text-ink">{project.description}</p>
              <MetricRow metrics={project.metrics} large />
            </Section>

            <Section
              id="problem"
              eyebrow="01 · Problem"
              title={
                <>
                  What was <span className="accent-word text-orange-600">broken.</span>
                </>
              }
            >
              <p className="max-w-2xl text-step-0 leading-relaxed text-muted">{project.problem}</p>
            </Section>

            <Section
              id="constraints"
              eyebrow="02 · Constraints"
              title={
                <>
                  The rules I <span className="accent-word text-orange-600">designed</span> within.
                </>
              }
            >
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.constraints.map((c, i) => (
                  <li
                    key={c}
                    className="flex gap-3 rounded-2xl border border-line bg-surface p-4 text-sm leading-relaxed text-ink"
                  >
                    <span className="font-mono text-xs font-semibold text-orange-600">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </Section>

            <Section
              id="process"
              eyebrow="03 · Process"
              title={
                <>
                  How it <span className="accent-word text-orange-600">came</span> together.
                </>
              }
            >
              <ol className="space-y-12">
                {project.process.map((step, i) => (
                  <li key={step.step} className="grid gap-6 md:grid-cols-5">
                    <div className="md:col-span-2">
                      <p className="font-mono text-xs text-muted">Step {i + 1}</p>
                      <h3 className="mt-1 font-display text-xl font-bold text-ink">{step.step}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{step.detail}</p>
                    </div>
                    {step.media && (
                      <div className="md:col-span-3">
                        <Gallery
                          items={[
                            {
                              id: step.media.id,
                              caption: step.media.caption,
                              span: 'full',
                              zoomable: true,
                              illustrative: !projectMedia(project.slug, step.media.id),
                              node: (
                                <Media
                                  project={project}
                                  slot={step.media}
                                  scene={GALLERY_SCENES[step.media.id] ?? 0}
                                />
                              ),
                            },
                          ]}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </Section>

            <Section
              id="decisions"
              eyebrow="04 · Key decisions"
              title={
                <>
                  Trade-offs I’d <span className="accent-word text-orange-600">make</span> again.
                </>
              }
            >
              <div className="space-y-4">
                {project.decisions.map((d) => (
                  <div key={d.title} className="rounded-2xl border border-line bg-surface p-6">
                    <h3 className="font-display text-lg font-bold text-ink">{d.title}</h3>
                    <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
                      <div>
                        <dt className="font-mono text-[11px] uppercase tracking-wider text-lime-800">
                          Chose
                        </dt>
                        <dd className="mt-1 text-ink">{d.chose}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Over</dt>
                        <dd className="mt-1 text-muted line-through decoration-orange-500/60">{d.over}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Because</dt>
                        <dd className="mt-1 text-ink">{d.because}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </Section>

            <Section
              id="solution"
              eyebrow="05 · Solution"
              title={
                <>
                  What I <span className="accent-word text-orange-600">shipped.</span>
                </>
              }
            >
              <p className="max-w-2xl text-step-0 leading-relaxed text-muted">{project.solution}</p>
            </Section>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-8">
          <Gallery items={project.gallery.map((g) => toEntry(project, g))} />
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-12 px-6 sm:px-12 lg:grid-cols-12">
          <div className="space-y-20 lg:col-span-9 lg:col-start-4">
            <Section
              id="outcome"
              eyebrow="06 · Outcome"
              title={
                <>
                  What <span className="accent-word text-orange-600">changed.</span>
                </>
              }
            >
              <p className="mb-8 max-w-2xl text-step-0 leading-relaxed text-ink">{project.outcome.summary}</p>
              <MetricRow metrics={project.outcome.metrics} />
            </Section>

            <Section
              id="retro"
              eyebrow="07 · Retro"
              title={
                <>
                  What I’d do <span className="accent-word text-orange-600">differently.</span>
                </>
              }
            >
              <ul className="space-y-3">
                {project.retro.map((r) => (
                  <li key={r} className="flex gap-3 text-step-0 leading-relaxed text-ink">
                    <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-orange-600" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>
      </article>

      <nav aria-label="Next project" className="section-inverted px-6 py-20 sm:px-12">
        <Link
          href={`/work/${next.slug}`}
          data-cursor-label="Next"
          className="group mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2"
        >
          <div>
            <p className="eyebrow text-orange-500">Next case study</p>
            <p className="type-h1 mt-3 text-ink">
              {next.title}{' '}
              <ArrowRight
                className="inline h-8 w-8 transition-transform group-hover:translate-x-2"
                aria-hidden="true"
              />
            </p>
            <p className="mt-3 max-w-md text-muted">{next.tagline}</p>
          </div>
          <ProjectCover
            project={next}
            src={projectMedia(next.slug, 'cover')}
            className="rounded-card"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </Link>
      </nav>
    </>
  );
}
