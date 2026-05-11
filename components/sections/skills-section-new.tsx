'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { Palette, Code2, Sparkles, Layers } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const skillCategories = [
  {
    title: 'UI/UX Design',
    icon: Palette,
    color: 'from-yellow-500 to-amber-500',
    skills: [
      'Figma',
      'Wireframing',
      'Prototyping',
      'User Flow Design',
      'Design System',
      'Mobile UI Design',
      'Web Interface Design',
      'Interaction Design',
      'Visual Hierarchy',
      'UX Research',
    ],
  },
  {
    title: 'Frontend Development',
    icon: Code2,
    color: 'from-amber-500 to-orange-500',
    skills: [
      'Next.js',
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'Responsive Web Design',
      'Framer Motion',
      'REST API Integration',
      'UI Animation',
    ],
  },
  {
    title: 'Backend Development',
    icon: Layers,
    color: 'from-orange-500 to-red-500',
    skills: [
      'Node.js',
      'Supabase',
      'PostgreSQL',
      'Authentication System',
      'CRUD System',
      'API Development',
      'Database Design',
      'Server Deployment',
    ],
  },
  {
    title: 'Social Media Design',
    icon: Sparkles,
    color: 'from-red-500 to-rose-500',
    skills: [
      'Content Planning',
      'Instagram Feed Design',
      'Short Form Content',
      'Adobe Photoshop',
      'Canva Creative Design',
    ],
  },
];

const additionalSkills = [
  'Git & GitHub',
  'Vercel Deployment',
  'Creative Direction',
  'Problem Solving',
  'Team Collaboration',
  'Project Management',
];

export function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, isInView } = useScrollAnimation();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <section
      id="skills"
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
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold tracking-widest text-amber-600 dark:text-amber-500 uppercase mb-4">
            Expertise
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Skills &
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Capabilities
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Design-focused skillset with strong technical implementation abilities,
            specializing in creating beautiful and functional digital experiences.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <motion.div 
          className="space-y-12 md:space-y-16"
          style={mounted ? { y: y1 } : {}}
          suppressHydrationWarning
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <category.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold">{category.title}</h3>
              </div>

              {/* Skills Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-amber-500 dark:hover:border-amber-500 transition-all"
                  >
                    <span className="font-medium text-center block text-sm md:text-base">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center pt-16 md:pt-20 mt-16 md:mt-20 border-t border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8">Additional Skills</h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {additionalSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="px-5 py-2.5 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-amber-500 dark:hover:border-amber-500 transition-all"
              >
                <span className="font-medium text-sm md:text-base">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Focus Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 border border-amber-500/20 dark:border-amber-500/30">
            <p className="text-lg font-medium">
              <span className="text-gray-600 dark:text-gray-400">Primary Focus:</span>{' '}
              <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent font-bold">
                UI/UX Design & Creative Direction
              </span>
            </p>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
