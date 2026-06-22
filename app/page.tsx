import { Navbar } from '@/components/layout/Navbar';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Skills } from '@/components/sections/Skills';
import WorkSection from '@/components/sections/WorkSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Skills />
      <Experience />
      <WorkSection />
    </main>
  );
}
