'use client';

import { motion } from 'framer-motion';
import {
  Heart,
  MapPin,
  Coffee,
  Palette,
  Music,
  Camera,
  Mail,
  Download,
} from 'lucide-react';

export function AboutBento() {
  const tags = ['Creative', 'Detail-Oriented', 'Problem Solver', 'Team Player'];
  const tools = ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator'];
  const hobbies = [
    { icon: Music, label: 'Music' },
    { icon: Camera, label: 'Photography' },
    { icon: MapPin, label: 'Travel' },
  ];

  return (
    <section
      id="about"
      className="relative py-32"
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
            Get to Know Me
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.95]">
            About
            <br />
            Me
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
          {/* About Me — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:col-span-2 bg-white p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-4 w-4 text-gray-400" />
              <span className="text-xs font-medium tracking-widest text-gray-500 uppercase">About Me</span>
            </div>
            <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-lg">
              Hi! I'm a creative designer who loves turning ideas into beautiful, functional designs.
              I believe great design is not just about aesthetics, but about solving real problems.
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium uppercase tracking-widest border border-black text-black"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05, ease: 'easeOut' }}
            className="bg-white p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-xs font-medium tracking-widest text-gray-500 uppercase">Location</span>
            </div>
            <p className="text-2xl font-bold tracking-tight text-black">Indonesia</p>
            <p className="text-xs text-gray-400 tracking-widest uppercase mt-1">GMT+7</p>
          </motion.div>

          {/* Design Tools */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
            className="bg-white p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Palette className="h-4 w-4 text-gray-400" />
              <span className="text-xs font-medium tracking-widest text-gray-500 uppercase">Design Tools</span>
            </div>
            <div className="space-y-0">
              {tools.map((tool) => (
                <div
                  key={tool}
                  className="py-3 border-b border-gray-200 last:border-b-0 group"
                >
                  <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors duration-0">
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Coffee */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
            className="bg-white p-8 md:p-12 flex flex-col items-center justify-center"
          >
            <Coffee className="h-8 w-8 text-gray-400 mb-4" />
            <p className="text-xs text-gray-400 tracking-widest uppercase">
              Coffee Enthusiast
            </p>
          </motion.div>

          {/* Hobbies */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
            className="bg-white p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Music className="h-4 w-4 text-gray-400" />
              <span className="text-xs font-medium tracking-widest text-gray-500 uppercase">Hobbies</span>
            </div>
            <div className="flex gap-6">
              {hobbies.map((hobby) => {
                const Icon = hobby.icon;
                return (
                  <div key={hobby.label} className="text-center group cursor-default">
                    <Icon className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors duration-0 mx-auto mb-2" />
                    <p className="text-xs text-gray-400 tracking-widest uppercase">{hobby.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Get in Touch — spans 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.25, ease: 'easeOut' }}
            className="lg:col-span-3 bg-white p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-xs font-medium tracking-widest text-gray-500 uppercase">Get in Touch</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  Available for freelance projects
                </p>
                <a href="#contact">
                  <button className="px-6 py-2.5 text-xs font-medium uppercase tracking-widest bg-black text-white border border-black hover:bg-white hover:text-black transition-colors duration-0 flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    Contact Me
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Download CV */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-3 text-xs font-medium uppercase tracking-widest bg-white text-black border border-black hover:bg-black hover:text-white transition-colors duration-0 inline-flex items-center gap-3">
            <Download className="h-3.5 w-3.5" />
            Download CV
          </button>
        </motion.div>
      </div>
    </section>
  );
}
