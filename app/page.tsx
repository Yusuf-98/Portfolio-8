import Footer from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { About } from '@/components/sections/About';
import ContactSection from '@/components/sections/ContactSection';
import ExperienceWorkWrapper from '@/components/sections/ExperienceWorkWrapper';
import FAQSection from '@/components/sections/FAQSection';
import { Hero } from '@/components/sections/Hero';
import PortfolioSection from '@/components/sections/PortfolioSection';
import { Services } from '@/components/sections/Services';
import { Skills } from '@/components/sections/Skills';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Skills />
      <ExperienceWorkWrapper />
      <PortfolioSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
