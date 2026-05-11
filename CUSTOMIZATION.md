# Customization Guide

This guide will help you personalize the Decoisme portfolio to make it your own.

## 🎨 Quick Customization (10 minutes)

### 1. Update Personal Information

#### Hero Section
File: `components/sections/hero-section.tsx`

```tsx
// Update your name
<span>Your Name</span>

// Update your title
<p>Your Professional Title</p>

// Update your description
<p>Your personal tagline or description</p>

// Update social media links
const socialLinks = [
  { icon: Github, href: 'https://github.com/yourusername' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername' },
  { icon: Mail, href: 'mailto:your@email.com' },
];
```

#### About Section
File: `components/sections/about-section.tsx`

```tsx
// Update bio
<p>Your professional background and passion</p>

// Update tech stack
const techStack = [
  { name: 'Your Tech 1', category: 'Category' },
  { name: 'Your Tech 2', category: 'Category' },
  // Add more...
];

// Update experience
const experiences = [
  {
    year: '2024',
    title: 'Your Position',
    company: 'Your Company',
    description: 'What you did',
  },
  // Add more...
];
```

#### Contact Section
File: `components/sections/contact-section.tsx`

```tsx
// Update contact info
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'your@email.com',
    href: 'mailto:your@email.com',
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
    value: 'Your City, Country',
    href: '#',
  },
];
```

### 2. Update Branding

#### Site Name
Search and replace "Decoisme" with your brand name in:
- `app/layout.tsx` (metadata)
- `components/layout/navbar.tsx`
- `components/layout/footer.tsx`
- `components/ui/loading-screen.tsx`
- `README.md`

#### Metadata
File: `app/layout.tsx`

```tsx
export const metadata: Metadata = {
  title: "Your Name - Your Title",
  description: "Your description",
  keywords: ["your", "keywords"],
  authors: [{ name: "Your Name" }],
  // Update Open Graph
};
```

### 3. Add Your Photo

1. Add your photo to `public/` folder (e.g., `profile.jpg`)
2. Update `components/sections/hero-section.tsx`:

```tsx
<Image
  src="/profile.jpg"
  alt="Your Name"
  fill
  className="object-cover"
  priority
/>
```

### 4. Update Colors (Optional)

File: `app/globals.css`

```css
:root {
  /* Update primary color */
  --primary: oklch(0.205 0 0); /* Your color */
  
  /* Update accent color */
  --accent: oklch(0.97 0 0); /* Your color */
}
```

Or use Tailwind classes directly in components:
```tsx
// Change from blue-600 to your color
className="bg-blue-600" → className="bg-purple-600"
```

## 🎯 Advanced Customization

### Add New Section

1. Create component in `components/sections/`:

```tsx
// components/sections/testimonials-section.tsx
'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';

export function TestimonialsSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="testimonials" ref={ref} className="py-32">
      {/* Your content */}
    </section>
  );
}
```

2. Add to main page (`app/page.tsx`):

```tsx
import { TestimonialsSection } from '@/components/sections/testimonials-section';

export default function Home() {
  return (
    <>
      {/* ... other sections */}
      <TestimonialsSection />
    </>
  );
}
```

3. Add to navigation (`components/layout/navbar.tsx`):

```tsx
const navItems = [
  // ... existing items
  { name: 'Testimonials', href: '#testimonials' },
];
```

### Customize Animations

#### Change Animation Duration

```tsx
// Slower animation
transition={{ duration: 1.5 }} // default is 0.8

// Faster animation
transition={{ duration: 0.4 }}
```

#### Change Animation Type

```tsx
// Bounce effect
transition={{ type: 'spring', bounce: 0.5 }}

// Smooth ease
transition={{ ease: 'easeInOut' }}

// Custom cubic bezier
transition={{ ease: [0.6, 0.05, 0.01, 0.9] }}
```

#### Disable Animations

```tsx
// Remove motion wrapper
<motion.div> → <div>

// Or set initial and animate to same values
initial={{ opacity: 1 }}
animate={{ opacity: 1 }}
```

### Customize Smooth Scroll

File: `lib/hooks/use-smooth-scroll.ts`

