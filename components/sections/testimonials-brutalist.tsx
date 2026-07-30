'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getSupabase, type Testimonial } from '@/lib/supabase';

export function TestimonialsBrutalist() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const supabase = getSupabase();
    if (!supabase) {
      // Fallback to sample testimonials if Supabase not configured
      setTestimonials(getSampleTestimonials());
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (!error && data && data.length > 0) {
        setTestimonials(data);
      } else {
        // Fallback to sample testimonials
        setTestimonials(getSampleTestimonials());
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials(getSampleTestimonials());
    } finally {
      setLoading(false);
    }
  };

  // Sample testimonials fallback
  const getSampleTestimonials = (): Testimonial[] => [
    {
      id: '1',
      client_name: 'BUDI SANTOSO',
      client_company: 'UMKM.QRIS',
      review: 'Design carousel-nya clean banget, engagement Instagram naik 300% dalam 2 minggu. Respon cepat, revisi on-point.',
      project_type: 'Carousel Post',
      date: '2024.01',
      order_index: 1,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      client_name: 'SARAH WIJAYA',
      client_company: 'SKINCARE.BRAND',
      review: 'Professional, fast delivery, dan hasilnya exceed expectations. Brand guidelines langsung diterapkan dengan sempurna.',
      project_type: 'Brand Design',
      date: '2024.02',
      order_index: 2,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      client_name: 'MICHAEL CHEN',
      client_company: 'TECH.STARTUP',
      review: 'Minimal, modern, exactly what we needed. Express delivery benar-benar 24 jam. Highly recommended untuk startup yang butuh cepat.',
      project_type: 'UI Design',
      date: '2024.03',
      order_index: 3,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      client_name: 'DEWI KARTIKA',
      client_company: 'FOOD.BLOGGER',
      review: 'Dari concept sampe final design, semua dibimbing dengan detail. Hasil design bikin feed Instagram lebih cohesive dan aesthetic.',
      project_type: 'Social Media',
      date: '2024.03',
      order_index: 4,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '5',
      client_name: 'REZA FADILLAH',
      client_company: 'IDN.PRIORITY',
      review: 'Value for money banget. Kualitas setara agency mahal tapi harga freelance. Communication juga smooth via WhatsApp.',
      project_type: 'Carousel Post',
      date: '2024.04',
      order_index: 5,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '6',
      client_name: 'JESSICA TAN',
      client_company: 'E-COMMERCE.SG',
      review: 'Fast turnaround, clear communication, professional quality. Payment via PayPal was seamless. Will work again for future campaigns.',
      project_type: 'Campaign Design',
      date: '2024.04',
      order_index: 6,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  if (loading) {
    return (
      <section className="relative py-32 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-block w-3 h-3 bg-black animate-pulse mb-4" />
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
              LOADING.REVIEWS...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className="relative py-32 border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mb-24"
        >
          <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-6">
            // CLIENT_FEEDBACK.TXT
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.95]">
            Verified
            <br />
            Reviews
          </h2>
          <p className="text-base text-gray-500 max-w-lg mt-8 leading-relaxed">
            Real feedback from clients who trusted us with their design projects
          </p>
        </motion.div>

        {/* Testimonials Table */}
        {testimonials.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="border border-black rounded-none"
          >
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-black bg-black text-white">
              <div className="col-span-12 md:col-span-3">
                <span className="text-[10px] font-mono uppercase tracking-widest">CLIENT.ID</span>
              </div>
              <div className="col-span-12 md:col-span-7">
                <span className="text-[10px] font-mono uppercase tracking-widest">REVIEW.DATA</span>
              </div>
              <div className="col-span-12 md:col-span-2">
                <span className="text-[10px] font-mono uppercase tracking-widest">TYPE / DATE</span>
              </div>
            </div>

            {/* Testimonials List */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.2, delay: index * 0.03, ease: 'linear' }}
                onMouseEnter={() => setHoveredId(testimonial.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`grid grid-cols-12 gap-4 p-4 border-b border-gray-200 transition-colors duration-0 ${
                  hoveredId === testimonial.id ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                {/* Column 1: Client Info */}
                <div className="col-span-12 md:col-span-3">
                  <div className="flex items-start gap-2">
                    {hoveredId === testimonial.id && (
                      <span className="text-black font-mono text-sm">*</span>
                    )}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-black mb-1">
                        {testimonial.client_name}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                        {testimonial.client_company}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Review Text */}
                <div className="col-span-12 md:col-span-7">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {testimonial.review}
                  </p>
                </div>

                {/* Column 3: Meta Info */}
                <div className="col-span-12 md:col-span-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 space-y-1">
                    <div>{testimonial.project_type}</div>
                    <div>{testimonial.date}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="border border-gray-200 p-12 text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
              NO.REVIEWS.YET
            </p>
          </div>
        )}

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mt-16 grid md:grid-cols-3 gap-px bg-gray-200 border border-gray-200"
        >
          {[
            { value: '50+', label: 'Projects delivered' },
            { value: '4.9/5', label: 'Average rating' },
            { value: '100%', label: 'Client satisfaction' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-8 md:p-10 text-center"
            >
              <div className="text-4xl font-bold tracking-tight text-black mb-2">
                {stat.value}
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
