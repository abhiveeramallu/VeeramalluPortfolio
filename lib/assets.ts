import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

const EXTENSIONS = ['avif', 'webp', 'png', 'jpg'] as const;

/**
 * Returns the public URL of a real project image if one exists, e.g. /projects/routefusion/cover.webp.
 * Evaluated at build time (all pages are static), so there is no runtime filesystem cost.
 */
export function projectMedia(slug: string, id: string): string | null {
  for (const ext of EXTENSIONS) {
    const rel = `/projects/${slug}/${id}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), 'public', rel))) return rel;
  }
  return null;
}

/**
 * A hand-made illustration for a project, if one has been added at public/illustrations/<slug>.(webp|png|jpg).
 * When present it replaces the 3D toy diorama on the home page and in the case-study header.
 */
export function projectIllustration(slug: string): string | null {
  for (const ext of ['webp', 'png', 'jpg', 'avif'] as const) {
    const rel = `/illustrations/${slug}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), 'public', rel))) return rel;
  }
  return null;
}
