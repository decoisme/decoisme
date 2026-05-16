'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code2, Palette, Layers, Sparkles, Zap, Database } from 'lucide-react';

const skillCategories = [
  {
    id: 'uiux',
    title: 'UI/UX Design',
    icon: Palette,
    gradient: 'from-yellow-500 to-amber-600',
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
    gradient: 'from-amber-500 to-orange-600',
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
    gradient: 'from-orange-500 to-amber-600',
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
    gradient: 'from-yellow-600 to-amber-500',
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
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative py-32 overflow-hidden bg-gray-900 text-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(251 191 36) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              EXPERTISE
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            <span className="text-white">
              Skills &
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Capabilities
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Design-focused skillset with strong technical implementation abilities, specializing in creating beautiful and functional digital experiences
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="space-y-8 mb-16">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
                className="relative"
              >
                <div className="relative p-8 rounded-3xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 hover:border-amber-500/50 transition-all duration-500 overflow-hidden group">
                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    animate={hoveredCategory === category.id ? { scale: 1.5 } : { scale: 1 }}
                  />

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 relative z-10">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        onHoverStart={() => setHoveredSkill(skill)}
                        onHoverEnd={() => setHoveredSkill(null)}
                      >
                        <motion.div
                          className="px-4 py-3 rounded-xl bg-gray-900/80 border border-gray-700 hover:border-amber-500 transition-all cursor-default text-center"
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                            {skill}
                          </span>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Additional Skills</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {additionalSkills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div className="px-5 py-2.5 rounded-full bg-gray-800/80 border border-gray-700 hover:border-amber-500 transition-all">
                  <span className="text-sm font-medium text-gray-300">{skill}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Primary Focus */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block"
          >
            <div className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border-2 border-amber-500/50">
              <p className="text-sm text-gray-400 mb-1">Primary Focus:</p>
              <p className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                UI/UX Design & Creative Direction
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
