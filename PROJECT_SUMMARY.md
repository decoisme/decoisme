# Decoisme - Project Summary

## 🎯 Project Overview

**Decoisme** adalah website portfolio personal premium dengan desain ala Apple yang dibangun menggunakan teknologi modern. Website ini menampilkan clean layout, smooth animations, typography elegan, dan micro interactions yang subtle namun terasa premium.

## ✨ Key Features

### Design & UX
- ✅ Apple-inspired minimalist design
- ✅ Smooth scroll dengan Lenis
- ✅ Framer Motion animations (fade, slide, stagger)
- ✅ Magnetic button effects
- ✅ Glassmorphism effects
- ✅ Animated gradient backgrounds
- ✅ Dark/Light mode dengan next-themes
- ✅ Fully responsive (mobile-first)
- ✅ Loading screen cinematic

### Sections
- ✅ **Hero Section**: Nama besar, animated subtitle, CTA buttons, profile photo, social links
- ✅ **About Section**: Bio, tech stack cards, experience timeline, highlight cards
- ✅ **Projects Section**: Dynamic dari Supabase, hover animations, tech tags, GitHub/live links
- ✅ **Skills Section**: Animated marquee, progress bars, icon grid
- ✅ **Contact Section**: Form dengan Supabase, toast notifications, contact info cards

### Admin Dashboard
- ✅ Login authentication
- ✅ CRUD operations untuk projects
- ✅ Manage contact messages
- ✅ Statistics dashboard
- ✅ Image URL management

### Technical Features
- ✅ Next.js 15 App Router
- ✅ TypeScript untuk type safety
- ✅ Tailwind CSS untuk styling
- ✅ Supabase untuk backend/database
- ✅ shadcn/ui components
- ✅ SEO optimized (sitemap, robots.txt, metadata)
- ✅ Performance optimized
- ✅ Vercel-ready deployment

## 📁 Project Structure

