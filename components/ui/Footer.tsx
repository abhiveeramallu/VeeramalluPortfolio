import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { LocalTime } from './LocalTime';
import { NAV_LINKS } from '@/lib/nav';

const SOCIAL_LABELS: Record<string, string> = { linkedin: 'LinkedIn', github: 'GitHub' };

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-surface px-4 py-14 md:px-10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 font-mono text-xs md:grid-cols-4">
        <div>
          <h2 className="mb-3 uppercase tracking-wider text-muted">Based in</h2>
          <p className="font-semibold text-ink">{SITE_CONFIG.location}</p>
          <p className="mt-1 text-muted">
            <LocalTime /> IST
          </p>
        </div>
        <div>
          <h2 className="mb-3 uppercase tracking-wider text-muted">Studying</h2>
          <p className="font-semibold text-ink">B.Tech Computer Science, VIT Vellore</p>
          <p className="mt-1 text-muted">{SITE_CONFIG.status}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="mb-3 uppercase tracking-wider text-muted">Pages</h2>
          <ul className="space-y-0.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1 text-ink underline-offset-4 hover:underline">
                  {l.name}
                </Link>
              </li>
            ))}
            <li>
              <a href="/resume.pdf" className="inline-block py-1 text-ink underline-offset-4 hover:underline">
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 uppercase tracking-wider text-muted">Elsewhere</h2>
          <ul className="space-y-0.5">
            <li>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-block py-1 text-ink underline-offset-4 hover:underline"
              >
                Email
              </a>
            </li>
            {Object.entries(SITE_CONFIG.socials)
              .filter(([, href]) => href)
              .map(([key, href]) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 py-1 text-ink underline-offset-4 hover:underline"
                  >
                    {SOCIAL_LABELS[key] ?? key}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1440px] flex-col items-start justify-between gap-3 border-t border-line pt-6 font-mono text-[11px] text-muted sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {SITE_CONFIG.name}. Built with Next.js, React Three Fiber and GLSL.
          Project facts are sourced from each GitHub repository.
        </p>
        <p>
          Press <kbd className="rounded border border-line bg-bg px-1.5 py-0.5 text-ink">?</kbd> for shortcuts
        </p>
      </div>
    </footer>
  );
}
