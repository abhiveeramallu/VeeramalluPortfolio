'use client';

import React from 'react';
import { SITE_CONFIG } from '@/data/content';

export const SkillsMarquee: React.FC = () => {
  return (
    <section className="relative py-12 overflow-hidden border-y border-line bg-surface/50">
      <div className="flex flex-col space-y-3.5 marquee-container">
        
        {/* Row 1: Scrolling Left */}
        <div className="flex whitespace-nowrap animate-marquee-left marquee-track">
          {[...SITE_CONFIG.skillsRow1, ...SITE_CONFIG.skillsRow1, ...SITE_CONFIG.skillsRow1].map((skill, idx) => (
            <div
              key={idx}
              className="group mx-2 px-5 py-2.5 rounded-pill bg-bg border border-line hover:border-ink hover:bg-accent-3 text-ink font-mono text-xs sm:text-sm font-semibold tracking-wide transition-colors cursor-default shadow-sm select-none flex items-center space-x-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-ink transition-colors" />
              <span>{skill}</span>
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex whitespace-nowrap animate-marquee-right marquee-track">
          {[...SITE_CONFIG.skillsRow2, ...SITE_CONFIG.skillsRow2, ...SITE_CONFIG.skillsRow2].map((skill, idx) => (
            <div
              key={idx}
              className="group mx-2 px-5 py-2.5 rounded-pill bg-surface border border-line hover:border-ink hover:bg-accent-3 text-ink font-mono text-xs sm:text-sm font-semibold tracking-wide transition-colors cursor-default shadow-sm select-none flex items-center space-x-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-2 group-hover:bg-ink transition-colors" />
              <span>{skill}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
