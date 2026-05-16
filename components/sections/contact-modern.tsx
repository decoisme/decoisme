// @ts-nocheck
'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Send, Sparkles, Code2, Share2, MessageCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { getSupabase } from '@/lib/supabase';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@decoisme.com',
    href: 'mailto:hello@decoisme.com',
    gradient: 'from-yellow-500 to-amber-600',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#',
    gradient: 'from-orange-500 to-amber-600',
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
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // 3D Card Effect Hook
  const use3DCard = () => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave };
  };

  const formCard3D = use3DCard();
  const contactCard1 = use3DCard();
  const contactCard2 = use3DCard();
  const contactCard3 = use3DCard();

  const contactCards3D = [contactCard1, contactCard2, contactCard3];

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
      className="relative py-32 overflow-hidden bg-gray-900 text-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(251 191 36) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 14, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              GET IN TOUCH
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            <span className="text-white">
              Let's Create
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            ref={formCard3D.ref}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseMove={formCard3D.handleMouseMove}
            onMouseLeave={formCard3D.handleMouseLeave}
            style={{
              rotateX: formCard3D.rotateX,
              rotateY: formCard3D.rotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            <div 
              className="relative p-8 rounded-3xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 overflow-hidden"
              style={{ transform: 'translateZ(20px)' }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 pointer-events-none" />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="h-12 bg-gray-900/50 border-gray-700 focus:border-amber-500 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="h-12 bg-gray-900/50 border-gray-700 focus:border-amber-500 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={6}
                    className="resize-none bg-gray-900/50 border-gray-700 focus:border-amber-500 text-white placeholder:text-gray-500"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Contact Details */}
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const card3D = contactCards3D[index];
              
              return (
                <motion.a
                  key={index}
                  ref={card3D.ref}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  onMouseMove={card3D.handleMouseMove}
                  onMouseLeave={card3D.handleMouseLeave}
                  style={{
                    rotateX: card3D.rotateX,
                    rotateY: card3D.rotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 hover:border-amber-500/50 transition-all group block"
                >
                  <div 
                    className={`w-12 h-12 rounded-xl bg-transparent border-2 border-amber-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <Icon className="h-6 w-6 text-amber-400" />
                  </div>
                  <div style={{ transform: 'translateZ(20px)' }}>
                    <p className="text-sm font-medium text-gray-400 mb-1">
                      {info.label}
                    </p>
                    <p className="text-lg font-semibold text-white">{info.value}</p>
                  </div>
                </motion.a>
              );
            })}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-amber-500/30"
            >
              <h3 className="text-xl font-bold mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onHoverStart={() => setHoveredSocial(index)}
                      onHoverEnd={() => setHoveredSocial(null)}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-14 h-14 rounded-full bg-gray-800 border border-gray-700 hover:border-amber-500 flex items-center justify-center transition-all"
                      aria-label={social.label}
                    >
                      <Icon className={`h-6 w-6 transition-colors ${
                        hoveredSocial === index ? 'text-amber-400' : 'text-gray-400'
                      }`} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center gap-3 p-6 rounded-2xl bg-green-500/10 border border-green-500/30"
            >
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <motion.div
                  className="absolute inset-0 w-3 h-3 rounded-full bg-green-500"
                  animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <p className="text-sm font-medium text-green-400">
                Available for freelance projects
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
