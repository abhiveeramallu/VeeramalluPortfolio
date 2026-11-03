import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { Illustration } from '@/components/illustrations/Illustration';
import { Fronds } from '@/components/art/Botanicals';

const AREAS = ['AI / ML', 'Full-stack development', 'Cybersecurity', 'Creative engineering'];

/** About: me among the objects my projects are made of. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="panel-ink relative overflow-hidden py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="group relative">
          <Fronds className="absolute -bottom-10 -left-10 h-52 w-36" depth={12} />
          <Illustration
            scene="about"
            label="Comic illustration: Abhiram saying &#8220;Hi, I&#8217;m Abhiram!&#8221;, with code, shield and chart stickers floating beside him."
          />
        </div>
        <div data-reveal>
          <p className="label text-accent">About</p>
          <h2 id="about-title" className="type-h1 mt-4">
            Veeramallu Sai <span className="accent-word text-accent">Abhiram</span>
          </h2>
          <p className="mt-6 text-step-0 leading-relaxed text-ink/90">
            Computer Science student at VIT Vellore, graduating in 2027. I build systems end to end — models
            and data pipelines, the APIs around them, the interfaces on top — and once in a while something
            that talks to a microcontroller. I care about evaluation as much as features.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Areas">
            {AREAS.map((a) => (
              <li key={a} className="rounded-pill bg-ink px-4 py-1.5 font-mono text-[0.75rem] text-night">
                {a}
              </li>
            ))}
          </ul>
          <dl className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
            {SITE_CONFIG.journey.map((j) => (
              <div key={j.title} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="label pt-1 text-ink/75">{j.period}</dt>
                <dd>
                  <p className="font-display text-step-1 font-semibold">{j.title}</p>
                  <p className="text-sm text-ink/80">{j.org}</p>
                </dd>
              </div>
            ))}
          </dl>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 font-medium text-accent hover:text-ink"
          >
            More about me{' '}
            <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
