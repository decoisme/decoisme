-- ============================================
-- HERO IMAGE SETUP - FINAL FIX
-- Handles existing policies and buckets
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- ============================================
-- STEP 1: CREATE OR UPDATE STORAGE BUCKET
-- ============================================

-- Create bucket 'images' (if not exists) or update to public
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images', 
  'images', 
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) 
DO UPDATE SET 
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

-- ============================================
-- STEP 2: DROP ALL OLD POLICIES (CLEAN SLATE)
-- ============================================

-- Drop any existing policies for 'images' bucket
DO $$ 
DECLARE
  policy_record RECORD;
BEGIN
  FOR policy_record IN 
    SELECT policyname 
    FROM pg_policies 
    WHERE tablename = 'objects' 
    AND (
      policyname LIKE '%Images%' 
      OR policyname LIKE '%images%'
      OR policyname LIKE '%hero%'
    )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', policy_record.policyname);
    RAISE NOTICE 'Dropped policy: %', policy_record.policyname;
  END LOOP;
END $$;

-- ============================================
-- STEP 3: CREATE NEW STORAGE POLICIES
-- ============================================

-- Policy 1: Public read access (SELECT)
CREATE POLICY "Public Access for Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Policy 2: Anyone can upload (INSERT)
-- NOTE: Change to authenticated users in production!
CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

-- Policy 3: Anyone can update (UPDATE)
-- NOTE: Change to authenticated users in production!
CREATE POLICY "Anyone can update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images');

-- Policy 4: Anyone can delete (DELETE)
-- NOTE: Change to authenticated users in production!
CREATE POLICY "Anyone can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images');

-- ============================================
-- STEP 4: CREATE HERO_SETTINGS TABLE
-- ============================================

-- Create table (if not exists)
CREATE TABLE IF NOT EXISTS hero_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_image_url TEXT,
  hero_title TEXT DEFAULT 'UI/UX Designer',
  hero_subtitle TEXT DEFAULT '& Creative Developer',
  hero_description TEXT DEFAULT 'Crafting beautiful, user-centered digital experiences through thoughtful design and clean code.',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STEP 5: ENABLE RLS ON HERO_SETTINGS
-- ============================================

ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;

-- Drop old policies (if any)
DROP POLICY IF EXISTS "Public hero settings are viewable by everyone" ON hero_settings;
DROP POLICY IF EXISTS "Anyone can update hero settings" ON hero_settings;
DROP POLICY IF EXISTS "Anyone can insert hero settings" ON hero_settings;
DROP POLICY IF EXISTS "Public hero settings" ON hero_settings;

-- Create new policies
CREATE POLICY "Public hero settings"
ON hero_settings FOR SELECT
USING (true);

CREATE POLICY "Anyone can update hero settings"
ON hero_settings FOR UPDATE
USING (true);

CREATE POLICY "Anyone can insert hero settings"
ON hero_settings FOR INSERT
WITH CHECK (true);

-- ============================================
-- STEP 6: CREATE UPDATE TRIGGER
-- ============================================

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_hero_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop old trigger (if exists)
DROP TRIGGER IF EXISTS update_hero_settings_updated_at ON hero_settings;

-- Create new trigger
CREATE TRIGGER update_hero_settings_updated_at
BEFORE UPDATE ON hero_settings
FOR EACH ROW
EXECUTE FUNCTION update_hero_settings_updated_at();

-- ============================================
-- STEP 7: INSERT DEFAULT RECORD
-- ============================================

-- Insert default hero settings (if not exists)
INSERT INTO hero_settings (
  id,
  hero_image_url,
  hero_title,
  hero_subtitle,
  hero_description
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  NULL,
  'UI/UX Designer',
  '& Creative Developer',
  'Crafting beautiful, user-centered digital experiences through thoughtful design and clean code.'
) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STEP 8: VERIFICATION (NO ERRORS)
-- ============================================

