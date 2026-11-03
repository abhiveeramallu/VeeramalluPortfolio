import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { Illustration } from '@/components/illustrations/Illustration';

/** A 404 that still leads somewhere: three projects, one click away, with the contact character waving. */
export default function NotFound() {
  const picks = SITE_CONFIG.projects.slice(0, 3);
  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-36 md:px-10">
      <p className="label text-accent">404 — page not found</p>
      <h1 className="type-h1 mt-4 max-w-3xl">
        This page went <span className="accent-word text-accent">missing</span>.
      </h1>
      <p className="mt-6 max-w-xl text-soft">
        The link may be old or mistyped. These projects are where most visitors go.
      </p>
      <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
        {picks.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="group block h-full bg-bg p-6 transition-colors hover:bg-surface"
            >
              <Illustration
                scene={p.illustration}
                label={`Illustration for ${p.title}`}
                className="mb-5 rounded-[18px] shadow-none"
              />
              <p className="font-display text-step-1 font-semibold">{p.title}</p>
              <p className="mt-2 text-sm text-soft">{p.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Back to the home page <ArrowRight size={15} aria-hidden />
        </Link>
        <Link href="/work" className="btn-secondary">
          All projects
        </Link>
      </div>
    </div>
  );
}
