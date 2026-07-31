'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { SystemLabel } from '@/components/ui/brutalist-elements';

import { useI18n } from '@/lib/i18n';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Berapa lama proses pengerjaan?',
    answer: 'Single Post: 1-2 hari kerja. Carousel Post: 2-3 hari kerja. Presentation Design: 3-5 hari kerja. Untuk express delivery <24 jam, silakan request saat order (additional fee applies).',
  },
  {
    question: 'Bisa revisi berapa kali?',
    answer: 'Semua paket include 2x revisi gratis. Revisi harus spesifik dan reasonable (bukan redesign total). Revisi tambahan dikenakan biaya 50% dari harga paket.',
  },
  {
    question: 'File format apa yang saya terima?',
    answer: 'Instagram Post: JPG/PNG high resolution (1080x1080px). Presentation: Editable PPTX atau Google Slides link. Web Design: Figma file + exported assets. Semua file dikirim via Google Drive atau WeTransfer.',
  },
  {
    question: 'Apakah bisa request custom template?',
    answer: 'Yes! Custom template bisa request di awal brief. Untuk presentation, kamu bisa request color scheme, font preference, dan layout style. Semua disesuaikan dengan brand guidelines kamu.',
  },
  {
    question: 'Payment method apa saja?',
    answer: 'Indonesia: Transfer bank (BCA, Mandiri, BRI), QRIS, atau OVO/GoPay. International: PayPal, Wise, atau Stripe. DP 50% untuk mulai kerja, pelunasan sebelum delivery final file.',
  },
  {
    question: 'Apakah ada refund policy?',
    answer: 'Refund hanya berlaku jika project belum dimulai (sebelum initial concept). Setelah initial concept dikirim, tidak ada refund, tapi kamu berhak untuk 2x revisi sesuai paket.',
  },
  {
    question: 'Bisa konsultasi dulu sebelum order?',
    answer: 'Absolutely! Konsultasi design 100% gratis. Kamu bisa chat via WhatsApp atau email untuk discuss project requirements, timeline, dan budget sebelum commit order.',
  },
  {
    question: 'Apakah include source file?',
    answer: 'Presentation Design: Yes, include editable source file (PPTX/Google Slides). Instagram Post: Final export only (JPG/PNG). Untuk file editable Figma/AI, bisa request dengan additional fee.',
  },
];

export function FAQBrutalist() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-32 border-t border-gray-200"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mb-24"
        >
          <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-6">
            {t('faq.label')}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.95]">
            {t('faq.title.line1')}
            <br />
            {t('faq.title.line2')}
            <br />
            {t('faq.title.line3')}
          </h2>
          <p className="text-base text-gray-500 max-w-lg mt-8 leading-relaxed">
            {t('faq.description')}
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="space-y-px bg-gray-200 border border-gray-200"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.2, delay: index * 0.05, ease: 'linear' }}
              className="bg-white border-b last:border-b-0 border-gray-200"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full p-6 text-left flex items-start justify-between gap-4 transition-colors duration-0 ${
                  openIndex === index ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                <div className="flex-1">
                  <div className={`flex items-center gap-3 mb-2 ${openIndex === index ? 'text-white' : 'text-gray-400'}`}>
                    <SystemLabel 
                      label={`Q${String(index + 1).padStart(2, '0')}`}
                    />
                  </div>
                  <h3 className="text-base font-bold tracking-tight">
                    {faq.question}
                  </h3>
                </div>

                {/* Toggle Icon */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-current">
                  <motion.span
                    initial={false}
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: 'linear' }}
                    className="text-xl font-mono leading-none"
                  >
                    +
                  </motion.span>
                </div>
              </button>

              {/* Answer */}
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{
                  height: { duration: 0.2, ease: 'linear' },
                  opacity: { duration: 0.15, ease: 'linear' },
                }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 border-t border-gray-200">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mt-16 p-8 border-2 border-black bg-white"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-black mb-2">
                {t('faq.cta.title')}
              </h3>
              <p className="text-sm text-gray-500">
                {t('faq.cta.description')}
              </p>
            </div>
            <a
              href="https://wa.me/6282258221745?text=Hi!%20Saya%20ada%20pertanyaan%20tentang%20jasa%20design"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-black text-white border-2 border-black font-mono text-xs uppercase tracking-widest transition-colors duration-0 hover:bg-white hover:text-black flex-shrink-0"
            >
              {t('faq.cta.button')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
