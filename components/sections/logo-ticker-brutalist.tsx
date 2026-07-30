'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getSupabase, type ClientLogo } from '@/lib/supabase';

// Local interface for component state (maps company_name to name)
interface Logo {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  order_index: number;
}

export function LogoTickerBrutalist() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    const supabase = getSupabase();
    if (!supabase) {
      // Fallback to sample logos if Supabase not configured
      setLogos(getSampleLogos());
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('client_logos')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (!error && data && data.length > 0) {
        // Map company_name to name for component compatibility
        const mappedLogos = data.map((logo: ClientLogo) => ({
          id: logo.id,
          name: logo.company_name,
          logo_url: logo.logo_url,
          website_url: logo.website_url,
          order_index: logo.order_index,
        }));
        setLogos(mappedLogos);
      } else {
        // Fallback to sample logos
        setLogos(getSampleLogos());
      }
    } catch (error) {
      console.error('Error fetching logos:', error);
      setLogos(getSampleLogos());
    } finally {
      setLoading(false);
    }
  };

  // Sample logos fallback
  const getSampleLogos = (): Logo[] => [
    { id: '1', name: 'TOKOPEDIA', logo_url: 'https://via.placeholder.com/120x60/22B14C/FFFFFF?text=TOKOPEDIA', order_index: 1 },
    { id: '2', name: 'GOJEK', logo_url: 'https://via.placeholder.com/120x60/00AA13/FFFFFF?text=GOJEK', order_index: 2 },
    { id: '3', name: 'SHOPEE', logo_url: 'https://via.placeholder.com/120x60/EE4D2D/FFFFFF?text=SHOPEE', order_index: 3 },
    { id: '4', name: 'BUKALAPAK', logo_url: 'https://via.placeholder.com/120x60/E31E52/FFFFFF?text=BUKALAPAK', order_index: 4 },
    { id: '5', name: 'TRAVELOKA', logo_url: 'https://via.placeholder.com/120x60/2F80ED/FFFFFF?text=TRAVELOKA', order_index: 5 },
    { id: '6', name: 'OVO', logo_url: 'https://via.placeholder.com/120x60/4C3494/FFFFFF?text=OVO', order_index: 6 },
    { id: '7', name: 'GRAB', logo_url: 'https://via.placeholder.com/120x60/00B14F/FFFFFF?text=GRAB', order_index: 7 },
    { id: '8', name: 'DANA', logo_url: 'https://via.placeholder.com/120x60/118EEA/FFFFFF?text=DANA', order_index: 8 },
  ];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  if (loading) {
    return (
      <section className="relative py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-block w-3 h-3 bg-black animate-pulse mb-4" />
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
              LOADING.LOGOS...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="clients"
      className="relative py-24 border-t border-gray-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-4">
            // CLIENT_LOGOS.MARQUEE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
            Trusted by Brands
          </h2>
        </motion.div>

        {/* Logo Ticker */}
        {logos.length > 0 ? (
          <div className="relative">
            {/* Gradient Fade Left */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            
            {/* Gradient Fade Right */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Scrolling Container */}
            <div className="flex overflow-hidden">
              <motion.div
                className="flex gap-12 items-center"
                animate={{
                  x: [0, -100 * logos.length],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 30,
                    ease: 'linear',
                  },
                }}
              >
                {duplicatedLogos.map((logo, index) => (
                  <div
                    key={`${logo.id}-${index}`}
                    className="flex-shrink-0 w-[120px] h-[60px] flex items-center justify-center group"
                  >
                    {logo.website_url ? (
                      <a
                        href={logo.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-full"
                      >
                        <img
                          src={logo.logo_url}
                          alt={logo.name}
                          className="w-full h-full object-contain transition-all duration-0"
                          style={{
                            filter: 'grayscale(100%) contrast(1.2)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.filter = 'grayscale(0%) contrast(1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.filter = 'grayscale(100%) contrast(1.2)';
                          }}
                        />
                      </a>
                    ) : (
                      <img
                        src={logo.logo_url}
                        alt={logo.name}
                        className="w-full h-full object-contain transition-all duration-0"
                        style={{
                          filter: 'grayscale(100%) contrast(1.2)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = 'grayscale(0%) contrast(1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = 'grayscale(100%) contrast(1.2)';
                        }}
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
              NO.LOGOS.YET
            </p>
          </div>
        )}

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
          className="mt-16 flex justify-center gap-16"
        >
          <div className="text-center">
            <div className="text-3xl font-bold tracking-tight text-black mb-1">
              50+
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
              CLIENTS
            </p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <div className="text-3xl font-bold tracking-tight text-black mb-1">
              100+
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
              PROJECTS
            </p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <div className="text-3xl font-bold tracking-tight text-black mb-1">
              4.9/5
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
              RATING
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
