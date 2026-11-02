'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { track, type AnalyticsEvent } from '@/lib/analytics';

/** Link that records a privacy-friendly analytics event on click. */
export function TrackedLink({
  href,
  event,
  props,
  className,
  children,
  external = false,
  download = false,
}: {
  href: string;
  event: AnalyticsEvent;
  props?: Record<string, string>;
  className?: string;
  children: ReactNode;
  external?: boolean;
  download?: boolean;
}) {
  const onClick = () => track(event, props);
  if (external || download) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={className}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download: '' } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
