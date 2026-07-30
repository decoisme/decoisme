'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Lightbulb, 
  Palette, 
  Image as ImageIcon, 
  FileText,
  MessageCircle,
  Minus,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { SystemLabel, MemoryAddress } from '@/components/ui/brutalist-elements';

export default function OrderPage() {
  const [step, setStep] = useState(1);
  const [region, setRegion] = useState<'ID' | 'WW'>('ID');
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'paypal' | 'stripe' | 'wise'>('whatsapp');
  const [formData, setFormData] = useState({
    slideCount: 3,
    isExpress: false,
    needsConcept: false,
    hasBrandGuidelines: false,
    hasAssets: false,
    hasCopywriting: false,
    name: '',
    email: '',
    phone: '',
    country: '',
    projectDescription: '',
  });

  const BASE_PRICE_IDR = 60000;
  const BASE_PRICE_USD = 12;
  const BASE_SLIDES = 3;
  
  const BASE_PRICE = region === 'ID' ? BASE_PRICE_IDR : BASE_PRICE_USD;
  const CURRENCY = region === 'ID' ? 'IDR' : 'USD';
  
  const extraSlides = Math.max(0, formData.slideCount - BASE_SLIDES);
  const extraSlidesPrice = region === 'ID' ? extraSlides * 10000 : extraSlides * 2;
  const expressPrice = formData.isExpress ? BASE_PRICE * 0.5 : 0;
  const conceptPrice = region === 'ID' 
    ? (formData.needsConcept ? 25000 : 0)
    : (formData.needsConcept ? 5 : 0);
  const brandGuidelinesDiscount = region === 'ID'
    ? (formData.hasBrandGuidelines ? -10000 : 0)
    : (formData.hasBrandGuidelines ? -2 : 0);
  const assetsDiscount = region === 'ID'
    ? (formData.hasAssets ? -5000 : 0)
    : (formData.hasAssets ? -1 : 0);
  const copywritingDiscount = region === 'ID'
    ? (formData.hasCopywriting ? -5000 : 0)
    : (formData.hasCopywriting ? -1 : 0);
  
  const totalPrice = BASE_PRICE + extraSlidesPrice + expressPrice + conceptPrice + 
                     brandGuidelinesDiscount + assetsDiscount + copywritingDiscount;

  const formatPrice = (price: number) => {
    if (region === 'ID') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(price);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(price);
    }
  };

  const handleSubmit = () => {
    if (region === 'ID') {
      // WhatsApp untuk Indonesia
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

      const whatsappUrl = `https://wa.me/6282258221745?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Email untuk International
      const subject = `Design Order Request - ${formData.name}`;
      const body = `
Hi,

I would like to place an order for Instagram Carousel Post Design.

ORDER DETAILS:
• Number of Slides: ${formData.slideCount} slides
${formData.isExpress ? '• Express Delivery: Yes (<24 hours)' : ''}
${formData.needsConcept ? '• Concept from Scratch: Yes' : ''}
${formData.hasBrandGuidelines ? '• Brand Guidelines: Ready' : ''}
${formData.hasAssets ? '• Assets: Ready' : ''}
${formData.hasCopywriting ? '• Copywriting: Ready' : ''}

ESTIMATED PRICE: ${formatPrice(totalPrice)}
PREFERRED PAYMENT METHOD: ${paymentMethod.toUpperCase()}

CLIENT INFO:
• Name: ${formData.name}
• Email: ${formData.email}
• Country: ${formData.country}
• Phone: ${formData.phone || 'N/A'}

PROJECT DESCRIPTION:
${formData.projectDescription}

Please confirm the order and payment details.

Best regards,
${formData.name}
      `.trim();

      const mailtoUrl = `mailto:decoisme.works@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    }
  };

  const nextStep = () => setStep(Math.min(4, step + 1));
  const prevStep = () => setStep(Math.max(1, step - 1));

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 h-16 bg-white border-b border-black flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors duration-0">
          <ArrowLeft className="h-4 w-4" />
          <span className="font-mono text-[11px] uppercase tracking-widest">Back</span>
        </Link>
        
        {/* Region Toggle */}
        <div className="flex border border-black rounded-none overflow-hidden">
          <button
            onClick={() => setRegion('ID')}
            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors duration-0 border-r border-black ${
              region === 'ID' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
            }`}
          >
            IDN
          </button>
          <button
            onClick={() => setRegion('WW')}
            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors duration-0 ${
              region === 'WW' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
            }`}
          >
            WWD
          </button>
        </div>
        
        <MemoryAddress code="0x01" />
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Progress Bar */}
        <div className="mb-16">
          <div className="flex gap-px mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 transition-colors duration-0 ${
                  s <= step ? 'bg-black' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between">
            {['Package', 'Modifiers', 'Info', 'Review'].map((label, i) => (
              <span
                key={label}
                className={`text-[10px] font-mono uppercase tracking-widest ${
                  i + 1 === step ? 'text-black font-medium' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'linear' }}
              className="space-y-8"
            >
              <div>
                <SystemLabel label="STEP.01" />
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-2">
                  {region === 'ID' ? 'Jumlah Slides' : 'Slide Count'}
                </h2>
                <p className="text-sm text-gray-500">
                  {region === 'ID' ? 'Paket dasar termasuk 3 slides' : 'Base package includes 3 slides'}
                </p>
              </div>

              <div className="border border-black p-8 space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200">
                  <div>
                    <div className="text-sm font-medium uppercase tracking-wider">
                      {region === 'ID' ? 'Paket Dasar' : 'Base Package'}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {region === 'ID' ? 'Sampai 3 slides' : 'Up to 3 slides'}
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{formatPrice(BASE_PRICE)}</div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-600">
                    {region === 'ID' ? 'Jumlah Slide' : 'Slide Count'}
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setFormData({...formData, slideCount: Math.max(1, formData.slideCount - 1)})}
                      className="w-12 h-12 border border-black hover:bg-black hover:text-white transition-colors duration-0 flex items-center justify-center"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <div className="flex-1 text-center">
                      <div className="text-6xl font-bold tracking-tight">{formData.slideCount}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest mt-2">slides</div>
                    </div>
                    
                    <button
                      onClick={() => setFormData({...formData, slideCount: formData.slideCount + 1})}
                      className="w-12 h-12 border border-black hover:bg-black hover:text-white transition-colors duration-0 flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {extraSlides > 0 && (
                    <div className="text-center text-xs text-gray-600">
                      +{extraSlides} {region === 'ID' ? 'slide tambahan' : 'extra slides'} = +{formatPrice(extraSlidesPrice)}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'linear' }}
              className="space-y-8"
            >
              <div>
                <SystemLabel label="STEP.02" />
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-2">
                  {region === 'ID' ? 'Kustomisasi' : 'Customize'}
                </h2>
                <p className="text-sm text-gray-500">
                  {region === 'ID' ? 'Tambah fitur atau terapkan diskon' : 'Add features or apply discounts'}
                </p>
              </div>

              <div className="border border-black divide-y divide-gray-200">
                {/* Add-ons */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-4">
                    {region === 'ID' ? 'Tambahan (+)' : 'Add-ons (+)'}
                  </h3>
                  
                  <label className="flex items-center gap-4 p-4 border border-gray-200 hover:border-black cursor-pointer transition-colors duration-0">
                    <input
                      type="checkbox"
                      checked={formData.isExpress}
                      onChange={(e) => setFormData({...formData, isExpress: e.target.checked})}
                      className="w-4 h-4 border-gray-300 rounded-none"
                    />
                    <Clock className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {region === 'ID' ? 'Express Delivery' : 'Express Delivery'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {region === 'ID' ? 'Selesai dalam 24 jam' : 'Finish in 24 hours'}
                      </div>
                    </div>
                    <div className="text-xs font-mono font-medium">+50%</div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border border-gray-200 hover:border-black cursor-pointer transition-colors duration-0">
                    <input
                      type="checkbox"
                      checked={formData.needsConcept}
                      onChange={(e) => setFormData({...formData, needsConcept: e.target.checked})}
                      className="w-4 h-4 border-gray-300 rounded-none"
                    />
                    <Lightbulb className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {region === 'ID' ? 'Konsep dari Nol' : 'Concept from Scratch'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {region === 'ID' ? 'Brainstorming & riset' : 'Brainstorming & research'}
                      </div>
                    </div>
                    <div className="text-xs font-mono font-medium">
                      {region === 'ID' ? '+25k' : '+$5'}
                    </div>
                  </label>
                </div>

                {/* Discounts */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-4">
                    {region === 'ID' ? 'Diskon (-)' : 'Discounts (-)'}
                  </h3>
                  
                  <label className="flex items-center gap-4 p-4 border border-gray-200 hover:border-black cursor-pointer transition-colors duration-0">
                    <input
                      type="checkbox"
                      checked={formData.hasBrandGuidelines}
                      onChange={(e) => setFormData({...formData, hasBrandGuidelines: e.target.checked})}
                      className="w-4 h-4 border-gray-300 rounded-none"
                    />
                    <Palette className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {region === 'ID' ? 'Brand Guidelines Sudah Ada' : 'Brand Guidelines Ready'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {region === 'ID' ? 'Logo, warna, font' : 'Logo, colors, fonts'}
                      </div>
                    </div>
                    <div className="text-xs font-mono font-medium">
                      {region === 'ID' ? '-10k' : '-$2'}
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border border-gray-200 hover:border-black cursor-pointer transition-colors duration-0">
                    <input
                      type="checkbox"
                      checked={formData.hasAssets}
                      onChange={(e) => setFormData({...formData, hasAssets: e.target.checked})}
                      className="w-4 h-4 border-gray-300 rounded-none"
                    />
                    <ImageIcon className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {region === 'ID' ? 'Assets Sudah Ready' : 'Assets Ready'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {region === 'ID' ? 'Foto, ilustrasi' : 'Photos, illustrations'}
                      </div>
                    </div>
                    <div className="text-xs font-mono font-medium">
                      {region === 'ID' ? '-5k' : '-$1'}
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border border-gray-200 hover:border-black cursor-pointer transition-colors duration-0">
                    <input
                      type="checkbox"
                      checked={formData.hasCopywriting}
                      onChange={(e) => setFormData({...formData, hasCopywriting: e.target.checked})}
                      className="w-4 h-4 border-gray-300 rounded-none"
                    />
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {region === 'ID' ? 'Copywriting Sudah Disiapkan' : 'Copywriting Ready'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {region === 'ID' ? 'Teks & caption disiapkan' : 'Text & captions prepared'}
                      </div>
                    </div>
                    <div className="text-xs font-mono font-medium">
                      {region === 'ID' ? '-5k' : '-$1'}
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'linear' }}
              className="space-y-8"
            >
              <div>
                <SystemLabel label="STEP.03" />
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-2">
                  {region === 'ID' ? 'Info Kamu' : 'Your Info'}
                </h2>
                <p className="text-sm text-gray-500">
                  {region === 'ID' ? 'Detail kontak dan deskripsi project' : 'Contact details and project description'}
                </p>
              </div>

              <div className="border border-black p-8 space-y-6">
                {/* Payment Method - International Only */}
                {region === 'WW' && (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-gray-600 mb-3">
                      Payment Method *
                    </label>
                    <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200">
                      {[
                        { id: 'paypal', name: 'PayPal', desc: 'Fast & secure' },
                        { id: 'stripe', name: 'Stripe', desc: 'Credit/debit card' },
                        { id: 'wise', name: 'Wise', desc: 'Bank transfer' },
                        { id: 'email', name: 'Email', desc: 'Other methods' },
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id as any)}
                          className={`p-4 text-left transition-colors duration-0 ${
                            paymentMethod === method.id
                              ? 'bg-black text-white'
                              : 'bg-white text-black hover:bg-gray-50'
                          }`}
                        >
                          <div className="text-sm font-medium">{method.name}</div>
                          <div className={`text-xs mt-1 ${paymentMethod === method.id ? 'text-gray-300' : 'text-gray-500'}`}>
                            {method.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-600 mb-3">
                    {region === 'ID' ? 'Nama Lengkap' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-black focus:outline-none transition-colors duration-0"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-600 mb-3">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-black focus:outline-none transition-colors duration-0"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                {/* Country - International Only */}
                {region === 'WW' && (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-gray-600 mb-3">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-black focus:outline-none transition-colors duration-0"
                      placeholder="United States"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-600 mb-3">
                    {region === 'ID' ? 'WhatsApp *' : `Phone ${region === 'WW' ? '(Optional)' : '*'}`}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-black focus:outline-none transition-colors duration-0"
                    placeholder={region === 'ID' ? '08123456789' : '+1 234 567 8900'}
                    required={region === 'ID'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-600 mb-3">
                    {region === 'ID' ? 'Deskripsi Project' : 'Project Description'} *
                  </label>
                  <textarea
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-black focus:outline-none resize-none transition-colors duration-0"
                    rows={6}
                    placeholder={region === 'ID' 
                      ? 'Ceritakan tentang project kamu, target audience, style yang diinginkan...'
                      : 'Tell us about your project, target audience, preferred style...'
                    }
                    required
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'linear' }}
              className="space-y-8"
            >
              <div>
                <SystemLabel label="STEP.04" />
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-2">
                  {region === 'ID' ? 'Review Order' : 'Review Order'}
                </h2>
                <p className="text-sm text-gray-500">
                  {region === 'ID' ? 'Verifikasi order kamu sebelum mengirim' : 'Verify your order before submitting'}
                </p>
              </div>

              <div className="border border-black divide-y divide-gray-200">
                {/* Package Details */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-4">
                    {region === 'ID' ? 'Detail Paket' : 'Package Details'}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Carousel Post ({formData.slideCount} slides)</span>
                      <span className="font-mono">{formatPrice(BASE_PRICE)}</span>
                    </div>
                    {extraSlides > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>{region === 'ID' ? `Extra ${extraSlides} slides` : `Extra ${extraSlides} slides`}</span>
                        <span className="font-mono">+{formatPrice(extraSlidesPrice)}</span>
                      </div>
                    )}
                    {formData.isExpress && (
                      <div className="flex justify-between text-gray-600">
                        <span>Express Delivery</span>
                        <span className="font-mono">+{formatPrice(expressPrice)}</span>
                      </div>
                    )}
                    {formData.needsConcept && (
                      <div className="flex justify-between text-gray-600">
                        <span>{region === 'ID' ? 'Konsep dari Nol' : 'Concept from Scratch'}</span>
                        <span className="font-mono">+{formatPrice(conceptPrice)}</span>
                      </div>
                    )}
                    {formData.hasBrandGuidelines && (
                      <div className="flex justify-between text-gray-600">
                        <span>{region === 'ID' ? 'Brand Guidelines' : 'Brand Guidelines'}</span>
                        <span className="font-mono">{formatPrice(brandGuidelinesDiscount)}</span>
                      </div>
                    )}
                    {formData.hasAssets && (
                      <div className="flex justify-between text-gray-600">
                        <span>{region === 'ID' ? 'Assets Ready' : 'Assets Ready'}</span>
                        <span className="font-mono">{formatPrice(assetsDiscount)}</span>
                      </div>
                    )}
                    {formData.hasCopywriting && (
                      <div className="flex justify-between text-gray-600">
                        <span>{region === 'ID' ? 'Copywriting Ready' : 'Copywriting Ready'}</span>
                        <span className="font-mono">{formatPrice(copywritingDiscount)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="p-6 bg-black text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-mono uppercase tracking-widest">
                      {region === 'ID' ? 'Estimasi Total' : 'Estimated Total'}
                    </span>
                    <span className="text-3xl font-bold font-mono">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Payment Method - International Only */}
                {region === 'WW' && (
                  <div className="p-6 space-y-2 text-sm">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-4">Payment Method</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Method:</span>
                      <span className="font-medium capitalize">{paymentMethod}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Payment details will be sent to your email after order confirmation
                    </p>
                  </div>
                )}

                {/* Contact Info */}
                <div className="p-6 space-y-2 text-sm">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-4">
                    {region === 'ID' ? 'Info Kontak' : 'Contact Info'}
                  </h3>
                  <div><span className="text-gray-500">{region === 'ID' ? 'Nama' : 'Name'}:</span> {formData.name}</div>
                  <div><span className="text-gray-500">Email:</span> {formData.email}</div>
                  {region === 'WW' && formData.country && (
                    <div><span className="text-gray-500">Country:</span> {formData.country}</div>
                  )}
                  {formData.phone && (
                    <div><span className="text-gray-500">{region === 'ID' ? 'WhatsApp' : 'Phone'}:</span> {formData.phone}</div>
                  )}
                </div>

                {/* Project Description */}
                <div className="p-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-4">
                    {region === 'ID' ? 'Deskripsi Project' : 'Project Description'}
                  </h3>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{formData.projectDescription}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-px mt-12">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 h-14 border border-black hover:bg-black hover:text-white transition-colors duration-0 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest"
            >
              <ArrowLeft className="h-4 w-4" />
              {region === 'ID' ? 'Kembali' : 'Back'}
            </button>
          )}
          
          {step < 4 ? (
            <button
              onClick={nextStep}
              className="flex-1 h-14 bg-black text-white hover:bg-gray-800 transition-colors duration-0 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest"
            >
              {region === 'ID' ? 'Lanjut' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={
                !formData.name || 
                !formData.email || 
                !formData.projectDescription ||
                (region === 'ID' && !formData.phone) ||
                (region === 'WW' && !formData.country)
              }
              className="flex-1 h-14 bg-black text-white hover:bg-gray-800 transition-colors duration-0 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MessageCircle className="h-4 w-4" />
              {region === 'ID' ? 'Kirim via WhatsApp' : 'Send Order'}
            </button>
          )}
        </div>

        {/* Price Preview (Sticky) */}
        <div className="fixed bottom-6 right-6 z-40">
          <div className="px-6 py-3 bg-black text-white border border-black flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-widest">Total:</span>
            <span className="text-lg font-bold font-mono">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
