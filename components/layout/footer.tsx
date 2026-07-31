'use client';

import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="border-t border-black bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Brutalist Watermark Section */}
        <div className="py-16 space-y-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-black" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600">
                {t('footer.system')}
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              v1.0.{year}
            </span>
          </div>

          {/* Main Watermark */}
          <div className="text-center space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                Muhammad Dinan Ghifari
              </h3>
              <p className="text-sm text-gray-500 font-mono">
                {t('footer.role')}
              </p>
            </div>

            {/* Copyright Bar */}
            <div className="inline-flex items-center gap-3 px-6 py-3 border border-black">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-600">
                © {year}
              </span>
              <div className="w-px h-4 bg-gray-300" />
              <span className="text-xs font-mono uppercase tracking-widest text-black">
                {t('footer.copyright')}
              </span>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              {t('footer.tagline')}
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
