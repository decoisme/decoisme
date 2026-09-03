'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExclusiveRateCardPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #000 0, #000 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #000 0, #000 1px, transparent 1px, transparent 20px)',
        }} />
      </div>

      {/* Header - Enhanced */}
      <div className="border-b-4 border-black bg-white relative">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-8 
                       px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-all duration-200 hover:translate-x-1"
            >
              <ArrowLeft className="h-3 w-3" />
              BACK
            </Link>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
                RATE CARD
              </h1>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="h-8 w-8 md:h-10 md:w-10" />
              </motion.div>
            </div>
            <p className="text-sm font-mono text-gray-600 flex items-center gap-2">
              <span className="h-1 w-12 bg-black"></span>
              Exclusive pricing for social media content
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 relative">
        {/* Note for Clients - Enhanced */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-4 border-black p-6 mb-12 bg-gray-50 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-black opacity-5 rounded-full -mr-16 -mt-16"></div>
          <p className="font-mono text-sm leading-relaxed relative z-10">
            Thank you for choosing to work with me. Below are the rates for social media content creation. 
            All prices are final and include revisions as discussed.
          </p>
        </motion.div>

        {/* Rate Cards - Side by Side on Desktop */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Single Post */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onHoverStart={() => setHoveredCard('single')}
            onHoverEnd={() => setHoveredCard(null)}
            className="border-4 border-black bg-white relative group cursor-default"
          >
            {/* Hover Effect - Corner Accent */}
            <motion.div
              className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-black border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            />
            
            <div className="border-b-4 border-black bg-black text-white px-6 py-4 relative overflow-hidden">
              <motion.div
                animate={hoveredCard === 'single' ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-black uppercase tracking-tight relative z-10">
                  SINGLE POST
                </h2>
              </motion.div>
              {/* Animated background stripe */}
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                animate={hoveredCard === 'single' ? { x: [-100, 400] } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{ width: '100px', transform: 'skewX(-20deg)' }}
              />
            </div>

            <div className="p-6">
              <motion.div
                className="mb-6"
                animate={hoveredCard === 'single' ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl font-black mb-2 flex items-baseline gap-2">
                  <span>Rp 30.000</span>
                </div>
                <div className="text-sm font-mono text-gray-600">
                  Per post
                </div>
              </motion.div>

              <div className="space-y-3">
                {[
                  '1 social media post design',
                  'Instagram, Facebook, or LinkedIn format',
                  'High-resolution files (PNG, JPG)',
                  'Link project included'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-mono">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Hover border glow effect */}
            <motion.div
              className="absolute inset-0 border-4 border-black opacity-0 group-hover:opacity-100"
              animate={hoveredCard === 'single' ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onHoverStart={() => setHoveredCard('carousel')}
            onHoverEnd={() => setHoveredCard(null)}
            className="border-4 border-black bg-white relative group cursor-default"
          >
            {/* Featured Badge */}
            <div className="absolute -top-3 -right-3 bg-black text-white px-4 py-1 text-xs font-mono uppercase tracking-wider z-20 border-2 border-white shadow-lg">
              POPULAR
            </div>

            {/* Hover Effect - Corner Accent */}
            <motion.div
              className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-l-[40px] border-t-black border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            />
            
            <div className="border-b-4 border-black bg-black text-white px-6 py-4 relative overflow-hidden">
              <motion.div
                animate={hoveredCard === 'carousel' ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-black uppercase tracking-tight relative z-10">
                  CAROUSEL POST
                </h2>
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                animate={hoveredCard === 'carousel' ? { x: [-100, 400] } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{ width: '100px', transform: 'skewX(-20deg)' }}
              />
            </div>

            <div className="p-6">
              <motion.div
                className="mb-6"
                animate={hoveredCard === 'carousel' ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl font-black mb-2">
                  <span className="text-3xl">Start from</span><br/>
                  Rp 60.000
                </div>
                <div className="text-sm font-mono text-gray-600">
                  Price varies based on slides and complexity
                </div>
              </motion.div>

              <div className="space-y-3">
                {[
                  'Multiple slides design',
                  'Cohesive visual design across slides',
                  'Instagram, Facebook, or LinkedIn format',
                  'High-resolution files (PNG, JPG)',
                  'Link project included'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-mono">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <p className="text-xs font-mono text-gray-600">
                  * Final price depends on number of slides and design complexity
                </p>
              </div>
            </div>

            <motion.div
              className="absolute inset-0 border-4 border-black opacity-0 group-hover:opacity-100"
              animate={hoveredCard === 'carousel' ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Payment & Terms - Enhanced Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="border-4 border-black bg-gray-50 p-8 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black via-gray-400 to-black"></div>
          
          <h3 className="text-2xl font-black uppercase mb-8 tracking-tight flex items-center gap-3">
            <span className="h-3 w-3 bg-black"></span>
            PAYMENT & TERMS
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-sm font-mono">
            {[
              { label: 'Payment', value: 'Maximum 7 days after invoice is sent' },
              { label: 'Delivery', value: 'Files sent via WhatsApp, email, or cloud storage link' },
              { label: 'Revisions', value: 'Minor adjustments included, major changes will be discussed' },
              { label: 'File formats', value: 'High-resolution PNG and JPG' },
              { label: 'Link project', value: 'Viewable project link included for all orders' }
            ].map((term, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                className="border-l-4 border-black pl-4 hover:bg-white hover:shadow-sm transition-all p-3"
              >
                <strong className="block mb-2">{term.label}:</strong>
                <span className="text-gray-700">{term.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact - Mega CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="border-4 border-black bg-black text-white text-center relative overflow-hidden"
        >
          {/* Animated corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-white opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-white opacity-20"></div>
          
          <div className="p-12 relative z-10">
            <motion.h3
              className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tight"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              READY TO ORDER?
            </motion.h3>
            <p className="font-mono text-sm mb-8 text-gray-300 max-w-md mx-auto">
              Contact me via WhatsApp or email to discuss your project
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <motion.a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-8 py-4 bg-white text-black border-4 border-white font-mono text-sm uppercase 
                         hover:bg-black hover:text-white hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] transition-all"
              >
                WHATSAPP
              </motion.a>
              <motion.a
                href="mailto:hello@decoisme.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-8 py-4 border-4 border-white font-mono text-sm uppercase 
                         hover:bg-white hover:text-black hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] transition-all"
              >
                EMAIL
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-xs font-mono text-gray-500">
            This rate card is valid for 30 days from the date shared. Prices may change without notice.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
