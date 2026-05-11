# 🔐 Hero Image Upload - Admin Dashboard Guide

## 🎯 Overview

Fitur upload hero image sudah dipindahkan ke **Admin Dashboard** untuk keamanan. Hanya admin yang bisa upload/ganti gambar hero section.

---

## 🚀 Cara Pakai

### Step 1: Login ke Admin Dashboard

```
1. Buka http://localhost:3000/admin
2. Login dengan credentials admin
3. Akan redirect ke dashboard
```

### Step 2: Upload Hero Image

```
1. Di dashboard, click tab "Hero Image" (tab pertama)
2. Click gambar atau drag & drop foto
3. File akan di-validate (max 5MB, JPG/PNG/WebP)
4. Preview muncul instantly
5. Upload ke Supabase Storage
6. Toast: "Hero image updated successfully!"
7. Done! ✅
```

### Step 3: Lihat di Homepage

```
1. Buka http://localhost:3000
2. Hero image baru langsung tampil
3. No edit button (read-only untuk public)
```

---

## 📂 What Changed

### ✅ Added to Admin Dashboard
- **New Tab:** "Hero Image" (tab pertama)
- **Upload Component:** Integrated `HeroImageUpload`
- **Functions:** `fetchHeroImage()`, `handleHeroImageUpload()`
- **State:** `heroImage` state management

### ❌ Removed from Homepage
- **Edit Button:** Removed "✏️ Edit Hero Image" button
- **Upload Component:** Removed from public hero section
- **Edit Mode:** No more `isEditing` state
- **Upload Handler:** Removed from hero section

### 🔒 Security Improved
- Upload only via admin dashboard
- No public edit access
- Admin authentication required

---

## 🎨 Admin Dashboard Features

### Hero Image Tab
- **Upload Area:** Large, centered upload component
- **Drag & Drop:** Drag image over upload area
- **Click Upload:** Click to open file picker
- **File Validation:** JPG/PNG/WebP, max 5MB
- **Preview:** Instant preview before upload
- **Progress:** Loading spinner during upload
- **Tips Section:** Helpful tips for best results

### Tips Displayed
- Format: JPG, PNG, atau WebP
- Ukuran maksimal: 5MB
- Dimensi recommended: 800x800px (square)
- Compress gambar sebelum upload

---

## 📊 Files Modified

| File | Changes |
|------|---------|
| `app/admin/dashboard/page.tsx` | ✅ Added Hero Image tab |
| `components/sections/hero-section.tsx` | ❌ Removed edit button & upload |
| `components/ui/hero-image-upload.tsx` | ✅ Unchanged (reusable) |
| `SETUP_HERO_IMAGE.sql` | ✅ Unchanged |

---

## 🔐 Security

### Before (Public)
- ❌ Anyone could click edit button
- ❌ Upload accessible from homepage
- ❌ No authentication required

### After (Admin Only)
- ✅ Only admin can access upload
- ✅ Requires admin login
- ✅ Protected by authentication
- ✅ Public sees read-only image

---

## 🎯 User Flow

### Admin Flow
```
Login to /admin
  ↓
Navigate to Dashboard
  ↓
Click "Hero Image" tab
  ↓
Upload/change image
  ↓
Image updated in database
  ↓
Visible on homepage immediately
```

### Public Flow
```
Visit homepage
  ↓
See hero image (read-only)
  ↓
No edit button
  ↓
No upload access
```

---

## 🧪 Testing Checklist

### Admin Dashboard
- [ ] Login to admin works
- [ ] "Hero Image" tab appears
- [ ] Upload component displays
- [ ] Drag & drop works
- [ ] Click upload works
- [ ] File validation works
- [ ] Upload to Supabase works
- [ ] Toast notification appears
- [ ] Image updates in database

### Homepage
- [ ] Hero image displays
- [ ] No edit button visible
- [ ] Image loads from database
- [ ] Responsive on mobile
- [ ] Dark mode works
- [ ] Animations smooth

---

## 💡 Tips for Admin

### Best Practices
1. **Compress images** before upload
   - Use TinyPNG or Squoosh
   - Target: 1-2MB file size

2. **Use square images**
   - Recommended: 800x800px
   - Aspect ratio: 1:1

3. **Test on mobile**
   - Check responsive display
   - Verify loading speed

4. **Clean old images**
   - Delete unused files from Storage
   - Monitor storage usage

### Image Optimization Tools
- [TinyPNG](https://tinypng.com/) - Compress
- [Squoosh](https://squoosh.app/) - Resize & compress
- Photoshop - Export for web
- Canva - Export optimized

---

## 🐛 Troubleshooting

### Can't Access Admin Dashboard
**Problem:** Redirected to login
```
Solution: Login with admin credentials at /admin
```

### Upload Fails
**Problem:** "Supabase belum dikonfigurasi"
```bash
# Check .env.local
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### Image Not Updating on Homepage
**Problem:** Old image still showing
```
Solution:
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Check database has new URL
```

### Tab Not Showing
**Problem:** "Hero Image" tab missing
```
Solution:
1. Clear browser cache
2. Rebuild: npm run build
3. Restart dev server
```

---

## 📞 Quick Reference

### Access Admin Dashboard
```
URL: http://localhost:3000/admin
Login: Use admin credentials
Tab: "Hero Image" (first tab)
```

### Upload Image
```tsx
// In admin dashboard
<HeroImageUpload
  currentImageUrl={heroImage || undefined}
  onUploadSuccess={handleHeroImageUpload}
  editable={true}
/>
```

### View on Homepage
```
URL: http://localhost:3000
Section: Hero (top of page)
Mode: Read-only (no edit button)
```

---

## ✅ Summary

**What Changed:**
- ✅ Upload moved to admin dashboard
- ✅ New "Hero Image" tab added
- ✅ Edit button removed from homepage
- ✅ Public access is read-only
- ✅ Admin authentication required

**Benefits:**
- 🔒 More secure
- 👥 Better user experience
- 🎯 Centralized admin controls
- ✅ Professional workflow

**Next Steps:**
1. Login to admin dashboard
2. Navigate to "Hero Image" tab
3. Upload your photo
4. Check homepage

---

**Build Status:** ✅ Success  
**Security:** ✅ Admin Only  
**Last Updated:** May 11, 2026  
**Version:** 2.0.0 (Admin Protected)

**Selamat menggunakan! 🚀🔐**
