'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

/**
 * Scroll-linked animation hooks
 * Respects prefers-reduced-motion automatically via Framer Motion
 */

interface ScrollRevealOptions {
  direction?: 'left' | 'right' | 'up' | 'down';
  distance?: number;
  opacity?: boolean;
}

/**
 * Horizontal or vertical reveal based on scroll progress
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    direction = 'up',
    distance = 30, // Subtle movement
    opacity = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.6'], // Start when 90% in viewport, end at 60%
  });

  // Calculate movement based on direction
  let x: MotionValue<number> | undefined;
  let y: MotionValue<number> | undefined;

  if (isMounted) {
    if (direction === 'left') {
      x = useTransform(scrollYProgress, [0, 1], [-distance, 0]);
    } else if (direction === 'right') {
      x = useTransform(scrollYProgress, [0, 1], [distance, 0]);
    } else if (direction === 'up') {
      y = useTransform(scrollYProgress, [0, 1], [distance, 0]);
    } else if (direction === 'down') {
      y = useTransform(scrollYProgress, [0, 1], [-distance, 0]);
    }
  }

  const opacityValue = opacity && isMounted
    ? useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])
    : undefined;

  return {
    ref,
    style: {
      x,
      y,
      opacity: opacityValue,
    },
  };
}

/**
 * Parallax effect - element moves slower than scroll
 */
export function useParallax(options: { speed?: number } = {}) {
  const { speed = 0.5 } = options; // 50% of scroll speed
  const [isMounted, setIsMounted] = useState(false);
  
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = isMounted 
    ? useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed])
    : undefined;

  return { ref, style: { y } };
}

/**
 * Scale + fade based on scroll
 */
export function useScrollScale(options: { scaleRange?: [number, number] } = {}) {
  const { scaleRange = [0.9, 1] } = options;
  const [isMounted, setIsMounted] = useState(false);
  
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.5'],
  });

  const scale = isMounted 
    ? useTransform(scrollYProgress, [0, 1], scaleRange)
    : undefined;
  const opacity = isMounted 
    ? useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])
    : undefined;

  return { ref, style: { scale, opacity } };
}

/**
 * Staggered reveal for grid items
 */
export function useStaggeredReveal(index: number, options: { direction?: 'left' | 'right' } = {}) {
  const { direction = 'left' } = options;
  const distance = 30;
  const delay = index * 0.05; // 50ms stagger between items
  
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.6'],
  });

  // Adjust progress based on delay
  const adjustedProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [Math.max(0, -delay), 1 - delay]
  );

  const x = useTransform(
    adjustedProgress,
    [0, 1],
    direction === 'left' ? [-distance, 0] : [distance, 0]
  );

  const opacity = useTransform(adjustedProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return { ref, style: { x, opacity } };
}

/**
 * Rotate based on scroll progress
 */
export function useScrollRotate(options: { range?: [number, number] } = {}) {
  const { range = [-5, 5] } = options; // Subtle rotation
  
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], range);

  return { ref, style: { rotate } };
}
