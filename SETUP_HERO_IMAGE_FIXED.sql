-- ============================================
-- SETUP HERO IMAGE STORAGE - FIXED
-- Path: images/profile
-- ============================================

-- 1. Create storage bucket 'images' (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Set up storage policies for images bucket
-- Allow public read access
CREATE POLICY "Public Access for Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow anyone to upload (for testing - change to authenticated in production)
CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

-- Allow anyone to update (for testing)
CREATE POLICY "Anyone can update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images');

-- Allow anyone to delete (for testing)
CREATE POLICY "Anyone can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images');

-- 3. Create hero_settings table (if not exists)
CREATE TABLE IF NOT EXISTS hero_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_image_url TEXT,
  hero_title TEXT DEFAULT 'UI/UX Designer',
  hero_subtitle TEXT DEFAULT '& Creative Developer',
  hero_description TEXT DEFAULT 'Crafting beautiful, user-centered digital experiences through thoughtful design and clean code.',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable RLS on hero_settings table
ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;

-- 5. Create policies for hero_settings table
-- Allow public read access
CREATE POLICY "Public hero settings are viewable by everyone"
ON hero_settings FOR SELECT
USING (true);

-- Allow anyone to update (for testing)
CREATE POLICY "Anyone can update hero settings"
ON hero_settings FOR UPDATE
USING (true);

-- Allow anyone to insert (for testing)
CREATE POLICY "Anyone can insert hero settings"
ON hero_settings FOR INSERT
WITH CHECK (true);

-- 6. Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_hero_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Create trigger for updated_at
DROP TRIGGER IF EXISTS update_hero_settings_updated_at ON hero_settings;
CREATE TRIGGER update_hero_settings_updated_at
BEFORE UPDATE ON hero_settings
FOR EACH ROW
EXECUTE FUNCTION update_hero_settings_updated_at();

-- 8. Insert default hero settings
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
-- VERIFICATION QUERIES
-- ============================================

-- Check if bucket was created
SELECT * FROM storage.buckets WHERE id = 'images';

-- Check if hero_settings table was created
SELECT * FROM hero_settings;

-- Check storage policies
SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%images%';

-- ============================================
-- NOTES
-- ============================================
-- 1. Bucket name: 'images' (not 'hero-images')
-- 2. Upload path: images/profile/hero-[timestamp].[ext]
-- 3. Public URL format: https://[project-ref].supabase.co/storage/v1/object/public/images/profile/hero-[timestamp].[ext]
-- 4. Recommended image specs:
--    - Format: JPG, PNG, or WebP
--    - Max size: 5MB
--    - Recommended dimensions: 800x800px (square)
-- 5. For production, change policies to require authentication
