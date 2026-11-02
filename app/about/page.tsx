import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap, Award, Briefcase, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { StaticAvatarFallback } from '@/components/3d/SceneWrapper';

export const metadata: Metadata = {
  title: 'Journey & Story',
  description: `The background, engineering philosophy, and timeline of ${SITE_CONFIG.name}.`,
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 sm:px-12 max-w-6xl mx-auto space-y-24 text-left">
      
      {/* Page Header */}
      <div className="pb-12 border-b border-line flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-accent font-mono text-xs font-bold uppercase tracking-wider mb-2">
            // JOURNEY &amp; PHILOSOPHY
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-ink">
            Crafting with <span className="font-serif italic font-normal text-accent">rigor</span> and delight.
          </h1>
        </div>
        <p className="font-sans text-base text-muted max-w-md leading-relaxed">
          A personal timeline of turning algorithms into tactile interfaces, backed by computer science foundations and creative computing.
        </p>
      </div>

      {/* Story & Portrait Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-muted font-sans text-base sm:text-lg leading-relaxed">
          <p>
            I'm <strong className="text-ink font-semibold">{SITE_CONFIG.name}</strong>, a {SITE_CONFIG.role} based in {SITE_CONFIG.location}.
          </p>
          <p>
            My work lives where mathematics meets tactile interface design. Rather than designing purely static rectangles or writing backend services in isolation, I prototype in real code—combining Next.js, Three.js shaders, and design tokens into cohesive products.
          </p>
          <p>
            Whether formulating Hungarian algorithm cost matrices for multi-tenant delivery or tuning local Ollama LLMs for private document extraction, I believe software should always feel obvious, human, and thoughtfully weighted.
          </p>
        </div>

        {/* Tactile 3D / Illustrated Portrait Tile */}
        <div className="lg:col-span-5 rounded-card bg-surface border border-line p-8 shadow-card flex items-center justify-center">
          <StaticAvatarFallback />
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold block mb-1">
            // CORE PILLARS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Guiding <span className="font-serif italic font-normal text-accent-2">Principles</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SITE_CONFIG.values.map((v, i) => (
            <div
              key={v.title}
              className="p-6 rounded-card bg-surface border border-line shadow-soft space-y-3 card-hover-lift"
            >
              <div className="w-8 h-8 rounded-full bg-soft-pink border border-line flex items-center justify-center text-accent font-mono text-xs font-bold">
                0{i + 1}
              </div>
              <h3 className="font-display text-xl font-bold text-ink">{v.title}</h3>
              <p className="font-sans text-sm text-muted leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline of Experience */}
      <div className="space-y-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold block mb-1">
            // MILESTONES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Experience &amp; <span className="font-serif italic font-normal text-accent">Education</span>.
          </h2>
        </div>

        <div className="space-y-6">
          {SITE_CONFIG.journey.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-card bg-surface border border-line shadow-soft space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-mono text-xs text-accent font-bold">{item.period}</span>
                <span className="font-mono text-xs text-muted">{item.location}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">
                {item.role} <span className="text-muted font-normal">at</span> {item.company}
              </h3>
              <p className="font-sans text-sm text-muted leading-relaxed">
                {item.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {item.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-pill bg-bg border border-line text-[11px] font-mono text-ink"
                  >
                    ✦ {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Stack Complete Grid */}
      <div className="space-y-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold block mb-1">
            // ARSENAL
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Tools &amp; <span className="font-serif italic font-normal text-accent-2">Technologies</span>.
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SITE_CONFIG.tools.map((t) => (
            <div
              key={t.name}
              className="p-5 rounded-2xl bg-surface border border-line shadow-soft hover:border-accent transition-colors flex flex-col justify-between"
            >
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
                {t.category}
              </span>
              <span className="font-display text-base font-bold text-ink mt-2">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
