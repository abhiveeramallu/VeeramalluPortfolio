import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Illustration } from '@/components/illustrations/Illustration';
import { Fronds } from '@/components/art/Botanicals';

const AREAS = [
  'AI & Machine Learning',
  'Full-Stack Engineering',
  'Cybersecurity',
  'Systems & Creative Engineering',
];

/** About: me among the objects my projects are made of. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="panel-ink relative overflow-hidden py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="group relative">
          <Fronds className="absolute -bottom-10 -left-10 h-52 w-36" depth={12} />
          <Illustration
            scene="about"
            label="Comic illustration: Abhiram saying &#8220;Hey, I&#8217;m Abhiram!&#8221;, with code, shield and chart stickers floating beside him."
          />
        </div>
        <div data-reveal>
          <p className="label text-accent tracking-wider">THE ENGINEER BEHIND THE CODE</p>
          <h2 id="about-title" className="type-h1 mt-4 group cursor-default">
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              Veeramallu Sai
            </span>{' '}
            <span className="accent-word text-accent inline-block transition-transform duration-200 group-hover:scale-105">
              Abhiram
            </span>
          </h2>
          <p className="mt-6 text-step-0 leading-relaxed text-ink/90">
            I&apos;m a Computer Science student at VIT Vellore, graduating in 2027, with a strong interest in full-stack engineering, AI/ML, and cybersecurity. Through my internship at Watania Solutions, I gained practical experience in application development, API integration, and building user-focused software. I have developed projects including RouteFusion, an intelligent ride and parcel optimization platform; Greenhouse Micro-Climate Forecasting, an AI-powered climate prediction system; ThreatLensAI, a machine learning-based bot detection platform; and a Smart Document Intelligence Platform powered by local LLMs. Recognized with the VIT Merit Scholarship for academic excellence and holding an IBM Generative AI Engineering Professional Certificate, I enjoy exploring complex engineering challenges, experimenting with emerging technologies, and transforming ideas into practical, impactful solutions.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Areas">
            {AREAS.map((a) => (
              <li
                key={a}
                className="cursor-pointer select-none rounded-pill border-2 border-transparent bg-ink px-4 py-1.5 font-mono text-[0.75rem] text-night transition-all duration-200 hover:-translate-y-1 hover:border-ink hover:bg-accent hover:text-[#fff3e6] hover:shadow-[3px_3px_0_0_rgb(var(--c-ink))]"
              >
                {a}
              </li>
            ))}
          </ul>
          <dl className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="label pt-1 text-ink/75">2023 – 2027</dt>
              <dd>
                <p className="font-display text-step-1 font-semibold">
                  B.Tech, Computer Science and Engineering
                </p>
                <p className="text-sm text-ink/80">Vellore Institute of Technology, Vellore</p>
              </dd>
            </div>
          </dl>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 font-medium text-accent hover:text-ink"
          >
            Get In{' '}
            <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
