'use client';

import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

/**
 * Text Reveal Animation
 * Letters appear one by one with stagger effect
 */
export function TextReveal({ 
  text, 
  className = '',
  delay = 0,
  stagger = 0.03, // Delay between each letter
}: TextRevealProps) {
  // Split text into characters, preserving spaces
  const characters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: stagger, 
        delayChildren: delay,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween' as const,
        ease: 'easeOut' as const,
        duration: 0.2,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={child}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * Multi-line Text Reveal
 * For headers with line breaks
 */
interface MultiLineTextRevealProps {
  lines: string[];
  className?: string;
  delay?: number;
  stagger?: number;
  lineDelay?: number;
}

export function MultiLineTextReveal({
  lines,
  className = '',
  delay = 0,
  stagger = 0.03,
  lineDelay = 0.1, // Delay between lines
}: MultiLineTextRevealProps) {
  return (
    <>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          <TextReveal
            text={line}
            className={className}
            delay={delay + lineIndex * lineDelay}
            stagger={stagger}
          />
          {lineIndex < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}
