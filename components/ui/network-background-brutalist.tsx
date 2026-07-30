'use client';

import { useEffect, useState } from 'react';

interface BackgroundProps {
  onInteractionChange?: (isInteracting: boolean) => void;
}

export default function NetworkBackgroundBrutalist({ onInteractionChange }: BackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / documentHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track interactive element hovers
  useEffect(() => {
    const interactiveSelectors = [
      'button',
      'a',
      'input',
      'textarea',
      '[role="button"]',
    ].join(', ');

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches(interactiveSelectors)) {
        setIsHoveringInteractive(true);
        onInteractionChange?.(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches(interactiveSelectors)) {
        setIsHoveringInteractive(false);
        onInteractionChange?.(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [onInteractionChange]);

  // Track mouse position with throttling
  useEffect(() => {
    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        rafId = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const gridSize = 80;

  return (
    <>
      {/* White base layer */}
      <div className="fixed inset-0" style={{ zIndex: -2, backgroundColor: '#ffffff' }} />

      {/* Interactive effects layer - simplified */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {/* Simple Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern
              id="grid"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                fill="none"
                stroke="rgba(0, 0, 0, 0.04)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Subtle Crosshair - only when mouse moved */}
        {mousePosition.x > 0 && (
          <>
            <div
              className="absolute h-px bg-black pointer-events-none"
              style={{
                top: mousePosition.y,
                left: 0,
                right: 0,
                opacity: 0.08,
              }}
            />
            <div
              className="absolute w-px bg-black pointer-events-none"
              style={{
                left: mousePosition.x,
                top: 0,
                bottom: 0,
                opacity: 0.08,
              }}
            />
          </>
        )}

        {/* Minimal Static Shapes - reduced to 8 */}
        {Array.from({ length: 8 }).map((_, i) => {
          const size = 50 + (i % 2) * 30;
          const x = (i * 150) % 100;
          const y = (i * 60) % 100;
          
          return (
            <div
              key={`static-${i}`}
              className="absolute border border-black rounded-none pointer-events-none"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                opacity: 0.03,
                transform: `rotate(${i * 20}deg)`,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
