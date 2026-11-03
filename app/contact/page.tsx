import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/data/content';
import { ContactForm } from '@/components/ui/ContactForm';
import { ContactEmail } from '@/components/ui/ContactEmail';
import { LocalTime } from '@/components/ui/LocalTime';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import { Illustration } from '@/components/illustrations/Illustration';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${SITE_CONFIG.name} about opportunities, collaborations, or engineering projects. Email ${SITE_CONFIG.email} or send a message directly.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-28 pt-32 md:px-10 md:pt-40">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left Section: Introduction, Email & Comic Illustration */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3.5 py-1 font-mono text-[11px] font-bold text-ink shadow-[2px_2px_0_0_rgb(var(--c-ink))]">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            GET IN TOUCH
          </div>

          <h1 className="type-h1 mt-4 text-ink">
            Let’s <span className="accent-word text-accent">talk</span>.
          </h1>

          <p className="mt-6 max-w-lg text-step-0 leading-relaxed text-soft font-normal">
            Have an opportunity, a project idea, or simply want to connect? I’m always open to meaningful conversations about technology, engineering, and building things that matter. Drop me an email or leave a message below.
          </p>

          {/* Prominent Direct Email Access */}
          <ContactEmail />

          {/* Local time indicator */}
          <div className="mt-5 flex items-center gap-2 font-mono text-xs text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <span>
              Local time: <LocalTime /> IST · {SITE_CONFIG.location}
            </span>
          </div>

          {/* Comic Illustration */}
          <div className="group mt-10 max-w-md">
            <Illustration
              priority
              scene="contact"
              side="left"
              label="Comic illustration: Abhiram saying &#8220;Say hello!&#8221; next to a mailbox while a paper plane loops overhead."
            />
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border-[3px] border-ink bg-white p-6 shadow-[6px_6px_0_0_rgb(var(--c-ink))] sm:p-10">
            <div className="mb-6 border-b-2 border-line pb-4">
              <h2 className="type-h2 font-black text-ink">Send a message</h2>
              <p className="mt-1 font-mono text-xs text-muted">
                Drop your note below and I&apos;ll get back to you promptly via email.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
