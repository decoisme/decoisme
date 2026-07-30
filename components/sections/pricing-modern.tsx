// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, Image as ImageIcon, Layers, Sparkles, ArrowRight, RefreshCw, Clock, Palette } from 'lucide-react';

const pricingData = {
  ID: {
    currency: 'Rp',
    plans: [
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
        name: 'Presentation Design',
        description: 'PowerPoint/Google Slides profesional',
        price: '150.000',
        priceNote: 'Start from (up to 10 slides)',
        features: [
          'Up to 10 slides (extra +10k/slide)',
          'PowerPoint atau Google Slides',
          '2x revisi gratis',
          'Format: 16:9 atau 4:3',
          'Delivery 3-5 hari kerja',
          'Custom template & design',
          'Editable source file (PPTX/GSLIDES)',
        ],
        popular: false,
        link: '#contact',
        cta: 'Order Presentation',
      },
      {
        icon: Sparkles,
        name: 'Custom Package',
        description: 'Paket khusus sesuai kebutuhan Anda',
        price: 'Custom',
        priceNote: 'Harga disesuaikan',
        features: [
          'Design feed Instagram',
          'Presentation design',
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
    ],
  },
  WW: {
    currency: '$',
    plans: [
      {
        icon: ImageIcon,
        name: 'Single Post',
        description: 'Perfect for engaging Instagram feed content',
        price: '5',
        priceNote: 'Start from',
        features: [
          '1 Instagram feed design',
          'Format: 1080x1080px',
          '2 free revisions',
          'High quality JPG/PNG files',
          'Delivery 1-2 business days',
          'Free design consultation',
        ],
        popular: false,
        link: '#contact',
        cta: 'Order Now',
      },
      {
        icon: Layers,
        name: 'Carousel Post',
        description: 'For more engaging storytelling',
        price: '12',
        priceNote: 'Start from (up to 3 slides)',
        features: [
          'Up to 3 slides (extra +$2/slide)',
          'Format: 1080x1080px',
          '2 free revisions per slide',
          'High quality JPG/PNG files',
          'Delivery 2-3 business days',
          'Consistent design & flow',
          'Express <24h available',
        ],
        popular: true,
        link: '/order',
        cta: 'Order Carousel',
      },
      {
        icon: Sparkles,
        name: 'Presentation Design',
        description: 'Professional PowerPoint/Google Slides',
        price: '30',
        priceNote: 'Start from (up to 10 slides)',
        features: [
          'Up to 10 slides (extra +$2/slide)',
          'PowerPoint or Google Slides',
          '2 free revisions',
          'Format: 16:9 or 4:3',
          'Delivery 3-5 business days',
          'Custom template & design',
          'Editable source file (PPTX/GSLIDES)',
        ],
        popular: false,
        link: '#contact',
        cta: 'Order Presentation',
      },
      {
        icon: Sparkles,
        name: 'Custom Package',
        description: 'Custom package for your needs',
        price: 'Custom',
        priceNote: 'Price negotiable',
        features: [
          'Instagram feed design',
          'Presentation design',
          'Story templates',
          'Highlight covers',
          'Reels thumbnail',
          'Brand guidelines',
          'Unlimited revisions',
          'Priority support',
        ],
        popular: false,
        link: '#contact',
        cta: 'Contact Me',
      },
    ],
  },
};

export function PricingModern() {
  const [region, setRegion] = useState<'ID' | 'WW'>('ID');
  const [isGlitching, setIsGlitching] = useState(false);

  const handleRegionChange = (newRegion: 'ID' | 'WW') => {
    if (newRegion === region) return;
    
    setIsGlitching(true);
    setTimeout(() => {
      setRegion(newRegion);
      setIsGlitching(false);
    }, 100);
  };

  const currentData = pricingData[region];
  return (
    <section
      id="pricing"
      className="relative py-32 border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header with Region Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mb-24"
        >
          <div className="flex items-start justify-between mb-6">
            <p className="text-xs font-medium tracking-widest text-gray-500 uppercase">
              Pricing
            </p>
            
            {/* Region Toggle */}
            <div className="flex border border-black rounded-none overflow-hidden">
              <button
                onClick={() => handleRegionChange('ID')}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors duration-0 border-r border-black ${
                  region === 'ID'
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                IDN
              </button>
              <button
                onClick={() => handleRegionChange('WW')}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors duration-0 ${
                  region === 'WW'
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                WWD
              </button>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.95]">
            Freelance
            <br />
            Design Services
          </h2>
          <p className="text-base text-gray-500 max-w-lg mt-8 leading-relaxed">
            {region === 'ID' 
              ? 'Paket design Instagram feed & presentasi profesional yang terjangkau untuk meningkatkan visual brand Anda'
              : 'Affordable Instagram feed & presentation design packages to enhance your brand\'s visual presence'
            }
          </p>
        </motion.div>

        {/* Pricing Cards with Glitch Effect */}
        <div className={`grid md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 mb-24 ${isGlitching ? 'glitch-effect' : ''}`}>
          {currentData.plans.map((plan, index) => {
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
                        {currentData.currency}
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
            { value: '2×', label: region === 'ID' ? 'Revisi gratis' : 'Free revisions', icon: RefreshCw },
            { value: '1—3', label: region === 'ID' ? 'Hari pengerjaan' : 'Business days', icon: Clock },
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

      {/* Glitch Effect Styles */}
      <style jsx>{`
        @keyframes rgbSplitGlitch {
          0%, 100% {
            clip-path: none;
            transform: translate(0);
          }
          33% {
            clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
            transform: translate(-2px, 0);
          }
          66% {
            clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
            transform: translate(2px, 0);
          }
        }

        .glitch-effect {
          animation: rgbSplitGlitch 0.1s linear;
        }

        .glitch-effect * {
          text-shadow: -1px 0 #00FFFF, 1px 0 #FF0000;
          animation: rgbSplitGlitch 0.1s linear;
        }
      `}</style>
    </section>
  );
}
