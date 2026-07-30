'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Code2 } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';

interface Project {
  id: string;
  title: string;
  description: string;
  short_description: string;
  image_url: string;
  category: string;
  date: string;
  platform: string[];
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
}

export function ProjectsModern() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data) {
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section
      id="projects"
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
            Portfolio
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.95]">
            Featured
            <br />
            Projects
          </h2>
          <p className="text-base text-gray-500 max-w-lg mt-8 leading-relaxed">
            A collection of my design and development work, showcasing creative solutions and user-centered experiences
          </p>
        </motion.div>

        {/* Brutalist Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mb-16"
        >
          <div className="flex border border-black rounded-none overflow-hidden">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest transition-colors duration-0 ${
                  index !== categories.length - 1 ? 'border-r border-black' : ''
                } ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid - Instant Transition */}
        <motion.div
          key={selectedCategory}
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          transition={{ duration: 0.1, ease: 'linear' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
              className="bg-white group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-0"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-400 uppercase tracking-widest">No Image</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-0">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-0"
                    >
                      <Code2 className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-black text-white border border-black flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-0"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">
                    {project.category}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {project.date}
                  </span>
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-black mb-2 group-hover:text-gray-600 transition-colors duration-0">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-2">
                  {project.short_description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.platform.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs text-gray-500 border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-sm text-gray-400">No projects found in this category</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
