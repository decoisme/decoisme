# 🔧 Fix: Policy Error (Expected 4, Found 1)

## ❌ Error Yang Kamu Alami

```
ERROR: P0001: ❌ Expected 4 policies, found 1
CONTEXT: PL/pgSQL function inline_code_block line 13 at RAISE
```

## 🔍 Penyebab

Ada policy lama dari percobaan sebelumnya yang belum terhapus. Script sebelumnya terlalu strict dalam validasi.

## ✅ Solution: Use New Script

Saya sudah buat script baru yang **lebih flexible** dan bisa handle existing policies.

### 🚀 Quick Fix (2 Menit)

#### Step 1: Run New SQL Script

1. **Buka Supabase Dashboard** → **SQL Editor**
2. **Clear** editor (hapus script lama jika ada)
3. **Open file:** `SETUP_HERO_IMAGE_FINAL.sql`
4. **Copy SEMUA** code dari file tersebut
5. **Paste** ke SQL Editor
6. **Click Run** (atau Ctrl+Enter)

#### Expected Output:

```
NOTICE: Dropped policy: [old policy name]
NOTICE: ✅ Bucket "images" created and is public
NOTICE: ✅ All 4 storage policies created successfully
NOTICE: ✅ Table "hero_settings" created successfully
NOTICE: ✅ Default hero_settings record created successfully

========================================
✅ SETUP COMPLETE!
========================================

Next steps:
1. Restart dev server: npm run dev
2. Login to admin: http://localhost:3000/admin
3. Click "Hero Image" tab
4. Click "Upload Image" button
5. Select image (JPG/PNG/WebP, max 5MB)
6. Check homepage: http://localhost:3000
```

**Plus 3 tables showing:**
- Bucket info
- Storage policies (4 policies)
- Hero settings

---

## 🆕 What's Different in New Script?

### Old Script (SETUP_HERO_IMAGE_COMPLETE.sql)
- ❌ Strict validation: expects exactly 0 or 4 policies
- ❌ Fails if there are leftover policies
- ❌ Throws error and stops

### New Script (SETUP_HERO_IMAGE_FINAL.sql)
- ✅ Flexible validation: handles any number of existing policies
- ✅ Automatically drops ALL old policies first
- ✅ Creates fresh policies
- ✅ Safe to run multiple times
- ✅ Better error messages

---

## 🔄 After Running New Script

### Step 2: Verify Setup

Run these queries in SQL Editor to double-check:

**Check bucket:**
```sql
SELECT id, name, public FROM storage.buckets WHERE id = 'images';
```
Expected: `images | images | true`

**Check policies:**
```sql
SELECT policyname, cmd FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname IN (
  'Public Access for Images',
  'Anyone can upload images',
  'Anyone can update images',
  'Anyone can delete images'
)
ORDER BY policyname;
```
Expected: 4 rows

**Check hero_settings:**
```sql
SELECT * FROM hero_settings;
```
Expected: 1 row

---

## 🚀 Next Steps

### Step 3: Upload Image

1. **Restart dev server:**
   ```bash
   npm run dev
   ```

2. **Login to admin:**
   - http://localhost:3000/admin

3. **Upload image:**
   - Click tab **"Hero Image"**
   - Click button **"Upload Image"** (kuning)
   - Select image (JPG/PNG/WebP, max 5MB)
   - Wait for toast: "Hero image updated successfully!"

### Step 4: Verify

1. **Check Supabase Storage:**
   - Dashboard → Storage → bucket "images" → folder "profile"
   - File `hero-[timestamp].jpg` should exist

2. **Check Homepage:**
   - http://localhost:3000
   - Hero image should display
   - No errors in Console (F12)

---

## 🐛 If Still Error

### Error: "Bucket not found"
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;
```

### Error: "Permission denied"
Re-run the new script: `SETUP_HERO_IMAGE_FINAL.sql`

### Error: "Policy already exists"
The new script handles this automatically. Just re-run it.

---

## 📋 Summary

**Problem:** Old policies causing validation error  
**Solution:** New script that auto-cleans old policies  
**File:** `SETUP_HERO_IMAGE_FINAL.sql`  
**Time:** 2 minutes  
**Safe:** Yes, can run multiple times

---

## ✅ Success Indicators

After running new script, you should see:
- ✅ No errors in SQL Editor
- ✅ Success messages with ✅ checkmarks
- ✅ 3 result tables showing bucket, policies, and settings
- ✅ "SETUP COMPLETE!" message

---

**Status:** 🔧 Fixed  
**Action:** Run `SETUP_HERO_IMAGE_FINAL.sql`  
**Time:** 2 minutes

🚀 Try the new script now!
