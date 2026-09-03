'use client';

import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

export default function ExclusiveRateCardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b-4 border-black bg-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-8 
                     px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors duration-0"
          >
            <ArrowLeft className="h-3 w-3" />
            BACK
          </Link>

          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            RATE CARD
          </h1>
          <p className="text-sm font-mono text-gray-600">
            Exclusive pricing for social media content
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Note for Clients */}
        <div className="border-4 border-black p-6 mb-12 bg-gray-50">
          <p className="font-mono text-sm leading-relaxed">
            Thank you for choosing to work with me. Below are the rates for social media content creation. 
            All prices are final and include revisions as discussed.
          </p>
        </div>

        {/* Rate Cards */}
        <div className="space-y-8">
          {/* Single Post */}
          <div className="border-4 border-black bg-white">
            <div className="border-b-4 border-black bg-black text-white px-6 py-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                SINGLE POST
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="text-4xl font-black mb-2">
                  Rp 30.000
                </div>
                <div className="text-sm font-mono text-gray-600">
                  Per post
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-mono">1 social media post design</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-mono">Instagram, Facebook, or LinkedIn format</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-mono">High-resolution files (PNG, JPG)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-mono">Link project included</span>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="border-4 border-black bg-white">
            <div className="border-b-4 border-black bg-black text-white px-6 py-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                CAROUSEL POST
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="text-4xl font-black mb-2">
                  Start from Rp 60.000
                </div>
                <div className="text-sm font-mono text-gray-600">
                  Price varies based on slides and complexity
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-mono">Multiple slides design</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-mono">Cohesive visual design across slides</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-mono">Instagram, Facebook, or LinkedIn format</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-mono">High-resolution files (PNG, JPG)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-mono">Link project included</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <p className="text-xs font-mono text-gray-600">
                  * Final price depends on number of slides and design complexity
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Terms */}
        <div className="mt-12 border-t-4 border-black pt-8">
          <h3 className="text-xl font-black uppercase mb-6">PAYMENT & TERMS</h3>
          
          <div className="space-y-4 text-sm font-mono">
            <div>
              <strong>Payment:</strong> Maximum 7 days after invoice is sent
            </div>
            <div>
              <strong>Delivery:</strong> Files sent via WhatsApp, email, or cloud storage link
            </div>
            <div>
              <strong>Revisions:</strong> Minor adjustments included, major changes will be discussed
            </div>
            <div>
              <strong>File formats:</strong> High-resolution PNG and JPG
            </div>
            <div>
              <strong>Link project:</strong> Viewable project link included for all orders
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 border-4 border-black p-8 bg-black text-white text-center">
          <h3 className="text-2xl font-black uppercase mb-4">
            READY TO ORDER?
          </h3>
          <p className="font-mono text-sm mb-6 text-gray-300">
            Contact me via WhatsApp or email to discuss your project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-black border-4 border-white font-mono text-sm uppercase 
                       hover:bg-black hover:text-white transition-colors duration-0"
            >
              WHATSAPP
            </a>
            <a
              href="mailto:hello@decoisme.com"
              className="px-8 py-4 border-4 border-white font-mono text-sm uppercase 
                       hover:bg-white hover:text-black transition-colors duration-0"
            >
              EMAIL
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs font-mono text-gray-500">
            This rate card is valid for 30 days from the date shared. Prices may change without notice.
          </p>
        </div>
      </div>
    </div>
  );
}
