import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { SkillsMarquee } from '@/components/home/SkillsMarquee';
import { ExperienceStrip } from '@/components/home/ExperienceStrip';
import { SelectedProjects } from '@/components/home/SelectedProjects';
import { ProcessSection } from '@/components/home/ProcessSection';
import { SideProjects } from '@/components/home/SideProjects';
import { ContactCTA } from '@/components/home/ContactCTA';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with multi-script marquee & 3D character */}
      <HeroSection />

      {/* 2. Skills marquee moving in opposite directions */}
      <SkillsMarquee />

      {/* 3. Experience strip with tool floating logos */}
      <ExperienceStrip />

      {/* 4. Selected Projects 2-column grid */}
      <SelectedProjects />

      {/* 5. Sticky Process section "How I build better products" */}
      <ProcessSection />

      {/* 6. Side projects & experiments bento */}
      <SideProjects />

      {/* 7. Contact CTA & transmission trigger */}
      <ContactCTA />
    </>
  );
}
