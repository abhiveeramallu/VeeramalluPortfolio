'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ExternalLink, Github } from 'lucide-react';
import { SITE_CONFIG, ProjectItem } from '@/data/content';

export const SelectedProjects: React.FC = () => {
  const featuredProjects = SITE_CONFIG.projects.slice(0, 4);

  return (
    <section id="projects" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-line gap-4">
        <div>
          <div className="flex items-center space-x-2 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <span>// 01. SELECTED WORKS</span>
            <span className="text-muted">· from 2023–now</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">
            Selected <span className="font-serif italic font-normal text-accent-2">Projects</span>.
          </h2>
        </div>

        <Link
          href="/work"
          className="flex items-center space-x-2 px-5 py-2.5 rounded-pill bg-surface border border-line hover:border-accent text-xs font-mono font-semibold text-ink transition-colors shadow-soft w-fit"
        >
          <span>View all projects ({SITE_CONFIG.projects.length} in total)</span>
          <ArrowUpRight className="w-4 h-4 text-accent" />
        </Link>
      </div>

      {/* 2-Column Grid of Big Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {featuredProjects.map((project, idx) => (
          <ProjectCard key={project.slug} project={project} index={idx} />
        ))}
      </div>

      {/* Bottom View All Button */}
      <div className="mt-16 text-center">
        <Link
          href="/work"
          data-cursor-label="ALL WORK"
          className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-pill bg-surface border border-line hover:border-accent hover:bg-bg text-ink font-mono text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-card"
        >
          <span>Explore all projects &amp; case studies ({SITE_CONFIG.projects.length} in total)</span>
          <ArrowUpRight className="w-4 h-4 text-accent" />
        </Link>
      </div>

    </section>
  );
};

const ProjectCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  // Pastel background helper
  const bgClass =
    project.softBg === 'pink'
      ? 'bg-soft-pink'
      : project.softBg === 'blue'
      ? 'bg-soft-blue'
      : project.softBg === 'green'
      ? 'bg-soft-green'
      : 'bg-soft-yellow';

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor-label="View project"
      className="group block relative rounded-card border border-line bg-surface p-4 sm:p-6 card-hover-lift"
    >
      {/* Visual Mockup Container with 3D Tilt on Hover */}
      <div
        className={`w-full h-64 sm:h-72 rounded-2xl ${bgClass} border border-line/70 overflow-hidden relative flex items-center justify-center p-6 transition-transform duration-500 ease-out group-hover:scale-[1.02]`}
      >
        {/* Soft Ambient Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />

        {/* Tactile Stylized UI Mockup representation */}
        <div className="w-full h-full rounded-xl bg-surface/90 backdrop-blur-sm border border-line shadow-card p-4 flex flex-col justify-between transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-1">
          {/* Mockup Header */}
          <div className="flex items-center justify-between border-b border-line/60 pb-2.5">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent-2" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent-3 border border-ink/40" />
            </div>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              {project.category}
            </span>
          </div>

          {/* Mockup Body Content */}
          <div className="space-y-2 text-left my-auto py-2">
            <div className="font-display text-lg font-bold text-ink leading-tight">
              {project.title}
            </div>
            <div className="font-sans text-xs text-muted line-clamp-2 leading-relaxed">
              {project.tagline}
            </div>
          </div>

          {/* Mockup Footer Metrics */}
          <div className="flex items-center justify-between pt-2 border-t border-line/60 text-[10px] font-mono">
            <span className="text-accent font-semibold">{project.metrics[0]?.label}: {project.metrics[0]?.value}</span>
            <span className="text-muted">{project.year}</span>
          </div>
        </div>

        {/* Floating Quick Action Arrow Pill */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface/95 border border-line shadow-soft flex items-center justify-center text-ink group-hover:bg-accent group-hover:text-white transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Card Info Below Image */}
      <div className="mt-5 flex items-start justify-between gap-4 text-left">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-display text-xl font-bold text-ink group-hover:text-accent transition-colors">
              {project.title}
            </span>
            <span className="px-2.5 py-0.5 rounded-pill bg-bg border border-line font-mono text-[10px] text-muted font-medium">
              {project.year}
            </span>
          </div>
          <p className="font-sans text-sm text-muted line-clamp-1">
            {project.tagline}
          </p>
        </div>

        <span className="px-3 py-1 rounded-pill bg-bg border border-line font-mono text-xs text-ink font-semibold shrink-0">
          {project.category}
        </span>
      </div>
    </Link>
  );
};
