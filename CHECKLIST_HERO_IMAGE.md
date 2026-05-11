# ✅ Hero Image Setup Checklist

## 📋 Pre-Setup (Already Done ✅)

- [x] Hero image upload component created
- [x] Admin dashboard integration complete
- [x] Public hero section updated
- [x] Database scripts prepared
- [x] Documentation written
- [x] Build successful

---

## 🚀 Setup Steps (You Need to Do This)

### Step 1: Database Setup ⚠️

- [ ] Open Supabase Dashboard (https://supabase.com/dashboard)
- [ ] Select your project
- [ ] Click **SQL Editor** (sidebar)
- [ ] Click **New Query**
- [ ] Open file: `SETUP_HERO_IMAGE_COMPLETE.sql`
- [ ] Copy **ALL** code from the file
- [ ] Paste into SQL Editor
- [ ] Click **Run** (or Ctrl+Enter)
- [ ] Verify output shows: ✅ SETUP COMPLETE!

**Expected Output:**
```
✅ Bucket "images" created successfully
✅ All 4 storage policies created successfully
✅ Table "hero_settings" created successfully
✅ Default hero_settings record created successfully
```

### Step 2: Verify Database ⚠️

Run these queries in SQL Editor to verify:

- [ ] **Check bucket:**
  ```sql
  SELECT id, name, public FROM storage.buckets WHERE id = 'images';
  ```
  Expected: `images | images | true`

- [ ] **Check policies:**
  ```sql
  SELECT COUNT(*) FROM pg_policies 
  WHERE tablename = 'objects' AND policyname LIKE '%Images%';
  ```
  Expected: `4`

- [ ] **Check table:**
  ```sql
  SELECT * FROM hero_settings;
  ```
  Expected: 1 row with data

### Step 3: Restart Dev Server ⚠️

- [ ] Stop dev server (Ctrl+C in terminal)
- [ ] Run: `npm run dev`
- [ ] Wait for server to start
- [ ] Verify no errors in terminal

### Step 4: Upload Image ⚠️

- [ ] Open browser: http://localhost:3000/admin
- [ ] Login with your credentials
- [ ] Click tab **"Hero Image"** (first tab)
- [ ] Scroll down to upload section
- [ ] Click yellow button **"Upload Image"**
- [ ] Select image file:
  - Format: JPG, PNG, or WebP
  - Size: Max 5MB
  - Recommended: 800x800px (square)
- [ ] Wait for upload (loading spinner)
- [ ] Verify toast notification: "Hero image updated successfully!"
- [ ] Check Console (F12) - no errors

### Step 5: Verify in Supabase Storage ⚠️

- [ ] Go to Supabase Dashboard
- [ ] Click **Storage** (sidebar)
- [ ] Click bucket **"images"**
- [ ] Open folder **"profile"**
- [ ] Verify file exists: `hero-[timestamp].jpg` (or .png/.webp)
- [ ] Click file → **Copy URL**
- [ ] Paste URL in new browser tab
- [ ] Verify image loads successfully

### Step 6: Verify on Homepage ⚠️

- [ ] Open: http://localhost:3000
- [ ] Scroll to Hero Section (top of page)
- [ ] Verify hero image displays correctly
- [ ] Check image is not broken
- [ ] Open Console (F12) - no errors
- [ ] Test responsive (resize browser window)
- [ ] Test on mobile view (DevTools)

---

## 🎯 Success Indicators

### In Supabase Dashboard
- [x] Bucket `images` exists
- [x] Bucket is public
- [x] 4 storage policies created
- [x] Table `hero_settings` exists
- [x] File uploaded to `images/profile/`

### In Admin Dashboard
- [x] "Hero Image" tab visible
- [x] Upload button works
- [x] Image preview shows after upload
- [x] Toast notification appears
- [x] No console errors

### On Homepage
- [x] Hero image displays
- [x] No broken image icon
- [x] Image loads smoothly
- [x] Responsive on all screen sizes
- [x] No console errors

---

## 🐛 If Something Goes Wrong

### Upload Fails
- [ ] Check file size (max 5MB)
- [ ] Check file format (JPG/PNG/WebP only)
- [ ] Check `.env.local` has Supabase credentials
- [ ] Check browser console for error message
- [ ] Re-run SQL script

### Image Not Showing
- [ ] Verify bucket is public
- [ ] Test image URL directly in browser
- [ ] Clear browser cache (Ctrl+Shift+R)
- [ ] Check Console (F12) for errors
- [ ] Verify file exists in Supabase Storage

### Permission Denied
- [ ] Re-run SQL script: `SETUP_HERO_IMAGE_COMPLETE.sql`
- [ ] Verify 4 policies created
- [ ] Check bucket is public

### Bucket Not Found
- [ ] Run this in SQL Editor:
  ```sql
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('images', 'images', true)
  ON CONFLICT (id) DO UPDATE SET public = true;
  ```

---

## 📚 Documentation Files

- **Quick Fix (5 min):** `QUICK_FIX_HERO_IMAGE.md`
- **Complete Guide:** `HERO_IMAGE_COMPLETE_FIX.md`
- **Status Report:** `HERO_IMAGE_STATUS.md`
- **SQL Script:** `SETUP_HERO_IMAGE_COMPLETE.sql`
- **This Checklist:** `CHECKLIST_HERO_IMAGE.md`

---

## ⏱️ Estimated Time

- **Step 1 (Database):** 2 minutes
- **Step 2 (Verify):** 1 minute
- **Step 3 (Restart):** 30 seconds
- **Step 4 (Upload):** 1 minute
- **Step 5 (Verify Storage):** 1 minute
- **Step 6 (Verify Homepage):** 30 seconds

**Total:** ~6 minutes

---

## 🎉 When Complete

You should have:
- ✅ Hero image upload system working
- ✅ Image displaying on homepage
- ✅ Admin dashboard functional
- ✅ No errors in console
- ✅ Responsive on all devices

---

**Status:** ⏳ Waiting for User Setup  
**Difficulty:** Easy  
**Time:** ~6 minutes

🚀 Start with Step 1!
