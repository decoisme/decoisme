'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'id' | 'en';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Translations
const translations = {
  id: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title.line1': 'Developer',
    'hero.title.line2': '&',
    'hero.title.line3': 'Designer',
    'hero.subtitle': 'Web Development • UI/UX Design • Creative Content',
    'hero.description': 'Design yang bikin brand kamu stand out. Dari Instagram posts yang engaging, presentasi PowerPoint yang professional, sampai web design yang clean. Let\'s bring your ideas to life!',
    'hero.cta.projects': 'View Projects',
    'hero.cta.contact': 'Get in Touch',

    // Features Section
    'features.label': 'Why Choose Me',
    'features.title.line1': 'What Makes',
    'features.title.line2': 'Me Different',
    'features.description': 'Fast, affordable, dan hasil yang bikin kamu puas. Design berkualitas tanpa ribet!',
    'features.item1.title': 'Creative Design',
    'features.item1.desc': 'Design yang eye-catching dan on-brand. Setiap project dikerjakan dengan detail yang maksimal',
    'features.item2.title': 'Fast Delivery',
    'features.item2.desc': 'Pengerjaan cepat tanpa compromise kualitas. Express delivery available untuk project urgent!',
    'features.item3.title': 'Unlimited Revisions',
    'features.item3.desc': '2x revisi gratis di semua paket. Revisi tambahan dengan harga special. Your satisfaction is priority!',
    'features.item4.title': 'Versatile Styles',
    'features.item4.desc': 'Dari minimalist sampai bold & colorful. Bisa adapt ke berbagai style sesuai brand kamu',
    'features.item5.title': 'Attention to Detail',
    'features.item5.desc': 'Every pixel matters. Layout, typography, color harmony—semua diperhatikan dengan teliti',
    'features.item6.title': 'Affordable Price',
    'features.item6.desc': 'Harga bersahabat untuk UMKM dan startup. Kualitas agency dengan budget freelance!',

    // About Section
    'about.description': 'Hi! I\'m Dinan, a creative designer specializing in UI/UX design, presentations (PowerPoint/Google Slides), and Instagram content. Coffee enthusiast dan late-night designer. Gue percaya design yang bagus bukan cuma soal estetika, tapi juga solve problems dan communicate ideas dengan efektif. Let\'s collaborate!',
    'about.location.label': 'Location',
    'about.location.value': 'Jakarta Selatan, Indonesia',

    // Pricing Section
    'pricing.label': 'Pricing',
    'pricing.title.line1': 'Simple,',
    'pricing.title.line2': 'Transparent',
    'pricing.title.line3': 'Pricing',
    'pricing.description': 'Harga design yang affordable untuk UMKM, startup, dan personal branding. Tanpa biaya tersembunyi, semua sudah termasuk revisi!',

    // FAQ Section
    'faq.label': '// FAQ.TXT',
    'faq.title.line1': 'Frequently',
    'faq.title.line2': 'Asked',
    'faq.title.line3': 'Questions',
    'faq.description': 'Pertanyaan yang sering ditanyakan seputar layanan design dan proses kerja',
    'faq.cta.title': 'Masih ada pertanyaan?',
    'faq.cta.description': 'Jangan ragu untuk chat langsung. Konsultasi gratis!',
    'faq.cta.button': 'CHAT VIA WHATSAPP →',

    // Contact Section
    'contact.label': 'Let\'s Talk',
    'contact.title.line1': 'Ready to Start',
    'contact.title.line2': 'Your Project?',
    'contact.description': 'Ada project di pikiran? Let\'s discuss! Chat via WhatsApp atau kirim message di bawah. Konsultasi gratis kok!',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.location': 'Location',

    // Testimonials
    'testimonials.label': '// CLIENT_FEEDBACK.TXT',
    'testimonials.title.line1': 'Verified',
    'testimonials.title.line2': 'Reviews',
    'testimonials.description': 'Real feedback from clients who trusted us with their design projects',
    'testimonials.loading': 'LOADING.REVIEWS...',
    'testimonials.empty': 'NO.REVIEWS.YET',

    // Projects Section
    'projects.label': 'Portfolio',
    'projects.title.line1': 'Featured',
    'projects.title.line2': 'Projects',
    'projects.description': 'Koleksi design dan development work, showcasing creative solutions dan user-centered experiences',
    'projects.filter.all': 'All',
    'projects.empty': 'Belum ada project di kategori ini',
    'projects.tech': 'Tech Stack',
    
    // Skills Section
    'skills.label': 'Expertise',
    'skills.title.line1': 'Skills &',
    'skills.title.line2': 'Capabilities',
    'skills.description': 'Design-focused skillset dengan strong technical implementation abilities',
    'skills.category.uiux': 'UI/UX Design',
    'skills.category.frontend': 'Frontend Development',
    'skills.category.backend': 'Backend Development',
    'skills.category.social': 'Social Media Design',
    'skills.additional': 'Additional Skills',
    'skills.focus': 'Primary Focus',
    'skills.focusValue': 'UI/UX Design & Creative Direction',

    // Logo Ticker
    'logoTicker.label': '// CLIENT_LOGOS.MARQUEE',
    'logoTicker.title': 'Trusted by Brands',
    'logoTicker.empty': 'NO.LOGOS.YET',
    'logoTicker.loading': 'LOADING.LOGOS...',
    'logoTicker.stats.clients': 'CLIENTS',
    'logoTicker.stats.projects': 'PROJECTS',
    'logoTicker.stats.rating': 'RATING',

    // Common
    'common.viewMore': 'View More',
    'common.viewLess': 'View Less',
    'common.readMore': 'Read More',
    'common.loading': 'Loading...',

    // Footer
    'footer.system': 'PORTFOLIO.SYSTEM',
    'footer.role': 'Developer & Designer',
    'footer.copyright': 'ALL RIGHTS RESERVED',
    'footer.tagline': '// DESIGNED & BUILT WITH PRECISION',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.title.line1': 'Developer',
    'hero.title.line2': '&',
    'hero.title.line3': 'Designer',
    'hero.subtitle': 'Web Development • UI/UX Design • Creative Content',
    'hero.description': 'Design that makes your brand stand out. From engaging Instagram posts, professional PowerPoint presentations, to clean web design. Let\'s bring your ideas to life!',
    'hero.cta.projects': 'View Projects',
    'hero.cta.contact': 'Get in Touch',

    // Features Section
    'features.label': 'Why Choose Me',
    'features.title.line1': 'What Makes',
    'features.title.line2': 'Me Different',
    'features.description': 'Fast, affordable, and results that satisfy you. Quality design without hassle!',
    'features.item1.title': 'Creative Design',
    'features.item1.desc': 'Eye-catching and on-brand designs. Every project is executed with maximum attention to detail',
    'features.item2.title': 'Fast Delivery',
    'features.item2.desc': 'Quick turnaround without compromising quality. Express delivery available for urgent projects!',
    'features.item3.title': 'Unlimited Revisions',
    'features.item3.desc': '2 free revisions on all packages. Additional revisions at special rates. Your satisfaction is our priority!',
    'features.item4.title': 'Versatile Styles',
    'features.item4.desc': 'From minimalist to bold & colorful. Can adapt to various styles according to your brand',
    'features.item5.title': 'Attention to Detail',
    'features.item5.desc': 'Every pixel matters. Layout, typography, color harmony—everything is carefully considered',
    'features.item6.title': 'Affordable Price',
    'features.item6.desc': 'Friendly prices for SMEs and startups. Agency quality with freelance budget!',

    // About Section
    'about.description': 'Hi! I\'m Dinan, a creative designer specializing in UI/UX design, presentations (PowerPoint/Google Slides), and Instagram content. Coffee enthusiast and late-night designer. I believe great design is not just about aesthetics, but also about solving problems and communicating ideas effectively. Let\'s collaborate!',
    'about.location.label': 'Location',
    'about.location.value': 'South Jakarta, Indonesia',

    // Pricing Section
    'pricing.label': 'Pricing',
    'pricing.title.line1': 'Simple,',
    'pricing.title.line2': 'Transparent',
    'pricing.title.line3': 'Pricing',
    'pricing.description': 'Affordable design pricing for SMEs, startups, and personal branding. No hidden fees, revisions included!',

    // FAQ Section
    'faq.label': '// FAQ.TXT',
    'faq.title.line1': 'Frequently',
    'faq.title.line2': 'Asked',
    'faq.title.line3': 'Questions',
    'faq.description': 'Common questions about design services and workflow',
    'faq.cta.title': 'Still have questions?',
    'faq.cta.description': 'Feel free to chat directly. Free consultation!',
    'faq.cta.button': 'CHAT VIA WHATSAPP →',

    // Contact Section
    'contact.label': 'Let\'s Talk',
    'contact.title.line1': 'Ready to Start',
    'contact.title.line2': 'Your Project?',
    'contact.description': 'Have a project in mind? Let\'s discuss! Chat via WhatsApp or send a message below. Free consultation!',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.location': 'Location',

    // Testimonials
    'testimonials.label': '// CLIENT_FEEDBACK.TXT',
    'testimonials.title.line1': 'Verified',
    'testimonials.title.line2': 'Reviews',
    'testimonials.description': 'Real feedback from clients who trusted us with their design projects',
    'testimonials.loading': 'LOADING.REVIEWS...',
    'testimonials.empty': 'NO.REVIEWS.YET',

    // Projects Section
    'projects.label': 'Portfolio',
    'projects.title.line1': 'Featured',
    'projects.title.line2': 'Projects',
    'projects.description': 'A collection of my design and development work, showcasing creative solutions and user-centered experiences',
    'projects.filter.all': 'All',
    'projects.empty': 'No projects found in this category',
    'projects.tech': 'Tech Stack',

    // Skills Section
    'skills.label': 'Expertise',
    'skills.title.line1': 'Skills &',
    'skills.title.line2': 'Capabilities',
    'skills.description': 'Design-focused skillset with strong technical implementation abilities',
    'skills.category.uiux': 'UI/UX Design',
    'skills.category.frontend': 'Frontend Development',
    'skills.category.backend': 'Backend Development',
    'skills.category.social': 'Social Media Design',
    'skills.additional': 'Additional Skills',
    'skills.focus': 'Primary Focus',
    'skills.focusValue': 'UI/UX Design & Creative Direction',

    // Pricing Section (integrate with existing)
    'pricing.region.idn': 'IDN',
    'pricing.region.wwd': 'WWD',

    // Logo Ticker
    'logoTicker.label': '// CLIENT_LOGOS.MARQUEE',
    'logoTicker.title': 'Trusted by Brands',
    'logoTicker.empty': 'NO.LOGOS.YET',
    'logoTicker.loading': 'LOADING.LOGOS...',
    'logoTicker.stats.clients': 'CLIENTS',
    'logoTicker.stats.projects': 'PROJECTS',
    'logoTicker.stats.rating': 'RATING',

    // Common
    'common.viewMore': 'View More',
    'common.viewLess': 'View Less',
    'common.readMore': 'Read More',
    'common.loading': 'Loading...',

    // Footer
    'footer.system': 'PORTFOLIO.SYSTEM',
    'footer.role': 'Developer & Designer',
    'footer.copyright': 'ALL RIGHTS RESERVED',
    'footer.tagline': '// DESIGNED & BUILT WITH PRECISION',
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');

  useEffect(() => {
    // Load saved language from localStorage
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'id' || saved === 'en')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[language] as Record<string, string>;
    return translation[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
