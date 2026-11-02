import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { projectMedia } from '@/lib/assets';
import { ProjectCover } from '@/components/work/ProjectCover';

/** A 404 that still sells: the three strongest case studies, one click away. */
export default function NotFound() {
  const best = SITE_CONFIG.projects.filter((p) => p.featured).slice(0, 3);
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-36 sm:px-12">
      <p className="eyebrow text-orange-600">404 — page not found</p>
      <h1 className="type-h1 mt-3 max-w-3xl text-ink">
        That page took a wrong turn. The work is{' '}
        <span className="accent-word text-orange-600">right here.</span>
      </h1>
      <p className="mt-5 max-w-xl text-muted">
        The link may be old or mistyped. Here are the case studies people ask about most.
      </p>
      <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {best.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="group block overflow-hidden rounded-card border border-line bg-surface shadow-soft transition-shadow hover:shadow-lift"
            >
              <ProjectCover
                project={p}
                src={projectMedia(p.slug, 'cover')}
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <div className="p-5">
                <p className="font-display text-lg font-bold text-ink">{p.title}</p>
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Back to home
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link href="/contact" className="btn-secondary">
          Contact me
        </Link>
      </div>
    </div>
  );
}
