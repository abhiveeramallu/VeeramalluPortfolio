'use client';

import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-secondary inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-2 border-ink bg-white px-4 py-2 font-mono text-xs font-bold text-ink shadow-[2px_2px_0_0_rgb(var(--c-ink))] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgb(var(--c-ink))] active:translate-y-0.5 active:shadow-[1px_1px_0_0_rgb(var(--c-ink))]"
    >
      <Printer size={15} aria-hidden="true" />
      <span>Print</span>
    </button>
  );
}
