'use client';

import { motion } from 'framer-motion';

const techStack = [
  { name: 'React', category: 'Framework' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Figma', category: 'Design' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'Git', category: 'Tools' },
];

export function TechStack3D() {
  return (
    <section className="relative py-32 border-t border-gray-200">
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
            Technologies I Use
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.95]">
            Tech
            <br />
            Stack
          </h2>
          <p className="text-base text-gray-500 max-w-lg mt-8 leading-relaxed">
            Modern tools and technologies I work with daily
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
              className="bg-white p-8 md:p-10 group cursor-default hover:bg-black transition-colors duration-0"
            >
              <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-4 group-hover:text-gray-600 transition-colors duration-0">
                {tech.category}
              </p>
              <p className="text-lg font-semibold tracking-tight text-black group-hover:text-white transition-colors duration-0">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
