// @ts-nocheck
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Share2, Image as ImageIcon, Layers } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function PricingSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, isInView } = useScrollAnimation();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const pricingPlans = [
    {
      icon: ImageIcon,
      name: 'Single Post',
      description: 'Perfect untuk konten feed Instagram yang menarik',
      price: '30.000',
      priceNote: 'Start from',
      features: [
        '1 Design feed Instagram',
        'Revisi 2x',
        'File JPG/PNG',
        'Delivery 1-2 hari',
      ],
      popular: false,
      gradient: 'from-yellow-500 to-amber-600',
    },
    {
      icon: Layers,
      name: 'Carousel Post',
      description: 'Untuk storytelling yang lebih engaging',
      price: '60.000',
      priceNote: 'Start from',
      features: [
        'Up to 10 slides',
        'Free Revisi',
        'File JPG/PNG',
        'Delivery 2-3 hari',
        'Basic copywriting',
        'Konsisten design',
      ],
      popular: true,
      gradient: 'from-amber-500 to-orange-600',
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
      ],
      popular: false,
      gradient: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      <div ref={inViewRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <p className="text-sm font-semibold tracking-widest text-amber-600 dark:text-amber-500 uppercase mb-4">
              Pricing
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              <span className="bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Freelance
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                Design Services
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Paket design Instagram feed yang terjangkau untuk meningkatkan visual
              brand Anda di social media.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            style={mounted ? { y } : {}}
            suppressHydrationWarning
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card
                  className={`relative overflow-hidden rounded-3xl p-8 h-full flex flex-col ${
                    plan.popular
                      ? 'border-2 border-amber-500 dark:border-amber-400 shadow-2xl scale-105'
                      : 'border-gray-200 dark:border-gray-800'
                  } bg-white dark:bg-gray-950 hover:shadow-2xl transition-all duration-500`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-bold px-4 py-1 rounded-bl-2xl">
                      POPULAR
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6`}>
                    <plan.icon className="h-7 w-7 text-white" />
                  </div>

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
                      <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {plan.priceNote}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className={`w-full rounded-full py-6 text-base font-medium transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100'
                    }`}
                  >
                    <a href="#contact">
                      Order Now
                    </a>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Card className="inline-block px-8 py-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 via-amber-500/10 to-orange-500/10 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3 text-sm">
                <Share2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Bonus:</span> Konsultasi gratis untuk paket Carousel & Custom
                </p>
              </div>
            </Card>
          </motion.div>

          {/* FAQ or Notes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                  2x
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Revisi gratis
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                  1-3
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Hari pengerjaan
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                  100%
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Original design
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
