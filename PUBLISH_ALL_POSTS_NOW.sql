-- ============================================
-- QUICK FIX: Publish All Posts RIGHT NOW
-- ============================================
-- Run this in Supabase SQL Editor to publish all posts immediately

-- Set all posts to published = true
UPDATE blog_posts 
SET 
  published = true,
  published_at = COALESCE(published_at, NOW())
WHERE published IS NOT true OR published_at IS NULL;

-- Show results
SELECT 
  slug,
  title,
  published,
  published_at
FROM blog_posts 
ORDER BY created_at DESC;

-- ============================================
-- After running this:
-- 1. Refresh your browser
-- 2. Test URL: http://localhost:3000/blog/powerpoint-presentation-design-guide
-- 3. Should work! ✅
-- ============================================
