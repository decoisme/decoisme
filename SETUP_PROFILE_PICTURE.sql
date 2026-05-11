-- ============================================
-- SETUP PROFILE PICTURE STORAGE
-- ============================================
-- Run this in Supabase SQL Editor

-- 1. Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Set up storage policies for profile pictures
-- Allow public read access
CREATE POLICY "Public Access for Profile Pictures"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-pictures');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload profile pictures"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profile-pictures' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their own uploads
CREATE POLICY "Users can update their own profile pictures"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profile-pictures' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their own uploads
CREATE POLICY "Users can delete their own profile pictures"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profile-pictures' 
  AND auth.role() = 'authenticated'
);

-- 3. Create profile table to store profile info
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = user_id);

-- 6. Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Create trigger for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 8. Insert default profile (SKIP THIS - Will be created when needed)
-- NOTE: Don't insert profile yet! 
-- Profile will be created automatically when you first upload a picture
-- OR you can create it manually after you have a user in auth.users

-- OPTION 1: If you already have a user, insert profile like this:
-- INSERT INTO profiles (
--   user_id,
--   full_name,
--   bio,
--   job_title,
--   location,
--   profile_picture_url
-- ) VALUES (
--   'YOUR_ACTUAL_USER_ID_HERE', -- Get from: SELECT id FROM auth.users;
--   'Your Name',
--   'Passionate UI/UX Designer & Creative Professional. Specializing in Instagram feed design, carousel posts, and brand identity.',
--   'UI/UX Designer',
--   'Jakarta, Indonesia',
--   NULL
-- ) ON CONFLICT (user_id) DO NOTHING;

-- OPTION 2: Create a demo profile without user_id constraint (for testing)
-- First, temporarily disable the foreign key:
-- ALTER TABLE profiles DROP CONSTRAINT profiles_user_id_fkey;
-- Then insert demo data:
-- INSERT INTO profiles (id, full_name, bio, job_title, location)
-- VALUES (
--   '00000000-0000-0000-0000-000000000001',
--   'Demo User',
--   'This is a demo profile for testing purposes.',
--   'UI/UX Designer',
--   'Jakarta, Indonesia'
-- );
-- Re-enable foreign key after:
-- ALTER TABLE profiles ADD CONSTRAINT profiles_user_id_fkey 
--   FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if bucket was created
SELECT * FROM storage.buckets WHERE id = 'profile-pictures';

-- Check if policies were created
SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%profile%';

-- Check if profiles table was created
SELECT * FROM profiles;

-- ============================================
-- NOTES
-- ============================================
-- 1. Make sure to replace the user_id in the INSERT statement
-- 2. Profile pictures will be stored at: profile-pictures/user-id/filename.jpg
-- 3. Public URL format: https://[project-ref].supabase.co/storage/v1/object/public/profile-pictures/[path]
-- 4. Recommended image specs:
--    - Format: JPG, PNG, or WebP
--    - Max size: 2MB
--    - Recommended dimensions: 400x400px (square)
--    - Aspect ratio: 1:1
