import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertTriangle, Layers, Cpu, Code2 } from 'lucide-react';
import { Project } from '../types';
import { soundManager } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playClick();
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#101014]/90 backdrop-blur-xl transition-opacity animate-in fade-in"
        onClick={() => {
          soundManager.playClick();
          onClose();
        }}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#14141c] border border-[#272733] rounded-2xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#272733] flex items-center justify-between bg-[#161622]/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#FF5B35]/15 text-[#FF5B35] border border-[#FF5B35]/30">
              PROJECT {project.number}
            </span>
            <span className="text-xs font-mono text-[#A7A3AD] hidden sm:inline">
              // {project.category}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#FF5B35] text-white font-mono text-xs font-medium hover:bg-[#ff4419] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={`Open live application for ${project.title}`}
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#272733] bg-[#1a1a24] text-[#F4F0E6] hover:border-[#FF5B35] font-mono text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B35]"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Source Code</span>
            </a>
            <button
              ref={closeBtnRef}
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-[#A7A3AD] hover:text-[#F4F0E6] hover:bg-[#22222d] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B35]"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 font-sans text-[#F4F0E6]/90">
          {/* Title and Subtitle */}
          <div>
            <h2 id="modal-project-title" className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F4F0E6]">
              {project.title}
            </h2>
            <p className="mt-2 text-lg text-[#FF5B35] font-mono font-medium">
              {project.subtitle}
            </p>
            <p className="mt-4 text-base text-[#A7A3AD] leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Technology Badges */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#A7A3AD] mb-3 flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-[#FF5B35]" />
              <span>Technology Stack</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-md text-xs font-mono border border-[#272733] bg-[#1a1a26] text-[#F4F0E6]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Grid: Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-[#272733] bg-[#161620] space-y-2">
              <div className="flex items-center space-x-2 text-[#FF5B35]">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider">Problem Statement</h3>
              </div>
              <p className="text-sm text-[#A7A3AD] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#272733] bg-[#161620] space-y-2">
              <div className="flex items-center space-x-2 text-[#C7D9B5]">
                <CheckCircle2 className="w-4 h-4" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider">Engineering Solution</h3>
              </div>
              <p className="text-sm text-[#A7A3AD] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* System Architecture */}
          <div className="p-5 rounded-xl border border-[#272733] bg-[#161620] space-y-3">
            <div className="flex items-center space-x-2 text-[#8B5CF6]">
              <Layers className="w-4 h-4" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider">System Architecture</h3>
            </div>
            <p className="text-sm text-[#A7A3AD] leading-relaxed font-mono bg-[#101015] p-3.5 rounded-lg border border-[#272733]/60">
              {project.architecture}
            </p>
          </div>

          {/* Algorithmic Implementations */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#A7A3AD] mb-3 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#FF5B35]" />
              <span>Algorithmic Implementations</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.algorithms.map((algo, i) => (
                <div key={i} className="flex items-start space-x-2.5 p-3 rounded-lg border border-[#272733]/80 bg-[#161620]">
                  <span className="font-mono text-xs text-[#FF5B35] font-bold">0{i + 1}.</span>
                  <span className="text-xs text-[#A7A3AD] leading-normal">{algo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Challenges Overcome */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#A7A3AD] mb-3">
              Technical Challenges Solved
            </h3>
            <ul className="space-y-2 text-xs text-[#A7A3AD] list-none">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B35]"></span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-[#272733] bg-[#121218] flex items-center justify-between text-xs font-mono text-[#A7A3AD]">
          <span>VERIFIED IMPLEMENTATION</span>
          <div className="flex items-center space-x-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF5B35] hover:underline flex items-center space-x-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5B35]"
              >
                <span>Launch Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F4F0E6] hover:text-[#FF5B35] flex items-center space-x-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5B35]"
            >
              <span>GitHub Repository</span>
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
