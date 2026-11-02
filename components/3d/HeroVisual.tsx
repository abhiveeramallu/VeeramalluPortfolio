'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { MousePointerClick } from 'lucide-react';
import { HeroFallback } from './HeroFallback';
import type { HeroSceneHandle } from './HeroScene';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { cn } from '@/lib/utils';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

function canRun3D() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * The SVG is the server-rendered first paint. The WebGL chunk is only requested on first interaction,
 * then cross-fades in over the SVG — so LCP, TBT and INP never pay for the 3D.
 */
export function HeroVisual() {
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const sceneRef = useRef<HeroSceneHandle>(null);

  useEffect(() => {
    if (!canRun3D()) return;
    // Load the WebGL chunk on the visitor's first sign of engagement (pointer, touch, key or scroll), not
    // on page load: bounce visitors never pay for GPU work, and boot cost never lands in the LCP/TBT window.
    // The SVG fallback is the same composition, so nothing visibly changes until the canvas fades in.
    const EVENTS = ['pointermove', 'pointerdown', 'keydown', 'scroll', 'touchstart'] as const;
    const start = () => {
      EVENTS.forEach((e) => window.removeEventListener(e, start));
      setMount(true);
    };
    EVENTS.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return () => EVENTS.forEach((e) => window.removeEventListener(e, start));
  }, []);

  return (
    <div className="relative mx-auto aspect-[400/430] w-full max-w-[460px]">
      <HeroFallback
        className={cn('absolute inset-0 h-full w-full transition-opacity duration-700', ready && 'opacity-0')}
      />
      {mount && (
        <ErrorBoundary name="hero-3d" fallback={null}>
          <div
            aria-hidden="true"
            className={cn(
              'absolute -inset-10 transition-opacity duration-700',
              ready ? 'opacity-100' : 'opacity-0',
            )}
          >
            <HeroScene ref={sceneRef} onReady={() => setReady(true)} />
          </div>
        </ErrorBoundary>
      )}
      {ready && (
        <button
          type="button"
          onClick={() => sceneRef.current?.scatter()}
          className="absolute bottom-0 right-0 inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface/90 px-3 py-1.5 font-mono text-[11px] text-muted backdrop-blur transition-colors hover:border-ink hover:text-ink"
        >
          <MousePointerClick className="h-3.5 w-3.5" aria-hidden="true" />
          Click to scatter
        </button>
      )}
    </div>
  );
}
