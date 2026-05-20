# Google Search Console Setup Guide

## 📋 Checklist untuk Masuk Google Search Console

### ✅ Prerequisites (Sudah Ada)
- [x] Domain/URL website (setelah deploy)
- [x] Sitemap.xml (sudah ada di `/sitemap.xml`)
- [x] Robots.txt (sudah ada di `/robots.txt`)
- [x] Metadata SEO (perlu ditambahkan)

---

## 🚀 Step 1: Deploy Website

Sebelum submit ke Google Search Console, deploy dulu ke Vercel:

### Deploy ke Vercel:

1. **Push ke GitHub:**
```bash
cd decoisme
git init
git add .
git commit -m "Initial commit - Decoisme Portfolio"
git branch -M main
git remote add origin https://github.com/username/decoisme.git
git push -u origin main
```

2. **Deploy di Vercel:**
- Buka https://vercel.com
- Login dengan GitHub
- Click "New Project"
- Import repository "decoisme"
- Configure:
  - Framework Preset: Next.js
  - Root Directory: `./`
  - Build Command: `npm run build`
  - Output Directory: `.next`
- Add Environment Variables dari `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `ADMIN_PASSWORD`
- Click "Deploy"

3. **Custom Domain (Optional):**
- Settings → Domains
- Add domain: `decoisme.com` atau `yourname.com`
- Follow DNS setup instructions

**Setelah deploy, URL akan jadi:**
- `https://decoisme.vercel.app` (default)
- `https://decoisme.com` (jika pakai custom domain)

---

## 🔍 Step 2: Submit ke Google Search Console

### 1. Buka Google Search Console
- Go to: https://search.google.com/search-console
- Login dengan Google Account

### 2. Add Property
- Click "Add Property"
- Pilih salah satu:
  - **Domain** (recommended): `decoisme.com`
  - **URL Prefix**: `https://decoisme.vercel.app`

### 3. Verify Ownership

**Metode 1: HTML File Upload (Easiest)**
- Download verification file (e.g., `google1234567890abcdef.html`)
- Upload ke `public/` folder di project
- Commit & push ke GitHub (auto-deploy)
- Click "Verify" di Google Search Console

**Metode 2: HTML Tag (Recommended)**
- Copy meta tag: `<meta name="google-site-verification" content="..." />`
- Tambahkan ke `app/layout.tsx` (lihat Step 3 di bawah)
- Deploy
- Click "Verify"

**Metode 3: DNS Record (For Custom Domain)**
- Add TXT record ke DNS provider
- Name: `@` atau domain root
- Value: `google-site-verification=...`
- Wait 24-48 hours
- Click "Verify"

### 4. Submit Sitemap
Setelah verified:
- Go to "Sitemaps" di sidebar
- Add new sitemap: `https://decoisme.com/sitemap.xml`
- Click "Submit"

---

## 🎯 Step 3: Optimasi SEO (PENTING!)

Tambahkan metadata SEO yang proper:

### Update `app/layout.tsx`:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://decoisme.com'), // Ganti dengan URL kamu
  title: {
    default: 'Decoisme - UI/UX Designer & Creative Developer',
    template: '%s | Decoisme',
  },
  description: 'Professional UI/UX Designer specializing in Instagram feed design, carousel posts, and modern web interfaces. Based in Indonesia, available for freelance projects.',
  keywords: [
    'UI/UX Designer',
    'Instagram Design',
    'Carousel Post Design',
    'Freelance Designer',
    'Web Design',
    'Social Media Design',
    'Portfolio',
    'Indonesia Designer',
  ],
  authors: [{ name: 'Decoisme' }],
  creator: 'Decoisme',
  publisher: 'Decoisme',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://decoisme.com',
    title: 'Decoisme - UI/UX Designer & Creative Developer',
    description: 'Professional UI/UX Designer specializing in Instagram feed design, carousel posts, and modern web interfaces.',
    siteName: 'Decoisme',
    images: [
      {
        url: '/og-image.jpg', // Buat image 1200x630px
        width: 1200,
        height: 630,
        alt: 'Decoisme Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decoisme - UI/UX Designer & Creative Developer',
    description: 'Professional UI/UX Designer specializing in Instagram feed design, carousel posts, and modern web interfaces.',
    images: ['/og-image.jpg'],
    creator: '@decoisme', // Ganti dengan Twitter handle kamu
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Dari Google Search Console
  },
};
```

### Buat OG Image:
- Buat image 1200x630px dengan Figma/Canva
- Design: Logo + tagline + visual
- Save as `public/og-image.jpg`

---

## 📄 Step 4: Optimasi Robots.txt

File `app/robots.txt` sudah ada, tapi pastikan isinya:

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://decoisme.com/sitemap.xml
```

---

## 🗺️ Step 5: Optimasi Sitemap

