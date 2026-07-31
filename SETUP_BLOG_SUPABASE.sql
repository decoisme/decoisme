-- ============================================
-- BLOG POSTS TABLE SETUP FOR SUPABASE
-- ============================================
-- Run this in Supabase SQL Editor
-- Path: Dashboard → SQL Editor → New Query

-- Drop existing table if you want fresh start (CAREFUL!)
-- DROP TABLE IF EXISTS blog_posts CASCADE;

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  author TEXT DEFAULT 'Muhammad Dinan Ghifari',
  category TEXT DEFAULT 'Design',
  tags TEXT[] DEFAULT '{}',
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  reading_time INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created ON blog_posts(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public can view published blog posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);

-- Allow all for authenticated users (your admin)
CREATE POLICY "Authenticated users can do everything"
  ON blog_posts
  FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- SAMPLE BLOG POSTS (Optional - for testing)
-- ============================================

-- Sample Post 1: Portfolio Design (migrated from MDX)
INSERT INTO blog_posts (
  slug,
  title,
  description,
  content,
  author,
  category,
  tags,
  published,
  published_at,
  reading_time
) VALUES (
  'brutalist-portfolio-design-process',
  'How I Built a Brutalist Portfolio with Next.js 16',
  'A deep dive into designing and developing a brutalist portfolio website with modern web technologies, premium animations, and world-class performance.',
  '# How I Built a Brutalist Portfolio with Next.js 16

Building a portfolio is more than showcasing work—it''s about creating an experience that reflects your design philosophy.

## The Design Philosophy

Brutalism in web design isn''t about being ugly—it''s about being **honest, raw, and functional**. My goals were:

- **Zero unnecessary decoration** - No gradients, no shadows, no blur
- **Pure monochrome** - Black (#000000) and white (#FFFFFF) only
- **1px borders** - Sharp, clean separations
- **Instant state changes** - No slow transitions
- **Terminal aesthetic** - Monospace fonts, system labels

## Technical Stack

### Core Technologies
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Supabase** - Backend & database

[... rest of content would be full article ...]',
  'Muhammad Dinan Ghifari',
  'Case Study',
  ARRAY['Next.js', 'Design', 'Brutalism', 'Web Development', 'Portfolio'],
  true,
  '2026-01-15 10:00:00+00',
  11
) ON CONFLICT (slug) DO NOTHING;

-- Sample Post 2: Instagram Carousel
INSERT INTO blog_posts (
  slug,
  title,
  description,
  content,
  author,
  category,
  tags,
  published,
  published_at,
  reading_time
) VALUES (
  'instagram-carousel-design-tips',
  '10 Instagram Carousel Design Tips That Actually Work',
  'Learn the proven design strategies I use to create high-engagement Instagram carousels for clients. From layout to color theory, these tips will transform your feed.',
  '# 10 Instagram Carousel Design Tips That Actually Work

After designing **50+ carousel posts** for clients across various industries, I''ve learned what makes people swipe.

## Why Carousels Matter

Instagram''s algorithm **loves carousels** because they increase engagement time.

### The Numbers
- **2-3x more reach** than single images
- **Higher save rate** (people reference them later)
- **Better storytelling** potential

## Tip 1: Hook Them on Slide 1

Your first slide has **1.5 seconds** to capture attention.

[... rest of content ...]',
  'Muhammad Dinan Ghifari',
  'Design',
  ARRAY['Instagram', 'Social Media', 'Design Tips', 'Carousel', 'Content Creation'],
  true,
  '2026-01-20 10:00:00+00',
  13
) ON CONFLICT (slug) DO NOTHING;

-- Sample Post 3: PowerPoint Design
INSERT INTO blog_posts (
  slug,
  title,
  description,
  content,
  author,
  category,
  tags,
  published,
  published_at,
  reading_time
) VALUES (
  'powerpoint-presentation-design-guide',
  'From Boring to Brilliant: PowerPoint Design Secrets',
  'Transform your presentations from death-by-PowerPoint to engaging visual stories. Learn the design principles I use for corporate clients and startups.',
  '# From Boring to Brilliant: PowerPoint Design Secrets

Let''s face it: most PowerPoint presentations are **painful to sit through**. But it doesn''t have to be that way.

## The Problem with Most Presentations

### Common Mistakes:
- 🔴 **Text overload** - Paragraphs on every slide
- 🔴 **Bad templates** - Generic clipart
- 🔴 **No hierarchy** - Everything looks equally important

## My Design Philosophy

### The 3 Core Principles:

#### 1. **One Idea Per Slide**
Each slide should have **one clear message**.

[... rest of content ...]',
  'Muhammad Dinan Ghifari',
  'Tutorial',
  ARRAY['PowerPoint', 'Presentation Design', 'Google Slides', 'Business', 'Design'],
  true,
  '2026-01-25 10:00:00+00',
  16
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if table exists and has data
SELECT 
  COUNT(*) as total_posts,
  COUNT(*) FILTER (WHERE published = true) as published_posts,
  COUNT(*) FILTER (WHERE published = false) as draft_posts
FROM blog_posts;

-- View all posts
SELECT 
  id,
  slug,
  title,
  category,
  published,
  published_at,
  created_at
FROM blog_posts
ORDER BY created_at DESC;

-- ============================================
-- SUCCESS!
-- ============================================
-- ✅ blog_posts table created
-- ✅ Indexes added for performance
-- ✅ RLS policies configured
-- ✅ Sample posts inserted
-- ✅ Ready for admin panel integration
--
-- Next steps:
-- 1. Verify in Supabase Dashboard → Table Editor
-- 2. Test with admin panel
-- 3. Start writing posts!
-- ============================================
