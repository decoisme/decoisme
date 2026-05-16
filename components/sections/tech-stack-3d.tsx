'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

const techStack = [
  { name: 'React', icon: '⚛️', color: 'from-yellow-500 to-amber-500', delay: 0 },
  { name: 'Next.js', icon: '▲', color: 'from-amber-500 to-orange-500', delay: 0.1 },
  { name: 'TypeScript', icon: 'TS', color: 'from-orange-500 to-amber-600', delay: 0.2 },
  { name: 'Tailwind', icon: '🎨', color: 'from-yellow-600 to-amber-500', delay: 0.3 },
  { name: 'Figma', icon: '🎯', color: 'from-amber-600 to-yellow-600', delay: 0.4 },
  { name: 'Framer', icon: '✨', color: 'from-orange-600 to-amber-500', delay: 0.5 },
  { name: 'Supabase', icon: '⚡', color: 'from-yellow-500 to-orange-500', delay: 0.6 },
  { name: 'Git', icon: '🔧', color: 'from-amber-500 to-yellow-600', delay: 0.7 },
];

function TechOrb({ tech, index }: { tech: typeof techStack[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate orbit position
  const angle = (index / techStack.length) * Math.PI * 2;
  const radius = 200;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: tech.delay }}
      animate={{
        x: [x, x * 1.1, x],
        y: [y, y * 1.1, y],
        transition: {
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      style={{
        left: '50%',
        top: '50%',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${tech.color} p-0.5 cursor-pointer`}
        whileHover={{ scale: 1.2, rotate: 10 }}
        animate={isHovered ? { rotate: [0, -5, 5, -5, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Glow Effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-2xl blur-xl opacity-0`}
          animate={isHovered ? { opacity: 0.6, scale: 1.5 } : { opacity: 0, scale: 1 }}
        />
        
        {/* Card Content */}
        <div className="relative w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-2">
          <span className="text-3xl">{tech.icon}</span>
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
            {tech.name}
          </span>
        </div>

        {/* Floating Particles */}
        {isHovered && (
          <>
            <motion.div
              className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-yellow-400"
              animate={{
                y: [-10, -20, -10],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-amber-400"
              animate={{
                y: [10, 20, 10],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export function TechStack3D() {
  return (
    <section className="relative py-32 overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-yellow-500/5 to-amber-500/5 rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Technologies I Use
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              Tech
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
              Stack
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Modern tools and technologies I work with daily
          </p>
        </motion.div>

        {/* 3D Orbit */}
        <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center">
          {/* Center Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl">
              <span className="text-4xl">💻</span>
            </div>
            
            {/* Pulse Rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-yellow-500/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-amber-500/30"
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </motion.div>

          {/* Orbiting Tech Icons */}
          {techStack.map((tech, index) => (
            <TechOrb key={tech.name} tech={tech} index={index} />
          ))}

          {/* Orbit Rings */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-dashed border-yellow-500/20" />
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-[450px] h-[450px] md:w-[550px] md:h-[550px] rounded-full border border-dashed border-amber-500/10" />
          </motion.div>
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Hover over the icons to see them in action ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
}
