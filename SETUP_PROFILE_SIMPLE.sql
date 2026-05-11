-- ============================================
-- SETUP PROFILE PICTURE - SIMPLE VERSION
-- (Tanpa Auth User - Untuk Testing)
-- ============================================

-- 1. Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Set up storage policies for profile pictures
-- Allow public read access
CREATE POLICY "Public Access for Profile Pictures"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-pictures');

-- Allow anyone to upload (for testing - change to authenticated in production)
CREATE POLICY "Anyone can upload profile pictures"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'profile-pictures');

-- Allow anyone to update (for testing - change to authenticated in production)
CREATE POLICY "Anyone can update profile pictures"
ON storage.objects FOR UPDATE
USING (bucket_id = 'profile-pictures');

-- Allow anyone to delete (for testing - change to authenticated in production)
CREATE POLICY "Anyone can delete profile pictures"
ON storage.objects FOR DELETE
USING (bucket_id = 'profile-pictures');

-- 3. Create profile table WITHOUT foreign key constraint (for testing)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID, -- No foreign key constraint for testing
  full_name TEXT NOT NULL,
  bio TEXT,
  profile_picture_url TEXT,
  job_title TEXT,
  location TEXT,
  website TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 4. Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 5. Create policies for profiles table
-- Allow public read access to profiles
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
USING (true);

-- Allow anyone to insert profile (for testing)
CREATE POLICY "Anyone can insert profile"
ON profiles FOR INSERT
WITH CHECK (true);

-- Allow anyone to update profile (for testing)
CREATE POLICY "Anyone can update profile"
ON profiles FOR UPDATE
USING (true);

-- 6. Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Create trigger for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 8. Insert demo profile (for testing)
INSERT INTO profiles (
  id,
  user_id,
  full_name,
  bio,
  job_title,
  location,
  profile_picture_url
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'demo-user-123',
  'Decoisme',
  'Passionate UI/UX Designer & Creative Professional. Specializing in Instagram feed design, carousel posts, and brand identity.',
  'UI/UX Designer',
  'Jakarta, Indonesia',
  NULL
) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if bucket was created
SELECT * FROM storage.buckets WHERE id = 'profile-pictures';

-- Check if profiles table was created
SELECT * FROM profiles;

-- ============================================
-- NOTES FOR TESTING
-- ============================================
-- 1. This is a SIMPLIFIED version for testing without auth
-- 2. Anyone can upload/update/delete (not secure for production!)
-- 3. No foreign key constraint to auth.users
-- 4. Demo profile created with ID: 00000000-0000-0000-0000-000000000001
-- 5. Use this profile ID in your component for testing

-- ============================================
-- TO USE IN PRODUCTION (with real auth):
-- ============================================
-- 1. Drop this table: DROP TABLE profiles CASCADE;
-- 2. Run SETUP_PROFILE_PICTURE.sql instead
-- 3. Create real users via Supabase Auth
-- 4. Link profiles to real user_id from auth.users
