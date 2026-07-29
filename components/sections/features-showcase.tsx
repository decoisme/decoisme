'use client';

import { motion } from 'framer-motion';
import {
  Palette,
  Code2,
  Zap,
  Layers,
  Eye,
  Rocket,
} from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Creative Design',
    description: 'Crafting beautiful, user-centered interfaces that captivate and engage',
    delay: 0,
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code with modern best practices',
    delay: 0.05,
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Optimized for speed and efficiency across all devices',
    delay: 0.1,
  },
  {
    icon: Layers,
    title: 'Responsive Design',
    description: 'Seamless experience from mobile to desktop and everything in between',
    delay: 0.15,
  },
  {
    icon: Eye,
    title: 'Attention to Detail',
    description: 'Every pixel matters, every interaction is thoughtfully crafted',
    delay: 0.2,
  },
  {
    icon: Rocket,
    title: 'Innovation First',
    description: 'Pushing boundaries with cutting-edge technologies and trends',
    delay: 0.25,
  },
];

export function FeaturesShowcase() {
  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mb-24"
        >
          <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-6">
            What I Bring
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.95]">
            Crafting Digital
            <br />
            Experiences
          </h2>
          <p className="text-base text-gray-500 max-w-lg mt-8 leading-relaxed">
            Combining creativity, technical expertise, and attention to detail to deliver exceptional results
          </p>
        </motion.div>

        {/* Features List */}
        <div className="border-t border-gray-200">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: feature.delay, ease: 'easeOut' }}
                className="group border-b border-gray-200 py-8 md:py-10 grid md:grid-cols-12 gap-4 md:gap-8 items-start cursor-default"
              >
                {/* Number */}
                <div className="md:col-span-1">
                  <span className="text-xs font-medium tracking-widest text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title + Icon */}
                <div className="md:col-span-4 flex items-center gap-4">
                  <Icon className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors duration-0 flex-shrink-0" />
                  <h3 className="text-lg font-semibold tracking-tight text-black">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-7">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
