'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export function LoveEffects() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Create initial hearts
    const initialHearts: FloatingHeart[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 16 + Math.random() * 16,
    }));
    setHearts(initialHearts);

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts(prev => {
        // Keep only last 20 hearts
        const newHearts = prev.slice(-20);
        // Add 2 new hearts
        for (let i = 0; i < 2; i++) {
          newHearts.push({
            id: Date.now() + i,
            x: Math.random() * 100,
            delay: 0,
            duration: 8 + Math.random() * 4,
            size: 16 + Math.random() * 16,
          });
        }
        return newHearts;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              x: `${heart.x}vw`,
              y: '110vh',
              opacity: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              y: '-10vh',
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              rotate: [0, 360],
              x: [
                `${heart.x}vw`,
                `${heart.x + (Math.random() - 0.5) * 20}vw`,
                `${heart.x}vw`,
              ],
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute"
            style={{ left: 0, bottom: 0 }}
          >
            <Heart
              className="text-red-500"
              style={{ width: heart.size, height: heart.size }}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Particle hearts that follow cursor
export function CursorHearts() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Create particle occasionally (not every move)
      if (Math.random() > 0.95) {
        const newParticle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
        };

        setParticles(prev => [...prev.slice(-15), newParticle]);

        // Remove particle after animation
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 1,
              scale: 0,
            }}
            animate={{
              y: particle.y - 100,
              opacity: 0,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
            className="absolute"
            style={{ left: 0, top: 0 }}
          >
            <Heart className="text-pink-400 w-4 h-4" fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Sparkle effect
export function LoveSparkles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 5,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
          className="absolute w-2 h-2 bg-pink-300 rounded-full"
        />
      ))}
    </div>
  );
}

// Heart pulse overlay
export function HeartPulse() {
  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-0">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute"
      >
        <Heart className="w-96 h-96 text-red-500" fill="currentColor" />
      </motion.div>
    </div>
  );
}
