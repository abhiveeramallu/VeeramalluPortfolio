'use client';

import dynamic from 'next/dynamic';
import { ErrorBoundary } from './ErrorBoundary';

// Interactive extras load after hydration and stay out of the first-load JS budget.
const AskMeChat = dynamic(() => import('./AskMeChat'), { ssr: false });
const CommandPalette = dynamic(() => import('./CommandPalette'), { ssr: false });
const Analytics = dynamic(() => import('./AnalyticsScripts'), { ssr: false });

export function ClientIslands() {
  return (
    <>
      <ErrorBoundary name="chat" fallback={null}>
        <AskMeChat />
      </ErrorBoundary>
      <ErrorBoundary name="command-palette" fallback={null}>
        <CommandPalette />
      </ErrorBoundary>
      {process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true' && <Analytics />}
    </>
  );
}
