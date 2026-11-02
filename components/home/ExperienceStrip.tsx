'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Box, Cpu, Palette, Terminal, Bot } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';

export const ExperienceStrip: React.FC = () => {
  return (
    <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
      <div className="p-8 sm:p-12 rounded-card bg-surface border border-line shadow-card flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Headline */}
        <div className="max-w-xl text-left">
          <div className="flex items-center space-x-2 text-accent text-xs font-mono font-bold tracking-widest uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Proven Craft &amp; Engineering</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink leading-tight">
            <span className="text-accent underline decoration-accent-3 decoration-2">{SITE_CONFIG.yearsExperience} years</span> of turning complex ideas into products people <span className="font-serif italic font-normal text-accent-2">want</span> to use.
          </h2>
        </div>

        {/* Right Tools Row with Float Animation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          {SITE_CONFIG.tools.slice(0, 4).map((tool, index) => (
            <motion.div
              key={tool.name}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.4,
                ease: 'easeInOut',
              }}
              className="p-4 rounded-2xl bg-bg border border-line flex flex-col items-center justify-center text-center space-y-2 hover:border-accent hover:bg-surface transition-colors shadow-soft"
            >
              <div className="w-10 h-10 rounded-xl bg-surface border border-line flex items-center justify-center text-ink text-sm font-bold shadow-sm">
                {tool.name === 'Figma' && <Palette className="w-5 h-5 text-accent" />}
                {tool.name === 'Framer' && <Layers className="w-5 h-5 text-accent-2" />}
                {tool.name.includes('React') && <Cpu className="w-5 h-5 text-accent" />}
                {tool.name === 'Claude API' && <Bot className="w-5 h-5 text-accent-2" />}
                {tool.name.includes('TypeScript') && <Terminal className="w-5 h-5 text-ink" />}
                {tool.name.includes('Three') && <Box className="w-5 h-5 text-accent" />}
              </div>
              <span className="font-display text-xs font-bold text-ink">{tool.name}</span>
              <span className="font-mono text-[10px] text-muted uppercase">{tool.category}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
