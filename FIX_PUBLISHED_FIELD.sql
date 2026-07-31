-- ============================================
-- FIX PUBLISHED FIELD - Check & Fix Data
-- ============================================

-- STEP 1: Check current data type and values
SELECT 
  slug,
  title,
  published,
  pg_typeof(published) AS published_type,
  CASE 
    WHEN published = true THEN 'TRUE (boolean)'
    WHEN published = false THEN 'FALSE (boolean)'
    WHEN published::text = 'true' THEN 'true (text)'
    WHEN published::text = 'false' THEN 'false (text)'
    ELSE 'OTHER: ' || published::text
  END AS published_interpretation
FROM blog_posts
ORDER BY created_at DESC;

-- STEP 2: Count by published status
SELECT 
  published,
  pg_typeof(published) AS type,
  COUNT(*) AS count
FROM blog_posts
GROUP BY published;

-- ============================================
-- FIX: Set all posts to published = true
-- ============================================
-- Uncomment and run this to publish all posts:

UPDATE blog_posts 
SET published = true 
WHERE published IS NOT true;

-- Verify fix:
SELECT slug, title, published FROM blog_posts ORDER BY created_at DESC;

-- ============================================
-- EXPECTED RESULT AFTER FIX:
-- ============================================
-- All posts should show: published = true (type: boolean)
-- ============================================
