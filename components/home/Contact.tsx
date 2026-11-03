import Link from 'next/link';
import { FileDown, Github } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { Illustration } from '@/components/illustrations/Illustration';
import { Confetti } from '@/components/art/Botanicals';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { TrackedLink } from '@/components/ui/TrackedLink';

/** Contact: a waving character, a mailbox and a paper plane — and every way to reach me, in plain HTML. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 md:px-10 lg:grid-cols-2">
        <div data-reveal>
          <p className="label text-accent">Contact</p>
          <h2 id="contact-title" className="type-display mt-4 !text-[clamp(3.4rem,2rem+7vw,9rem)]">
            Say <span className="accent-word text-accent-2">hello</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-soft">
            Internships, roles, or a question about one of the projects — email is the fastest way to reach
            me.
          </p>
          <div className="mt-8">
            <CopyEmail />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Send a message
            </Link>
            <TrackedLink
              href={SITE_CONFIG.resumeUrl}
              download
              event="resume_download"
              props={{ location: 'home-contact' }}
              className="btn-secondary"
            >
              <FileDown size={15} aria-hidden /> Résumé
            </TrackedLink>
            <a
              href={SITE_CONFIG.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github size={15} aria-hidden /> GitHub <span className="sr-only">(opens in a new tab)</span>
            </a>
            {SITE_CONFIG.socials.linkedin && (
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
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
