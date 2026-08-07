'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Terminal, Zap, TrendingUp, Sparkles, ChevronRight, Search, X, Filter, Tag as TagIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsletterForm } from '@/components/newsletter/newsletter-form';

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
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<'all' | 'week' | 'month' | 'year'>('all');
  const [showFilters, setShowFilters] = useState(false);

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

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet).sort();
  }, [posts]);

  // Advanced filtering logic
  const filteredPosts = useMemo(() => {
    let result = posts;

    // Category filter
    if (activeCategory !== 'ALL') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Tags filter
    if (selectedTags.length > 0) {
      result = result.filter(p => 
        selectedTags.some(tag => p.tags.includes(tag))
      );
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      result = result.filter(p => new Date(p.date) >= filterDate);
    }

    return result;
  }, [posts, activeCategory, searchQuery, selectedTags, dateFilter]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('ALL');
    setSelectedTags([]);
    setDateFilter('all');
  };

  const hasActiveFilters = searchQuery || activeCategory !== 'ALL' || selectedTags.length > 0 || dateFilter !== 'all';

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

      {/* MINIMALIST SEARCH - CLEAN & POWERFUL */}
      <div className="border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Search Bar - Minimalist */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              {/* Main Search Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH..."
                  className="w-full px-6 py-4 border-4 border-black font-mono text-lg uppercase tracking-wider 
                           focus:outline-none focus:bg-black focus:text-white focus:placeholder-gray-500 
                           transition-colors duration-0"
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-black hover:text-white 
                             transition-colors duration-0"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-4 border-4 border-black font-mono text-sm uppercase tracking-wider 
                           flex items-center gap-2 transition-all duration-0
                  ${showFilters ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'}`}
              >
                <Filter className="h-4 w-4" />
                {showFilters ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="border-4 border-black p-6 bg-gray-50 mb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Date Filter */}
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest mb-3 text-gray-500">
                        DATE RANGE //
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: 'all', label: 'ALL TIME' },
                          { value: 'week', label: 'LAST WEEK' },
                          { value: 'month', label: 'LAST MONTH' },
                          { value: 'year', label: 'LAST YEAR' },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setDateFilter(option.value as any)}
                            className={`px-3 py-2 text-xs font-mono uppercase border-2 border-black transition-all duration-0
                              ${dateFilter === option.value ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tag Filter */}
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest mb-3 text-gray-500 flex items-center gap-2">
                        <TagIcon className="h-3 w-3" />
                        TAGS // {selectedTags.length > 0 && `(${selectedTags.length})`}
                      </div>
                      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                        {allTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1 text-xs font-mono uppercase border-2 border-black transition-all duration-0
                              ${selectedTags.includes(tag) ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                          >
                            #{tag}
                          </button>
                        ))}
                        {allTags.length === 0 && (
                          <div className="text-xs font-mono text-gray-400">
                            NO TAGS AVAILABLE
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Counter - Minimalist */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Simple Counter */}
              <div className="px-4 py-2 bg-black text-white font-mono text-sm uppercase">
                {filteredPosts.length} RESULTS
              </div>

              {/* Clear All */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 border-2 border-black font-mono text-sm uppercase 
                           hover:bg-black hover:text-white transition-colors duration-0"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Active Filters */}
            {(selectedTags.length > 0 || searchQuery) && (
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <div className="px-3 py-1 bg-black text-white text-xs font-mono uppercase">
                    "{searchQuery}"
                  </div>
                )}
                {selectedTags.map((tag) => (
                  <div
                    key={tag}
                    className="px-3 py-1 border-2 border-black text-xs font-mono uppercase flex items-center gap-2"
                  >
                    #{tag}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="hover:text-red-600 transition-colors duration-0"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
          <div className="border-4 border-black m-6 p-20 text-center bg-white">
            <div className="max-w-2xl mx-auto">
              <div className="text-8xl font-black mb-8 opacity-10">404</div>
              <h3 className="text-4xl font-black uppercase mb-4">
                NO POSTS FOUND
              </h3>
              <p className="text-lg font-mono text-gray-600 mb-8">
                {hasActiveFilters 
                  ? 'Try adjusting your filters or search query.' 
                  : 'No blog posts available yet.'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="px-8 py-4 bg-black text-white font-mono text-sm uppercase tracking-wider 
                           border-4 border-black hover:bg-white hover:text-black transition-all duration-0"
                >
                  CLEAR ALL FILTERS
                </button>
              )}
            </div>
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
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Newsletter Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                SUBSCRIBE TO<br />NEWSLETTER
              </h3>
              <p className="text-lg font-mono text-gray-400">
                Get notified about new posts and updates. No spam, ever.
              </p>
            </div>
            <NewsletterForm />
          </div>

          {/* CTA */}
          <div className="text-center pt-12 border-t-2 border-white">
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
