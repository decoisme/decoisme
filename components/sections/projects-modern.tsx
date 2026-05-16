'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar, ExternalLink, Code2, Sparkles } from 'lucide-react';
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
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

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
      ref={sectionRef}
      id="projects"
      className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl"
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
            <Sparkles className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              PORTFOLIO
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              Featured
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of my design and development work, showcasing creative solutions and user-centered experiences
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-amber-500 dark:hover:border-amber-500'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group"
            >
              <div className="relative h-full rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden hover:shadow-2xl transition-all duration-500">
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 text-white text-xs font-bold">
                    {project.category}
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  {project.image_url ? (
                    <motion.img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={hoveredProject === project.id ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                      <span className="text-6xl">🎨</span>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={hoveredProject === project.id ? { opacity: 1 } : { opacity: 0 }}
                  />

                  {/* Action Buttons */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={hoveredProject === project.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  >
                    {project.github_url && (
                      <a 
                        href={project.github_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/90 hover:bg-white text-gray-900 transition-colors"
                      >
                        <Code2 className="h-4 w-4" />
                      </a>
                    )}
                    {project.live_url && (
                      <a 
                        href={project.live_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{project.date}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.short_description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.platform.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400">No projects found in this category</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
