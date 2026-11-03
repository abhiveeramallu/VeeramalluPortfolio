'use client';

import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { track } from '@/lib/analytics';

export function ContactEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      track('email_copy');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${SITE_CONFIG.email}`;
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="group flex min-w-0 flex-1 items-center gap-3.5 rounded-2xl border-2 border-ink bg-white p-3.5 shadow-[4px_4px_0_0_rgb(var(--c-ink))] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgb(var(--c-ink))] sm:p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-[#ffedd5] text-accent shadow-[2px_2px_0_0_rgb(var(--c-ink))]">
          <Mail size={20} aria-hidden="true" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
            Direct Email
          </span>
          <a
            href={`mailto:${SITE_CONFIG.email}?subject=Portfolio%20Inquiry%20%E2%80%94%20Abhiram`}
            className="truncate font-mono text-base font-bold text-ink underline decoration-accent/60 decoration-2 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent sm:text-lg"
            title={`Send an email to ${SITE_CONFIG.email}`}
          >
            {SITE_CONFIG.email}
          </a>
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-[42px] shrink-0 items-center gap-1.5 rounded-full border-2 border-ink bg-[#fff7ed] px-4 py-2 font-mono text-xs font-bold text-ink shadow-[2px_2px_0_0_rgb(var(--c-ink))] transition-all duration-150 hover:-translate-y-0.5 hover:bg-accent hover:text-white hover:shadow-[3px_3px_0_0_rgb(var(--c-ink))] active:translate-y-0.5 active:shadow-[1px_1px_0_0_rgb(var(--c-ink))]"
          aria-label={copied ? 'Email copied' : 'Copy email address'}
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-600" aria-hidden="true" />
              <span className="text-emerald-700 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </button>
      </div>
    </div>
  );
}
