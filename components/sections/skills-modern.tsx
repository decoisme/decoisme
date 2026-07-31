'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Database, Zap } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const skillCategories = [
  {
    id: 'uiux',
    title: 'UI/UX Design',
    icon: Palette,
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
    id: 'frontend',
    title: 'Frontend Development',
    icon: Code2,
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
    id: 'backend',
    title: 'Backend Development',
    icon: Database,
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
    id: 'social',
    title: 'Social Media Design',
    icon: Zap,
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

export function SkillsModern() {
  const { t } = useI18n();
  
  return (
    <section
      id="skills"
      className="relative py-32 border-t border-gray-200"
    >
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
            {t('skills.label')}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.95]">
            {t('skills.title.line1')}
            <br />
            {t('skills.title.line2')}
          </h2>
          <p className="text-base text-gray-500 max-w-lg mt-8 leading-relaxed">
            {t('skills.description')}
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="border-t border-gray-200">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: categoryIndex * 0.05,
                  ease: 'easeOut',
                }}
                className="border-b border-gray-200 py-10 md:py-14"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <Icon className="h-4 w-4 text-gray-400" />
                  <h3 className="text-xs font-medium tracking-widest text-gray-500 uppercase">
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-4 py-2 text-sm text-gray-500 border border-gray-200 hover:border-black hover:text-black cursor-default transition-colors duration-0"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mt-16"
        >
          <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-8">
            {t('skills.additional')}
          </p>
          <div className="flex flex-wrap gap-2 mb-16">
            {additionalSkills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 text-sm text-gray-500 border border-gray-200 hover:border-black hover:text-black cursor-default transition-colors duration-0"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Primary Focus */}
          <div className="border border-black p-8 inline-block">
            <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-2">
              {t('skills.focus')}
            </p>
            <p className="text-xl font-bold tracking-tight text-black">
              {t('skills.focusValue')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
