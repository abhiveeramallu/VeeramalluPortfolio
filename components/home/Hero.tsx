import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Illustration } from '@/components/illustrations/Illustration';

const TAGS = ['AI / ML', 'Full-stack', 'Cybersecurity', 'Embedded systems'];

// Homepage-only copy. Kept here rather than in SITE_CONFIG so the résumé, chat and metadata are unaffected.
const HEADLINE =
  'I build intelligent systems, full-stack products, and occasionally teach machines to talk to hardware.';
const INTRO =
  'Computer Science student at VIT Vellore, graduating in 2027. I work at the intersection of AI/ML, full-stack engineering, cybersecurity, and embedded systems — turning complex ideas into things that actually work.';

/**
 * Main-page cover on hot orange: text on the left, a 3D pop-up illustration on the right that turns towards
 * the pointer.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[#ff5a1f] pt-24 text-[#16121f] md:pt-28"
    >
      <div className="relative mx-auto max-w-[1440px] px-4 md:px-10">
        <div className="label flex flex-wrap items-center justify-between gap-3 border-y-2 border-[#16121f] py-2.5">
          <span>Veeramallu Sai Abhiram</span>
          <span>Full Stack &amp; AI Engineer</span>
          <span>Visakhapatnam, India</span>
        </div>

        <div className="grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative z-10 py-10 lg:py-20">
            <div className="hero-in relative inline-block rounded-[28px] border-[3px] border-[#16121f] bg-[#fff3e6] px-6 py-3 shadow-[6px_6px_0_0_#16121f]">
              <p className="font-[family-name:var(--font-slab)] text-step-3 leading-none text-[#c2410c]">
                Hello, World!
              </p>
              <span
                aria-hidden
                className="absolute -bottom-[14px] left-10 h-6 w-6 rotate-45 border-b-[3px] border-r-[3px] border-[#16121f] bg-[#fff3e6]"
              />
            </div>
            <h1
              id="hero-title"
              className="hero-in mt-8 font-[family-name:var(--font-slab)] text-step-4 leading-[0.92]"
            >
              I’m
              <span className="ink-shadow block text-[clamp(3.6rem,2.2rem+5.6vw,7.5rem)] leading-[0.92] text-[#fff3e6]">
                Abhiram.
              </span>
              <span className="sr-only"> — Veeramallu Sai Abhiram</span>
            </h1>
            <p
              className="hero-in mt-5 max-w-lg font-display text-step-1 font-medium leading-snug"
              style={{ animationDelay: '120ms' }}
            >
              {HEADLINE}
            </p>
            <p className="hero-in mt-4 max-w-md leading-relaxed" style={{ animationDelay: '200ms' }}>
              {INTRO}
            </p>
            <ul
              aria-label="What I work on"
              className="hero-in mt-6 flex flex-wrap gap-2"
              style={{ animationDelay: '240ms' }}
            >
              {TAGS.map((t, i) => (
                <li
                  key={t}
                  className={`label rounded-pill border-2 border-[#16121f] px-3 py-1.5 ${i % 2 ? 'bg-[#fff3e6]' : 'bg-[#ffb21a]'}`}
                  style={{ rotate: `${(i % 2 ? 2 : -2) * (i + 1) * 0.5}deg` }}
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: '280ms' }}>
              <Link
                href="#projects"
                className="btn bg-[#16121f] text-[#fff3e6] shadow-[4px_4px_0_0_#fff3e6] hover:-translate-y-0.5"
              >
                See what I’ve built <ArrowDown size={15} aria-hidden />
              </Link>
              <Link
                href="#contact"
                className="btn border-2 border-[#16121f] bg-[#fff3e6] text-[#16121f] shadow-[4px_4px_0_0_#16121f] hover:-translate-y-0.5"
              >
                Let’s connect <ArrowUpRight size={15} aria-hidden />
              </Link>
            </div>
          </div>

          <div className="group relative py-6 lg:py-16">
            <Illustration
              priority
              scene="hero"
              label="Comic illustration: Abhiram in front of a starburst saying &#8220;Ideas to execution&#8221;, with stickers reading &#8220;Code mode: on&#8221; and &#8220;Built to be secure&#8221; floating around."
              className="mx-auto max-w-[680px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
