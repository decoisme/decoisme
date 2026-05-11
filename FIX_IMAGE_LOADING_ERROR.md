# 🔧 Fix: Failed to Load Hero Image

## ❌ Error
```
Failed to load hero image:
https://dralqqfeqmhgrkjuebhd.supabase.co/storage/v1/object/public/images/...
```

## 🔍 Diagnosis

### Check 1: Apakah Bucket `images` Sudah Ada?

```sql
-- Run di Supabase SQL Editor
SELECT * FROM storage.buckets WHERE id = 'images';
```

**Expected Result:**
```
id: images
name: images
public: true
```

**If Empty:** Bucket belum dibuat! ❌

### Check 2: Apakah File Ada di Storage?

1. Buka **Supabase Dashboard** → **Storage**
2. Cari bucket **"images"**
3. Buka folder **"profile"**
4. Lihat apakah ada file `hero-[timestamp].jpg`

**If Not Found:** File belum diupload! ❌

### Check 3: Apakah Bucket Public?

```sql
-- Check bucket public status
SELECT id, name, public FROM storage.buckets WHERE id = 'images';
```

**Expected:** `public = true`

**If False:** Bucket tidak public! ❌

---

## ✅ Solution: Complete Setup

### Step 1: Create Bucket & Setup Policies

```sql
-- 1. Buka Supabase Dashboard → SQL Editor
-- 2. Copy SEMUA code di bawah ini
-- 3. Paste & Run

-- Create bucket 'images' (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies (if any)
DROP POLICY IF EXISTS "Public Access for Images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete images" ON storage.objects;

-- Create new policies
CREATE POLICY "Public Access for Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Anyone can update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images');

CREATE POLICY "Anyone can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images');
```

### Step 2: Verify Bucket Created

```sql
-- Check bucket
SELECT * FROM storage.buckets WHERE id = 'images';

-- Check policies
SELECT policyname, cmd FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%Images%';
```

**Expected Output:**
- Bucket: `images` (public: true)
- Policies: 4 policies (SELECT, INSERT, UPDATE, DELETE)

### Step 3: Test Upload

1. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Login to admin:**
   ```
   http://localhost:3000/admin
   ```

3. **Upload image:**
   - Go to "Hero Image" tab
   - Click "Upload Image" button
   - Select image file
   - Wait for upload

4. **Check console:**
   - Should see: "Hero image updated successfully!"
   - No errors

### Step 4: Verify in Supabase

1. Go to **Supabase Dashboard** → **Storage**
2. Click bucket **"images"**
3. Open folder **"profile"**
4. Should see file: `hero-[timestamp].jpg`
5. Click file → Copy URL
6. Paste URL in browser → Should load image

---

## 🐛 Common Issues

### Issue 1: Bucket Not Found

**Error:** `StorageApiError: Bucket not found`

**Fix:**
```sql
-- Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;
```

### Issue 2: Permission Denied

**Error:** `StorageApiError: new row violates row-level security policy`

**Fix:**
```sql
-- Re-create policies
-- Copy policies section from Step 1 above
```

### Issue 3: Image Not Loading (CORS)

**Error:** `Failed to load resource: CORS policy`

**Fix:**
1. Go to **Supabase Dashboard** → **Storage** → **Policies**
2. Make sure bucket is **Public**
3. Check "Public Access for Images" policy exists

### Issue 4: URL Returns 404

**Error:** `404 Not Found`

**Possible Causes:**
- File deleted from storage
- Wrong path/filename
- Bucket not public

**Fix:**
1. Check file exists in Storage
2. Verify URL format: `.../public/images/profile/hero-...`
3. Make sure bucket is public

---

## 🧪 Testing Checklist

### Database Setup
- [ ] Run SQL script (Step 1)
- [ ] Bucket `images` exists
- [ ] Bucket is public
- [ ] 4 policies created
- [ ] `hero_settings` table exists

