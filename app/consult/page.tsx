'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MessageCircle, User, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { SystemLabel, MemoryAddress } from '@/components/ui/brutalist-elements';

export default function ConsultPage() {
  const [region, setRegion] = useState<'ID' | 'WW'>('ID');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    budget: '',
    projectDescription: '',
  });

  const services = [
    'Single Post Design',
    'Presentation Design (PPT/Slides/Canva)',
    'Social Media Management',
    'E-Book Design',
    'Custom Package',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (region === 'ID') {
      // WhatsApp untuk Indonesia
      const message = `
*Konsultasi Design Project*

*Info Client:*
• Nama: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}

*Detail Project:*
• Service: ${formData.service}
• Budget Range: ${formData.budget}

*Deskripsi:*
${formData.projectDescription}

Mohon info lebih lanjut. Terima kasih!
      `.trim();

      const whatsappUrl = `https://wa.me/6282258221745?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Email untuk International
      const subject = `Design Consultation Request - ${formData.name}`;
      const body = `
Hi,

I would like to request a consultation for a design project.

CLIENT INFO:
• Name: ${formData.name}
• Email: ${formData.email}
• Country: ${formData.country}
• Phone: ${formData.phone || 'N/A'}

PROJECT DETAILS:
• Service: ${formData.service}
• Budget Range: ${formData.budget}

PROJECT DESCRIPTION:
${formData.projectDescription}

Please get back to me with more information.

Best regards,
${formData.name}
      `.trim();

      const mailtoUrl = `mailto:decoisme.works@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    }
  };

  const isFormValid = formData.name && formData.email && formData.service && formData.projectDescription &&
                      (region === 'ID' ? formData.phone : formData.country);

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
        
        <MemoryAddress code="0xCF" />
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mb-12"
        >
          <SystemLabel label="CONSULTATION.FORM" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-2">
            {region === 'ID' ? 'Konsultasi Gratis' : 'Free Consultation'}
          </h1>
          <p className="text-sm text-gray-500">
            {region === 'ID' 
              ? 'Ceritakan project kamu, dan kami akan bantu tentukan solusi terbaik'
              : 'Tell us about your project, and we\'ll help determine the best solution'
            }
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
          onSubmit={handleSubmit}
          className="border border-black p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-600 mb-3">
              <User className="h-3.5 w-3.5" />
              {region === 'ID' ? 'Nama Lengkap' : 'Full Name'} *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-black focus:outline-none transition-colors duration-0"
              placeholder={region === 'ID' ? 'Nama kamu' : 'Your name'}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-600 mb-3">
              <Mail className="h-3.5 w-3.5" />
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-black focus:outline-none transition-colors duration-0"
              placeholder="email@example.com"
              required
            />
          </div>

          {/* Phone / Country */}
          {region === 'ID' ? (
            <div>
              <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-600 mb-3">
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-black focus:outline-none transition-colors duration-0"
                placeholder="08123456789"
                required
              />
            </div>
          ) : (
            <>
              <div>
                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-600 mb-3">
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
              <div>
                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-600 mb-3">
                  <MessageCircle className="h-3.5 w-3.5" />
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-black focus:outline-none transition-colors duration-0"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </>
          )}

          {/* Service */}
          <div>
            <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-600 mb-3">
              <Briefcase className="h-3.5 w-3.5" />
              {region === 'ID' ? 'Service yang Diminati' : 'Service Interest'} *
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-black focus:outline-none transition-colors duration-0 bg-white"
              required
            >
              <option value="">{region === 'ID' ? 'Pilih service...' : 'Select service...'}</option>
              {services.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-3 block">
              {region === 'ID' ? 'Budget Range (Optional)' : 'Budget Range (Optional)'}
            </label>
            <input
              type="text"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-black focus:outline-none transition-colors duration-0"
              placeholder={region === 'ID' ? 'Contoh: Rp 500k - 1jt' : 'Example: $100 - $200'}
            />
          </div>

          {/* Project Description */}
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-3 block">
              {region === 'ID' ? 'Deskripsi Project' : 'Project Description'} *
            </label>
            <textarea
              value={formData.projectDescription}
              onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-none focus:border-black focus:outline-none resize-none transition-colors duration-0"
              rows={6}
              placeholder={region === 'ID' 
                ? 'Ceritakan tentang project kamu, goals, target audience, timeline, dll...'
                : 'Tell us about your project, goals, target audience, timeline, etc...'
              }
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full px-6 py-4 text-sm font-medium uppercase tracking-widest transition-colors duration-0 ${
              isFormValid
                ? 'bg-black text-white hover:bg-white hover:text-black border border-black'
                : 'bg-gray-200 text-gray-400 border border-gray-200 cursor-not-allowed'
            }`}
          >
            {region === 'ID' ? 'Kirim Konsultasi via WhatsApp' : 'Send Consultation Request'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            {region === 'ID'
              ? 'Dengan submit form ini, kamu akan diarahkan ke WhatsApp untuk melanjutkan konsultasi'
              : 'By submitting this form, you will be directed to continue the consultation'
            }
          </p>
        </motion.form>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
          className="mt-8 p-6 bg-gray-50 border border-gray-200"
        >
          <h3 className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-3">
            {region === 'ID' ? 'Yang Akan Kamu Dapatkan:' : 'What You\'ll Get:'}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">—</span>
              <span>{region === 'ID' ? 'Diskusi project secara detail' : 'Detailed project discussion'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">—</span>
              <span>{region === 'ID' ? 'Rekomendasi service yang tepat' : 'Service recommendation'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">—</span>
              <span>{region === 'ID' ? 'Estimasi harga & timeline' : 'Price & timeline estimate'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">—</span>
              <span>{region === 'ID' ? 'Jawaban dalam 1x24 jam' : 'Response within 24 hours'}</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
