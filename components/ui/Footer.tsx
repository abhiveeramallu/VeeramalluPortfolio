'use client';

import Link from 'next/link';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { LocalTime } from './LocalTime';
import { NAV_LINKS } from '@/lib/nav';

const SOCIAL_LABELS: Record<string, string> = {
  github: 'GitHub',
  leetcode: 'LeetCode',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="relative z-10 border-t border-line bg-surface px-4 pt-14 pb-24 md:px-10 md:py-14"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 font-mono text-xs sm:gap-10 md:grid-cols-4">
        {/* Column 1: Based in */}
        <div className="space-y-1">
          <h2 className="mb-3.5 text-[11px] font-medium uppercase tracking-wider text-muted">
            Based in
          </h2>
          <p className="font-semibold text-ink">{SITE_CONFIG.location}</p>
          <p className="text-muted">
            <LocalTime /> IST
          </p>
        </div>

        {/* Column 2: Studying */}
        <div className="space-y-1">
          <h2 className="mb-3.5 text-[11px] font-medium uppercase tracking-wider text-muted">
            Studying
          </h2>
          <p className="font-semibold text-ink">B.Tech Computer Science, VIT Vellore</p>
          <p className="text-muted">{SITE_CONFIG.status}</p>
        </div>

        {/* Column 3: Pages */}
        <nav aria-label="Footer navigation">
          <h2 className="mb-3.5 text-[11px] font-medium uppercase tracking-wider text-muted">
            Pages
          </h2>
          <ul className="space-y-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-block py-1 text-soft transition-colors duration-150 hover:text-ink hover:underline underline-offset-4"
                >
                  {l.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/resume"
                className="inline-block py-1 text-soft transition-colors duration-150 hover:text-ink hover:underline underline-offset-4"
              >
                Resume
              </Link>
            </li>
          </ul>
        </nav>

        {/* Column 4: Elsewhere */}
        <div>
          <h2 className="mb-3.5 text-[11px] font-medium uppercase tracking-wider text-muted">
            Elsewhere
          </h2>
          <ul className="space-y-1">
            <li>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-1 py-1 text-soft transition-colors duration-150 hover:text-ink hover:underline underline-offset-4"
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
                    className="group inline-flex items-center gap-1 py-1 text-soft transition-colors duration-150 hover:text-ink hover:underline underline-offset-4"
                  >
                    <span>{SOCIAL_LABELS[key] ?? key}</span>
                    <ArrowUpRight
                      className="h-3 w-3 text-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                      aria-hidden="true"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright and Back to Top */}
      <div className="mx-auto mt-12 flex max-w-[1440px] flex-col items-start justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:pr-48">
        <p>© 2026 Veeramallu Sai Abhiram. Built with curiosity.</p>
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 rounded-pill border-2 border-ink bg-bg px-3.5 py-1.5 font-mono text-[11px] font-semibold text-ink shadow-[2px_2px_0_0_rgb(var(--c-ink))] transition-all duration-150 hover:-translate-y-0.5 hover:bg-raised hover:shadow-[3px_3px_0_0_rgb(var(--c-ink))] active:translate-y-0 active:shadow-[1px_1px_0_0_rgb(var(--c-ink))]"
          aria-label="Back to top"
        >
          Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