-- Verify bucket created
DO $$
DECLARE
  bucket_exists BOOLEAN;
  bucket_is_public BOOLEAN;
BEGIN
  SELECT EXISTS(SELECT 1 FROM storage.buckets WHERE id = 'images') INTO bucket_exists;
  SELECT public FROM storage.buckets WHERE id = 'images' INTO bucket_is_public;
  
  IF bucket_exists AND bucket_is_public THEN
    RAISE NOTICE '✅ Bucket "images" created and is public';
  ELSIF bucket_exists AND NOT bucket_is_public THEN
    RAISE WARNING '⚠️ Bucket "images" exists but is NOT public';
  ELSE
    RAISE EXCEPTION '❌ Bucket "images" not found';
  END IF;
END $$;

-- Verify policies created (flexible check)
DO $$
DECLARE
  policy_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO policy_count 
  FROM pg_policies 
  WHERE tablename = 'objects' 
  AND policyname IN (
    'Public Access for Images',
    'Anyone can upload images',
    'Anyone can update images',
    'Anyone can delete images'
  );
  
  IF policy_count = 4 THEN
    RAISE NOTICE '✅ All 4 storage policies created successfully';
  ELSE
    RAISE WARNING '⚠️ Found % policies (expected 4)', policy_count;
  END IF;
END $$;

-- Verify hero_settings table created
DO $$
DECLARE
  table_exists BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'hero_settings'
  ) INTO table_exists;
  
  IF table_exists THEN
    RAISE NOTICE '✅ Table "hero_settings" created successfully';
  ELSE
    RAISE EXCEPTION '❌ Table "hero_settings" not found';
  END IF;
END $$;

-- Verify default record inserted
DO $$
DECLARE
  record_exists BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM hero_settings 
    WHERE id = '00000000-0000-0000-0000-000000000001'
  ) INTO record_exists;
  
  IF record_exists THEN
    RAISE NOTICE '✅ Default hero_settings record created successfully';
  ELSE
    RAISE EXCEPTION '❌ Default hero_settings record not found';
  END IF;
END $$;

-- ============================================
-- FINAL VERIFICATION - SHOW RESULTS
-- ============================================

-- Show bucket info
SELECT 
  '=== BUCKET INFO ===' as section,
  id, 
  name, 
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets 
WHERE id = 'images';

-- Show policies
SELECT 
  '=== STORAGE POLICIES ===' as section,
  policyname, 
  cmd as operation
FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname IN (
  'Public Access for Images',
  'Anyone can upload images',
  'Anyone can update images',
  'Anyone can delete images'
)
ORDER BY policyname;

-- Show hero_settings
SELECT 
  '=== HERO SETTINGS ===' as section,
  id,
  hero_image_url,
  hero_title,
  hero_subtitle,
  created_at,
  updated_at
FROM hero_settings;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ SETUP COMPLETE!';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Restart dev server: npm run dev';
  RAISE NOTICE '2. Login to admin: http://localhost:3000/admin';
  RAISE NOTICE '3. Click "Hero Image" tab';
  RAISE NOTICE '4. Click "Upload Image" button';
  RAISE NOTICE '5. Select image (JPG/PNG/WebP, max 5MB)';
  RAISE NOTICE '6. Check homepage: http://localhost:3000';
  RAISE NOTICE '';
  RAISE NOTICE 'Upload path: images/profile/hero-[timestamp].[ext]';
  RAISE NOTICE '';
  RAISE NOTICE '========================================';
END $$;

-- ============================================
-- NOTES
-- ============================================

-- 1. This script handles existing policies and buckets
-- 2. Safe to run multiple times
-- 3. Bucket name: 'images' (NOT 'hero-images')
-- 4. Upload path: images/profile/hero-[timestamp].[ext]
-- 5. Max file size: 5MB
-- 6. Allowed formats: JPG, PNG, WebP
-- 7. Bucket is PUBLIC (anyone can read)
-- 8. Upload/Update/Delete policies are OPEN (change in production!)

