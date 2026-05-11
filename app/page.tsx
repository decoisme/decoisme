import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProjectsSection } from '@/components/sections/projects-section-new';
import { SkillsSection } from '@/components/sections/skills-section-new';
import { ContactSection } from '@/components/sections/contact-section';
import { LoadingScreen } from '@/components/ui/loading-screen';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
