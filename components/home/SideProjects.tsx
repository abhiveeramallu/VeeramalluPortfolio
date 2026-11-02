'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Gamepad2, Palette, Wrench, Music } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';

export const SideProjects: React.FC = () => {
  return (
    <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-line gap-4 text-left">
        <div>
          <div className="flex items-center space-x-2 text-accent-2 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <span>// 03. LABS &amp; PLAYGROUND</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">
            Side Projects &amp; <span className="font-serif italic font-normal text-accent">Toys</span>.
          </h2>
        </div>

        <Link
          href="/playground"
          className="flex items-center space-x-2 px-5 py-2.5 rounded-pill bg-surface border border-line hover:border-accent text-xs font-mono font-semibold text-ink transition-colors shadow-soft w-fit"
        >
          <span>Open interactive playground</span>
          <ArrowUpRight className="w-4 h-4 text-accent" />
        </Link>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SITE_CONFIG.sideProjects.map((item, idx) => (
          <Link
            key={item.id}
            href={item.href}
            data-cursor-label="PLAY"
            className="group p-6 rounded-card bg-surface border border-line card-hover-lift flex flex-col justify-between text-left space-y-6"
          >
            <div>
              {/* Top Tag & Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-pill bg-bg border border-line text-[11px] font-mono text-ink font-semibold">
                  {item.tag}
                </span>
                {item.badge && (
                  <span className="px-2.5 py-0.5 rounded-pill bg-soft-green text-ink border border-line text-[10px] font-mono font-bold flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-3 border border-ink animate-pulse" />
                    <span>{item.badge}</span>
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h3 className="font-display text-xl font-bold text-ink group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-muted mt-2 leading-relaxed">
                {item.tagline}
              </p>
            </div>

            {/* Bottom Stylized Micro Thumbnail & CTA */}
            <div className="pt-4 border-t border-line/60 flex items-center justify-between">
              <span className="font-mono text-xs text-muted font-medium">
                {item.year}
              </span>
              <div className="flex items-center space-x-1 text-xs font-mono font-semibold text-accent group-hover:translate-x-1 transition-transform">
                <span>Launch toy</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}

        {/* Final Special Card: Playground: Games · Tools · Toys */}
        <Link
          href="/playground"
          data-cursor-label="EXPLORE"
          className="group p-6 rounded-card bg-soft-pink border border-line card-hover-lift flex flex-col justify-between text-left space-y-6 lg:col-span-2 relative overflow-hidden"
        >
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-pill bg-surface border border-line text-xs font-mono font-bold text-accent mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Interactive Suite</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Playground: <span className="font-serif italic font-normal text-accent-2">Games</span> · Tools · Toys
            </h3>
            <p className="font-sans text-sm text-muted mt-2 max-w-md leading-relaxed">
              Dive into our interactive 3D geometry customizers, playable Hungarian algorithm cost matrix games, and generative sound visualizers.
            </p>
          </div>

          <div className="pt-4 border-t border-line/80 flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
              Ready to experiment
            </span>
            <div className="px-5 py-2.5 rounded-pill bg-accent text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-bloom group-hover:bg-ink group-hover:shadow-none transition-all">
              <span>Enter Playground</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>

    </section>
  );
};
