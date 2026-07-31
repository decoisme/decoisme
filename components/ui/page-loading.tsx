'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

function PageLoadingContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prevPath, setPrevPath] = useState('');

  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    
    // Only show loading if path actually changed
    if (prevPath && prevPath !== currentPath) {
      setLoading(true);
      setProgress(0);

      // Fast progress animation
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += Math.random() * 30;
        if (currentProgress >= 90) {
          setProgress(90);
          clearInterval(progressInterval);
        } else {
          setProgress(currentProgress);
        }
      }, 50);

      // Complete quickly
      const timer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
          clearInterval(progressInterval);
        }, 150);
      }, 300);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
    
    setPrevPath(currentPath);
  }, [pathname, searchParams, prevPath]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-[9999]"
        />
      )}
    </AnimatePresence>
  );
}

export function PageLoading() {
  return (
    <Suspense fallback={null}>
      <PageLoadingContent />
    </Suspense>
  );
}
