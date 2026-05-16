'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Code2, 
  Palette, 
  Rocket, 
  Zap,
  Heart,
  Coffee,
  Music,
  Camera,
  MapPin,
  Mail,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AboutBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const bentoItems = [
    {
      id: 1,
      title: 'About Me',
      description: 'Passionate UI/UX designer with 5+ years of experience creating beautiful digital experiences',
      icon: Heart,
      gradient: 'from-yellow-500 to-amber-600',
      size: 'lg:col-span-2 lg:row-span-2',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Hi! I'm a creative designer who loves turning ideas into beautiful, functional designs. 
            I believe great design is not just about aesthetics, but about solving real problems.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Creative', 'Detail-Oriented', 'Problem Solver', 'Team Player'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Location',
      description: 'Based in Indonesia',
      icon: MapPin,
      gradient: 'from-amber-500 to-orange-600',
      size: 'lg:col-span-1',
      content: (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-semibold">Indonesia</p>
            <p className="text-sm text-gray-500">GMT+7</p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Coffee Lover',
      description: 'Fueled by coffee ☕',
      icon: Coffee,
      gradient: 'from-orange-500 to-amber-600',
      size: 'lg:col-span-1',
      content: (
        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-6xl mb-2"
          >
            ☕
          </motion.div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Coffee enthusiast
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Design Tools',
      description: 'Figma, Adobe XD, Sketch',
      icon: Palette,
      gradient: 'from-yellow-600 to-amber-500',
      size: 'lg:col-span-1 lg:row-span-2',
      content: (
        <div className="space-y-3">
          {['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator'].map((tool, i) => (
            <motion.div
              key={tool}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600" />
              <span className="font-medium">{tool}</span>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: 5,
      title: 'Hobbies',
      description: 'Music, Photography, Travel',
      icon: Music,
      gradient: 'from-amber-600 to-yellow-500',
      size: 'lg:col-span-1',
      content: (
        <div className="flex gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
            <Music className="h-8 w-8 text-amber-600" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, rotate: -10 }}>
            <Camera className="h-8 w-8 text-amber-600" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
            <MapPin className="h-8 w-8 text-amber-600" />
          </motion.div>
        </div>
      ),
    },
    {
      id: 6,
      title: 'Get in Touch',
      description: 'Let\'s work together',
      icon: Mail,
      gradient: 'from-orange-600 to-amber-500',
      size: 'lg:col-span-2',
      content: (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Available for freelance projects
            </p>
            <Button className="rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white">
              <Mail className="h-4 w-4 mr-2" />
              Contact Me
            </Button>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="hidden md:block"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
              <Mail className="h-10 w-10 text-white" />
            </div>
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
        style={{ y }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Get to Know Me
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              About
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(item.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`${item.size} group relative`}
            >
              <div className="h-full p-6 md:p-8 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Gradient Glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-2xl`}
                  animate={hoveredCard === item.id ? { scale: 1.5 } : { scale: 1 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  
                  <div className="mt-4">
                    {item.content}
                  </div>
                </div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%', skewX: -20 }}
                  animate={hoveredCard === item.id ? { x: '200%' } : { x: '-100%' }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download CV Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button className="rounded-full px-8 py-6 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white font-medium shadow-lg hover:shadow-xl transition-all">
            <Download className="h-5 w-5 mr-2" />
            Download CV
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
