'use client';

import { motion } from 'framer-motion';
import {
  Palette,
  Code2,
  Zap,
  Layers,
  Eye,
  Rocket,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const getFeatures = (t: (key: string) => string) => [
  {
    icon: Palette,
    title: t('features.item1.title'),
    description: t('features.item1.desc'),
    delay: 0,
  },
  {
    icon: Code2,
    title: t('features.item2.title'),
    description: t('features.item2.desc'),
    delay: 0.05,
  },
  {
    icon: Zap,
    title: t('features.item3.title'),
    description: t('features.item3.desc'),
    delay: 0.1,
  },
  {
    icon: Layers,
    title: t('features.item4.title'),
    description: t('features.item4.desc'),
    delay: 0.15,
  },
  {
    icon: Eye,
    title: t('features.item5.title'),
    description: t('features.item5.desc'),
    delay: 0.2,
  },
  {
    icon: Rocket,
    title: t('features.item6.title'),
    description: t('features.item6.desc'),
    delay: 0.25,
  },
];

export function FeaturesShowcase() {
  const { t } = useI18n();
  const features = getFeatures(t);
  return (
    <section className="relative py-32">
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
            {t('features.label')}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.95]">
            {t('features.title.line1')}
            <br />
            {t('features.title.line2')}
          </h2>
          <p className="text-base text-gray-500 max-w-lg mt-8 leading-relaxed">
            {t('features.description')}
          </p>
        </motion.div>

        {/* Features List */}
        <div className="border-t border-gray-200">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: feature.delay,
                  ease: 'easeOut',
                }}
                className="group border-b border-gray-200 py-8 md:py-10 grid md:grid-cols-12 gap-4 md:gap-8 items-start cursor-default"
              >
                {/* Number */}
                <div className="md:col-span-1">
                  <span className="text-xs font-medium tracking-widest text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title + Icon */}
                <div className="md:col-span-4 flex items-center gap-4">
                  <Icon className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors duration-0 flex-shrink-0" />
                  <h3 className="text-lg font-semibold tracking-tight text-black">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-7">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
