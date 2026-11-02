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
