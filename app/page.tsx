import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesShowcase } from '@/components/sections/features-showcase';
import { AboutBento } from '@/components/sections/about-bento';
import { TechStack3D } from '@/components/sections/tech-stack-3d';
import { ProjectsModern } from '@/components/sections/projects-modern';
import { TestimonialsBrutalist } from '@/components/sections/testimonials-brutalist';
import { LogoTickerBrutalist } from '@/components/sections/logo-ticker-brutalist';
import { SkillsModern } from '@/components/sections/skills-modern';
import { PricingModern } from '@/components/sections/pricing-modern';
import { FAQBrutalist } from '@/components/sections/faq-brutalist';
import { ContactModern } from '@/components/sections/contact-modern';
import NetworkBackgroundBrutalist from '@/components/ui/network-background-brutalist';
import { MinimalLoader, InstantDivider } from '@/components/ui/brutalist-elements';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';
import { TerminalLayout } from '@/components/layout/terminal-layout';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <>
      <MinimalLoader />
      <NetworkBackgroundBrutalist />
      <WhatsAppButton />
      
      <TerminalLayout>
        <div className="space-y-12 md:space-y-16 lg:space-y-24">
          <section id="home">
            <HeroSection />
          </section>

          <InstantDivider />

          <section id="about">
            <FeaturesShowcase />
            <div className="mt-12 md:mt-16 lg:mt-24">
              <AboutBento />
            </div>
          </section>

          <InstantDivider />

          <section id="projects">
            <TechStack3D />
            <div className="mt-12 md:mt-16 lg:mt-24">
              <ProjectsModern />
            </div>
          </section>

          <InstantDivider />

          <section id="testimonials">
            <TestimonialsBrutalist />
          </section>

          <InstantDivider />

          <section id="clients">
            <LogoTickerBrutalist />
          </section>

          <InstantDivider />

          <section id="skills">
            <SkillsModern />
          </section>

          <InstantDivider />

          <section id="pricing">
            <PricingModern />
          </section>

          <InstantDivider />

          <section id="faq">
            <FAQBrutalist />
          </section>

          <InstantDivider />

          <section id="contact">
            <ContactModern />
          </section>

          <InstantDivider />

          {/* Footer */}
          <Footer />
        </div>
      </TerminalLayout>
    </>
  );
}
