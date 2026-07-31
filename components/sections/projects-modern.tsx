'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, ExternalLink, Code2 } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import { useI18n } from '@/lib/i18n';

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
  const { t } = useI18n();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const supabase = getSupabase();
    if (!supabase) {
      setIsLoading(false);
      return;
    }

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
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  
  // Filter projects
  let filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  // Limit to 6 for "All" category when showAll is false
  const shouldLimitAll = selectedCategory === 'All' && !showAll;
  const hasMoreProjects = selectedCategory === 'All' && projects.length > 6;
  
  if (shouldLimitAll) {
    filteredProjects = filteredProjects.slice(0, 6);
  }

  // Reset showAll when category changes
  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory]);

  // Count projects per category
  const getCategoryCount = (category: string) => {
    if (category === 'All') return projects.length;
    return projects.filter(p => p.category === category).length;
  };

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
            {t('projects.label')}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.95]">
            {t('projects.title.line1')}
            <br />
            {t('projects.title.line2')}
          </h2>
          <p className="text-base text-gray-500 max-w-lg mt-8 leading-relaxed">
            {t('projects.description')}
          </p>
        </motion.div>

        {/* Enhanced Brutalist Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mb-16 space-y-4"
        >
          {/* Filter Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-black" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600">
                FILTER.BY.CATEGORY
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                SHOWING
              </span>
              <div className="px-2 py-1 bg-black text-white text-[10px] font-mono">
                {filteredProjects.length}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                / {projects.length}
              </span>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-px bg-black border border-black">
            {categories.map((category) => {
              const count = getCategoryCount(category);
              const isActive = selectedCategory === category;
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3.5 text-[10px] font-mono uppercase tracking-widest transition-colors duration-0 flex items-center gap-3 ${
                    isActive
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {/* Category Name */}
                  <span className="font-bold">{category}</span>
                  
                  {/* Count Badge */}
                  <span className={`px-2 py-0.5 text-[9px] border transition-colors duration-0 ${
                    isActive 
                      ? 'bg-white text-black border-white' 
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}>
                    {count}
                  </span>

                  {/* Active Indicator */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 bg-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Filter Info Bar */}
          <div className="border border-gray-200 px-4 py-2.5 bg-gray-50">
            <p className="text-[10px] font-mono text-gray-500">
              {selectedCategory === 'All' 
                ? `// DISPLAYING ALL ${projects.length} PROJECTS ACROSS ${categories.length - 1} CATEGORIES`
                : `// FILTERED BY "${selectedCategory.toUpperCase()}" → ${filteredProjects.length} PROJECT${filteredProjects.length !== 1 ? 'S' : ''} FOUND`
              }
            </p>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white">
                <div className="aspect-[4/3] bg-gray-100 animate-pulse" />
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-20 bg-gray-200 animate-pulse" />
                    <div className="h-3 w-16 bg-gray-200 animate-pulse" />
                  </div>
                  <div className="h-5 w-3/4 bg-gray-200 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-200 animate-pulse" />
                    <div className="h-3 w-2/3 bg-gray-200 animate-pulse" />
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-6 w-16 bg-gray-200 animate-pulse" />
                    <div className="h-6 w-20 bg-gray-200 animate-pulse" />
                    <div className="h-6 w-14 bg-gray-200 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Grid - Instant Transition */}
        {!isLoading && (
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
        )}

        {/* View More Button */}
        {!isLoading && selectedCategory === 'All' && hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-3 px-8 py-4 border border-black bg-white hover:bg-black hover:text-white transition-colors duration-0 text-[11px] font-mono uppercase tracking-widest"
            >
              {showAll ? (
                <>
                  <span>SHOW LESS</span>
                  <span className="text-xs">↑</span>
                </>
              ) : (
                <>
                  <span>VIEW ALL PROJECTS</span>
                  <span className="px-2 py-1 bg-black text-white text-[9px]">
                    +{projects.length - 6}
                  </span>
                </>
              )}
            </button>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-4">
              {showAll 
                ? `// SHOWING ALL ${projects.length} PROJECTS`
                : `// SHOWING 6 OF ${projects.length} PROJECTS`
              }
            </p>
          </motion.div>
        )}

        {/* Enhanced Empty State */}
        {!isLoading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-200 py-24 text-center"
          >
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-16 h-16 bg-gray-100 border border-gray-200 mx-auto flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-gray-900 mb-2">
                  NO PROJECTS FOUND
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
                  // TRY SELECTING A DIFFERENT CATEGORY
                </p>
              </div>
              <button
                onClick={() => setSelectedCategory('All')}
                className="inline-flex items-center gap-2 px-4 py-2 border border-black bg-white hover:bg-black hover:text-white transition-colors duration-0 text-[10px] font-mono uppercase tracking-widest"
              >
                RESET FILTER
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
