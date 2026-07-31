'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Terminal, Zap, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/blog/posts');
        const data = await response.json();
        setPosts(data.posts || []);
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredPosts = activeCategory === 'ALL' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Ticker Top */}
      <div className="border-b-2 border-black bg-black text-white overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap py-2"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6 text-xs font-mono uppercase">
              <Sparkles className="h-3 w-3" />
              LATEST.INSIGHTS
              <TrendingUp className="h-3 w-3" />
              DESIGN.CODE.CREATIVITY
            </span>
          ))}
        </motion.div>
      </div>

      {/* Hero Section - MEGA BOLD */}
      <div className="border-b-8 border-black bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 10px)',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          {/* Back Navigation */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-12 
                         px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors duration-0"
            >
              <Terminal className="h-3 w-3" />
              ← BACK
            </Link>
          </motion.div>

          {/* Mega Title */}
          <div className="mb-12">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="overflow-hidden"
            >
              <h1 className="text-[15vw] md:text-[12rem] lg:text-[18rem] font-black leading-[0.8] tracking-tighter uppercase">
                BLOG
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-6 mt-8"
            >
              <div className="h-1 w-24 bg-black" />
              <p className="text-sm md:text-base font-mono uppercase tracking-wider">
                {posts.length} ARTICLES • UPDATED DAILY
              </p>
            </motion.div>
          </div>

          {/* Stats Cards */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="border-2 border-black p-4 bg-white hover:bg-black hover:text-white transition-colors duration-200">
              <div className="text-3xl font-black">{posts.length}</div>
              <div className="text-xs font-mono uppercase mt-1">Posts</div>
            </div>
            <div className="border-2 border-black p-4 bg-white hover:bg-black hover:text-white transition-colors duration-200">
              <div className="text-3xl font-black">{categories.length}</div>
              <div className="text-xs font-mono uppercase mt-1">Categories</div>
            </div>
            <div className="border-2 border-black p-4 bg-white hover:bg-black hover:text-white transition-colors duration-200">
              <div className="text-3xl font-black flex items-center gap-1">
                <Zap className="h-6 w-6" />
              </div>
              <div className="text-xs font-mono uppercase mt-1">Live</div>
            </div>
            <div className="border-2 border-black p-4 bg-white hover:bg-black hover:text-white transition-colors duration-200">
              <div className="text-3xl font-black">24/7</div>
              <div className="text-xs font-mono uppercase mt-1">Access</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Sidebar Style */}
      <div className="border-b-4 border-black bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400 flex-shrink-0">
              FILTER //
            </span>
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border-2 border-black flex-shrink-0 transition-all duration-0
                ${activeCategory === 'ALL' ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'}`}
            >
              ALL ({posts.length})
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border-2 border-black flex-shrink-0 transition-all duration-0
                  ${activeCategory === category ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts - FULL WIDTH CARDS */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="border-4 border-black m-6 p-20 text-center">
            <div className="text-4xl font-black animate-pulse">
              LOADING...
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="border-4 border-black m-6 p-20 text-center">
            <p className="text-4xl font-black uppercase">
              NO POSTS FOUND
            </p>
          </div>
        ) : (
          <div className="divide-y-4 divide-black">
            {filteredPosts.map((post, index) => {
              const isFirst = index === 0;
              
              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className={`
                      relative px-6 py-12 md:py-16 transition-all duration-200
                      ${hoveredIndex === index ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}
                    `}>
                      {/* Index Number */}
                      <div className="absolute top-6 left-6 text-6xl md:text-8xl font-black opacity-10">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="relative grid md:grid-cols-12 gap-8 items-center">
                        {/* Left: Content */}
                        <div className="md:col-span-8">
                          {/* Category Badge */}
                          <div className="flex items-center gap-4 mb-4">
                            <span className={`
                              px-3 py-1 text-[10px] font-mono uppercase tracking-widest border-2
                              ${hoveredIndex === index 
                                ? 'border-white text-white' 
                                : 'border-black bg-black text-white'}
                            `}>
                              {post.category}
                            </span>
                            {isFirst && (
                              <span className={`
                                px-3 py-1 text-[10px] font-mono uppercase tracking-widest border-2 flex items-center gap-1
                                ${hoveredIndex === index 
                                  ? 'border-yellow-400 text-yellow-400' 
                                  : 'border-yellow-600 text-yellow-600'}
                              `}>
                                <Sparkles className="h-3 w-3" />
                                FEATURED
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h2 className={`
                            text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-6 uppercase
                            ${isFirst ? 'md:text-7xl lg:text-8xl' : ''}
                          `}>
                            {post.title}
                          </h2>

                          {/* Description */}
                          <p className={`
                            text-base md:text-lg font-mono leading-relaxed mb-6 max-w-3xl
                            ${hoveredIndex === index ? 'text-gray-300' : 'text-gray-600'}
                          `}>
                            {post.description}
                          </p>

                          {/* Meta */}
                          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-current" />
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>{post.readingTime}</span>
                            </div>
                            {post.tags.length > 0 && (
                              <>
                                <div className="w-1 h-1 rounded-full bg-current" />
                                <div className="flex gap-2">
                                  {post.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="opacity-60">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Right: CTA */}
                        <div className="md:col-span-4 flex md:justify-end">
                          <div className={`
                            flex items-center gap-3 px-8 py-4 border-4 font-mono uppercase text-sm tracking-widest
                            transition-all duration-200 group-hover:translate-x-2
                            ${hoveredIndex === index 
                              ? 'border-white bg-white text-black' 
                              : 'border-black bg-black text-white'}
                          `}>
                            READ MORE
                            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>

                      {/* Hover Line Effect */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-current"
                        initial={{ width: 0 }}
                        animate={{ width: hoveredIndex === index ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="border-t-8 border-black bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
            LET'S CREATE<br />TOGETHER
          </h3>
          <p className="text-lg font-mono mb-12 max-w-2xl mx-auto text-gray-400">
            Ready to bring your ideas to life? Let's collaborate.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-12 py-6 text-sm font-mono uppercase tracking-widest bg-white text-black border-4 border-white 
                     hover:bg-black hover:text-white hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
          >
            START PROJECT
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Animated Ticker Bottom */}
      <div className="border-t-2 border-black bg-black text-white overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap py-2"
          animate={{ x: [-1000, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6 text-xs font-mono uppercase">
              <Terminal className="h-3 w-3" />
              DEVELOPER.DESIGNER.CREATOR
              <Zap className="h-3 w-3" />
              PORTFOLIO.2024
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
