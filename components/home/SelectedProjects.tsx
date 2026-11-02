import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { projectMedia } from '@/lib/assets';
import { ProjectCard } from '@/components/work/ProjectCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

/** Bento, not a uniform grid: one hero project, one tall, two supporting. */
const LAYOUT = [
  { size: 'lg', className: 'lg:col-span-4' },
  { size: 'tall', className: 'lg:col-span-2 lg:row-span-2' },
  { size: 'md', className: 'lg:col-span-2' },
  { size: 'md', className: 'lg:col-span-2' },
] as const;

export function SelectedProjects() {
  const featured = SITE_CONFIG.projects.filter((p) => p.featured).slice(0, LAYOUT.length);
  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-6xl px-6 py-24 sm:px-12">
      <SectionHeader
        eyebrow="01 — Selected work"
        lines={[
          <span key="a" id="work-title">
            Work that shipped,
          </span>,
          <span key="b">
            and the <span className="accent-word text-indigo-600">numbers</span> behind it.
          </span>,
        ]}
        intro="Each case study covers the problem, the trade-offs I made, and what I would do differently."
        action={
          <Link href="/work" className="btn-secondary">
            All {SITE_CONFIG.projects.length} projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
        {featured.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            coverSrc={projectMedia(project.slug, 'cover')}
            size={LAYOUT[i].size}
            className={`${LAYOUT[i].className} ${i === 0 ? 'md:col-span-2' : ''}`}
          />
        ))}
      </div>
    </section>
  );
}
