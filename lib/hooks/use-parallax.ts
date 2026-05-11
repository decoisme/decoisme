'use client';

import { useEffect, useState, RefObject } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  enableOnMobile?: boolean;
}

export function useParallax(
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) {
  const {
    speed = 0.5,
    direction = 'up',
    enableOnMobile = false,
  } = options;

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enableOnMobile && window.innerWidth < 768) {
      return;
    }

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Check if element is in viewport
      if (
        rect.top < windowHeight &&
        rect.bottom > 0
      ) {
        const scrollProgress = (scrolled - elementTop + windowHeight) / (windowHeight + elementHeight);
        const movement = scrollProgress * 100 * speed;

        switch (direction) {
          case 'up':
            setOffset({ x: 0, y: -movement });
            break;
          case 'down':
            setOffset({ x: 0, y: movement });
            break;
          case 'left':
            setOffset({ x: -movement, y: 0 });
            break;
          case 'right':
            setOffset({ x: movement, y: 0 });
            break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ref, speed, direction, enableOnMobile]);

  return offset;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / docHeight) * 100;
      setProgress(scrollProgress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return progress;
}
