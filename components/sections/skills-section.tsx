'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import {
  Code2,
  Palette,
  Database,
  Smartphone,
  Cloud,
  Zap,
  Layout,
  GitBranch,
} from 'lucide-react';

const skills = [
  { name: 'React', icon: Code2, level: 95 },
  { name: 'Next.js', icon: Code2, level: 90 },
  { name: 'TypeScript', icon: Code2, level: 88 },
  { name: 'Tailwind CSS', icon: Palette, level: 92 },
  { name: 'Node.js', icon: Database, level: 85 },
  { name: 'Supabase', icon: Database, level: 80 },
  { name: 'UI/UX Design', icon: Layout, level: 87 },
  { name: 'Git', icon: GitBranch, level: 90 },
];

const marqueeItems = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Supabase',
  'Node.js',
  'PostgreSQL',
  'GraphQL',
  'REST API',
  'Docker',
  'AWS',
  'Vercel',
  'Git',
  'Figma',
  'Adobe XD',
];

export function SkillsSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 overflow-hidden bg-gray-50 dark:bg-gray-950"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium tracking-wider text-gray-600 dark:text-gray-400 uppercase mb-4">
            Expertise
          </p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Skills &
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and beautiful
            web applications.
          </p>
        </motion.div>

        {/* Animated Marquee */}
        <div className="relative mb-20 overflow-hidden">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <motion.div
                key={index}
                className="inline-flex items-center px-6 py-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.05 }}
              >
                <span className="text-lg font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Grid with Progress */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                    <skill.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-lg">{skill.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {skill.level}%
                </span>
              </div>
              <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Icon Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <div className="flex flex-wrap justify-center gap-6">
            {[Code2, Palette, Database, Smartphone, Cloud, Zap, Layout, GitBranch].map(
              (Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center shadow-sm hover:shadow-lg transition-all"
                >
                  <Icon className="h-8 w-8 text-gray-700 dark:text-gray-300" />
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
