'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  Palette, 
  Code2, 
  Layers, 
  Rocket,
  Eye,
  Heart,
  Star
} from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Creative Design',
    description: 'Crafting beautiful, user-centered interfaces that captivate and engage',
    gradient: 'from-yellow-500 via-amber-500 to-orange-500',
    delay: 0,
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code with modern best practices',
    gradient: 'from-amber-500 via-orange-500 to-yellow-600',
    delay: 0.1,
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Optimized for speed and efficiency across all devices',
    gradient: 'from-orange-500 via-amber-600 to-yellow-500',
    delay: 0.2,
  },
  {
    icon: Layers,
    title: 'Responsive Design',
    description: 'Seamless experience from mobile to desktop and everything in between',
    gradient: 'from-yellow-600 via-amber-500 to-orange-600',
    delay: 0.3,
  },
  {
    icon: Eye,
    title: 'Attention to Detail',
    description: 'Every pixel matters, every interaction is thoughtfully crafted',
    gradient: 'from-amber-600 via-yellow-500 to-orange-500',
    delay: 0.4,
  },
  {
    icon: Rocket,
    title: 'Innovation First',
    description: 'Pushing boundaries with cutting-edge technologies and trends',
    gradient: 'from-orange-600 via-amber-500 to-yellow-600',
    delay: 0.5,
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: feature.delay }}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        className="relative h-full p-8 rounded-3xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 cursor-pointer overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Gradient Glow Effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}
          animate={isHovered ? { scale: 1.5 } : { scale: 1 }}
        />

        {/* Floating Particles */}
        {isHovered && (
          <>
            <motion.div
              className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"
              animate={{
                y: [-20, -40, -20],
                x: [0, 10, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-8 left-8 w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-500"
              animate={{
                y: [20, 40, 20],
                x: [0, -10, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}

        {/* Icon Container */}
        <motion.div
          className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6`}
          animate={isHovered ? { rotate: [0, -10, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
            <Icon className={`h-8 w-8 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} />
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            {feature.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%', skewX: -20 }}
          animate={isHovered ? { x: '200%' } : { x: '-100%' }}
          transition={{ duration: 0.8 }}
        />

        {/* Corner Accent */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-10 blur-2xl rounded-full`} />
      </div>
    </motion.div>
  );
}

export function FeaturesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
        style={{ y, opacity }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              What I Bring to the Table
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              Crafting Digital
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
              Experiences
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Combining creativity, technical expertise, and attention to detail to deliver exceptional results
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <motion.div
            className="inline-flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="h-5 w-5 text-amber-500 fill-amber-500" />
            <span>Passionate about creating amazing digital experiences</span>
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
