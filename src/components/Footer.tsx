import React from 'react';
import { ArrowUp, Github, Linkedin, Heart, Terminal } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 bg-[#0c0c10] border-t border-[#272733] font-mono text-xs text-[#A7A3AD]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Signature */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
          <span className="font-display text-sm font-bold text-[#F4F0E6]">
            VEERAMALLU SAI ABHIRAM
          </span>
          <span className="hidden sm:inline text-[#272733]">|</span>
          <span className="text-[11px]">
            COMPUTER SCIENCE STUDENT • VIT VELLORE '27
          </span>
        </div>

        {/* Telemetry Status */}
        <div className="flex items-center space-x-2 text-[11px] text-[#A7A3AD]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>ALL SYSTEMS NOMINAL // REACT + THREE.JS</span>
        </div>

        {/* Links & Back to Top */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/abhiveeramallu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF5B35] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5B35]"
            title="GitHub"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/abhiramveeramallu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8B5CF6] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B5CF6]"
            title="LinkedIn"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundManager.playHover()}
            data-cursor="hover"
            data-cursor-text="TOP"
            className="p-2 rounded-xl border border-[#272733] bg-[#161622] hover:border-[#FF5B35] text-[#F4F0E6] hover:text-[#FF5B35] transition-all ml-2"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
