import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import type { ProjectItem } from '@/data/content';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { cn } from '@/lib/utils';

export function StatusChips({ project, className }: { project: ProjectItem; className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span className="chip">
        <span
          aria-hidden
          className={cn(
            'mr-2 h-1.5 w-1.5 rounded-full',
            project.status === 'Live demo' ? 'bg-accent' : 'bg-accent-2',
          )}
        />
        {project.status}
      </span>
      {project.kind !== project.status && <span className="chip">{project.kind}</span>}
    </div>
  );
}

/** Case study, GitHub and live-demo links. Every URL here was checked to resolve (see docs/DECISIONS.md). */
export function ProjectLinks({
  project,
  showCaseStudy = true,
  location,
}: {
  project: ProjectItem;
  showCaseStudy?: boolean;
  location: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {showCaseStudy && (
        <Link href={`/work/${project.slug}`} className="btn-primary">
          Case study
          <span className="sr-only">: {project.title}</span>
        </Link>
      )}
      <TrackedLink
        href={project.repoUrl}
        external
        event="repo_click"
        props={{ slug: project.slug, location }}
        className="btn-secondary"
      >
        <Github size={15} aria-hidden /> GitHub
        <span className="sr-only">repository for {project.title} (opens in a new tab)</span>
      </TrackedLink>
      {project.liveUrl && (
        <TrackedLink
          href={project.liveUrl}
          external
          event="case_study_live_click"
          props={{ slug: project.slug, location }}
          className="btn-secondary"
        >
          Live demo <ArrowUpRight size={15} aria-hidden />
          <span className="sr-only">of {project.title} (opens in a new tab)</span>
        </TrackedLink>
      )}
    </div>
  );
}
