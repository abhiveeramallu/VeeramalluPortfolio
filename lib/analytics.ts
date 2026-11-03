'use client';

import { track as vercelTrack } from '@vercel/analytics';

/**
 * Privacy-friendly event plan (no cookies, no PII). Names are stable — dashboards depend on them.
 * See docs/DECISIONS.md → "Analytics".
 */
export type AnalyticsEvent =
  | 'cta_click'
  | 'resume_download'
  | 'chat_open'
  | 'chat_message'
  | 'contact_submit'
  | 'email_copy'
  | 'command_palette_open'
  | 'case_study_live_click'
  | 'repo_click';

export const analyticsEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

export function track(event: AnalyticsEvent, props?: Record<string, string | number | boolean>) {
  if (!analyticsEnabled) return;
  try {
    vercelTrack(event, props);
  } catch {
    // Analytics must never break the UI.
  }
}
