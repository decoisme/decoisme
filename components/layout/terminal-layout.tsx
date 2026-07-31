'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Square, X, Folder, File, ChevronRight, Menu, Circle, Activity } from 'lucide-react';
import { SystemLabel, MemoryAddress } from '@/components/ui/brutalist-elements';

interface TerminalLayoutProps {
  children: React.ReactNode;
}

const sidebarSections = [
  { id: 'home', label: 'index.tsx', icon: File },
  { id: 'about', label: 'about.tsx', icon: File },
  { id: 'projects', label: 'projects/', icon: Folder, children: ['featured.tsx', 'gallery.tsx', 'archive.tsx'] },
  { id: 'testimonials', label: 'reviews.tsx', icon: File },
  { id: 'clients', label: 'clients.tsx', icon: File },
  { id: 'skills', label: 'skills.tsx', icon: File },
  { id: 'pricing', label: 'pricing.tsx', icon: File },
  { id: 'faq', label: 'faq.tsx', icon: File },
  { id: 'blog', label: 'blog/', icon: Folder, href: '/blog' },
  { id: 'contact', label: 'contact.tsx', icon: File },
];

export function TerminalLayout({ children }: TerminalLayoutProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['projects']);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [time, setTime] = useState('00:00:00');
  const [lineCount, setLineCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateLineCount = () => {
      if (contentRef.current) {
        // Get all sections
        const sections = contentRef.current.querySelectorAll('section');
        if (sections.length > 0) {
          const lastSection = sections[sections.length - 1];
          const lastSectionBottom = lastSection.offsetTop + lastSection.offsetHeight;
          const calculatedLines = Math.ceil(lastSectionBottom / 24);
          setLineCount(Math.max(calculatedLines, 50));
        }
      }
    };
    
    // Initial calculation
    updateLineCount();
    
    // Update on resize
    window.addEventListener('resize', updateLineCount);
    
    // Update when content changes
    const observer = new MutationObserver(updateLineCount);
    if (contentRef.current) {
      observer.observe(contentRef.current, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }
    
    // Update after a delay (for images and dynamic content)
    const timeout = setTimeout(updateLineCount, 1000);
    
    return () => { 
      window.removeEventListener('resize', updateLineCount); 
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [children]);

  useEffect(() => {
    let isScrolling = false;
    
    const handleScroll = () => {
      if (isScrolling) return; // Skip if we're programmatically scrolling
      
      if (contentRef.current) {
        const scrollTop = contentRef.current.scrollTop;
        const scrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setScrollProgress(Math.min(Math.max(progress, 0), 100));
        
        // Update active section based on scroll position
        const sections = document.querySelectorAll('section[id]');
        let currentSection = 'home';
        
        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop - 120;
          const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;
          
          if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
            currentSection = section.id;
          }
        });
        
        setActiveSection(currentSection);
      }
    };
    
    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => content.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleNavClick = (id: string) => {
    console.log('=== Navigation clicked:', id, '===');
    
    // Close sidebar
    setSidebarOpen(false);
    
    // Update active section
    setActiveSection(id);
    
    // Use native hash navigation as fallback
    // This will work even if scrollTo doesn't
    window.location.hash = id;
    
    // Also try our scroll method
    setTimeout(() => {
      const element = document.getElementById(id);
      const container = contentRef.current;
      
      if (element && container) {
        console.log('Attempting scroll...');
        
        // Try getBoundingClientRect method
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const currentScroll = container.scrollTop;
        const targetScroll = currentScroll + elementRect.top - containerRect.top - 80;
        
        console.log('Target:', targetScroll, 'Current:', currentScroll);
        
        // Multiple attempts
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            if (container) container.scrollTop = targetScroll;
          }, i * 20);
        }
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <motion.div 
        className="sticky top-0 z-50 h-10 bg-white border-b border-black flex items-center justify-between px-4"
        initial={{ y: -40 }} animate={{ y: 0 }} transition={{ duration: 0.3, ease: 'linear' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div key={i} className="w-3 h-3 bg-black" whileHover={{ scale: 1.2 }} transition={{ duration: 0.1 }} />
            ))}
          </div>
          <div className="h-4 w-px bg-gray-300" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] tracking-wider font-medium">DECOISME.EXE</span>
            <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200">
              <Activity className="h-2.5 w-2.5 text-gray-500" />
              <span className="font-mono text-[9px] text-gray-500">{scrollProgress.toFixed(0)}%</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden ml-2 w-6 h-6 border border-black hover:bg-black hover:text-white transition-colors duration-0 flex items-center justify-center">
            <Menu className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <SystemLabel label="RUNTIME" />
            <div className="flex items-center gap-1.5">
              <Circle className="h-2 w-2 fill-black" />
              <span className="font-mono text-[10px] text-gray-600">{time}</span>
            </div>
          </div>
          <MemoryAddress code="FF00" />
          <div className="h-4 w-px bg-gray-300" />
          <div className="flex gap-1">
            {[Minus, Square, X].map((Icon, i) => (
              <motion.button key={i} className="w-6 h-6 border border-black hover:bg-black hover:text-white transition-colors duration-0 flex items-center justify-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Icon className={i === 1 ? "h-2.5 w-2.5" : "h-3 w-3"} />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="flex flex-1 relative">
        {isMounted && (
          <AnimatePresence>
            {(sidebarOpen || window.innerWidth >= 1024) && (
              <motion.aside 
                className="fixed lg:sticky top-10 left-0 h-[calc(100vh-40px)] w-64 border-r border-black bg-white z-40 flex flex-col" 
                initial={{ x: -256 }} 
                animate={{ x: 0 }} 
                exit={{ x: -256 }} 
                transition={{ duration: 0.2, ease: 'linear' }}
              >
              <div className="h-9 border-b border-black flex items-center justify-between px-3 bg-gradient-to-r from-gray-50 to-white">
                <span className="font-mono text-[10px] tracking-widest uppercase text-gray-600 font-medium">// Explorer</span>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-mono text-[8px] text-gray-400">LIVE</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                <div className="space-y-0.5">
                  {sidebarSections.map((section, index) => {
                    const isActive = activeSection === section.id;
                    const hasChildren = section.children && section.children.length > 0;
                    
                    return (
                      <motion.div key={section.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05, duration: 0.2 }}>
                        <button 
                          onClick={() => {
                            if (section.href) {
                              // External navigation (like blog)
                              window.location.href = section.href;
                            } else if (hasChildren) {
                              // Only toggle folder, don't navigate
                              toggleFolder(section.id);
                            } else {
                              // Navigate to section
                              handleNavClick(section.id);
                            }
                          }} 
                          className={`w-full group flex items-center gap-2 px-2 py-1.5 font-mono text-[11px] hover:bg-gray-100 transition-all duration-150 rounded-none relative ${isActive ? 'bg-gray-100 text-black font-medium' : 'text-gray-600'}`}
                        >
                          {isActive && <motion.div layoutId="activeBar" className="absolute left-0 top-0 bottom-0 w-0.5 bg-black" transition={{ duration: 0.2, ease: 'linear' }} />}
                          {hasChildren ? (
                            <motion.div animate={{ rotate: expandedFolders.includes(section.id) ? 90 : 0 }} transition={{ duration: 0.15 }}>
                              <ChevronRight className="h-3 w-3 text-gray-400" />
                            </motion.div>
                          ) : (<div className="w-3" />)}
                          <section.icon className={`h-3.5 w-3.5 ${isActive ? 'text-black' : 'text-gray-500'}`} />
                          <span className="flex-1 text-left">{section.label}</span>
                          {isActive && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 bg-black rounded-full" transition={{ duration: 0.2 }} />}
                        </button>
                        <AnimatePresence>
                          {hasChildren && expandedFolders.includes(section.id) && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="ml-6 space-y-0.5 mt-0.5 overflow-hidden">
                              {section.children.map((child, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }} className="flex items-center gap-2 px-2 py-1 font-mono text-[10px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-none cursor-pointer">
                                  <File className="h-3 w-3" />
                                  <span>{child}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="border-t border-black bg-gradient-to-b from-white to-gray-50 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">Status</span>
                  <div className="flex items-center gap-1.5">
                    <motion.div className="w-1.5 h-1.5 bg-green-500 rounded-full" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    <span className="font-mono text-[9px] text-green-600 font-medium">ACTIVE</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">Lines</span>
                  <span className="font-mono text-[9px] text-gray-600 font-medium">{lineCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">Memory</span>
                  <MemoryAddress code="A100" />
                </div>
                <div className="h-px bg-gray-200 my-1" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] text-gray-400">Scroll</span>
                  <div className="flex-1 mx-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-black" style={{ width: `${scrollProgress}%` }} transition={{ duration: 0.1 }} />
                  </div>
                  <span className="font-mono text-[8px] text-gray-600">{scrollProgress.toFixed(0)}%</span>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
        )}
        
        {isMounted && sidebarOpen && (
          <motion.div 
            className="lg:hidden fixed inset-0 bg-black/20 z-30 top-10" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setSidebarOpen(false)} 
          />
        )}
        
        <main ref={contentRef} className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          <motion.div className="sticky top-0 z-20 h-10 border-b border-black flex items-center px-4 gap-px bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-2 px-4 py-2 border-r border-black bg-gradient-to-r from-gray-50 to-white">
              <File className="h-3 w-3 text-gray-600" />
              <span className="font-mono text-[10px] text-gray-800 font-medium">
                {sidebarSections.find(s => s.id === activeSection)?.label || 'index.tsx'}
              </span>
              <div className="w-1 h-1 bg-gray-400 rounded-full ml-1" />
            </div>
          </motion.div>
          <div className="flex">
            <div className="sticky left-0 w-12 bg-gradient-to-r from-gray-50 to-gray-50/50 border-r border-gray-200 py-8 text-right pr-3 select-none hidden sm:block">
              {Array.from({ length: lineCount }).map((_, i) => (
                <div key={i} className="font-mono text-[9px] text-gray-300 leading-6 hover:text-gray-500 transition-colors">{i + 1}</div>
              ))}
            </div>
            <div className="flex-1 p-8 lg:p-12">{children}</div>
          </div>
        </main>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f9fafb; border-left: 1px solid #e5e7eb; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 0; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #000000; }
      `}</style>
    </div>
  );
}
