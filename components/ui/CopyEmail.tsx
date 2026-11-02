'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      track('email_copy');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${SITE_CONFIG.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      data-cursor-label={copied ? 'Copied' : 'Copy'}
      className={cn('btn-secondary', className)}
    >
      <span>{SITE_CONFIG.email}</span>
      {copied ? (
        <Check className="h-4 w-4 text-lime-700" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4 text-muted" aria-hidden="true" />
      )}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  );
}
