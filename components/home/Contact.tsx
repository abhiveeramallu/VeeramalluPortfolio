import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Illustration } from '@/components/illustrations/Illustration';
import { Confetti } from '@/components/art/Botanicals';
import { CopyEmail } from '@/components/ui/CopyEmail';

/** Contact: a waving character, a mailbox and a paper plane — and every way to reach me, in plain HTML. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 md:px-10 lg:grid-cols-2">
        <div data-reveal>
          {/* Availability indicator */}
          <div className="inline-flex items-center gap-2 rounded-pill border border-accent/40 bg-accent/10 px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden />
            OPEN TO INTERNSHIPS &amp; COLLABORATIONS
          </div>

          <h2 id="contact-title" className="type-display mt-5 !text-[clamp(3.4rem,2rem+7vw,8rem)] leading-[0.95]">
            Say <span className="accent-word text-accent-2">hello</span>
          </h2>

          <p className="mt-6 max-w-lg text-step-0 leading-relaxed text-soft">
            Whether you&apos;re looking to collaborate, discuss my projects, or explore internship opportunities, I&apos;d love to hear from you. I&apos;m always open to connecting with people who share a passion for technology, engineering, and building meaningful products.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CopyEmail />
            <Link
              href="/contact"
              className="btn-primary"
            >
              <Mail size={16} aria-hidden /> Send a message
            </Link>
          </div>
        </div>

        <div className="group relative">
          <Confetti className="absolute -left-10 -top-14 z-10 h-32 w-32" />
          <Illustration
            scene="contact"
            label="Comic illustration: Abhiram saying &#8220;Say hello!&#8221; next to a mailbox while a paper plane loops overhead."
          />
        </div>
      </div>
    </section>
  );
}
