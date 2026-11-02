'use client';

import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Send } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { CONTACT_LIMITS, validateContact, type ContactErrors, type ContactInput } from '@/lib/validation';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'sent' | 'fallback' | 'error';

const field =
  'w-full rounded-xl border bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/40';

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>({ name: '', email: '', message: '', website: '' });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');

  const mailto = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(`Hello from ${values.name || 'your portfolio'}`)}&body=${encodeURIComponent(values.message)}`;

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
      <div role="status" className="py-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-lime-700" aria-hidden="true" />
        <h2 className="type-h3 mt-4 text-ink">
          Message <span className="accent-word text-orange-600">received.</span>
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Thanks, {values.name.split(' ')[0]}. I reply within one working day.
        </p>
      </div>
    );
  }

  if (status === 'fallback') {
    return (
      <div role="status" className="py-10 text-center">
        <h2 className="type-h3 text-ink">
          One more <span className="accent-word text-orange-600">click.</span>
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          The form isn’t connected to email right now, so your message wasn’t sent. Open it in your mail app
          instead — everything is pre-filled.
        </p>
        <a href={mailto} className="btn-primary mt-6">
          Open in mail app
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    );
  }

  const fieldError = (key: keyof ContactErrors) =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-1.5 text-xs font-medium text-orange-700">
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
        <label htmlFor="name" className="eyebrow mb-1.5 block text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={update('name')}
          maxLength={CONTACT_LIMITS.nameMax}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={cn(field, errors.name ? 'border-orange-600' : 'border-line')}
          placeholder="Alex Morgan"
        />
        {fieldError('name')}
      </div>
      <div>
        <label htmlFor="email" className="eyebrow mb-1.5 block text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={update('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={cn(field, errors.email ? 'border-orange-600' : 'border-line')}
          placeholder="alex@company.com"
        />
        {fieldError('email')}
      </div>
      <div>
        <label htmlFor="message" className="eyebrow mb-1.5 block text-muted">
          What are you hiring for?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update('message')}
          maxLength={CONTACT_LIMITS.messageMax}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn(field, 'resize-y', errors.message ? 'border-orange-600' : 'border-line')}
          placeholder="The role, the team, and what you'd want me to own in the first 90 days."
        />
        {fieldError('message')}
      </div>
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
        <p id="form-error" role="alert" className="rounded-xl bg-orange-50 px-4 py-3 text-sm text-orange-800">
          {serverError}{' '}
          <a href={mailto} className="font-semibold underline">
            Email me instead
          </a>
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
