import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ArrowUpRight, Github, ExternalLink, Cpu, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { RouteFusionScene } from '../scenes/RouteFusionScene';
import { ThreatLensScene } from '../scenes/ThreatLensScene';
import { SmartDocumentScene } from '../scenes/SmartDocumentScene';
import { GreenhouseScene } from '../scenes/GreenhouseScene';
import { soundManager } from '../utils/audio';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
  index,
}) => {
  const isEven = index % 2 === 0;

  const renderScene = () => {
    switch (project.sceneType) {
      case 'routefusion':
        return <RouteFusionScene />;
      case 'threatlens':
        return <ThreatLensScene />;
      case 'smartdocs':
        return <SmartDocumentScene />;
      case 'greenhouse':
        return <GreenhouseScene />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`group relative rounded-3xl border border-[#272733] bg-[#14141c]/90 hover:border-[#FF5B35]/50 transition-all duration-500 overflow-hidden shadow-xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
        isEven ? '' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Background subtle noise and glow */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity"
        style={{ backgroundColor: project.accentColor }}
      />

      {/* Narrative & Details Column */}
      <div className={`lg:col-span-6 flex flex-col justify-between ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
        <div>
          {/* Top meta tags */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-sm sm:text-base font-bold text-[#FF5B35] tracking-widest">
              PROJECT {project.number}
            </span>
            <span className="text-xs font-mono text-[#A7A3AD] border border-[#272733] px-3 py-1 rounded-full bg-[#161622]">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F4F0E6] group-hover:text-[#FF5B35] transition-colors duration-300">
            {project.title}
          </h3>

          <p className="mt-1 text-sm font-mono text-[#A7A3AD] font-medium">
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base text-[#A7A3AD] font-sans leading-relaxed">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="mt-6 space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#686571]">Key Highlights:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#F4F0E6]/90">
              {project.highlights.slice(0, 4).map((h, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
                  <span className="truncate">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-[#272733] bg-[#181824] text-[#A7A3AD]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 pt-6 border-t border-[#272733]/80 flex flex-wrap items-center gap-3">
          {/* Deep dive modal button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenDetails(project);
            }}
            onMouseEnter={() => soundManager.playHover()}
            data-cursor="hover"
            data-cursor-text="DEEP DIVE"
            className="px-4 py-2.5 rounded-xl bg-[#FF5B35] text-white font-mono text-xs font-semibold tracking-wider flex items-center space-x-2 shadow-md shadow-[#FF5B35]/25 hover:bg-[#ff4419] transition-all"
          >
            <span>Architecture &amp; Algorithms</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              data-cursor="hover"
              data-cursor-text="LIVE APP"
              className="px-4 py-2.5 rounded-xl border border-[#272733] bg-[#1a1a24] text-[#F4F0E6] hover:border-[#FF5B35] font-mono text-xs font-medium flex items-center space-x-1.5 transition-colors"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FF5B35]" />
            </a>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => soundManager.playHover()}
            data-cursor="hover"
            data-cursor-text="CODE"
            className="px-4 py-2.5 rounded-xl border border-[#272733] bg-[#1a1a24] text-[#A7A3AD] hover:text-[#F4F0E6] hover:border-[#272733]/90 font-mono text-xs font-medium flex items-center space-x-1.5 transition-colors"
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* 3D Visual Preview Composition Column */}
      <div className={`lg:col-span-6 relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-[#272733]/80 bg-[#0d0d12] flex items-center justify-center ${
        isEven ? 'order-2' : 'order-2 lg:order-1'
      }`}>
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle at center, ${project.accentColor}25 0%, transparent 70%)`
          }}
        />

        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 2, 4.5], fov: 45 }}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            {renderScene()}
          </Suspense>
        </Canvas>

        {/* Interactive 3D pill */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#101014]/90 border border-[#272733] text-[10px] font-mono text-[#A7A3AD] pointer-events-none">
          <Sparkles className="w-3 h-3 text-[#FF5B35]" />
          <span>INTERACTIVE 3D SIMULATION</span>
        </div>
      </div>
    </div>
  );
};
