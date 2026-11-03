import type { Metadata } from 'next';
import { FileDown, Github } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { ContactForm } from '@/components/ui/ContactForm';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { LocalTime } from '@/components/ui/LocalTime';
import { OpenChatButton } from '@/components/ui/OpenChatButton';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import { Illustration } from '@/components/illustrations/Illustration';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${SITE_CONFIG.name} about internships, roles or any of the projects. Email ${SITE_CONFIG.email} or use the form.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-32 md:px-10 md:pt-40">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label mb-4 text-accent">Contact</p>
          <h1 className="type-h1">
            Let’s <span className="accent-word">talk</span>.
          </h1>
          <p className="mt-6 max-w-md leading-relaxed text-soft">
            Internships, roles, collaboration or questions about a project — write to me directly or use the
            form.
          </p>
          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="label text-[10px] text-muted">Email</dt>
              <dd className="mt-2">
                <CopyEmail />
              </dd>
            </div>
            <div>
              <dt className="label text-[10px] text-muted">Local time</dt>
              <dd className="mt-1 font-mono">
                <LocalTime /> IST · {SITE_CONFIG.location}
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLink
              href="/resume.pdf"
              event="resume_download"
              props={{ location: 'contact_page' }}
              className="btn-secondary"
              download
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
            <OpenChatButton className="btn-secondary" label="Ask the assistant" />
          </div>
          <div className="group mt-14 max-w-md">
            <Illustration
              priority
              scene="contact"
              side="left"
              label="Comic illustration: Abhiram saying &#8220;Say hello!&#8221; next to a mailbox while a paper plane loops overhead."
            />
          </div>
        </div>
        <div className="frame p-6 sm:p-10 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
