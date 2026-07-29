// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Code2, Share2, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@decoisme.com',
    href: 'mailto:hello@decoisme.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#',
  },
];

const socialLinks = [
  {
    icon: Code2,
    href: 'https://github.com',
    label: 'GitHub',
  },
  {
    icon: Share2,
    href: 'https://linkedin.com',
    label: 'LinkedIn',
  },
  {
    icon: MessageCircle,
    href: 'https://twitter.com',
    label: 'Twitter',
  },
];

export function ContactModern() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const client = getSupabase();

      if (client) {
        const { error } = await client.from('contact_messages').insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            read: false,
          },
        ]);

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        toast.success('Message sent successfully! I\'ll get back to you soon.', {
          duration: 5000,
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Demo mode
        console.log('Contact form submission (demo mode):', formData);
        toast.info('Demo Mode: Supabase not configured. Your message was logged to console.', {
          duration: 6000,
          description: 'To save messages to database, please setup Supabase following SUPABASE_SETUP_LENGKAP.md',
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message', {
        duration: 5000,
        description: error?.message || 'Please try again or email me directly at hello@decoisme.com',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="relative py-32 bg-white border-t border-gray-200"
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
          <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-6">
            Get in Touch
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black leading-[0.95]">
            Let&apos;s Create
            <br />
            Something Amazing
          </h2>
          <p className="text-base text-gray-500 max-w-lg mt-8 leading-relaxed">
            Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium tracking-widest text-gray-500 uppercase mb-3"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full h-10 bg-transparent border-b border-black text-black text-sm placeholder:text-gray-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium tracking-widest text-gray-500 uppercase mb-3"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full h-10 bg-transparent border-b border-black text-black text-sm placeholder:text-gray-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium tracking-widest text-gray-500 uppercase mb-3"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="w-full bg-transparent border-b border-black text-black text-sm placeholder:text-gray-400 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-xs font-medium uppercase tracking-widest bg-black text-white border border-black hover:bg-white hover:text-black transition-colors duration-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
            className="space-y-0"
          >
            {/* Contact Details */}
            <div className="border-t border-gray-200">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.href}
                    className="group flex items-start gap-6 py-8 border-b border-gray-200 hover:border-black transition-colors duration-0"
                  >
                    <Icon className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors duration-0 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-1">
                        {info.label}
                      </p>
                      <p className="text-base font-medium text-black">
                        {info.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="pt-12">
              <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-6">
                Follow Me
              </p>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-colors duration-0"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="pt-12">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black" />
                <p className="text-xs font-medium tracking-widest text-gray-500 uppercase">
                  Available for freelance projects
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
