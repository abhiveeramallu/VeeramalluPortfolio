'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { SITE_CONFIG, ProjectItem } from '@/data/content';

const CATEGORIES = ['All', 'Product Design', 'Design Systems', 'Creative Dev', 'Brand Identity'] as const;

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = activeCategory === 'All'
    ? SITE_CONFIG.projects
    : SITE_CONFIG.projects.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 px-6 sm:px-12 max-w-6xl mx-auto space-y-16 text-left">
      
      {/* Page Header */}
      <div className="pb-8 border-b border-line flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-accent font-mono text-xs font-bold uppercase tracking-wider mb-2">
            // PORTFOLIO INDEX
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-ink">
            Crafted <span className="font-serif italic font-normal text-accent">Case Studies</span>.
          </h1>
        </div>
        <p className="font-sans text-base text-muted max-w-md leading-relaxed">
          Detailed product architecture, algorithmic formulation, and user outcomes from 2023 to present.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-pill font-mono text-xs font-semibold tracking-wide transition-all ${
              activeCategory === cat
                ? 'bg-accent text-white shadow-bloom'
                : 'bg-surface border border-line text-muted hover:text-ink hover:border-accent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/work/${project.slug}`}
                data-cursor-label="EXPLORE"
                className="group block rounded-card bg-surface border border-line p-5 sm:p-6 card-hover-lift h-full flex flex-col justify-between"
              >
                <div>
                  {/* Visual Thumbnail */}
                  <div
                    className={`w-full h-56 sm:h-64 rounded-2xl ${
                      project.softBg === 'pink'
                        ? 'bg-soft-pink'
                        : project.softBg === 'blue'
                        ? 'bg-soft-blue'
                        : project.softBg === 'green'
                        ? 'bg-soft-green'
                        : 'bg-soft-yellow'
                    } border border-line/70 flex items-center justify-center p-6 relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]`}
                  >
                    <div className="w-full h-full rounded-xl bg-surface/90 border border-line p-4 flex flex-col justify-between shadow-card">
                      <div className="flex justify-between items-center text-[10px] font-mono text-muted uppercase">
                        <span>{project.category}</span>
                        <span>{project.year}</span>
                      </div>
                      <div className="font-display text-xl font-bold text-ink">
                        {project.title}
                      </div>
                      <div className="font-mono text-[10px] text-accent font-semibold">
                        {project.metrics[0]?.label}: {project.metrics[0]?.value}
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface border border-line flex items-center justify-center text-ink group-hover:bg-accent group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title and Tagline */}
                  <div className="mt-5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-2xl font-bold text-ink group-hover:text-accent transition-colors">
                        {project.title}
                      </h2>
                      <span className="font-mono text-xs text-muted">
                        {project.year}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-muted line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Footer Tools & Category */}
                <div className="pt-4 mt-6 border-t border-line/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-ink font-semibold">{project.category}</span>
                  <span className="text-accent flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Read case study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
