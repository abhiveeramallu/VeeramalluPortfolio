'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Target, Layout, Layers, Sparkles, Share2, Rocket } from 'lucide-react';
import { SITE_CONFIG, ProcessStep } from '@/data/content';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Share2: <Share2 className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
};

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Sticky Header Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 text-left">
          <div className="text-accent font-mono text-xs font-bold uppercase tracking-wider">
            // 02. SYSTEMATIC METHODOLOGY
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink leading-[1.1]">
            How I build <span className="font-serif italic font-normal text-accent">better</span> products.
          </h2>
          <p className="font-sans text-base text-muted leading-relaxed">
            Great products don't emerge by accident. They come from rigorous user research, systematic component architecture, and tactile prototype testing in real code.
          </p>

          {/* Current Step Tracker Pill */}
          <div className="p-4 rounded-2xl bg-surface border border-line shadow-soft space-y-1 font-mono text-xs">
            <div className="text-muted uppercase text-[10px] tracking-wider">CURRENT PHASE</div>
            <div className="flex items-center space-x-2 text-ink font-bold text-sm">
              <span className="text-accent">{SITE_CONFIG.processSteps[activeStep].number}.</span>
              <span>{SITE_CONFIG.processSteps[activeStep].title}</span>
            </div>
            <p className="font-sans text-muted text-xs">
              {SITE_CONFIG.processSteps[activeStep].tagline}
            </p>
          </div>
        </div>

        {/* Right Scrolling 7 Steps List */}
        <div className="lg:col-span-7 space-y-4">
          {SITE_CONFIG.processSteps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={step.number}
                onMouseEnter={() => setActiveStep(idx)}
                className={`p-6 sm:p-8 rounded-card border transition-all duration-300 text-left ${
                  isActive
                    ? 'bg-surface border-accent shadow-card scale-[1.01]'
                    : 'bg-surface/70 border-line hover:border-line/90'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                        isActive
                          ? 'bg-accent text-white border-accent shadow-bloom'
                          : 'bg-bg text-muted border-line'
                      }`}
                    >
                      {iconMap[step.icon]}
                    </div>
                    <div>
                      <span className="font-mono text-xs text-accent font-bold tracking-wider">
                        STEP {step.number}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <span className="font-serif italic text-muted text-lg hidden sm:inline">
                    {step.title}
                  </span>
                </div>

                <div className="font-mono text-xs font-semibold text-accent-2 mb-2">
                  {step.tagline}
                </div>

                <p className="font-sans text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
