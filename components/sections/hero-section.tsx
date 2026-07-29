'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';

export function HeroSection() {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    loadHeroSettings();
  }, []);

  const loadHeroSettings = async () => {
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('hero_settings')
        .select('hero_image_url')
        .eq('id', '00000000-0000-0000-0000-000000000001')
        .single();

      if (data && !error) {
        // @ts-ignore - Supabase type inference issue
        setHeroImage(data.hero_image_url);
      }
    } catch (error) {
      console.error('Error loading hero settings:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.p
                className="text-xs font-medium tracking-widest text-gray-500 uppercase"
                variants={itemVariants}
              >
                Muhammad Dinan Ghifari
              </motion.p>
              <motion.h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-black"
                variants={itemVariants}
              >
                UI/UX
                <br />
                Designer
              </motion.h1>
              <motion.p
                className="text-xs font-medium tracking-widest text-gray-500 uppercase"
                variants={itemVariants}
              >
                & Creative Developer
              </motion.p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base text-gray-500 max-w-md leading-relaxed"
            >
              Crafting beautiful, user-centered digital experiences through thoughtful design and clean code.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 items-center"
            >
              <a href="#projects">
                <button className="px-8 py-3 text-xs font-medium uppercase tracking-widest bg-black text-white hover:bg-white hover:text-black border border-black transition-colors duration-0 flex items-center gap-3">
                  View My Work
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </a>

              <a href="#contact">
                <button className="px-8 py-3 text-xs font-medium uppercase tracking-widest bg-white text-black border border-gray-200 hover:border-black transition-colors duration-0">
                  Get in Touch
                </button>
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-3 items-center pt-2"
            >
              <a
                href="https://github.com/decoisme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black transition-colors duration-0"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-dinan-ghifari-b25251291/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black transition-colors duration-0"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:decoisme.works@gmail.com"
                className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black transition-colors duration-0"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto border border-black">
              {heroImage ? (
                <img
                  src={heroImage}
                  alt="Hero"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Failed to load hero image:', heroImage);
                    e.currentTarget.style.display = 'none';
                    const placeholder = e.currentTarget.nextElementSibling;
                    if (placeholder) {
                      (placeholder as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div
                className="absolute inset-0 bg-gray-50 flex items-center justify-center"
                style={{ display: heroImage ? 'none' : 'flex' }}
              >
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-black mx-auto" />
                  <p className="text-xs text-gray-400 uppercase tracking-widest">
                    Upload via Admin
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
