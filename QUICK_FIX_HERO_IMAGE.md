# 🚀 Quick Fix: Hero Image (5 Menit)

## Problem
Hero image tidak muncul dengan error 400 atau 404.

## Solution (3 Steps)

### ⚡ Step 1: Run SQL Script (2 menit)

1. Buka **Supabase Dashboard**: https://supabase.com/dashboard
2. Pilih project Anda
3. Klik **SQL Editor** (sidebar kiri)
4. Copy **SEMUA** code dari file: `SETUP_HERO_IMAGE_FINAL.sql` ⚠️ (USE THIS ONE!)
5. Paste ke SQL Editor
6. Klik **Run** (atau Ctrl+Enter)

**Expected Output:**
```
✅ Bucket "images" created successfully
✅ All 4 storage policies created successfully
✅ Table "hero_settings" created successfully
✅ Default hero_settings record created successfully

========================================
✅ SETUP COMPLETE!
========================================
```

### ⚡ Step 2: Upload Image (2 menit)

1. **Restart dev server:**
   ```bash
   # Stop: Ctrl+C
   npm run dev
   ```

2. **Login to admin:**
   - http://localhost:3000/admin
   - Login dengan credentials Anda

3. **Upload:**
   - Klik tab **"Hero Image"** (tab pertama)
   - Klik tombol kuning **"Upload Image"**
   - Pilih gambar (JPG/PNG/WebP, max 5MB)
   - Tunggu toast: "Hero image updated successfully!"

### ⚡ Step 3: Verify (1 menit)

1. **Check Supabase Storage:**
   - Dashboard → **Storage** → bucket **"images"** → folder **"profile"**
   - File `hero-[timestamp].jpg` harus ada
   - Click file → Copy URL → Paste di browser → Image harus muncul

2. **Check Homepage:**
   - http://localhost:3000
   - Hero image harus muncul di Hero Section
   - No errors di Console (F12)

---

## ✅ Done!

Jika masih error, baca file: `HERO_IMAGE_COMPLETE_FIX.md` untuk troubleshooting lengkap.

---

## 🔍 Quick Verify Commands

Run di Supabase SQL Editor untuk verify setup:

```sql
-- Check bucket
SELECT id, name, public FROM storage.buckets WHERE id = 'images';
-- Expected: images | images | true

-- Check policies (should return 4)
SELECT COUNT(*) FROM pg_policies 
WHERE tablename = 'objects' AND policyname LIKE '%Images%';
-- Expected: 4

-- Check hero_settings
SELECT * FROM hero_settings;
-- Expected: 1 row with id = 00000000-0000-0000-0000-000000000001
```

---

**Status:** ⚡ Quick Fix Guide  
**Time:** ~5 minutes  
**Difficulty:** Easy

🚀 Good luck!
