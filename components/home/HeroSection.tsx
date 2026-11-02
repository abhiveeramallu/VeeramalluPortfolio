import Link from 'next/link';
import { ArrowDown, Calendar, FileDown } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { HeroVisual } from '@/components/3d/HeroVisual';
import { Magnetic } from '@/components/ui/Magnetic';
import { TrackedLink } from '@/components/ui/TrackedLink';

/**
 * Above the fold answers four questions in five seconds:
 * who (eyebrow), what (H1 + subline), proof (stats), how to hire (CTAs + availability).
 * Entrance animation is CSS (`.hero-in`, `.hero-line`) so first paint never waits for JS or 3D.
 */
export function HeroSection() {
  const hasBooking = SITE_CONFIG.bookingUrl.length > 0;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:min-h-[94vh] lg:pb-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[58%] -z-10 select-none overflow-hidden opacity-[0.035]"
      >
        <div className="flex w-max animate-marquee-left whitespace-nowrap">
          {[...SITE_CONFIG.heroTransliterations, ...SITE_CONFIG.heroTransliterations].map((text, i) => (
            <span
              key={i}
              className="mx-8 font-display text-[9rem] font-bold leading-none tracking-tighter text-ink sm:text-[14rem]"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 sm:px-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <p
            className="hero-in inline-flex items-center gap-2.5 rounded-pill border border-line bg-surface py-1.5 pl-2 pr-4 font-mono text-xs text-ink shadow-soft"
            style={{ '--i': 0 } as React.CSSProperties}
          >
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-lime-500">
              <span className="pulse-dot relative h-2 w-2 rounded-full bg-[#111]" aria-hidden="true" />
            </span>
            <span>
              <strong className="font-semibold">{SITE_CONFIG.status}</strong>
              <span className="text-muted"> · {SITE_CONFIG.availability}</span>
            </span>
          </p>

          <p
            className="hero-in mt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted"
            style={{ '--i': 1 } as React.CSSProperties}
          >
            {SITE_CONFIG.name} — {SITE_CONFIG.role}
          </p>

          <h1 id="hero-title" className="type-display mt-3 text-ink">
            <span className="hero-line" style={{ '--i': 0 } as React.CSSProperties}>
              I design products
            </span>
            <span className="hero-line" style={{ '--i': 1 } as React.CSSProperties}>
              and ship them in <span className="accent-word text-orange-600">code.</span>
            </span>
          </h1>

          <p
            className="hero-in mt-6 max-w-xl text-step-0 leading-relaxed text-muted"
            style={{ '--i': 3 } as React.CSSProperties}
          >
            {SITE_CONFIG.subline}
          </p>

          <div
            className="hero-in mt-8 flex flex-wrap items-center gap-3"
            style={{ '--i': 4 } as React.CSSProperties}
          >
            <Magnetic>
              <Link href="#work" className="btn-primary" data-cursor-label="Scroll">
                See my work
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Magnetic>
            {hasBooking ? (
              <TrackedLink
                href={SITE_CONFIG.bookingUrl}
                event="cta_click"
                props={{ location: 'hero_book' }}
                className="btn-secondary"
                external
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Book a call
              </TrackedLink>
            ) : (
              <TrackedLink
                href="/resume.pdf"
                event="resume_download"
                props={{ location: 'hero' }}
                className="btn-secondary"
                download
              >
                <FileDown className="h-4 w-4" aria-hidden="true" />
                Download résumé
              </TrackedLink>
            )}
          </div>

          <dl
            className="hero-in mt-12 grid max-w-xl grid-cols-3 divide-x divide-line border-y border-line"
            style={{ '--i': 5 } as React.CSSProperties}
          >
            {SITE_CONFIG.heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-w-0 flex-col-reverse gap-1 px-2.5 py-4 first:pl-0 sm:px-5"
              >
                <dt className="text-[11px] leading-snug text-muted sm:text-xs">{stat.label}</dt>
                <dd className="font-display text-xl font-bold tracking-tight text-ink sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-5">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
