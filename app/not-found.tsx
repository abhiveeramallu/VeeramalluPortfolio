import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-soft-pink border border-line flex items-center justify-center text-accent font-display text-2xl font-bold">
        404
      </div>
      <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink">
        Page was <span className="font-serif italic font-normal text-accent">misplaced</span>.
      </h1>
      <p className="font-sans text-sm sm:text-base text-muted max-w-md leading-relaxed">
        The experiment or project you are searching for might have moved into another dimension.
      </p>
      <Link
        href="/"
        className="inline-flex items-center space-x-2 px-6 py-3 rounded-pill bg-accent text-white font-mono text-xs font-bold shadow-bloom hover:bg-ink transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
