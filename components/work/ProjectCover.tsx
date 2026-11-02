import Image from 'next/image';
import type { ProjectItem } from '@/data/content';
import { blurDataUrl } from '@/lib/blur';
import { cn } from '@/lib/utils';
import { ProjectArt, type ArtScene } from './ProjectArt';

const SOFT_BG: Record<ProjectItem['softBg'], string> = {
  pink: 'bg-soft-pink',
  blue: 'bg-soft-blue',
  yellow: 'bg-soft-yellow',
  green: 'bg-soft-green',
  purple: 'bg-soft-purple',
};

/**
 * A project visual. Uses the real screenshot when one exists (resolved server-side via lib/assets), otherwise
 * a generated brand composition — so nothing ever renders empty.
 */
export function ProjectCover({
  project,
  src,
  scene = 0,
  alt,
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
  dark,
}: {
  project: ProjectItem;
  src?: string | null;
  scene?: ArtScene;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  dark?: boolean;
}) {
  const label = alt ?? `${project.title}: ${project.tagline}`;
  const isDark = dark ?? (project.art === 'radar' && typeof scene === 'number');
  return (
    <div
      className={cn(
        'relative aspect-[16/10] w-full overflow-hidden',
        isDark ? 'bg-[#111]' : SOFT_BG[project.softBg],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={blurDataUrl(project.color)}
          className="object-cover"
        />
      ) : (
        <ProjectArt
          art={project.art}
          color={project.color}
          scene={scene}
          label={label}
          uid={`${project.slug}-${scene}`}
        />
      )}
    </div>
  );
}
