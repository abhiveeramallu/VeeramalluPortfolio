import { Hero } from '@/components/home/Hero';
import { Contents } from '@/components/home/Contents';
import { Projects } from '@/components/home/Projects';
import { About } from '@/components/home/About';
import { Contact } from '@/components/home/Contact';

export default function Home() {
  return (
    <div className="theme-pop">
      <Hero />
      <Contents />
      <Projects />
      <About />
      <Contact />
    </div>
  );
}
