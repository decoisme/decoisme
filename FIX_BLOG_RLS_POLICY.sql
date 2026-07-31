-- ============================================
-- FIX BLOG RLS POLICIES - ALLOW ANONYMOUS OPERATIONS
-- ============================================
-- Admin panel uses anonymous (NEXT_PUBLIC_SUPABASE_ANON_KEY)
-- So we need to allow anonymous users to do everything

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can do everything" ON blog_posts;

-- Create new policy: Allow anonymous to do EVERYTHING
-- (Since we handle auth at application level)
CREATE POLICY "Allow all operations for anonymous"
  ON blog_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Verify policy
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'blog_posts';

-- Test queries (should all work now)
-- Test SELECT
SELECT count(*) FROM blog_posts;

-- Test UPDATE (change this ID to match your data)
-- UPDATE blog_posts SET published = NOT published WHERE id = 'your-post-id-here';

-- Test DELETE (change this ID to match your data)
-- DELETE FROM blog_posts WHERE slug = 'test-post-123';

-- ============================================
-- IMPORTANT NOTES:
-- ============================================
-- This makes the table fully accessible via anon key
-- We rely on application-level auth (admin login)
-- If you want stricter security, add auth logic to admin API routes
-- ============================================
