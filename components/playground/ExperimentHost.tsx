'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const loading = () => (
  <div className="aspect-[16/10] animate-pulse rounded-2xl bg-bg" aria-label="Loading experiment" />
);

const EXPERIMENTS: Record<string, ComponentType> = {
  'flow-gradient': dynamic(() => import('./FlowGradient'), { ssr: false, loading }),
  'hungarian-matrix': dynamic(() => import('./HungarianGame'), { loading }),
  'contrast-ramps': dynamic(() => import('./ContrastRamps'), { loading }),
  'chroma-synth': dynamic(() => import('./ChromaSynth'), { loading }),
  'clay-sculptor': dynamic(() => import('./ClaySculptor'), { ssr: false, loading }),
};

export function ExperimentHost({ slug }: { slug: string }) {
  const Experiment = EXPERIMENTS[slug];
  if (!Experiment) return null;
  return (
    <ErrorBoundary
      name={`experiment-${slug}`}
      fallback={
        <p className="rounded-2xl bg-bg p-8 text-center text-sm text-muted">
          This experiment needs WebGL, which isn’t available in this browser. The write-up below explains how
          it works.
        </p>
      }
    >
      <Experiment />
    </ErrorBoundary>
  );
}
