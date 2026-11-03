'use client';

import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Loader2, Send } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { CONTACT_LIMITS, validateContact, type ContactErrors, type ContactInput } from '@/lib/validation';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'sent' | 'fallback' | 'error';

const fieldBase =
  'w-full rounded-2xl border-2 bg-white px-4 py-3.5 text-sm font-medium text-ink placeholder:text-muted/60 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent/20';

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>({ name: '', email: '', message: '', website: '' });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');

  const mailto = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
    `Portfolio Inquiry — ${values.name || 'Abhiram'}`,
  )}&body=${encodeURIComponent(`${values.message}\n\n— ${values.name} <${values.email}>`)}`;

  const update =
    (key: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key as keyof ContactErrors]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus('sending');
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as {
        ok: boolean;
        delivered?: boolean;
        errors?: ContactErrors;
        error?: string;
      };
      if (data.errors) {
        setErrors(data.errors);
        setStatus('idle');
      } else if (!data.ok) {
        setServerError(data.error ?? 'Something went wrong.');
        setStatus('error');
      } else {
        track('contact_submit', { delivered: Boolean(data.delivered) });
        setStatus(data.delivered ? 'sent' : 'fallback');
      }
    } catch {
      setStatus('fallback');
    }
  };

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-3xl border-2 border-ink bg-[#ffedd5] p-8 text-center shadow-[4px_4px_0_0_rgb(var(--c-ink))] sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-ink bg-white text-accent shadow-[2px_2px_0_0_rgb(var(--c-ink))]">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <h2 className="type-h2 mt-5 text-ink font-bold">
          Message <span className="accent-word text-accent">received.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm font-medium leading-relaxed text-soft">
          Thanks for reaching out, {values.name.split(' ')[0]}. I review inquiries personally and will get back to you promptly.
        </p>
      </div>
    );
  }

  if (status === 'fallback') {
    return (
      <div role="status" className="rounded-3xl border-2 border-ink bg-[#ffedd5] p-8 text-center shadow-[4px_4px_0_0_rgb(var(--c-ink))] sm:p-12">
        <h2 className="type-h2 text-ink font-bold">
          One more <span className="accent-word text-accent">click.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm font-medium leading-relaxed text-soft">
          Direct dispatch isn&apos;t active in this environment, so your message wasn&apos;t automatically sent. Open it directly in your default mail app instead — everything is pre-filled!
        </p>
        <a
          href={mailto}
          className="btn-primary mt-6 inline-flex items-center gap-2 border-2 border-ink shadow-[4px_4px_0_0_rgb(var(--c-ink))] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgb(var(--c-ink))]"
        >
          <span>Open in mail app</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    );
  }

  const fieldError = (key: keyof ContactErrors) =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-1.5 font-mono text-xs font-semibold text-accent" role="alert">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form
      noValidate
      onSubmit={submit}
      className="space-y-5"
      aria-describedby={serverError ? 'form-error' : undefined}
    >
      <div>
        <label htmlFor="name" className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-ink">
          Name <span className="text-accent">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={update('name')}
          maxLength={CONTACT_LIMITS.nameMax}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={cn(fieldBase, errors.name ? 'border-accent bg-accent/5' : 'border-ink')}
          placeholder="Alex Morgan"
        />
        {fieldError('name')}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-ink">
          Email <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={update('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={cn(fieldBase, errors.email ? 'border-accent bg-accent/5' : 'border-ink')}
          placeholder="alex@company.com"
        />
        {fieldError('email')}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-ink">
          Message <span className="font-normal lowercase text-muted">(what would you like to talk about?)</span>{' '}
          <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={update('message')}
          maxLength={CONTACT_LIMITS.messageMax}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn(
            fieldBase,
            'min-h-[140px] resize-y',
            errors.message ? 'border-accent bg-accent/5' : 'border-ink',
          )}
          placeholder="Discussing an internship or engineering role, collaborating on a project, or exploring AI systems."
        />
        {fieldError('message')}
      </div>

      {/* Honeypot field for bot protection */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update('website')}
        />
      </div>

      {serverError && (
        <div id="form-error" role="alert" className="rounded-2xl border-2 border-accent bg-accent/10 p-4 font-mono text-xs font-medium text-accent">
          {serverError}{' '}
          <a href={mailto} className="font-bold underline ml-1">
            Email directly instead →
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full border-2 border-ink shadow-[4px_4px_0_0_rgb(var(--c-ink))] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgb(var(--c-ink))] active:translate-y-0.5 active:shadow-[2px_2px_0_0_rgb(var(--c-ink))] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Sending…</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            <span>Send message</span>
          </>
        )}
      </button>
    </form>
  );
}
