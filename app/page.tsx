import { HeroSection } from '@/components/home/HeroSection';
import { BuildingTicker } from '@/components/home/BuildingTicker';
import { SelectedProjects } from '@/components/home/SelectedProjects';
import { ProcessSection } from '@/components/home/ProcessSection';
import { Testimonials } from '@/components/home/Testimonials';
import { PlaygroundTeaser } from '@/components/home/PlaygroundTeaser';
import { SkillsMarquee } from '@/components/home/SkillsMarquee';
import { ContactCTA } from '@/components/home/ContactCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BuildingTicker />
      <SelectedProjects />
      <ProcessSection />
      <Testimonials />
      <PlaygroundTeaser />
      <SkillsMarquee />
      <ContactCTA />
    </>
  );
}
