'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { SceneWrapper } from '@/components/3d/SceneWrapper';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-center overflow-hidden">
      {/* Background Giant Multi-Script Name Marquee */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none select-none overflow-hidden opacity-[0.06] -z-10">
        <div className="flex whitespace-nowrap animate-marquee-left">
          {[...SITE_CONFIG.heroTransliterations, ...SITE_CONFIG.heroTransliterations].map((item, idx) => (
            <span
              key={idx}
              className="font-display text-[9rem] sm:text-[14rem] lg:text-[18rem] font-black tracking-tighter text-ink mx-8 uppercase inline-block"
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            
            {/* Greeting Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-pill bg-surface border border-line text-xs font-mono text-ink shadow-soft w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-accent-3 border border-ink" />
              <span>Hello! I'm <strong className="font-semibold">{SITE_CONFIG.name}</strong></span>
              <span className="text-muted">·</span>
              <span className="text-muted flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-accent" />
                <span>{SITE_CONFIG.location.split(',')[0]}</span>
              </span>
            </motion.div>

            {/* Main Headline with Serif Italic Word */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-6xl lg:text-[4.4rem] font-bold tracking-tight text-ink leading-[1.05]"
            >
              I turn complex problems into products that feel{' '}
              <span className="font-serif italic font-normal text-accent underline decoration-accent-3 decoration-wavy decoration-2">
                obvious
              </span>
              .
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-base sm:text-lg text-muted max-w-xl leading-relaxed"
            >
              {SITE_CONFIG.subline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <Link
                href="/about"
                data-cursor-label="JOURNEY"
                className="group px-6 py-3.5 rounded-pill bg-accent text-white font-mono text-xs sm:text-sm font-semibold tracking-wide flex items-center space-x-2 shadow-bloom hover:bg-ink hover:shadow-none transition-all"
              >
                <span>My journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/work"
                data-cursor-label="PROJECTS"
                className="px-6 py-3.5 rounded-pill bg-surface border border-line text-ink font-mono text-xs sm:text-sm font-semibold tracking-wide hover:border-accent hover:bg-bg transition-all shadow-soft"
              >
                Selected Work
              </Link>
            </motion.div>
          </div>

          {/* Right Column: 3D Soft Avatar Scene */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <SceneWrapper />
          </div>

        </div>
      </div>
    </section>
  );
};
