'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Calculator, Plus, Minus, Info, Check } from 'lucide-react';

export function PriceCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Base price
  const BASE_PRICE = 60000;
  const BASE_SLIDES = 5;
  
  // State for modifiers
  const [extraSlides, setExtraSlides] = useState(0);
  const [isExpress, setIsExpress] = useState(false);
  const [needsConcept, setNeedsConcept] = useState(false);
  const [hasBrandGuidelines, setHasBrandGuidelines] = useState(false);
  const [hasAssets, setHasAssets] = useState(false);
  const [hasCopywriting, setHasCopywriting] = useState(false);

  // Calculate modifiers
  const extraSlidesPrice = extraSlides * 10000;
  const expressPrice = isExpress ? BASE_PRICE * 0.5 : 0;
  const conceptPrice = needsConcept ? 25000 : 0;
  const brandGuidelinesDiscount = hasBrandGuidelines ? -10000 : 0;
  const assetsDiscount = hasAssets ? -5000 : 0;
  const copywritingDiscount = hasCopywriting ? -5000 : 0;

  // Total calculation
  const totalModifiers = 
    extraSlidesPrice + 
    expressPrice + 
    conceptPrice + 
    brandGuidelinesDiscount + 
    assetsDiscount + 
    copywritingDiscount;
  
  const finalPrice = BASE_PRICE + totalModifiers;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Calculator className="h-6 w-6" />
      </motion.button>

      {/* Calculator Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-96"
          >
            <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-2xl">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Kalkulator Harga</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Carousel Post (up to {BASE_SLIDES} slides)
                </p>
              </div>

              {/* Base Price */}
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Base Price</span>
                  <span className="text-lg font-bold text-amber-600">
                    {formatPrice(BASE_PRICE)}
                  </span>
                </div>
              </div>

              {/* Positive Modifiers */}
              <div className="mb-6 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
                  <Plus className="h-4 w-4" />
                  <span>Positive Modifiers</span>
                </div>

                {/* Extra Slides */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm">Extra Slides</label>
                    <span className="text-xs text-gray-500">+10k/slide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setExtraSlides(Math.max(0, extraSlides - 1))}
                      className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
                      disabled={extraSlides === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">{extraSlides}</span>
                    <button
                      onClick={() => setExtraSlides(extraSlides + 1)}
                      className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <span className="ml-auto text-sm font-medium text-red-600">
                      {extraSlidesPrice > 0 && `+${formatPrice(extraSlidesPrice)}`}
                    </span>
                  </div>
                </div>

                {/* Express */}
                <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                  <div className="flex-1">
                    <div className="text-sm font-medium">Express Delivery</div>
                    <div className="text-xs text-gray-500">Selesai dalam 24 jam</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">+50%</span>
                    <input
                      type="checkbox"
                      checked={isExpress}
                      onChange={(e) => setIsExpress(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                  </div>
                  {isExpress && (
                    <span className="ml-2 text-sm font-medium text-red-600">
                      +{formatPrice(expressPrice)}
                    </span>
                  )}
                </label>

                {/* Concept from Scratch */}
                <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                  <div className="flex-1">
                    <div className="text-sm font-medium">Konsep dari Nol</div>
                    <div className="text-xs text-gray-500">Butuh brainstorming & research</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">+25k</span>
                    <input
                      type="checkbox"
                      checked={needsConcept}
                      onChange={(e) => setNeedsConcept(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                  </div>
                  {needsConcept && (
                    <span className="ml-2 text-sm font-medium text-red-600">
                      +{formatPrice(conceptPrice)}
                    </span>
                  )}
                </label>
              </div>

              {/* Negative Modifiers */}
              <div className="mb-6 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                  <Minus className="h-4 w-4" />
                  <span>Negative Modifiers</span>
                </div>

                {/* Brand Guidelines */}
                <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                  <div className="flex-1">
                    <div className="text-sm font-medium">Brand Guidelines Lengkap</div>
                    <div className="text-xs text-gray-500">Logo, colors, fonts ready</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">-10k</span>
                    <input
                      type="checkbox"
                      checked={hasBrandGuidelines}
                      onChange={(e) => setHasBrandGuidelines(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </div>
                  {hasBrandGuidelines && (
                    <span className="ml-2 text-sm font-medium text-green-600">
                      {formatPrice(brandGuidelinesDiscount)}
                    </span>
                  )}
                </label>

                {/* Assets Ready */}
                <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                  <div className="flex-1">
                    <div className="text-sm font-medium">Semua Asset Ready</div>
                    <div className="text-xs text-gray-500">Foto, ilustrasi, icon tersedia</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">-5k</span>
                    <input
                      type="checkbox"
                      checked={hasAssets}
                      onChange={(e) => setHasAssets(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </div>
                  {hasAssets && (
                    <span className="ml-2 text-sm font-medium text-green-600">
                      {formatPrice(assetsDiscount)}
                    </span>
                  )}
                </label>

                {/* Copywriting */}
                <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                  <div className="flex-1">
                    <div className="text-sm font-medium">Copywriting Disiapin</div>
                    <div className="text-xs text-gray-500">Text & caption sudah jadi</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">-5k</span>
                    <input
                      type="checkbox"
                      checked={hasCopywriting}
                      onChange={(e) => setHasCopywriting(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </div>
                  {hasCopywriting && (
                    <span className="ml-2 text-sm font-medium text-green-600">
                      {formatPrice(copywritingDiscount)}
                    </span>
                  )}
                </label>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total Modifiers
                  </span>
                  <span className={`text-sm font-medium ${totalModifiers >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {totalModifiers >= 0 ? '+' : ''}{formatPrice(totalModifiers)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl">
                  <span className="text-lg font-bold">Estimasi Total</span>
                  <span className="text-2xl font-bold text-amber-600">
                    {formatPrice(finalPrice)}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex gap-2">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Harga final bisa berubah setelah diskusi detail project. Termasuk 2x revisi gratis.
                </p>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
              >
                <Check className="h-5 w-5" />
                Order Sekarang
              </a>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
