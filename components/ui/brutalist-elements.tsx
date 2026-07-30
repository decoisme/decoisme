'use client';

import { motion } from 'framer-motion';

// Minimal ASCII Pattern - Very subtle, light gray
export function ASCIIPatternMinimal() {
  return (
    <pre className="ascii-minimal select-none opacity-30" aria-label="System">
{`+--- DATA.SET ---+`}
    </pre>
  );
}

// Tiny System Label
export function SystemLabel({ label }: { label: string }) {
  return (
    <span className="font-mono text-[10px] tracking-widest text-gray-400 select-none uppercase">
      // {label}
    </span>
  );
}

// Memory Address Marker
export function MemoryAddress({ code }: { code: string }) {
  return (
    <span className="font-mono text-[10px] tracking-wider text-gray-300 select-none">
      0x{code}
    </span>
  );
}

// Minimal Loading Screen - Bottom corner only
export function MinimalLoader() {
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: 1 }}
      onAnimationComplete={() => {
        const element = document.querySelector('.minimal-loader-container');
        if (element) {
          (element as HTMLElement).style.display = 'none';
        }
      }}
    >
      <div className="ascii-loader-mini" />
    </motion.div>
  );
}

// Instant Slide Divider - 1px, 0.2s linear
export function InstantDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.2, ease: 'linear' }}
      className="w-full h-px bg-gray-200 origin-left"
    />
  );
}

// Sharp Clip Reveal - No easing
export function ClipReveal({ children, direction = 'vertical' }: { children: React.ReactNode; direction?: 'vertical' | 'horizontal' }) {
  return (
    <motion.div
      initial={{ 
        clipPath: direction === 'vertical' 
          ? 'inset(0 0 100% 0)' 
          : 'inset(0 100% 0 0)' 
      }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: 'linear' }}
    >
      {children}
    </motion.div>
  );
}

// Subtle Glitch Text - Only on mousedown
export function GlitchText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`glitch-text inline-block ${className}`}>
      {children}
    </span>
  );
}

// RGB Split Button - 1px offset, no blur
export function RGBSplitLink({ children, className = '', ...props }: any) {
  return (
    <span
      className={`rgb-split ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

// Micro Glitch Image
export function MicroGlitchImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`glitch-image ${className}`}
    />
  );
}

