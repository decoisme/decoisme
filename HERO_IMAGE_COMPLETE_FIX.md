# 🔧 Hero Image Complete Fix - Step by Step

## ❌ Problem
Hero image tidak muncul di homepage dengan error:
```
Failed to load hero image: https://dralqqfeqmhgrkjuebhd.supabase.co/storage/v1/object/public/images/...
```

## ✅ Complete Solution (5 Steps)

### Step 1: Run SQL Script di Supabase

1. **Buka Supabase Dashboard** → https://supabase.com/dashboard
2. Pilih project Anda
3. Klik **SQL Editor** di sidebar kiri
4. Klik **New Query**
5. Copy SEMUA code dari file `SETUP_HERO_IMAGE_COMPLETE.sql`
6. Paste ke SQL Editor
7. Klik **Run** (atau tekan Ctrl+Enter)

**Expected Output:**
```
Success. No rows returned
```

### Step 2: Verify Bucket Created

Masih di SQL Editor, run query ini:

```sql
SELECT id, name, public FROM storage.buckets WHERE id = 'images';
```

**Expected Result:**
```
id: images
name: images
public: true
```

✅ **If you see this:** Bucket berhasil dibuat!  
❌ **If empty:** Ulangi Step 1

### Step 3: Verify Policies Created

Run query ini di SQL Editor:

```sql
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%Images%'
ORDER BY policyname;
```

**Expected Result:** 4 policies
```
1. Anyone can delete images (DELETE)
2. Anyone can update images (UPDATE)
3. Anyone can upload images (INSERT)
4. Public Access for Images (SELECT)
```

✅ **If you see 4 policies:** Policies berhasil dibuat!  
❌ **If less than 4:** Ulangi Step 1

### Step 4: Verify hero_settings Table

Run query ini:

```sql
SELECT * FROM hero_settings;
```

**Expected Result:**
```
id: 00000000-0000-0000-0000-000000000001
hero_image_url: null
hero_title: UI/UX Designer
hero_subtitle: & Creative Developer
hero_description: Crafting beautiful...
created_at: [timestamp]
updated_at: [timestamp]
```

✅ **If you see this:** Table berhasil dibuat!  
❌ **If error:** Ulangi Step 1

### Step 5: Upload Image via Admin Dashboard

1. **Stop dev server** (jika running):
   ```bash
   # Press Ctrl+C in terminal
   ```

2. **Start dev server:**
   ```bash
   npm run dev
   ```

3. **Login to admin:**
   - Buka browser: http://localhost:3000/admin
   - Login dengan credentials Anda

4. **Upload hero image:**
   - Klik tab **"Hero Image"** (tab pertama)
   - Scroll ke bawah
   - Klik tombol kuning **"Upload Image"**
   - Pilih gambar (JPG/PNG/WebP, max 5MB)
   - Tunggu upload selesai
   - Lihat toast notification: "Hero image updated successfully!"

5. **Verify upload di Supabase:**
   - Buka **Supabase Dashboard** → **Storage**
   - Klik bucket **"images"**
   - Buka folder **"profile"**
   - Lihat file: `hero-[timestamp].jpg` atau `.png`
   - Klik file → **Copy URL**
   - Paste URL di browser baru → Image harus muncul

6. **Check homepage:**
   - Buka http://localhost:3000
   - Hero image harus muncul di Hero Section
   - Buka Console (F12) → Tidak ada error

---

## 🐛 Troubleshooting

### Issue 1: "Bucket not found" Error

**Symptoms:**
```
StorageApiError: Bucket not found
```

**Solution:**
```sql
-- Run di SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;
```

### Issue 2: "Permission denied" Error

**Symptoms:**
```
StorageApiError: new row violates row-level security policy
```

**Solution:**
```sql
-- Drop all existing policies
DROP POLICY IF EXISTS "Public Access for Images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete images" ON storage.objects;

-- Re-create policies
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

### Issue 3: Image Uploaded but Not Showing

**Symptoms:**
- Upload berhasil (toast notification muncul)
- File ada di Supabase Storage
- Tapi image tidak muncul di homepage

**Solution:**

1. **Check URL format:**
   ```
   Correct: https://[project].supabase.co/storage/v1/object/public/images/profile/hero-123.jpg
   Wrong: https://[project].supabase.co/storage/v1/object/images/profile/hero-123.jpg (missing "public")
   ```

2. **Verify bucket is public:**
   ```sql
   SELECT public FROM storage.buckets WHERE id = 'images';
   -- Should return: true
   ```

3. **Test URL directly:**
   - Copy image URL dari Supabase Storage
   - Paste di browser baru
   - Image harus muncul
   - Jika 404 → bucket tidak public atau file tidak ada

4. **Clear browser cache:**
   - Press Ctrl+Shift+R (hard refresh)
   - Or clear cache: Ctrl+Shift+Delete

### Issue 4: CORS Error

**Symptoms:**
```
Access to fetch at '...' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**

1. **Check bucket is public:**
   ```sql
   UPDATE storage.buckets SET public = true WHERE id = 'images';
   ```

2. **Verify in Supabase Dashboard:**
   - Go to **Storage** → **Policies**
   - Bucket "images" should have **Public** badge

