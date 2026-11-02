import type { Metadata } from 'next';
import { FileDown } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { ContactForm } from '@/components/ui/ContactForm';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { LocalTime } from '@/components/ui/LocalTime';
import { OpenChatButton } from '@/components/ui/OpenChatButton';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Hire ${SITE_CONFIG.name}: ${SITE_CONFIG.status.toLowerCase()} ${SITE_CONFIG.availability}. Reply within one working day.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div data-contact-section className="mx-auto max-w-6xl px-6 pb-24 pt-32 sm:px-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-3 text-orange-600">Contact</p>
          <h1 className="type-h1 text-ink">
            Let’s build something <span className="accent-word text-orange-600">good.</span>
          </h1>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            {SITE_CONFIG.status} {SITE_CONFIG.availability}. Tell me about the role and the team — I reply
            within one working day.
          </p>
          <dl className="mt-10 space-y-5 font-mono text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">Local time</dt>
              <dd className="mt-1 text-ink">
                <LocalTime /> IST · {SITE_CONFIG.location}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">Prefer email?</dt>
              <dd className="mt-2">
                <CopyEmail />
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
              <FileDown className="h-4 w-4" aria-hidden="true" />
              Résumé
            </TrackedLink>
            <OpenChatButton className="btn-secondary" label="Ask the AI assistant" />
          </div>
        </div>
        <div className="relative rounded-card border border-line bg-surface p-6 shadow-card sm:p-10 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