```
decoisme/
├── app/
│   ├── admin/                    # Admin dashboard
│   │   ├── page.tsx             # Login page
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Dashboard page
│   │   └── layout.tsx
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main portfolio page
│   ├── globals.css              # Global styles
│   ├── sitemap.ts               # Dynamic sitemap
│   ├── manifest.ts              # PWA manifest
│   └── robots.txt               # SEO robots file
│
├── components/
│   ├── layout/
│   │   ├── navbar.tsx           # Responsive navbar
│   │   └── footer.tsx           # Footer component
│   ├── sections/
│   │   ├── hero-section.tsx     # Hero section
│   │   ├── about-section.tsx    # About section
│   │   ├── projects-section.tsx # Projects section
│   │   ├── skills-section.tsx   # Skills section
│   │   └── contact-section.tsx  # Contact section
│   ├── providers/
│   │   ├── theme-provider.tsx   # Dark mode provider
│   │   └── smooth-scroll-provider.tsx
│   └── ui/
│       ├── animated-gradient.tsx
│       ├── magnetic-button.tsx
│       ├── loading-screen.tsx
│       ├── button.tsx           # shadcn button
│       ├── card.tsx             # shadcn card
│       ├── input.tsx            # shadcn input
│       ├── textarea.tsx         # shadcn textarea
│       ├── label.tsx            # shadcn label
│       └── sonner.tsx           # Toast notifications
│
├── lib/
│   ├── supabase.ts              # Supabase client & types
│   ├── fonts.ts                 # Font configurations
│   ├── utils.ts                 # Utility functions
│   └── hooks/
│       ├── use-smooth-scroll.ts
│       └── use-scroll-animation.ts
│
├── public/                       # Static assets
│
├── Documentation/
│   ├── README.md                # Main documentation
│   ├── QUICKSTART.md            # Quick start guide
│   ├── SETUP.md                 # Detailed setup
│   ├── CUSTOMIZATION.md         # Customization guide
│   ├── DEPLOYMENT.md            # Deployment guide
│   └── FEATURES.md              # Feature documentation
│
├── supabase-schema.sql          # Database schema
├── .env.example                 # Environment variables template
├── .env.local                   # Local environment (gitignored)
├── .gitignore
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)

### UI & Animation
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Theme**: next-themes
- **Notifications**: Sonner

### Development
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript

## 📊 Database Schema

### Tables

**projects**
- id (UUID, Primary Key)
- title (TEXT)
- description (TEXT)
- image_url (TEXT)
- tech_stack (TEXT[])
- github_url (TEXT)
- live_url (TEXT)
- featured (BOOLEAN)
- order_index (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

**contact_messages**
- id (UUID, Primary Key)
- name (TEXT)
- email (TEXT)
- message (TEXT)
- read (BOOLEAN)
- created_at (TIMESTAMP)

**skills** (Optional)
- id (UUID, Primary Key)
- name (TEXT)
- icon (TEXT)
- category (TEXT)
- proficiency (INTEGER 0-100)
- created_at (TIMESTAMP)

## 🎨 Design System

### Colors
- **Light Mode**: White (#FFFFFF), Soft Gray (#F5F5F5), Deep Black (#000000)
- **Dark Mode**: True Black (#000000), Muted Gray (#1A1A1A), Bright White (#FFFFFF)
- **Accents**: Blue to Purple gradient (#3B82F6 → #9333EA)

### Typography
- **Primary Font**: Inter (SF Pro Display alternative)
- **Weights**: 300, 400, 500, 600, 700
- **Scale**: Fluid typography with responsive sizing

### Spacing
- **Container**: max-w-7xl (1280px)
- **Section Padding**: py-32 (128px vertical)
- **Element Spacing**: Generous white space throughout

### Animations
- **Duration**: 0.3s - 1.5s depending on element
- **Easing**: Custom cubic-bezier [0.6, 0.05, 0.01, 0.9]
- **Types**: Fade, slide, scale, stagger, magnetic

## 🚀 Performance

### Optimization Techniques
- ✅ Code splitting (automatic with App Router)
- ✅ Image optimization (Next.js Image component)
- ✅ Font optimization (next/font)
- ✅ Lazy loading components
- ✅ Minimal JavaScript bundle
- ✅ Static generation where possible
- ✅ Efficient CSS (Tailwind purging)

### Metrics Target
- **Lighthouse Score**: 90+ across all categories
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🔐 Security

### Implemented
- ✅ Environment variables for sensitive data
- ✅ Row Level Security (RLS) in Supabase
- ✅ Input validation on forms
- ✅ HTTPS only (in production)
- ✅ Secure headers (via Vercel)

### Recommended for Production
- [ ] Implement Supabase Auth for admin
- [ ] Add rate limiting for contact form
- [ ] Enable CORS properly
- [ ] Add CSRF protection
- [ ] Implement proper session management

## 📈 SEO Features

- ✅ Dynamic metadata per page
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Sitemap.xml (auto-generated)
- ✅ Robots.txt
- ✅ Semantic HTML
- ✅ Alt text for images
- ✅ Structured data (JSON-LD) ready

## 🎯 Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🔄 Development Workflow

1. **Local Development**
   ```bash
   npm run dev
   ```

2. **Type Checking**
   ```bash
   npm run lint
   ```

3. **Build**
   ```bash
   npm run build
   ```

4. **Production Preview**
   ```bash
   npm run start
   ```

## 🚀 Deployment

### Vercel (Recommended)
- Automatic deployments from GitHub
- Preview deployments for PRs
- Environment variables management
- Edge network CDN
- Analytics included

### Alternative Platforms
- Netlify
- Railway
- AWS Amplify
- Docker (self-hosted)

## 📝 Environment Variables

Required for full functionality:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_ADMIN_EMAIL=admin@decoisme.com
ADMIN_PASSWORD=your_secure_password
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 🤝 Contributing

This is a personal portfolio template. Feel free to:
- Fork and customize for your own use
- Report bugs or issues
- Suggest new features
- Submit pull requests

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🙏 Credits

- Design inspiration: Apple Inc.
- UI Components: shadcn/ui
- Icons: Lucide React
- Animations: Framer Motion
- Backend: Supabase

## 📞 Support

For questions or support:
- Check documentation files
- Open an issue on GitHub
- Email: hello@decoisme.com

---

**Built with ❤️ using Next.js**

Version: 1.0.0
Last Updated: May 2026