```tsx
const lenis = new Lenis({
  duration: 1.2,        // Scroll duration (higher = slower)
  easing: (t) => ...,   // Easing function
  smoothWheel: true,    // Enable smooth wheel
});
```

### Add Custom Fonts

1. Download font files to `public/fonts/`
2. Update `lib/fonts.ts`:

```tsx
import localFont from 'next/font/local';

export const customFont = localFont({
  src: [
    {
      path: '../public/fonts/YourFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/YourFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-custom',
});
```

3. Apply in `app/layout.tsx`:

```tsx
<html className={`${customFont.variable}`}>
```

### Customize Skills Section

File: `components/sections/skills-section.tsx`

```tsx
// Update skills list
const skills = [
  { name: 'Your Skill', icon: YourIcon, level: 90 },
  // Add more...
];

// Update marquee items
const marqueeItems = [
  'Skill 1', 'Skill 2', 'Skill 3',
  // Add more...
];

// Change marquee speed
.animate-marquee {
  animation: marquee 30s linear infinite; // Change 30s
}
```

### Add Blog Section

1. Install MDX:
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
```

2. Create blog structure:
```
app/
  blog/
    page.tsx          # Blog list
    [slug]/
      page.tsx        # Blog post
content/
  blog/
    post-1.mdx
    post-2.mdx
```

3. Create blog components and implement

### Add Analytics

#### Google Analytics

1. Install package:
```bash
npm install @next/third-parties
```

2. Add to `app/layout.tsx`:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

#### Vercel Analytics

1. Install:
```bash
npm install @vercel/analytics
```

2. Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🎨 Theme Customization

### Create Custom Theme

File: `app/globals.css`

```css
/* Add custom theme */
[data-theme="purple"] {
  --primary: oklch(0.6 0.25 280);
  --accent: oklch(0.7 0.2 320);
  /* Add more colors */
}
```

### Add Theme Switcher

```tsx
// components/theme-switcher.tsx
'use client';

import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="purple">Purple</option>
    </select>
  );
}
```

## 📱 Layout Customization

### Change Container Width

```tsx
// Wider container
<div className="max-w-7xl"> → <div className="max-w-[1400px]">

// Full width
<div className="max-w-7xl"> → <div className="max-w-full">
```

### Change Section Spacing

```tsx
// More spacing
<section className="py-32"> → <section className="py-48">

// Less spacing
<section className="py-32"> → <section className="py-20">
```

### Change Grid Columns

```tsx
// More columns
<div className="grid md:grid-cols-2 lg:grid-cols-3">
→ <div className="grid md:grid-cols-3 lg:grid-cols-4">

// Less columns
→ <div className="grid md:grid-cols-1 lg:grid-cols-2">
```

## 🔧 Component Customization

### Customize Navbar

File: `components/layout/navbar.tsx`

```tsx
// Change navbar height
<div className="h-20"> → <div className="h-24">

// Change blur amount
backdrop-blur-xl → backdrop-blur-2xl

// Change transparency
bg-white/80 → bg-white/90

// Add border
border-b border-gray-200
```

### Customize Buttons

File: `components/ui/button.tsx` (shadcn component)

```tsx
// Add new variant
variants: {
  variant: {
    // ... existing variants
    gradient: "bg-gradient-to-r from-blue-600 to-purple-600",
  }
}
```

### Customize Cards

```tsx
// Add more rounded corners
<Card className="rounded-3xl"> → <Card className="rounded-[2rem]">

// Add shadow
<Card className="shadow-lg">

// Add border
<Card className="border-2 border-gray-200">
```

## 💡 Tips

1. **Test Changes**: Always test on mobile, tablet, and desktop
2. **Keep Backups**: Commit to git before major changes
3. **Use Variables**: Define colors and spacing as CSS variables
4. **Stay Consistent**: Maintain design consistency across sections
5. **Performance**: Optimize images and minimize animations
6. **Accessibility**: Ensure color contrast and keyboard navigation

## 🆘 Need Help?

- Check component documentation in code comments
- Review existing sections for patterns
- Test in development before deploying
- Use browser DevTools for debugging

---

Happy customizing! Make it yours! 🎨
