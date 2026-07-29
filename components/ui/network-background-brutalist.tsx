'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface Trail {
  x: number;
  y: number;
  id: number;
  opacity: number;
  size: number;
  rotation: number;
}

interface Burst {
  x: number;
  y: number;
  id: number;
  shapes: Array<{ angle: number; distance: number; size: number; rotation: number }>;
  opacity: number;
}

interface BackgroundProps {
  onInteractionChange?: (isInteracting: boolean) => void;
}

export default function NetworkBackgroundBrutalist({ onInteractionChange }: BackgroundProps = {}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<Trail[]>([]);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [intensity, setIntensity] = useState(1);
  
  const trailIdRef = useRef(0);
  const burstIdRef = useRef(0);
  const lastTrailTime = useRef(0);

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
      '.interactive-element'
    ].join(', ');

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches(interactiveSelectors)) {
        setIsHoveringInteractive(true);
        setIntensity(1.5); // Reduced from 2.5 to 1.5
        onInteractionChange?.(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches(interactiveSelectors)) {
        setIsHoveringInteractive(false);
        setIntensity(1);
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

  // Track mouse position and create trails
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Adjust trail frequency based on intensity
      const trailDelay = isHoveringInteractive ? 40 : 60; // Increased delay (less frequent)
      const now = Date.now();
      
      if (now - lastTrailTime.current > trailDelay) {
        lastTrailTime.current = now;
        
        setTrails((prev) => {
          const newTrail: Trail = {
            x: e.clientX,
            y: e.clientY,
            id: trailIdRef.current++,
            opacity: 1,
            size: (Math.random() * 12 + 6) * (isHoveringInteractive ? 1.2 : 1), // Reduced size
            rotation: Math.random() * 90,
          };
          
          // Keep fewer trails
          const maxTrails = isHoveringInteractive ? 25 : 15; // Reduced from 40:20 to 25:15
          return [...prev.slice(-maxTrails + 1), newTrail];
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHoveringInteractive]);

  // Create burst on click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newBurst: Burst = {
        x: e.clientX,
        y: e.clientY,
        id: burstIdRef.current++,
        opacity: 1,
        shapes: Array.from({ length: 12 }).map((_, i) => ({
          angle: (i / 12) * Math.PI * 2,
          distance: 0,
          size: Math.random() * 20 + 10,
          rotation: Math.random() * 90,
        })),
      };

      setBursts((prev) => [...prev, newBurst]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Animate bursts
  useEffect(() => {
    const interval = setInterval(() => {
      setBursts((prev) =>
        prev
          .map((burst) => ({
            ...burst,
            opacity: burst.opacity - 0.04,
            shapes: burst.shapes.map((shape) => ({
              ...shape,
              distance: shape.distance + 3,
            })),
          }))
          .filter((burst) => burst.opacity > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Fade out trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) =>
        prev
          .map((trail) => ({
            ...trail,
            opacity: trail.opacity - (isHoveringInteractive ? 0.03 : 0.05),
          }))
          .filter((trail) => trail.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isHoveringInteractive]);

  // Calculate grid cell highlight
  const gridSize = 60;
  const highlightRadius = isHoveringInteractive ? 200 : 160; // Reduced radius
  const gridIntensity = 0.08 * intensity; // Reduced from 0.15 to 0.08

  return (
    <>
      {/* White base layer */}
      <div className="fixed inset-0" style={{ zIndex: -2, backgroundColor: '#ffffff' }} />

      {/* Interactive effects layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {/* Reactive Grid Pattern */}
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
                stroke={`rgba(0, 0, 0, ${0.06 + scrollProgress * 0.04})`}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Grid highlights near mouse */}
          {mousePosition.x > 0 && (
            <>
              {Array.from({ length: isHoveringInteractive ? 30 : 20 }).map((_, i) => { // Reduced from 40:25 to 30:20
                const angle = (i / (isHoveringInteractive ? 30 : 20)) * Math.PI * 2; // Updated count
                const distance = highlightRadius * (0.5 + Math.random() * 0.5);
                const x = mousePosition.x + Math.cos(angle) * distance;
                const y = mousePosition.y + Math.sin(angle) * distance;
                const gridX = Math.floor(x / gridSize) * gridSize;
                const gridY = Math.floor(y / gridSize) * gridSize;
                const distanceToMouse = Math.sqrt(
                  Math.pow(x - mousePosition.x, 2) + Math.pow(y - mousePosition.y, 2)
                );
                const opacity = Math.max(0, 1 - distanceToMouse / highlightRadius) * gridIntensity;

                return (
                  <rect
                    key={i}
                    x={gridX}
                    y={gridY}
                    width={gridSize}
                    height={gridSize}
                    fill="black"
                    opacity={opacity}
                  />
                );
              })}
            </>
          )}
        </svg>

        {/* Dynamic Crosshair */}
        <div
          className="absolute h-px bg-black pointer-events-none"
          style={{
            top: mousePosition.y,
            left: 0,
            right: 0,
            opacity: 0.15 * intensity, // Reduced from 0.2
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute w-px bg-black pointer-events-none"
          style={{
            left: mousePosition.x,
            top: 0,
            bottom: 0,
            opacity: 0.15 * intensity, // Reduced from 0.2
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        />

        {/* Horizontal Scanline */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: mousePosition.y - 40,
            height: '80px',
            background: `linear-gradient(to bottom, transparent, rgba(0,0,0,${0.02 * intensity}) 50%, transparent)`, // Reduced from 0.03
            transform: 'translateZ(0)',
            willChange: 'transform',
          }}
        />

        {/* Geometric Trails */}
        {trails.map((trail) => (
          <div
            key={trail.id}
            className="absolute rounded-none border border-black pointer-events-none"
            style={{
              left: trail.x - trail.size / 2,
              top: trail.y - trail.size / 2,
              width: trail.size,
              height: trail.size,
              opacity: trail.opacity * 0.2, // Reduced from 0.3
              transform: `rotate(${trail.rotation}deg) translateZ(0)`,
              transition: 'none',
              willChange: 'transform, opacity',
              borderWidth: isHoveringInteractive ? '1.5px' : '1px', // Reduced from 2px
            }}
          />
        ))}

        {/* Click Burst Effects */}
        {bursts.map((burst) => (
          <div key={burst.id}>
            {burst.shapes.map((shape, idx) => {
              const x = burst.x + Math.cos(shape.angle) * shape.distance;
              const y = burst.y + Math.sin(shape.angle) * shape.distance;
              
              return (
                <div
                  key={idx}
                  className="absolute rounded-none border-2 border-black pointer-events-none"
                  style={{
                    left: x - shape.size / 2,
                    top: y - shape.size / 2,
                    width: shape.size,
                    height: shape.size,
                    opacity: burst.opacity * 0.25, // Reduced from 0.4
                    transform: `rotate(${shape.rotation}deg) translateZ(0)`,
                  }}
                />
              );
            })}
          </div>
        ))}

        {/* Floating Static Geometric Shapes - Affected by scroll */}
        {Array.from({ length: 15 }).map((_, i) => {
          const size = 40 + (i % 3) * 20;
          const x = (i * 137.5) % 100;
          const y = (i * 42.3) % 100;
          const scrollOffset = scrollProgress * 50 * (i % 2 === 0 ? 1 : -1);
          
          return (
            <div
              key={`static-${i}`}
              className="absolute border border-black rounded-none pointer-events-none transition-transform duration-500"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                opacity: 0.04 + scrollProgress * 0.03,
                transform: `rotate(${i * 15 + scrollOffset}deg)`,
              }}
            />
          );
        })}

        {/* Corner Brackets - More visible on hover */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {mousePosition.x > 0 && (
            <>
              {/* Top-left bracket */}
              <g opacity={isHoveringInteractive ? 0.35 : 0.25}> {/* Reduced from 0.5:0.3 */}
                <line
                  x1={mousePosition.x - 30}
                  y1={mousePosition.y - 30}
                  x2={mousePosition.x - 10}
                  y2={mousePosition.y - 30}
                  stroke="black"
                  strokeWidth={isHoveringInteractive ? 1.5 : 1} {/* Reduced from 2 */}
                />
                <line
                  x1={mousePosition.x - 30}
                  y1={mousePosition.y - 30}
                  x2={mousePosition.x - 30}
                  y2={mousePosition.y - 10}
                  stroke="black"
                  strokeWidth={isHoveringInteractive ? 1.5 : 1} {/* Reduced from 2 */}
                />
              </g>
              
              {/* Bottom-right bracket */}
              <g opacity={isHoveringInteractive ? 0.35 : 0.25}> {/* Reduced from 0.5:0.3 */}
                <line
                  x1={mousePosition.x + 10}
                  y1={mousePosition.y + 30}
                  x2={mousePosition.x + 30}
                  y2={mousePosition.y + 30}
                  stroke="black"
                  strokeWidth={isHoveringInteractive ? 1.5 : 1} {/* Reduced from 2 */}
                />
                <line
                  x1={mousePosition.x + 30}
                  y1={mousePosition.y + 10}
                  x2={mousePosition.x + 30}
                  y2={mousePosition.y + 30}
                  stroke="black"
                  strokeWidth={isHoveringInteractive ? 1.5 : 1} {/* Reduced from 2 */}
                />
              </g>
            </>
          )}
        </svg>
      </div>
    </>
  );
}