### Issue 5: 400 Bad Request

**Symptoms:**
```
GET https://[project].supabase.co/storage/v1/object/public/images/... 400 (Bad Request)
```

**Solution:**

This is already fixed in the code! We're using native `<img>` tag instead of Next.js `<Image>` component.

**Verify fix:**
```tsx
// In hero-section.tsx - Should use <img> not <Image>
<img
  src={heroImage}
  alt="Hero"
  className="w-full h-full object-cover"
/>
```

---

## 🧪 Complete Test Checklist

### Database Setup ✅
- [ ] Run `SETUP_HERO_IMAGE_COMPLETE.sql`
- [ ] Bucket `images` exists and is public
- [ ] 4 storage policies created
- [ ] Table `hero_settings` exists
- [ ] Default record inserted

### Upload Test ✅
- [ ] Dev server running
- [ ] Login to admin dashboard
- [ ] Navigate to "Hero Image" tab
- [ ] Click "Upload Image" button
- [ ] Select image file (JPG/PNG/WebP, max 5MB)
- [ ] Upload starts (loading spinner shows)
- [ ] Upload completes (toast: "Hero image updated successfully!")
- [ ] No console errors

### Storage Verification ✅
- [ ] Go to Supabase Dashboard → Storage
- [ ] Bucket `images` visible
- [ ] Folder `profile` exists
- [ ] File `hero-[timestamp].[ext]` uploaded
- [ ] Click file → Copy URL
- [ ] Paste URL in browser → Image loads successfully

### Homepage Display ✅
- [ ] Go to http://localhost:3000
- [ ] Hero image displays in Hero Section
- [ ] No broken image icon
- [ ] No console errors (F12)
- [ ] Image loads smoothly
- [ ] Responsive on mobile (test with DevTools)

---

## 📋 Quick Commands Reference

### Check Bucket
```sql
SELECT * FROM storage.buckets WHERE id = 'images';
```

### Check Policies
```sql
SELECT policyname, cmd FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%Images%';
```

### Check Hero Settings
```sql
SELECT * FROM hero_settings;
```

### List Uploaded Files
```sql
SELECT name, bucket_id, created_at 
FROM storage.objects 
WHERE bucket_id = 'images' 
ORDER BY created_at DESC 
LIMIT 10;
```

### Update Hero Image URL Manually (if needed)
```sql
UPDATE hero_settings 
SET hero_image_url = 'https://your-project.supabase.co/storage/v1/object/public/images/profile/hero-123.jpg'
WHERE id = '00000000-0000-0000-0000-000000000001';
```

### Delete All Files (CAREFUL!)
```sql
-- This deletes ALL files in images bucket
DELETE FROM storage.objects WHERE bucket_id = 'images';
```

### Reset Everything (NUCLEAR OPTION)
```sql
-- CAREFUL! This deletes everything
DELETE FROM storage.objects WHERE bucket_id = 'images';
DELETE FROM storage.buckets WHERE id = 'images';
DELETE FROM hero_settings;

-- Then re-run SETUP_HERO_IMAGE_COMPLETE.sql
```

---

## 🎯 Expected URL Format

```
https://[project-ref].supabase.co/storage/v1/object/public/images/profile/hero-[timestamp].[ext]

Example:
https://dralqqfeqmhgrkjuebhd.supabase.co/storage/v1/object/public/images/profile/hero-1715443200000.jpg
```

**URL Parts:**
- `[project-ref]`: Your Supabase project reference (e.g., dralqqfeqmhgrkjuebhd)
- `public`: Public access indicator
- `images`: Bucket name
- `profile`: Folder name
- `hero-[timestamp].[ext]`: Filename with timestamp

---

## ✅ Success Indicators

### In Browser Console (F12)
```
✅ No errors
✅ Image URL logged (if in dev mode)
✅ No 404 or 400 errors
```

### In Supabase Storage
```
✅ Bucket 'images' exists
✅ Bucket is public
✅ Folder 'profile' exists
✅ File 'hero-[timestamp].[ext]' exists
✅ File URL is accessible
```

### On Homepage
```
✅ Hero image displays
✅ No broken image icon
✅ Image loads smoothly
✅ Responsive on all screen sizes
```

---

## 🚀 Next Steps After Success

1. **Update .env.local** dengan Supabase credentials yang benar
2. **Test upload** beberapa kali untuk memastikan stabil
3. **Test di production** setelah deploy
4. **Backup database** sebelum production
5. **Update policies** untuk production (require authentication)

---

## 📞 Still Having Issues?

If masih ada error setelah mengikuti semua steps:

1. **Check browser console** (F12) untuk error messages
2. **Check Supabase logs** di Dashboard → Logs
3. **Verify .env.local** file ada dan configured correctly
4. **Restart dev server** (Ctrl+C, then `npm run dev`)
5. **Clear browser cache** (Ctrl+Shift+Delete)
6. **Try different browser** (Chrome, Firefox, Edge)

**Share error message** jika masih tidak berhasil!

---

**Status:** 📋 Complete step-by-step guide  
**Last Updated:** May 11, 2026  
**Version:** 2.0 (Complete Fix)

🚀 Good luck!
