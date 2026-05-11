# 🪣 Setup Bucket Images - Quick Fix

## ❌ Error Yang Muncul

```
StorageApiError: Bucket not found
```

## ✅ Solusi: Setup Bucket

### Step 1: Run SQL Setup (2 menit)

```sql
-- 1. Buka Supabase Dashboard → SQL Editor
-- 2. Copy SEMUA dari file: SETUP_HERO_IMAGE_FIXED.sql
-- 3. Paste & Run
-- 4. Done! ✅
```

File `SETUP_HERO_IMAGE_FIXED.sql` akan:
- ✅ Create bucket `images` (bukan `hero-images`)
- ✅ Set public access
- ✅ Create RLS policies
- ✅ Create `hero_settings` table
- ✅ Insert default data

### Step 2: Verify Bucket Created

```sql
-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'images';

-- Should return:
-- id: images
-- name: images
-- public: true
```

### Step 3: Test Upload

```bash
# 1. Restart dev server
npm run dev

# 2. Login ke admin
http://localhost:3000/admin

# 3. Go to "Hero Image" tab

# 4. Upload gambar

# 5. Should work now! ✅
```

---

## 📂 Storage Structure

### Bucket Name
```
images (bukan hero-images atau profile-pictures)
```

### Path Structure
```
images/
├── profile/
│   ├── hero-1234567890.jpg      ← Hero images
│   ├── hero-1234567891.png      ← Hero images
│   ├── user-id-1/
│   │   └── 1234567892.jpg       ← Profile pictures
│   └── user-id-2/
│       └── 1234567893.jpg       ← Profile pictures
└── projects/                     ← (future: project images)
```

### URL Format
```
https://[project-ref].supabase.co/storage/v1/object/public/images/profile/hero-[timestamp].[ext]
```

---

## 🔧 What Changed

### Before (Error)
```typescript
// Hero upload
.from('hero-images')  ❌ Bucket not found

// Profile upload
.from('profile-pictures')  ❌ Bucket not found
```

### After (Fixed)
```typescript
// Hero upload
.from('images')  ✅ Single bucket
.upload('profile/hero-[timestamp].jpg')

// Profile upload
.from('images')  ✅ Single bucket
.upload('profile/[user-id]/[timestamp].jpg')
```

---

## 📊 Files Updated

| File | Changes |
|------|---------|
| `SETUP_HERO_IMAGE_FIXED.sql` | ✅ NEW - Setup bucket `images` |
| `hero-image-upload.tsx` | ✅ Changed bucket to `images` |
| `profile-picture-upload.tsx` | ✅ Changed bucket to `images` |

---

## 🎯 Benefits

### Single Bucket Approach
- ✅ **Simpler:** One bucket untuk semua images
- ✅ **Organized:** Folder structure yang jelas
- ✅ **Scalable:** Easy to add more image types
- ✅ **Efficient:** Easier to manage

### Folder Structure
```
images/
├── profile/          ← Profile & hero images
├── projects/         ← Project images (future)
├── gallery/          ← Gallery images (future)
└── uploads/          ← General uploads (future)
```

---

## 🧪 Testing Checklist

### Setup
- [ ] SQL script executed
- [ ] Bucket `images` created
- [ ] Bucket is public
- [ ] Policies created
- [ ] `hero_settings` table exists

### Upload Test
- [ ] Login to admin dashboard
- [ ] Navigate to "Hero Image" tab
- [ ] Click "Upload Image" button
- [ ] Select image file
- [ ] Upload starts (loading spinner)
- [ ] Upload completes (toast notification)
- [ ] Image displays in preview
- [ ] No "Bucket not found" error

### Verify Storage
- [ ] Go to Supabase Dashboard → Storage
- [ ] Bucket `images` exists
- [ ] Folder `profile` exists
- [ ] Uploaded file visible
- [ ] Public URL accessible

---

## 🐛 Troubleshooting

### Still Getting "Bucket not found"?

**Check 1: Bucket exists**
```sql
SELECT * FROM storage.buckets WHERE id = 'images';
```

**Check 2: Policies exist**
```sql
SELECT * FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%images%';
```

**Check 3: Restart dev server**
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Upload fails with permission error?

**Re-run policies:**
```sql
-- Copy policies section from SETUP_HERO_IMAGE_FIXED.sql
-- Run again
```

### Image not displaying?

**Check URL format:**
```
Should be: .../storage/v1/object/public/images/profile/hero-...
Not: .../storage/v1/object/public/hero-images/...
```

---

## 📞 Quick Commands

### Check Bucket
```sql
SELECT * FROM storage.buckets WHERE id = 'images';
```

### List Files
```sql
SELECT * FROM storage.objects WHERE bucket_id = 'images';
```

### Delete Old Buckets (if needed)
```sql
-- Only if you have old buckets
DELETE FROM storage.buckets WHERE id = 'hero-images';
DELETE FROM storage.buckets WHERE id = 'profile-pictures';
```

---

## ✅ Summary

**Problem:** Bucket not found error

**Solution:** 
1. ✅ Run `SETUP_HERO_IMAGE_FIXED.sql`
2. ✅ Creates bucket `images`
3. ✅ Sets up proper path structure
4. ✅ Updates upload components

**Path:** `images/profile/hero-[timestamp].[ext]`

**Status:** ✅ Fixed & Ready

---

**Build Status:** ✅ Success  
**Bucket:** ✅ `images`  
**Path:** ✅ `images/profile/`  
**Last Updated:** May 11, 2026

**Sekarang bucket sudah benar! 🪣✅**
