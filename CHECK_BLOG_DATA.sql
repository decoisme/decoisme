-- ============================================
-- CHECK BLOG DATA - Diagnostic Query
-- ============================================
-- Run this in Supabase SQL Editor to check blog data

-- 1. Check if blog_posts table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_name = 'blog_posts'
) AS table_exists;

-- 2. Count total posts
SELECT COUNT(*) AS total_posts FROM blog_posts;

-- 3. Count published posts
SELECT COUNT(*) AS published_posts FROM blog_posts WHERE published = true;

-- 4. Show all posts with key info
SELECT 
  id,
  slug,
  title,
  published,
  created_at,
  LENGTH(content) AS content_length
FROM blog_posts
ORDER BY created_at DESC;

-- 5. Show slugs only (for testing URLs)
SELECT slug, published FROM blog_posts ORDER BY created_at DESC;

-- ============================================
-- NEXT STEPS:
-- ============================================
-- Copy a slug from the results above
-- Then test URL: http://localhost:3000/blog/[slug]
-- Example: http://localhost:3000/blog/my-design-process-2026
-- ============================================
