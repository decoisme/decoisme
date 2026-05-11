'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { Code2, Palette, Rocket, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useRef, useEffect, useState } from 'react';

const techStack = [
  { name: 'Next.js', category: 'Framework' },
  { name: 'React', category: 'Library' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'Framer Motion', category: 'Animation' },
];

const experiences = [
  {
    year: '2024',
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    description: 'Leading development of enterprise-scale web applications',
  },
  {
    year: '2022',
    title: 'Frontend Developer',
    company: 'Creative Digital Agency',
    description: 'Crafting beautiful and performant user interfaces',
  },
  {
    year: '2020',
    title: 'Junior Developer',
    company: 'Startup Studio',
    description: 'Building MVPs and learning modern web technologies',
  },
];

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable, and efficient code',
  },
  {
    icon: Palette,
    title: 'Design Focus',
    description: 'Pixel-perfect implementations with attention to detail',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Optimized for speed and exceptional user experience',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Staying ahead with cutting-edge technologies',
  },
];

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, isInView } = useScrollAnimation();
  const [mounted, setMounted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gray-50 dark:bg-gray-950"
    >
      <div ref={inViewRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium tracking-wider text-gray-600 dark:text-gray-400 uppercase mb-4">
            About Me
          </p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Passionate About
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Creating Excellence
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A creative developer with a keen eye for design and a passion for
            building exceptional digital experiences that make a difference.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          style={mounted ? { y: y1 } : {}}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="px-6 py-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
              >
                <span className="font-medium">{tech.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  {tech.category}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={mounted ? { y: y2 } : {}}
        >
          <h3 className="text-2xl font-bold mb-12 text-center">Experience</h3>
          <div className="max-w-3xl mx-auto space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                className="relative pl-8 border-l-2 border-gray-300 dark:border-gray-700"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600" />
                <div className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {exp.year}
                </div>
                <h4 className="text-xl font-bold mb-1">{exp.title}</h4>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {exp.company}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
