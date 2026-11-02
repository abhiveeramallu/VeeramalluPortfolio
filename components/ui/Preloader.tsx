'use client';

import { useEffect } from 'react';
import { SITE_CONFIG } from '@/data/content';

/** Visual layer for the first-visit preloader; the decision runs in <head> (lib/head-scripts.ts). Any key, click or scroll skips it. */
export function Preloader() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute('data-preload')) return;
    const skip = () => root.removeAttribute('data-preload');
    window.addEventListener('keydown', skip, { once: true });
    window.addEventListener('pointerdown', skip, { once: true });
    window.addEventListener('wheel', skip, { once: true, passive: true });
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('wheel', skip);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="preloader fixed inset-0 z-[9998] flex-col items-start justify-end bg-[#111] p-6 text-[#f6f4ef] sm:p-12"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#a3a39c]">
        Portfolio · {new Date().getFullYear()}
      </p>
      <p className="type-h1 mt-3">
        {SITE_CONFIG.name.split(' ')[0]}{' '}
        <span className="accent-word text-orange-500">{SITE_CONFIG.shortName}</span>
      </p>
      <span className="preloader-bar mt-6 block h-[3px] w-full origin-left bg-orange-500" />
      <p className="mt-3 font-mono text-[11px] text-[#a3a39c]">Press any key to skip</p>
    </div>
  );
}
