// @ts-nocheck
'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { Check, Sparkles, Image as ImageIcon, Layers, Zap, ArrowRight, RefreshCw, Clock, Palette } from 'lucide-react';

const pricingPlans = [
  {
    icon: ImageIcon,
    name: 'Single Post',
    description: 'Perfect untuk konten feed Instagram yang menarik',
    price: '30.000',
    priceNote: 'Start from',
    features: [
      '1 Design feed Instagram',
      'Format: 1080x1080px',
      '2x revisi gratis',
      'File JPG/PNG high quality',
      'Delivery 1-2 hari kerja',
      'Konsultasi design gratis',
    ],
    popular: false,
    gradient: 'from-yellow-500 to-amber-600',
    link: '#contact',
    cta: 'Order Now',
  },
  {
    icon: Layers,
    name: 'Carousel Post',
    description: 'Untuk storytelling yang lebih engaging',
    price: '60.000',
    priceNote: 'Start from (up to 3 slides)',
    features: [
      'Up to 3 slides (extra +10k/slide)',
      'Format: 1080x1080px',
      '2x revisi gratis per slide',
      'File JPG/PNG high quality',
      'Delivery 2-3 hari kerja',
      'Konsisten design & flow',
      'Bisa request express <24 jam',
    ],
    popular: true,
    gradient: 'from-amber-500 to-orange-600',
    link: '/order',
    cta: 'Order Carousel',
  },
  {
    icon: Sparkles,
    name: 'Custom Package',
    description: 'Paket khusus sesuai kebutuhan Anda',
    price: 'Custom',
    priceNote: 'Harga disesuaikan',
    features: [
      'Design feed Instagram',
      'Story templates',
      'Highlight covers',
      'Reels thumbnail',
      'Brand guidelines',
      'Unlimited revisi',
      'Priority support',
    ],
    popular: false,
    gradient: 'from-orange-500 to-amber-600',
    link: '#contact',
    cta: 'Contact Me',
  },
];

export function PricingModern() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  // 3D Card Effect Hook
  const use3DCard = () => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave };
  };

  return (
    <section
      id="pricing"
      className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(251 191 36) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              PRICING
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              Freelance
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
              Design Services
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Paket design Instagram feed yang terjangkau untuk meningkatkan visual brand Anda di social media
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            const card3D = use3DCard();
            
            return (
              <motion.div
                key={index}
                ref={card3D.ref}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredPlan(index)}
                onHoverEnd={() => setHoveredPlan(null)}
                onMouseMove={card3D.handleMouseMove}
                onMouseLeave={card3D.handleMouseLeave}
                style={{
                  rotateX: card3D.rotateX,
                  rotateY: card3D.rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className={`relative ${plan.popular ? 'md:-mt-4' : ''}`}
              >
                <div 
                  className={`relative h-full rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border overflow-hidden transition-all duration-500 ${
                    plan.popular
                      ? 'border-amber-500/50 shadow-2xl shadow-amber-500/20'
                      : 'border-gray-200/50 dark:border-gray-800/50 hover:border-amber-500/30'
                  }`}
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500" />
                  )}

                  <div className="p-8">
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-transparent border-2 border-amber-500/30 flex items-center justify-center mb-6`}
                      animate={hoveredPlan === index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ transform: 'translateZ(40px)' }}
                    >
                      <Icon className="h-8 w-8 text-amber-600" />
                    </motion.div>

                    {/* Popular Label */}
                    {plan.popular && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-bold mb-4">
                        <Sparkles className="h-3 w-3" />
                        MOST POPULAR
                      </div>
                    )}

                    {/* Plan Name */}
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        {plan.price !== 'Custom' && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Rp
                          </span>
                        )}
                        <span className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                          {plan.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {plan.priceNote}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <a
                      href={plan.link}
                      className={`group relative w-full h-12 rounded-full flex items-center justify-center gap-2 font-medium transition-all overflow-hidden ${
                        plan.popular
                          ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100'
                      }`}
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      <span className="relative z-10">{plan.cta}</span>
                      <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                      
                      {/* Hover Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={false}
                      />
                    </a>
                  </div>

                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 transition-opacity duration-500 pointer-events-none`}
                    animate={hoveredPlan === index ? { opacity: 0.05 } : { opacity: 0 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: '2x', label: 'Revisi gratis', icon: RefreshCw },
            { value: '1-3', label: 'Hari pengerjaan', icon: Clock },
            { value: '100%', label: 'Original design', icon: Palette },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-amber-500/20"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-transparent border-2 border-amber-500/30 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-amber-600" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bonus Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 border border-amber-500/30">
            <Sparkles className="h-5 w-5 text-amber-600" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Bonus:</span> Konsultasi gratis untuk paket Carousel & Custom
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
