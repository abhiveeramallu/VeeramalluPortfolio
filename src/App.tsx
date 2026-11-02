import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { ProjectGallery } from './components/ProjectGallery';
import { ProjectModal } from './components/ProjectModal';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Playground } from './components/Playground';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Contact } from './components/Contact';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { Project } from './types';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#101014] text-[#F4F0E6] relative selection:bg-[#FF5B35] selection:text-white">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Hero Section with Massive Typography and 3D Terminal Canvas */}
      <main>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Dynamic Editorial Marquee */}
        <Marquee />

        {/* Selected Projects Showcase with 3D Simulations */}
        <ProjectGallery onOpenDetails={(proj) => setSelectedProject(proj)} />

        {/* Storytelling About Section */}
        <About />

        {/* Interactive Skills Matrix */}
        <Skills />

        {/* Experimental Interactive Playground */}
        <Playground />

        {/* Academic & Professional Timeline */}
        <ExperienceTimeline />

        {/* Contact Section with 3D Canvas */}
        <Contact onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Detailed Project Experience Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Verified Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};

export default App;
