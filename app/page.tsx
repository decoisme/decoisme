import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesShowcase } from '@/components/sections/features-showcase';
import { AboutBento } from '@/components/sections/about-bento';
import { TechStack3D } from '@/components/sections/tech-stack-3d';
import { ProjectsModern } from '@/components/sections/projects-modern';
import { SkillsModern } from '@/components/sections/skills-modern';
import { PricingModern } from '@/components/sections/pricing-modern';
import { ContactModern } from '@/components/sections/contact-modern';
import { LoadingScreen } from '@/components/ui/loading-screen';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <FeaturesShowcase />
        <AboutBento />
        <TechStack3D />
        <ProjectsModern />
        <SkillsModern />
        <PricingModern />
        <ContactModern />
      </main>
      <Footer />
    </>
  );
}
