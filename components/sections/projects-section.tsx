// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSupabase, Project } from '@/lib/supabase';
import Image from 'next/image';

export function ProjectsSection() {
  const { ref, isInView } = useScrollAnimation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const client = getSupabase();
      
      if (client) {
        const { data, error } = await client
          .from('projects')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } else {
        // Use demo data if Supabase is not configured
        setProjects(demoProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to demo data
      setProjects(demoProjects);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium tracking-wider text-gray-600 dark:text-gray-400 uppercase mb-4">
            Portfolio
          </p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Featured
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of my recent work, showcasing innovative solutions and
            creative implementations.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-gray-200 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden rounded-3xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 h-full hover:shadow-2xl transition-all duration-500">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center hover:scale-110 transition-transform"
                          aria-label="View on GitHub"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center hover:scale-110 transition-transform"
                          aria-label="View live demo"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Demo projects for fallback
const demoProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description:
      'A modern e-commerce solution with real-time inventory management and seamless checkout experience.',
    image_url: '',
    tech_stack: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    featured: true,
    created_at: new Date().toISOString(),
    order_index: 1,
  },
  {
    id: '2',
    title: 'AI Content Generator',
    description:
      'Intelligent content creation tool powered by advanced AI models for marketing and creative writing.',
    image_url: '',
    tech_stack: ['React', 'OpenAI', 'Node.js', 'MongoDB'],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    featured: true,
    created_at: new Date().toISOString(),
    order_index: 2,
  },
  {
    id: '3',
    title: 'Portfolio CMS',
    description:
      'Headless CMS for managing portfolio content with intuitive admin dashboard and API.',
    image_url: '',
    tech_stack: ['Next.js', 'Supabase', 'Tailwind', 'Framer Motion'],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    featured: true,
    created_at: new Date().toISOString(),
    order_index: 3,
  },
];