### Upload Test
- [ ] Restart dev server
- [ ] Login to admin
- [ ] Navigate to "Hero Image" tab
- [ ] Click "Upload Image" button
- [ ] Select image file
- [ ] Upload starts (loading spinner)
- [ ] Upload completes (toast notification)
- [ ] No console errors

### Storage Verification
- [ ] Go to Supabase Storage
- [ ] Bucket `images` visible
- [ ] Folder `profile` exists
- [ ] File uploaded successfully
- [ ] Click file → Copy URL
- [ ] Paste URL in browser → Image loads

### Homepage Test
- [ ] Go to homepage
- [ ] Hero image displays
- [ ] No console errors
- [ ] Image loads correctly
- [ ] Responsive on mobile

---

## 📞 Quick Commands

### Check Bucket
```sql
SELECT * FROM storage.buckets WHERE id = 'images';
```

### Check Policies
```sql
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%Images%';
```

### List Files
```sql
SELECT name, bucket_id, created_at 
FROM storage.objects 
WHERE bucket_id = 'images' 
ORDER BY created_at DESC 
LIMIT 10;
```

### Delete All Files (if needed)
```sql
-- CAREFUL! This deletes all files
DELETE FROM storage.objects WHERE bucket_id = 'images';
```

### Reset Bucket (if needed)
```sql
-- CAREFUL! This deletes bucket and all files
DELETE FROM storage.objects WHERE bucket_id = 'images';
DELETE FROM storage.buckets WHERE id = 'images';
-- Then re-run Step 1
```

---

## 🎯 Expected URL Format

```
https://[project-ref].supabase.co/storage/v1/object/public/images/profile/hero-[timestamp].jpg

Example:
https://dralqqfeqmhgrkjuebhd.supabase.co/storage/v1/object/public/images/profile/hero-1234567890.jpg
```

**Parts:**
- `[project-ref]`: Your Supabase project reference
- `public`: Public access
- `images`: Bucket name
- `profile`: Folder name
- `hero-[timestamp].jpg`: Filename

---

## ✅ Success Indicators

### In Console
```
✅ Hero image updated successfully!
✅ No errors in console
✅ Image URL logged
```

### In Supabase Storage
```
✅ Bucket 'images' exists
✅ Folder 'profile' exists
✅ File 'hero-[timestamp].jpg' exists
✅ File is accessible via URL
```

### On Homepage
```
✅ Hero image displays
✅ No broken image icon
✅ No console errors
✅ Image loads smoothly
```

---

## 🚀 Quick Fix Script

Copy this entire script and run in Supabase SQL Editor:

```sql
-- COMPLETE SETUP SCRIPT
-- Run this if nothing works

-- 1. Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Drop old policies
DROP POLICY IF EXISTS "Public Access for Images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete images" ON storage.objects;

-- 3. Create new policies
CREATE POLICY "Public Access for Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Anyone can update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images');

CREATE POLICY "Anyone can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images');

-- 4. Create hero_settings table
CREATE TABLE IF NOT EXISTS hero_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public hero settings" ON hero_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can update hero settings" ON hero_settings FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert hero settings" ON hero_settings FOR INSERT WITH CHECK (true);

-- 5. Insert default record
INSERT INTO hero_settings (id, hero_image_url)
VALUES ('00000000-0000-0000-0000-000000000001', NULL)
ON CONFLICT (id) DO NOTHING;

-- 6. Verify
SELECT 'Bucket created:' as status, * FROM storage.buckets WHERE id = 'images';
SELECT 'Policies created:' as status, count(*) as count FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%Images%';
SELECT 'Hero settings ready:' as status, * FROM hero_settings;
```

---

**Status:** 📋 Complete troubleshooting guide

**Next Steps:**
1. Run Quick Fix Script above
2. Restart dev server
3. Try upload again
4. Check console for errors

**If still not working:** Check browser console (F12) for detailed error messages and share them.

🚀 Good luck!