File `app/sitemap.ts` sudah ada, tapi update URL-nya:

```tsx
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://decoisme.com'; // Ganti dengan URL kamu

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/order`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#skills`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/#pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
```

---

## 🎯 Step 6: Structured Data (Schema.org)

Tambahkan JSON-LD untuk better SEO:

### Buat `app/components/structured-data.tsx`:

```tsx
export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Decoisme',
    url: 'https://decoisme.com',
    image: 'https://decoisme.com/profile.jpg',
    jobTitle: 'UI/UX Designer',
    description: 'Professional UI/UX Designer specializing in Instagram feed design and modern web interfaces',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta',
      addressCountry: 'ID',
    },
    email: 'hello@decoisme.com',
    sameAs: [
      'https://github.com/decoisme',
      'https://linkedin.com/in/decoisme',
      'https://twitter.com/decoisme',
    ],
    knowsAbout: [
      'UI/UX Design',
      'Instagram Design',
      'Web Design',
      'Figma',
      'Next.js',
      'React',
    ],
    offers: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Instagram Feed Design',
        description: 'Professional Instagram feed and carousel post design services',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

### Tambahkan ke `app/layout.tsx`:

```tsx
import { StructuredData } from '@/components/structured-data';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## ⚡ Step 7: Performance Optimization

Google prioritas website yang cepat:

### 1. Image Optimization
- Gunakan WebP format
- Compress images (TinyPNG, Squoosh)
- Lazy loading (Next.js Image component)

### 2. Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### 3. Lighthouse Score
```bash
# Test performance
npm run build
npm start
# Open Chrome DevTools → Lighthouse → Run
```

Target:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

---

## 📊 Step 8: Monitor & Improve

### Google Search Console Dashboard:

1. **Performance**
   - Monitor clicks, impressions, CTR
   - Check which keywords bring traffic
   - Optimize pages with low CTR

2. **Coverage**
   - Check indexed pages
   - Fix errors (404, server errors)
   - Submit new pages for indexing

3. **Enhancements**
   - Mobile usability
   - Core Web Vitals
   - Structured data

4. **Links**
   - Internal links
   - External backlinks
   - Top linking sites

---

## 🎯 SEO Best Practices

### On-Page SEO:
- ✅ Unique title tags (50-60 characters)
- ✅ Meta descriptions (150-160 characters)
- ✅ H1 tags (one per page)
- ✅ Alt text untuk images
- ✅ Internal linking
- ✅ Mobile-friendly
- ✅ Fast loading speed

### Content SEO:
- ✅ Original content
- ✅ Relevant keywords
- ✅ Regular updates
- ✅ Quality over quantity
- ✅ User-focused content

### Technical SEO:
- ✅ HTTPS (SSL certificate)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Structured data
- ✅ Canonical URLs
- ✅ 404 error handling

---

## 🚀 Quick Start Checklist

- [ ] Deploy website ke Vercel
- [ ] Setup custom domain (optional)
- [ ] Update metadata di `app/layout.tsx`
- [ ] Buat OG image (1200x630px)
- [ ] Update sitemap dengan URL yang benar
- [ ] Tambahkan structured data
- [ ] Submit ke Google Search Console
- [ ] Verify ownership
- [ ] Submit sitemap
- [ ] Monitor performance
- [ ] Fix issues yang muncul

---

## 📱 Additional Submissions

### Submit ke Search Engines Lain:

1. **Bing Webmaster Tools**
   - https://www.bing.com/webmasters
   - Similar process to Google

2. **Yandex Webmaster**
   - https://webmaster.yandex.com
   - For Russian market

3. **Baidu Webmaster**
   - https://ziyuan.baidu.com
   - For Chinese market

---

## 💡 Pro Tips

1. **Indexing Time:**
   - Google biasanya index dalam 1-7 hari
   - Bisa lebih cepat jika submit manual
   - Request indexing: Search Console → URL Inspection → Request Indexing

2. **Content Updates:**
   - Update content regularly
   - Add blog/portfolio projects
   - Fresh content = better ranking

3. **Backlinks:**
   - Share di social media
   - Submit ke directories
   - Guest posting
   - Portfolio platforms (Dribbble, Behance)

4. **Local SEO:**
   - Google My Business
   - Local directories
   - Location-based keywords

---

## 🔧 Troubleshooting

### "Site not indexed"
- Wait 1-7 days
- Request indexing manually
- Check robots.txt tidak block
- Check sitemap submitted

### "Coverage errors"
- Fix 404 errors
- Check server errors
- Verify sitemap URLs

### "Mobile usability issues"
- Test responsive design
- Fix viewport issues
- Improve touch targets

---

## 📚 Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Schema.org Documentation](https://schema.org)

---

**Created:** May 14, 2026  
**Status:** Ready to implement  
**Estimated Time:** 1-2 hours setup, 1-7 days indexing
