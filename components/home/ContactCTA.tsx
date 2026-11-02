import Link from 'next/link';
import { ArrowUpRight, FileDown } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { OpenChatButton } from '@/components/ui/OpenChatButton';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { Magnetic } from '@/components/ui/Magnetic';

export function ContactCTA() {
  return (
    <section
      id="contact"
      data-contact-section
      aria-labelledby="contact-title"
      className="section-inverted relative overflow-hidden px-6 py-28 sm:px-12"
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-orange-500 opacity-20 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl">
        <p className="eyebrow mb-4 flex items-center gap-2 text-lime-500">
          <span className="relative h-2 w-2 rounded-full bg-lime-500">
            <span className="pulse-dot absolute inset-0 rounded-full bg-lime-500" />
          </span>
          {SITE_CONFIG.status} · {SITE_CONFIG.availability}
        </p>
        <SplitReveal
          as="h2"
          lines={[
            <span key="a" id="contact-title">
              Hiring a designer
            </span>,
            <span key="b">
              who <span className="accent-word text-orange-500">ships?</span>
            </span>,
          ]}
          className="type-display max-w-4xl text-ink"
        />
        <p className="mt-6 max-w-xl text-step-0 leading-relaxed text-muted">
          I’m looking for a full-time product design or design engineering role on a team that cares about
          craft. I reply within one working day.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <Link href="/contact" className="btn-primary">
              Start a conversation
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Magnetic>
          <TrackedLink
            href="/resume.pdf"
            event="resume_download"
            props={{ location: 'contact_cta' }}
            className="btn-ghost-inverted"
            download
          >
            <FileDown className="h-4 w-4" aria-hidden="true" />
            Résumé
          </TrackedLink>
          <OpenChatButton className="btn-ghost-inverted" />
        </div>
        <div className="mt-8">
          <CopyEmail className="border-[#3a3a36] bg-transparent text-[#f6f4ef] shadow-none hover:border-[#f6f4ef]" />
        </div>
      </div>
    </section>
  );
}
