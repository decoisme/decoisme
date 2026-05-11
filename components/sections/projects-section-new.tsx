// @ts-nocheck
'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { Card } from '@/components/ui/card';
import { ExternalLink, X, Calendar, Layers } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { getSupabase, Project } from '@/lib/supabase';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Custom Image component with fallback
function ProjectImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white text-2xl font-bold">
          {alt.charAt(0)}
        </div>
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
          <div className="animate-pulse w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => {
          console.error('Image failed to load:', src);
          setError(true);
        }}
        onLoad={() => {
          console.log('Image loaded successfully:', alt);
          setLoaded(true);
        }}
        style={{ display: loaded ? 'block' : 'none' }}
      />
    </>
  );
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, isInView } = useScrollAnimation();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    console.log('ProjectsSection mounted');
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    console.log('Fetching projects...');
    try {
      const client = getSupabase();
      
      if (client) {
        console.log('Supabase client available, fetching from database...');
        const { data, error } = await client
          .from('projects')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        console.log('Fetched projects from Supabase:', data);
        console.log('Number of projects:', data?.length || 0);
        
        // Log image URLs for debugging
        data?.forEach(project => {
          console.log(`Project: ${project.title}`);
          console.log(`  Image URL: ${project.image_url}`);
          console.log(`  Gallery: ${project.gallery_images?.length || 0} images`);
        });
        
        if (!data || data.length === 0) {
          console.warn('No projects in database, using demo projects');
          setProjects(demoProjects);
        } else {
          setProjects(data);
        }
      } else {
        console.log('Supabase not configured, using demo projects');
        console.log('Demo projects:', demoProjects);
        setProjects(demoProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      console.log('Falling back to demo projects');
      console.log('Demo projects count:', demoProjects.length);
      setProjects(demoProjects);
    } finally {
      setLoading(false);
      console.log('Loading complete');
    }
  };

  if (!mounted) {
    return null;
  }

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  return (
    <>
    <section
      id="projects"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      <div ref={inViewRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold tracking-widest text-amber-600 dark:text-amber-500 uppercase mb-4">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Featured
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A collection of my design and development work, showcasing creative solutions
            and user-centered experiences.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-gray-200 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">📁</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">No Projects Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Projects belum ditambahkan. Tambahkan via Admin Dashboard atau jalankan SQL script untuk insert demo projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="rounded-full">
                <a href="/admin/dashboard">
                  Go to Admin Dashboard
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href="#contact">
                  Contact Me
                </a>
              </Button>
            </div>
            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl max-w-2xl mx-auto">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Debug Info:</strong> Buka console (F12) untuk melihat error details.
                <br />
                Atau jalankan SQL dari file <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">INSERT_PROJECTS_SIMPLE.sql</code>
              </p>
            </div>
          </div>
        ) : (
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            style={mounted ? { y } : {}}
            suppressHydrationWarning
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onClick={() => openProject(project)}
                className="cursor-pointer"
              >
                <Card className="group relative overflow-hidden rounded-3xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 h-full hover:shadow-2xl transition-all duration-500">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
                    <ProjectImage
                      src={project.image_url}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span>{project.date}</span>
                    </div>

                    <h3 className="text-2xl font-bold group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {project.short_description}
                    </p>

                    {/* Platform Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.platform.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.platform.length > 3 && (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                          +{project.platform.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      </div>
    </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-950 rounded-3xl shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={closeProject}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Gallery */}
              <div className="relative h-96 bg-gray-100 dark:bg-gray-900">
                <ProjectImage
                  src={selectedProject.gallery_images?.[currentImageIndex] || selectedProject.image_url}
                  alt={selectedProject.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Gallery Navigation */}
                {selectedProject.gallery_images && selectedProject.gallery_images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.gallery_images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'w-8 bg-white'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                      {selectedProject.category}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedProject.date}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-4xl font-bold mb-4">{selectedProject.title}</h2>
                  
                  {/* Animated Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
                  >
                    {selectedProject.description}
                  </motion.p>
                </div>

                {/* Platform & Skills */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Layers className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <h3 className="font-semibold">Platform & Tools</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.platform.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech_stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                {selectedProject.live_url && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      asChild
                      size="lg"
                      className="w-full md:w-auto rounded-full px-8 py-6 text-base font-medium bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white"
                    >
                      <a
                        href={selectedProject.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Project
                        <ExternalLink className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Demo projects with new structure
const demoProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Mobile App',
    short_description: 'Modern shopping experience with intuitive UI and smooth animations',
    description: 'A comprehensive e-commerce mobile application featuring a clean, modern interface with smooth animations and intuitive navigation. Designed with user experience in mind, incorporating best practices in mobile UI/UX design.',
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop',
    ],
    category: 'UI/UX Design',
    date: 'January 2024',
    platform: ['Figma', 'Mobile Design', 'Prototyping'],
    tech_stack: ['React Native', 'TypeScript', 'Tailwind'],
    live_url: 'https://example.com',
    featured: true,
    created_at: new Date().toISOString(),
    order_index: 1,
  },
  {
    id: '2',
    title: 'SaaS Dashboard',
    short_description: 'Analytics dashboard with data visualization and real-time updates',
    description: 'A powerful SaaS dashboard featuring comprehensive data visualization, real-time analytics, and an intuitive interface. Built with modern design principles and optimized for performance.',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
    ],
    category: 'Web Design',
    date: 'December 2023',
    platform: ['Figma', 'Web Design', 'Design System'],
    tech_stack: ['Next.js', 'Supabase', 'Chart.js'],
    live_url: 'https://example.com',
    featured: true,
    created_at: new Date().toISOString(),
    order_index: 2,
  },
  {
    id: '3',
    title: 'Brand Identity Design',
    short_description: 'Complete brand identity including logo, colors, and guidelines',
    description: 'A comprehensive brand identity project including logo design, color palette, typography system, and brand guidelines. Created to establish a strong, memorable brand presence.',
    image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
    ],
    category: 'Branding',
    date: 'November 2023',
    platform: ['Adobe Illustrator', 'Figma', 'Brand Design'],
    tech_stack: ['Design System', 'Style Guide'],
    live_url: 'https://example.com',
    featured: true,
    created_at: new Date().toISOString(),
    order_index: 3,
  },
];
