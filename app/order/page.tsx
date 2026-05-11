'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Layers, 
  Clock, 
  Lightbulb, 
  Palette, 
  Image as ImageIcon, 
  FileText,
  MessageCircle,
  Calculator
} from 'lucide-react';
import Link from 'next/link';

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Package
    packageType: 'carousel',
    
    // Carousel details
    slideCount: 3,
    
    // Modifiers
    isExpress: false,
    needsConcept: false,
    hasBrandGuidelines: false,
    hasAssets: false,
    hasCopywriting: false,
    
    // Client info
    name: '',
    email: '',
    phone: '',
    projectDescription: '',
  });

  // Price calculation
  const BASE_PRICE = 60000;
  const BASE_SLIDES = 3;
  
  const extraSlides = Math.max(0, formData.slideCount - BASE_SLIDES);
  const extraSlidesPrice = extraSlides * 10000;
  const expressPrice = formData.isExpress ? BASE_PRICE * 0.5 : 0;
  const conceptPrice = formData.needsConcept ? 25000 : 0;
  const brandGuidelinesDiscount = formData.hasBrandGuidelines ? -10000 : 0;
  const assetsDiscount = formData.hasAssets ? -5000 : 0;
  const copywritingDiscount = formData.hasCopywriting ? -5000 : 0;
  
  const totalPrice = BASE_PRICE + extraSlidesPrice + expressPrice + conceptPrice + 
                     brandGuidelinesDiscount + assetsDiscount + copywritingDiscount;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = () => {
    // Generate WhatsApp message
    const message = `
*Order Carousel Post Design*

*Detail Order:*
• Jumlah Slides: ${formData.slideCount} slides
${formData.isExpress ? '• Express Delivery: Ya (<24 jam)' : ''}
${formData.needsConcept ? '• Konsep dari Nol: Ya' : ''}
${formData.hasBrandGuidelines ? '• Brand Guidelines: Sudah ada' : ''}
${formData.hasAssets ? '• Assets: Sudah ready' : ''}
${formData.hasCopywriting ? '• Copywriting: Sudah disiapin' : ''}

*Estimasi Harga: ${formatPrice(totalPrice)}*

*Info Client:*
• Nama: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}

*Deskripsi Project:*
${formData.projectDescription}
    `.trim();

    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const nextStep = () => setStep(Math.min(4, step + 1));
  const prevStep = () => setStep(Math.max(1, step - 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 dark:from-gray-950 dark:via-black dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Kembali</span>
          </Link>
          <h1 className="text-xl font-bold">Order Carousel Post</h1>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  s < step ? 'bg-green-500 text-white' :
                  s === step ? 'bg-amber-600 text-white' :
                  'bg-gray-200 dark:bg-gray-800 text-gray-400'
                }`}>
                  {s < step ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-1 mx-2 transition-all ${
                    s < step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Package</span>
            <span>Modifiers</span>
            <span>Info</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {/* Step 1: Package Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Pilih Jumlah Slides</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <div>
                      <div className="font-semibold">Base Package</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Up to 3 slides</div>
                    </div>
                    <div className="text-2xl font-bold text-amber-600">{formatPrice(BASE_PRICE)}</div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium">Jumlah Slides</label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setFormData({...formData, slideCount: Math.max(1, formData.slideCount - 1)})}
                        className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      
                      <div className="flex-1 text-center">
                        <div className="text-5xl font-bold text-amber-600">{formData.slideCount}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">slides</div>
                      </div>
                      
                      <button
                        onClick={() => setFormData({...formData, slideCount: formData.slideCount + 1})}
                        className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {extraSlides > 0 && (
                      <div className="text-center text-sm text-amber-600">
                        +{extraSlides} extra slides = +{formatPrice(extraSlidesPrice)}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Modifiers */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Customize Order Anda</h2>
                
                <div className="space-y-4">
                  {/* Positive Modifiers */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Tambahan (Opsional)
                    </h3>
                    
                    <label className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        checked={formData.isExpress}
                        onChange={(e) => setFormData({...formData, isExpress: e.target.checked})}
                        className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <Clock className="h-6 w-6 text-amber-600" />
                      <div className="flex-1">
                        <div className="font-medium">Express Delivery</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Selesai dalam 24 jam</div>
                      </div>
                      <div className="text-sm font-semibold text-red-600">+50%</div>
                    </label>

                    <label className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        checked={formData.needsConcept}
                        onChange={(e) => setFormData({...formData, needsConcept: e.target.checked})}
                        className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <Lightbulb className="h-6 w-6 text-amber-600" />
                      <div className="flex-1">
                        <div className="font-medium">Konsep dari Nol</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Brainstorming & research</div>
                      </div>
                      <div className="text-sm font-semibold text-red-600">+25k</div>
                    </label>
                  </div>

                  {/* Negative Modifiers */}
                  <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                      <Check className="h-5 w-5" />
                      Diskon (Jika Tersedia)
                    </h3>
                    
                    <label className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        checked={formData.hasBrandGuidelines}
                        onChange={(e) => setFormData({...formData, hasBrandGuidelines: e.target.checked})}
                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <Palette className="h-6 w-6 text-green-600" />
                      <div className="flex-1">
                        <div className="font-medium">Brand Guidelines Lengkap</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Logo, colors, fonts ready</div>
                      </div>
                      <div className="text-sm font-semibold text-green-600">-10k</div>
                    </label>

                    <label className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        checked={formData.hasAssets}
                        onChange={(e) => setFormData({...formData, hasAssets: e.target.checked})}
                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <ImageIcon className="h-6 w-6 text-green-600" />
                      <div className="flex-1">
                        <div className="font-medium">Semua Asset Ready</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Foto, ilustrasi tersedia</div>
                      </div>
                      <div className="text-sm font-semibold text-green-600">-5k</div>
                    </label>

                    <label className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        checked={formData.hasCopywriting}
                        onChange={(e) => setFormData({...formData, hasCopywriting: e.target.checked})}
                        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <FileText className="h-6 w-6 text-green-600" />
                      <div className="flex-1">
                        <div className="font-medium">Copywriting Disiapin</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Text & caption sudah jadi</div>
                      </div>
                      <div className="text-sm font-semibold text-green-600">-5k</div>
                    </label>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Client Info */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Informasi Anda</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nama Lengkap *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">WhatsApp *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="08123456789"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Deskripsi Project *</label>
                    <textarea
                      value={formData.projectDescription}
                      onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Ceritakan tentang project Anda, target audience, style yang diinginkan, dll..."
                      required
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Review Order</h2>
                
                <div className="space-y-6">
                  {/* Package Summary */}
                  <div>
                    <h3 className="font-semibold mb-3">Package Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Carousel Post ({formData.slideCount} slides)</span>
                        <span className="font-medium">{formatPrice(BASE_PRICE)}</span>
                      </div>
                      {extraSlides > 0 && (
                        <div className="flex justify-between text-red-600">
                          <span>Extra {extraSlides} slides</span>
                          <span>+{formatPrice(extraSlidesPrice)}</span>
                        </div>
                      )}
                      {formData.isExpress && (
                        <div className="flex justify-between text-red-600">
                          <span>Express Delivery</span>
                          <span>+{formatPrice(expressPrice)}</span>
                        </div>
                      )}
                      {formData.needsConcept && (
                        <div className="flex justify-between text-red-600">
                          <span>Konsep dari Nol</span>
                          <span>+{formatPrice(conceptPrice)}</span>
                        </div>
                      )}
                      {formData.hasBrandGuidelines && (
                        <div className="flex justify-between text-green-600">
                          <span>Brand Guidelines</span>
                          <span>{formatPrice(brandGuidelinesDiscount)}</span>
                        </div>
                      )}
                      {formData.hasAssets && (
                        <div className="flex justify-between text-green-600">
                          <span>Assets Ready</span>
                          <span>{formatPrice(assetsDiscount)}</span>
                        </div>
                      )}
                      {formData.hasCopywriting && (
                        <div className="flex justify-between text-green-600">
                          <span>Copywriting Ready</span>
                          <span>{formatPrice(copywritingDiscount)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl">
                      <span className="text-lg font-bold">Estimasi Total</span>
                      <span className="text-3xl font-bold text-amber-600">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="font-semibold mb-3">Contact Info</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-600 dark:text-gray-400">Nama:</span> {formData.name}</div>
                      <div><span className="text-gray-600 dark:text-gray-400">Email:</span> {formData.email}</div>
                      <div><span className="text-gray-600 dark:text-gray-400">WhatsApp:</span> {formData.phone}</div>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="font-semibold mb-3">Project Description</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formData.projectDescription}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 font-medium transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Kembali
            </button>
          )}
          
          {step < 4 ? (
            <button
              onClick={nextStep}
              className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white font-medium transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Lanjut
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || !formData.phone || !formData.projectDescription}
              className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageCircle className="h-5 w-5" />
              Kirim via WhatsApp
            </button>
          )}
        </div>

        {/* Price Preview (Sticky) */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="px-6 py-3 bg-white dark:bg-gray-900 rounded-full shadow-2xl border border-gray-200 dark:border-gray-800 flex items-center gap-4"
          >
            <Layers className="h-5 w-5 text-amber-600" />
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Estimasi: </span>
              <span className="font-bold text-amber-600">{formatPrice(totalPrice)}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
