import React from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, FileText, Sparkles, Terminal } from 'lucide-react';
import { Hero3D } from './Hero3D';
import { soundManager } from '../utils/audio';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const scrollTo = (id: string) => {
    soundManager.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 lg:pt-32 lg:pb-24 flex items-center cyber-grid overflow-hidden">
      {/* Background radial gradient flares */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FF5B35]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Massive Editorial Typography & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Status indicator tag */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border border-[#272733] bg-[#16161c]/90 backdrop-blur-sm w-fit mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF5B35] animate-pulse"></span>
              <span className="text-[11px] font-mono tracking-wider text-[#A7A3AD] uppercase">
                AI Engineer &amp; Full-Stack Architect
              </span>
            </div>

            {/* Massive Name ABHIRAM. */}
            <div className="relative">
              <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[7.6rem] font-extrabold tracking-tighter text-[#F4F0E6] leading-[0.88] select-none">
                ABHIRAM<span className="text-[#FF5B35]">.</span>
              </h1>
              <span className="absolute -top-3 -right-2 hidden sm:inline-block font-mono text-[10px] text-[#A7A3AD] border border-[#272733] px-2 py-0.5 rounded bg-[#16161c]">
                VIT '27
              </span>
            </div>

            {/* Primary Statement */}
            <p className="mt-8 text-xl sm:text-2xl md:text-3xl font-display font-medium text-[#F4F0E6]/95 leading-snug tracking-tight max-w-2xl">
              I build intelligent systems that make complex problems feel simple.
            </p>

            {/* Sub-description */}
            <p className="mt-4 text-base sm:text-lg text-[#A7A3AD] font-sans leading-relaxed max-w-xl">
              Computer Science student at <span className="text-[#F4F0E6] font-medium">VIT Vellore</span>, exploring AI, full-stack engineering, cybersecurity, and creative technology.
            </p>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {/* Explore My Work */}
              <button
                onClick={() => scrollTo('projects')}
                onMouseEnter={() => soundManager.playHover()}
                className="group relative px-6 py-3.5 rounded-xl bg-[#FF5B35] text-white font-mono text-xs sm:text-sm font-semibold tracking-wider flex items-center space-x-2.5 shadow-lg shadow-[#FF5B35]/30 hover:bg-[#ff4419] hover:shadow-[#FF5B35]/50 transition-all duration-300"
                data-cursor="hover"
                data-cursor-text="EXPLORE"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* About Me */}
              <button
                onClick={() => scrollTo('about')}
                onMouseEnter={() => soundManager.playHover()}
                className="px-6 py-3.5 rounded-xl border border-[#272733] bg-[#16161c] text-[#F4F0E6] font-mono text-xs sm:text-sm font-semibold tracking-wider hover:border-[#FF5B35]/60 hover:bg-[#1d1d27] transition-all duration-200"
                data-cursor="hover"
                data-cursor-text="ABOUT"
              >
                About Me
              </button>

              {/* Resume download / view button */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenResume();
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="px-5 py-3.5 rounded-xl border border-[#272733] bg-[#16161c]/60 text-[#A7A3AD] hover:text-[#FF5B35] hover:border-[#FF5B35]/40 font-mono text-xs sm:text-sm font-medium flex items-center space-x-2 transition-all duration-200"
                data-cursor="hover"
                data-cursor-text="RESUME"
                title="View Verified Curriculum Vitae"
              >
                <FileText className="w-4 h-4 text-[#FF5B35]" />
                <span>Resume</span>
              </button>
            </div>

            {/* Social Links & Verified Badges */}
            <div className="mt-10 pt-6 border-t border-[#272733]/80 flex flex-wrap items-center gap-6 text-xs font-mono text-[#A7A3AD]">
              <span className="text-[#686571] uppercase tracking-wider">CONNECT:</span>
              
              <a
                href="https://github.com/abhiveeramallu"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                className="flex items-center space-x-1.5 hover:text-[#FF5B35] transition-colors"
                data-cursor="hover"
                data-cursor-text="GITHUB"
              >
                <Github className="w-4 h-4" />
                <span>github.com/abhiveeramallu</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#686571]" />
              </a>

              <a
                href="https://linkedin.com/in/abhiramveeramallu"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                className="flex items-center space-x-1.5 hover:text-[#8B5CF6] transition-colors"
                data-cursor="hover"
                data-cursor-text="LINKEDIN"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#686571]" />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Interactive Terminal Experience */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <Hero3D />
          </div>

        </div>
      </div>
    </section>
  );
};
