import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { ILLUSTRATION_DESCRIPTIONS } from '@/lib/illustrations';
import { Illustration } from '@/components/illustrations/Illustration';
import { Confetti } from '@/components/art/Botanicals';
import { ProjectLinks, StatusChips } from '@/components/work/ProjectMeta';
import { cn } from '@/lib/utils';
import { projectIllustration } from '@/lib/assets';

/**
 * Feature spreads, one per project: a tilted window with the project's 3D illustration (hover to make it
 * react) beside an editorial text column. The illustration links to the case study too.
 */
export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24">
      <div className="mx-auto max-w-[1440px] px-4 md:px-10">
        <div data-reveal className="max-w-3xl">
          <p className="label text-accent">Features</p>
          <h2 id="projects-title" className="type-h1 mt-4">
            Things I’ve <span className="accent-word text-accent">built</span>
          </h2>
        </div>

        <div className="mt-20 space-y-28 md:space-y-36">
          {SITE_CONFIG.projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={p.slug}
                id={`project-${p.slug}`}
                aria-labelledby={`project-${p.slug}-title`}
                className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Link
                  href={`/work/${p.slug}`}
                  tabIndex={-1}
                  className={cn('relative block', flip && 'lg:order-2')}
                >
                  {i % 3 === 0 && <Confetti className="absolute -top-14 right-6 z-10 h-28 w-28" />}
                  <Illustration
                    scene={p.illustration}
                    image={projectIllustration(p.slug)}
                    side={flip ? 'left' : 'right'}
                    label={`Illustration for ${p.title}: ${ILLUSTRATION_DESCRIPTIONS[p.illustration]}`}
                  />
                </Link>

                <div data-reveal className={cn(flip && 'lg:order-1')}>
                  <p className="label flex items-center gap-3 text-accent">
                    <span className="font-display text-step-3 font-semibold normal-case tracking-normal text-accent-2">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{p.category}</span>
                  </p>
                  <h3 id={`project-${p.slug}-title`} className="type-h1 mt-3">
                    <Link
                      href={`/work/${p.slug}`}
                      className="decoration-accent decoration-2 underline-offset-8 hover:underline"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <StatusChips project={p} className="mt-5" />
                  <p className="mt-6 max-w-xl text-step-0 leading-relaxed text-soft">{p.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                    {p.stack.slice(0, 6).map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <ProjectLinks project={p} location="home" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-28 flex justify-center">
          <Link
            href="/work"
            className="btn group bg-[#16121f] text-[#fff8ee] shadow-[4px_4px_0_0_#ff5a1f] hover:-translate-y-0.5"
          >
            See all {SITE_CONFIG.projects.length + SITE_CONFIG.archive.length} projects
            <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
