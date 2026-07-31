'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Scroll Progress Indicator
 * Shows a thin progress bar at top of page indicating scroll position
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animation for progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[1px] bg-black origin-left z-50"
      style={{ scaleX }}
    />
  );
}
