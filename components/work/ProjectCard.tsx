import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '@/data/content';
import { cn } from '@/lib/utils';
import { ProjectCover } from './ProjectCover';
import { TiltCard } from './TiltCard';

export const PROVENANCE_STYLE: Record<ProjectItem['provenance'], string> = {
  Shipped: 'bg-lime-500 text-[#111]',
  Prototype: 'bg-indigo-100 text-indigo-800',
  'Self-initiated': 'bg-orange-100 text-orange-800',
};

export function ProjectCard({
  project,
  coverSrc,
  size = 'md',
  className,
  priority = false,
}: {
  project: ProjectItem;
  coverSrc: string | null;
  size?: 'lg' | 'md' | 'tall';
  className?: string;
  priority?: boolean;
}) {
  const metric = project.metrics[0];
  return (
    <TiltCard className={className}>
      <Link
        href={`/work/${project.slug}`}
        data-cursor-label="View"
        className="group flex h-full flex-col rounded-card border border-line bg-surface p-3 shadow-card transition-shadow duration-500 hover:shadow-lift sm:p-4"
      >
        <div className={cn('relative overflow-hidden rounded-2xl', size === 'tall' && 'lg:flex-1')}>
          <ProjectCover
            project={project}
            src={coverSrc}
            priority={priority}
            className={cn(
              'transition-transform duration-700 ease-out group-hover:scale-[1.03]',
              size === 'tall' && 'lg:aspect-auto lg:h-full lg:min-h-[420px]',
            )}
            sizes={size === 'lg' ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
          />
          <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-ink shadow-soft transition-colors duration-300 group-hover:bg-orange-500">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-4 px-2 pb-2 pt-5">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span
                className={cn(
                  'rounded-pill px-2.5 py-0.5 font-semibold',
                  PROVENANCE_STYLE[project.provenance],
                )}
              >
                {project.provenance}
              </span>
              <span className="text-muted">
                {project.category} · {project.year}
              </span>
            </div>
            <h3
              className={cn(
                'font-display font-bold tracking-tight text-ink',
                size === 'lg' ? 'text-step-3' : 'text-step-2',
              )}
            >
              {project.title}
            </h3>
            <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted">{project.tagline}</p>
          </div>
          {metric && (
            <p className="flex items-baseline gap-2 border-t border-line pt-3 font-mono text-xs text-muted">
              <span className="whitespace-nowrap font-display text-xl font-bold text-ink">
                {metric.value}
              </span>
              {metric.label.toLowerCase()}
            </p>
          )}
        </div>
      </Link>
    </TiltCard>
  );
}
