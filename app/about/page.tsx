import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileDown } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { TrackedLink } from '@/components/ui/TrackedLink';

export const metadata: Metadata = {
  title: 'About',
  description: `${SITE_CONFIG.name} — Computer Science student at VIT Vellore (expected 2027) working across machine learning, full-stack engineering, security and embedded systems.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const { projects } = SITE_CONFIG;
  const byArea = [
    {
      area: 'Machine learning',
      slugs: [
        'threatlens-ai',
        'edge-ai-thermal-management',
        'greenhouse-microclimate-forecasting',
        'visionrag-x',
      ],
    },
    { area: 'Full-stack engineering', slugs: ['routefusion', 'stockmind', 'smart-document-intelligence'] },
    { area: 'Security', slugs: ['threatlens-ai', 'honeypot-attack-classification', 'imageguard'] },
    { area: 'Embedded & edge', slugs: ['edge-ai-thermal-management'] },
  ];
  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-32 md:px-10 md:pt-40">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="label mb-4 text-accent">About</p>
          <h1 className="type-h1">
            Veeramallu Sai <span className="accent-word">Abhiram</span>
          </h1>
          <div className="mt-8 max-w-2xl space-y-5 text-step-0 leading-relaxed text-soft">
            <p>
              I’m a Computer Science student at Vellore Institute of Technology, expected to graduate in 2027.
              Most of what I know I have learned by building complete systems: a dispatch engine with an
              optimal-assignment solver, a bot detector I tried to break with real automation tools, an
              image-forensics toolkit, and a thermal controller that talks to a microcontroller over UART.
            </p>
            <p>
              I like problems where an algorithm has to be correct, explainable and usable at the same time.
              And I try to be precise about results: when a model only beats its baseline on validation data,
              or when a test set is small and synthetic, the project says so.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <TrackedLink
              href="/resume.pdf"
              download
              event="resume_download"
              props={{ location: 'about' }}
              className="btn-primary"
            >
              <FileDown size={15} aria-hidden /> Résumé
            </TrackedLink>
            <Link href="/contact" className="btn-secondary">
              Get in touch
            </Link>
          </div>
        </div>

        <aside aria-labelledby="facts-title" className="frame h-fit p-6 md:p-8">
          <h2 id="facts-title" className="label text-muted">
            At a glance
          </h2>
          <dl className="mt-6 divide-y divide-line">
            {[
              ['Education', 'B.Tech Computer Science, VIT Vellore (2023 – 2027, expected)'],
              ['Certification', 'IBM Generative AI Engineering Professional Certificate'],
              ['Based in', SITE_CONFIG.location],
              ['Interests', SITE_CONFIG.interests.join(' · ')],
              ['Code', 'github.com/abhiveeramallu'],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4 text-sm">
                <dt className="label pt-0.5 text-[10px] text-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <section aria-labelledby="areas-title" className="mt-24">
        <p className="label mb-4 text-accent">Where the work is</p>
        <h2 id="areas-title" className="type-h2">
          Four <span className="accent-word">areas</span>, linked to the evidence.
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
          {byArea.map((a) => (
            <div key={a.area} className="bg-bg p-6">
              <h3 className="font-display text-step-1 font-semibold">{a.area}</h3>
              <ul className="mt-4 space-y-1">
                {a.slugs.map((slug) => {
                  const p = projects.find((x) => x.slug === slug);
                  if (!p) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/work/${slug}`}
                        className="group inline-flex min-h-[32px] items-center gap-2 text-soft hover:text-ink"
                      >
                        {p.title}
                        <ArrowRight
                          size={14}
                          aria-hidden
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="skills-title" className="mt-24">
        <p className="label mb-4 text-accent">Toolkit</p>
        <h2 id="skills-title" className="type-h2">
          What I <span className="accent-word">use</span>
        </h2>
        <dl className="mt-10 grid gap-x-10 border-t border-line md:grid-cols-2">
          {SITE_CONFIG.skills.map((g) => (
            <div key={g.group} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[10rem_1fr]">
              <dt className="label pt-1 text-[10px] text-muted">{g.group}</dt>
              <dd className="text-soft">{g.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
