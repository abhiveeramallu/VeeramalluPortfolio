import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG, ProjectItem } from '@/data/content';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SITE_CONFIG.projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = SITE_CONFIG.projects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
  };
}

export default function CaseStudyPage({ params }: PageProps) {
  const projectIndex = SITE_CONFIG.projects.findIndex((p) => p.slug === params.slug);
  if (projectIndex === -1) notFound();

  const project = SITE_CONFIG.projects[projectIndex];
  const nextProject = SITE_CONFIG.projects[(projectIndex + 1) % SITE_CONFIG.projects.length];

  return (
    <article className="pt-32 pb-24 px-6 sm:px-12 max-w-4xl mx-auto space-y-16 text-left">
      
      {/* Back Link */}
      <div>
        <Link
          href="/work"
          className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <div className="space-y-4 pb-8 border-b border-line">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-pill bg-soft-green border border-line text-xs font-mono font-semibold text-ink">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-pill bg-bg border border-line text-xs font-mono text-muted">
            {project.year}
          </span>
          {project.client && (
            <span className="px-3 py-1 rounded-pill bg-bg border border-line text-xs font-mono text-muted">
              {project.client}
            </span>
          )}
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-ink leading-[1.05]">
          {project.title}
        </h1>

        <p className="font-sans text-xl sm:text-2xl text-muted leading-relaxed font-normal">
          {project.tagline}
        </p>

        {/* Action Links */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-pill bg-accent text-white font-mono text-xs font-bold hover:bg-ink shadow-bloom transition-all"
            >
              <span>Launch Live Product</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-pill bg-surface border border-line text-ink font-mono text-xs font-semibold hover:border-accent shadow-soft transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>

      {/* Role / Timeline / Tools Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-card bg-surface border border-line shadow-soft font-mono text-xs">
        <div>
          <span className="text-muted uppercase text-[10px] tracking-wider block mb-1">// MY ROLE</span>
          <span className="text-ink font-bold font-sans text-sm">{project.role}</span>
        </div>
        <div>
          <span className="text-muted uppercase text-[10px] tracking-wider block mb-1">// TIMELINE</span>
          <span className="text-ink font-bold font-sans text-sm">{project.timeline}</span>
        </div>
        <div>
          <span className="text-muted uppercase text-[10px] tracking-wider block mb-1">// TOOLKIT</span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.tools.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded bg-bg border border-line text-[10px] text-ink">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Visual Mockup Banner */}
      <div className="w-full h-80 sm:h-96 rounded-card bg-soft-yellow border border-line flex items-center justify-center p-8 shadow-card relative overflow-hidden">
        <div className="w-full max-w-lg h-full rounded-2xl bg-surface/95 border border-line p-6 flex flex-col justify-between shadow-card">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="font-mono text-xs text-accent font-bold">{project.title} Prototype</span>
            <span className="font-mono text-[10px] text-muted">v2.4 production</span>
          </div>
          <div className="space-y-2">
            <div className="font-display text-2xl font-bold text-ink">{project.title}</div>
            <p className="font-sans text-xs sm:text-sm text-muted">{project.description}</p>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-line text-[10px] font-mono text-muted">
            <span>WCAG AA COMPLIANT</span>
            <span className="text-accent font-semibold">{project.year}</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="space-y-4">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
          // KEY IMPACT METRICS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="p-6 rounded-card bg-surface border border-line shadow-soft text-left">
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-accent">
                {m.value}
              </div>
              <div className="font-mono text-xs text-muted mt-1 uppercase tracking-wider">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-card bg-surface border border-line shadow-soft space-y-3">
          <div className="font-mono text-xs font-bold uppercase text-accent tracking-wider">
            01. The Problem
          </div>
          <h2 className="font-display text-2xl font-bold text-ink">
            What was broken?
          </h2>
          <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="p-8 rounded-card bg-surface border border-line shadow-soft space-y-3">
          <div className="font-mono text-xs font-bold uppercase text-accent-2 tracking-wider">
            02. The Solution
          </div>
          <h2 className="font-display text-2xl font-bold text-ink">
            How we solved it
          </h2>
          <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Process Highlights */}
      <div className="space-y-6">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
          Design &amp; Engineering Process
        </h2>
        <div className="space-y-4">
          {project.process.map((step, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-surface border border-line shadow-soft space-y-1">
              <span className="font-mono text-xs text-accent font-bold">
                Phase {idx + 1} // {step.step}
              </span>
              <p className="font-sans text-sm text-muted leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Outcome Statement */}
      <div className="p-8 rounded-card bg-soft-pink border border-line space-y-2">
        <div className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
          // PROVEN OUTCOME
        </div>
        <p className="font-sans text-base sm:text-lg text-ink font-medium leading-relaxed">
          {project.outcome}
        </p>
      </div>

      {/* Next Project Link */}
      <div className="pt-12 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="font-mono text-xs text-muted uppercase tracking-wider">
          Next Case Study
        </span>
        <Link
          href={`/work/${nextProject.slug}`}
          data-cursor-label="NEXT"
          className="group flex items-center space-x-3 px-6 py-3.5 rounded-pill bg-surface border border-line hover:border-accent text-ink font-mono text-xs font-bold shadow-soft transition-all"
        >
          <span>{nextProject.title} ({nextProject.year})</span>
          <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </article>
  );
}
