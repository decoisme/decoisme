# Quick Reference - Decoisme Portfolio

Panduan cepat untuk hal-hal yang sering dibutuhkan.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Update Content

### 1. Personal Info

**Hero Section** (`components/sections/hero-section.tsx`):
```typescript
// Line 54-56
"Designer & Developer"

// Line 60-64
"UI/UX Designer & Creative Developer"

// Line 70-73
"Designing beautiful interfaces..."
```

**Contact Info** (`components/sections/contact-section.tsx`):
```typescript
// Line 60-80
const contactInfo = [
  { label: 'Email', value: 'your@email.com' },
  { label: 'Phone', value: '+1 234 567 890' },
  { label: 'Location', value: 'Your City' },
];
```

### 2. Add Projects

**Via Admin** (Recommended):
1. Go to `/admin`
2. Login
3. Click "Add Project"
4. Fill form:
   - Title
   - Short Description
   - Full Description
   - Category (UI/UX Design, Web Design, etc.)
   - Date (January 2024)
   - Platform (Figma, Adobe XD - comma separated)
   - Tech Stack (Next.js, React - comma separated)
   - Image URL
   - Gallery Images (comma separated URLs)
   - Live URL
5. Click "Create Project"

**Via Supabase**:
1. Go to Supabase Dashboard
2. Table Editor → projects
3. Insert row
4. Fill fields
5. Save

### 3. Update Skills

Edit `components/sections/skills-section-new.tsx`:

```typescript
const skillCategories = [
  {
    title: 'Your Category',
    icon: YourIcon,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      'Skill 1',
      'Skill 2',
      'Skill 3',
    ],
  },
];
```

## 🎨 Customization

### Change Colors

**Primary Gradient**:
```typescript
// Blue to Purple (default)
className="bg-gradient-to-r from-blue-600 to-purple-600"

// Change to your colors
className="bg-gradient-to-r from-pink-600 to-orange-600"
```

**Category Colors** (Skills Section):
```typescript
color: 'from-pink-500 to-rose-500'    // Pink
color: 'from-blue-500 to-cyan-500'    // Blue
color: 'from-purple-500 to-indigo-500' // Purple
color: 'from-orange-500 to-red-500'   // Orange
```

### Change Font

Already using **Geist** (modern font from Vercel).

To change:
```typescript
// lib/fonts.ts
import { YourFont } from 'next/font/google';

export const yourFont = YourFont({
  subsets: ['latin'],
  variable: '--font-your-font',
});
```

### Add Social Links

**Hero Section**:
```typescript
// Line 90-100
<a href="https://github.com/yourusername">
  {/* GitHub icon */}
</a>
```

**Contact Section**:
```typescript
// Line 100-120
const socialLinks = [
  { href: 'https://github.com/you', label: 'GitHub' },
  { href: 'https://linkedin.com/in/you', label: 'LinkedIn' },
];
```

## 🗄️ Supabase

### Quick Setup

1. Create project at [supabase.com](https://supabase.com)
2. SQL Editor → Run `supabase-schema.sql`
3. Get API keys from Settings → API
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_key
   ```
5. Restart server

### Add Project (SQL)

```sql
INSERT INTO projects (
  title,
  short_description,
  description,
  category,
  date,
  platform,
  tech_stack,
  image_url,
  gallery_images,
  live_url,
  order_index
) VALUES (
  'Your Project',
  'Short description',
  'Full description here',
  'UI/UX Design',
  'January 2024',
  ARRAY['Figma', 'Prototyping'],
  ARRAY['Next.js', 'TypeScript'],
  'https://your-image.jpg',
  ARRAY['https://img1.jpg', 'https://img2.jpg'],
  'https://your-project.com',
  1
);
```

### View Messages

```sql
SELECT * FROM contact_messages 
ORDER BY created_at DESC;
```

## 🖼️ Images

### Recommended Sizes

- **Project Thumbnail**: 800x600px
- **Gallery Images**: 1200x800px
- **Profile Photo**: 500x500px

### Image Sources

**Free Stock Photos**:
- [Unsplash](https://unsplash.com) - `https://images.unsplash.com/photo-xxxxx`
- [Pexels](https://pexels.com)
- [Pixabay](https://pixabay.com)

**Upload to Supabase**:
1. Storage → Create bucket `project-images`
2. Upload files
3. Copy public URL
4. Use in database

## 🚀 Deployment

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# 2. Deploy
# Go to vercel.com
# Import repository
# Add environment variables
# Deploy
```

### Environment Variables on Vercel

Add these in Vercel dashboard:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_ADMIN_EMAIL
ADMIN_PASSWORD
```

## 🐛 Common Issues

### "Invalid supabaseUrl"
- Check `.env.local` exists
- Restart dev server
- Verify URL format

### Projects not showing
- Check Supabase has data
- Verify API keys
- Check browser console

### Build errors
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Images not loading
- Use HTTPS URLs
- Check image accessible
- Verify CORS settings

## 📁 File Structure

```
decoisme/
├── app/
│   ├── admin/              # Admin pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── sections/           # Page sections
│   │   ├── hero-section.tsx
│   │   ├── projects-section-new.tsx
│   │   ├── skills-section-new.tsx
│   │   └── contact-section.tsx
│   ├── layout/             # Layout components
│   └── ui/                 # UI components
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── fonts.ts            # Font config
│   └── hooks/              # Custom hooks
└── public/                 # Static files
```

## 🎯 Key Files to Edit

1. **Personal Info**: `components/sections/hero-section.tsx`
2. **Skills**: `components/sections/skills-section-new.tsx`
3. **Contact**: `components/sections/contact-section.tsx`
4. **Colors**: Search for `from-blue-600 to-purple-600`
5. **Metadata**: `app/layout.tsx`

## 📞 Admin Dashboard

**URL**: `/admin`

**Default Login**:
- Email: `admin@decoisme.com`
- Password: any (in development)

**Features**:
- Add/Edit/Delete projects
- View contact messages
- Mark messages as read
- View statistics

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)

## 💡 Tips

1. **Test on mobile** - Always check responsive design
2. **Optimize images** - Use WebP format, compress files
3. **Git commits** - Commit frequently
4. **Backup data** - Export Supabase data regularly
5. **Monitor performance** - Use Lighthouse

---

Need more details? Check:
- `SUPABASE_SETUP.md` - Detailed Supabase guide
- `CUSTOMIZATION.md` - Full customization guide
- `DEPLOYMENT.md` - Deployment guide
- `README.md` - Project overview
