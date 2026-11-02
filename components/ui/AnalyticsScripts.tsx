'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

/** Cookieless Vercel Analytics + Speed Insights. Only mounted when NEXT_PUBLIC_ENABLE_ANALYTICS=true. */
export default function AnalyticsScripts() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
