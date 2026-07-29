// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, Image as ImageIcon, Layers, Sparkles, ArrowRight, RefreshCw, Clock, Palette } from 'lucide-react';

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
    link: '#contact',
    cta: 'Contact Me',
  },
];

export function PricingModern() {
  return (
    <section
      id="pricing"
      className="relative py-32 bg-white border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mb-24"
        >
          <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-6">
            Pricing
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.95]">
            Freelance
            <br />
            Design Services
          </h2>
          <p className="text-base text-gray-500 max-w-lg mt-8 leading-relaxed">
            Paket design Instagram feed yang terjangkau untuk meningkatkan visual brand Anda di social media
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 mb-24">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                className={`bg-white p-8 md:p-10 relative ${plan.popular ? 'border-t-2 border-t-black' : ''}`}
              >
                {/* Popular Label */}
                {plan.popular && (
                  <span className="text-xs font-medium tracking-widest text-black uppercase mb-6 block">
                    Most Popular
                  </span>
                )}

                {/* Icon */}
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-8">
                  <Icon className="h-4 w-4 text-gray-500" />
                </div>

                {/* Plan Name */}
                <h3 className="text-lg font-semibold tracking-tight text-black mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-8">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-10">
                  <div className="flex items-baseline gap-2">
                    {plan.price !== 'Custom' && (
                      <span className="text-xs text-gray-400 uppercase tracking-widest">
                        Rp
                      </span>
                    )}
                    <span className="text-5xl font-bold tracking-tight text-black">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {plan.priceNote}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-10">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-500"
                    >
                      <span className="text-gray-400 mt-0.5">—</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={plan.link}
                  className={`w-full h-11 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest border transition-colors duration-0 ${
                    plan.popular
                      ? 'bg-black text-white border-black hover:bg-white hover:text-black'
                      : 'bg-white text-black border-black hover:bg-black hover:text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="grid md:grid-cols-3 gap-px bg-gray-200 border border-gray-200"
        >
          {[
            { value: '2×', label: 'Revisi gratis', icon: RefreshCw },
            { value: '1—3', label: 'Hari pengerjaan', icon: Clock },
            { value: '100%', label: 'Original design', icon: Palette },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 md:p-10 text-center"
              >
                <Icon className="h-4 w-4 text-gray-400 mx-auto mb-4" />
                <div className="text-4xl font-bold tracking-tight text-black mb-2">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
