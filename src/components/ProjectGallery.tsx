import React from 'react';
import { ProjectCard } from './ProjectCard';
import { Project } from '../types';
import { projects } from '../data/projects';

interface ProjectGalleryProps {
  onOpenDetails: (project: Project) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onOpenDetails }) => {
  return (
    <section id="projects" className="relative py-24 sm:py-32 cyber-grid">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b border-[#272733]">
          <div>
            <div className="flex items-center space-x-2 text-[#FF5B35] font-mono text-xs uppercase tracking-widest mb-3">
              <span>// 01. PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F4F0E6]">
              SELECTED <span className="text-[#FF5B35]">PROJECTS</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-sans text-sm sm:text-base text-[#A7A3AD] max-w-md">
            Custom engineered platforms combining mathematical optimization, deep learning telemetry, and production-grade full-stack architecture.
          </p>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-12 sm:space-y-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
