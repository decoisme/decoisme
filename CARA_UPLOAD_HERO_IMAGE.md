# 📸 Cara Upload Hero Image - Quick Guide

## 🎯 Overview

Sistem upload gambar untuk **Hero Section** (gambar di homepage) dengan fitur:
- ✅ Drag & drop support
- ✅ Click to upload
- ✅ File validation (type & size)
- ✅ Image preview
- ✅ Supabase Storage integration
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Dark mode support

---

## 🚀 Setup (3 Menit)

### Step 1: Run SQL Setup

```sql
-- 1. Buka Supabase Dashboard → SQL Editor
-- 2. Copy semua dari SETUP_HERO_IMAGE.sql
-- 3. Paste & Run
```

### Step 2: Test Upload

```bash
# 1. Run dev server
npm run dev

# 2. Buka http://localhost:3000

# 3. Scroll ke Hero Section (paling atas)

# 4. Click button "✏️ Edit Hero Image"

# 5. Click gambar atau drag & drop image

# 6. Done! ✅
```

---

## 📂 Files Created

| File | Purpose |
|------|---------|
| `components/ui/hero-image-upload.tsx` | Upload component |
| `components/sections/hero-section.tsx` | Updated dengan upload |
| `SETUP_HERO_IMAGE.sql` | Database setup |
| `CARA_UPLOAD_HERO_IMAGE.md` | This guide |

---

## 🎨 Features

### Upload
- **Drag & Drop** - Drag image over hero section
- **Click Upload** - Click to open file picker
- **File Validation** - JPG/PNG/WebP, max 5MB
- **Preview** - Instant preview before upload
- **Progress** - Loading spinner during upload

### Storage
- **Supabase Storage** - Cloud storage integration
- **Public URLs** - Direct image access
- **Auto-naming** - `hero-[timestamp].[ext]`

### UI/UX
- **Responsive** - Works on all devices
- **Dark Mode** - Automatic theme support
- **Smooth Animations** - Framer Motion
- **Edit Mode** - Toggle edit/view mode

---

## 📋 File Specs

### Accepted Formats
- ✅ JPG / JPEG
- ✅ PNG
- ✅ WebP

### File Size
- **Maximum:** 5MB
- **Recommended:** 1-2MB

### Dimensions
- **Recommended:** 800x800px (square)
- **Alternative:** 600x800px (portrait)
- **Aspect Ratio:** 1:1 or 3:4

---

## 🎯 User Flow

```
User visits homepage
  ↓
Clicks "✏️ Edit Hero Image" button
  ↓
Hero image becomes editable
  ↓
User clicks image OR drags image
  ↓
File validation (type & size)
  ↓
Preview shows instantly
  ↓
Upload to Supabase Storage
  ↓
Get public URL
  ↓
Update hero_settings table
  ↓
Toast: "Hero image berhasil diupload!"
  ↓
New image displays
  ↓
Click "✓ Done Editing"
  ↓
Done! ✅
```

---

## 🗂️ Storage Structure

```
Supabase Storage
└── hero-images/
    ├── hero-1234567890.jpg  ← Latest
    ├── hero-1234567891.jpg  ← Old
    └── hero-1234567892.png  ← Old
```

**URL Format:**
```
https://[project-ref].supabase.co/storage/v1/object/public/hero-images/hero-[timestamp].[ext]
```

---

## 🔧 Database Schema

### hero_settings table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (singleton) |
| `hero_image_url` | TEXT | URL to hero image |
| `hero_title` | TEXT | Hero title text |
| `hero_subtitle` | TEXT | Hero subtitle text |
| `hero_description` | TEXT | Hero description |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

**Note:** Only 1 record (singleton pattern)

---

## 🧪 Testing Checklist

### Setup
- [ ] SQL script executed
- [ ] Storage bucket created
- [ ] Bucket is public
- [ ] hero_settings table created
- [ ] Default record inserted

### Upload
- [ ] Click to upload works
- [ ] Drag & drop works
- [ ] File validation (wrong format)
- [ ] File validation (too large)
- [ ] Preview displays
- [ ] Upload to Supabase works
- [ ] Database updates
- [ ] Toast notifications appear
- [ ] Image displays after upload

### UI
- [ ] Edit button appears
- [ ] Edit mode toggles
- [ ] Responsive on mobile
- [ ] Dark mode works
- [ ] Animations smooth

---

## 🐛 Troubleshooting

### Upload Fails

**Problem:** "Supabase belum dikonfigurasi"
```bash
# Check .env.local
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

**Problem:** "Bucket not found"
```sql
-- Verify bucket exists
SELECT * FROM storage.buckets WHERE id = 'hero-images';

-- If not, create it
INSERT INTO storage.buckets (id, name, public)
VALUES ('hero-images', 'hero-images', true);
```

**Problem:** "Permission denied"
```sql
-- Re-run policies from SETUP_HERO_IMAGE.sql
```

### Image Not Displaying

**Problem:** Image URL returns 404
- Check if file uploaded to Storage
- Verify bucket is public
- Check URL format

**Problem:** Old image still showing
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache
- Check database has new URL

---

## 💡 Tips

### Image Optimization

**Before Upload:**
1. Resize to 800x800px
2. Compress to 1-2MB
3. Use JPG for photos
4. Use PNG for graphics
5. Use WebP for best compression

**Tools:**
- [TinyPNG](https://tinypng.com/) - Compress images
- [Squoosh](https://squoosh.app/) - Resize & compress
- Photoshop - Export for web
- Canva - Export optimized

### Best Practices

1. **Use square images** (1:1 ratio) for best results
2. **Compress before upload** - Faster loading
3. **Test on mobile** - Check responsive display
4. **Clean old images** - Delete unused files
5. **Monitor storage** - Free tier has 1GB limit

---

## 🔐 Security

### Storage Policies
- ✅ **Public Read** - Anyone can view
- ⚠️ **Anyone Upload** - For testing only
- ⚠️ **Anyone Update** - For testing only
- ⚠️ **Anyone Delete** - For testing only

### For Production

Change policies to require authentication:

```sql
-- Update upload policy
DROP POLICY "Anyone can upload hero images" ON storage.objects;
CREATE POLICY "Authenticated users can upload hero images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'hero-images' 
  AND auth.role() = 'authenticated'
);

-- Same for update and delete
```

---

## 📊 Component Props

### HeroImageUpload

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentImageUrl` | `string?` | - | Current image URL |
| `onUploadSuccess` | `(url: string) => void` | - | Callback after upload |
| `editable` | `boolean` | `true` | Enable/disable upload |

---

## 🎨 Customization

### Change Image Size

```tsx
// In hero-section.tsx
<div className="relative w-full aspect-square max-w-lg mx-auto">
  {/* Change max-w-lg to: */}
  {/* max-w-sm (small) */}
  {/* max-w-md (medium) */}
  {/* max-w-lg (large) - default */}
  {/* max-w-xl (extra large) */}
</div>
```

### Change Border Radius

```tsx
// In hero-image-upload.tsx
className="rounded-[3rem]" // Change to:
// rounded-xl (small)
// rounded-2xl (medium)
// rounded-3xl (large)
// rounded-[3rem] (extra large) - default
```

### Add Image Filters

```tsx
// In hero-image-upload.tsx
<Image
  src={displayUrl}
  alt="Hero"
  fill
  className="object-cover grayscale hover:grayscale-0 transition-all"
  // Add filters: grayscale, sepia, blur, etc.
/>
```

---

## 🚀 Next Steps

### Immediate
1. ✅ Run SQL setup
2. ✅ Test upload
3. ✅ Upload your photo
4. ✅ Test on mobile

### Optional Enhancements
- [ ] Add image cropping
- [ ] Add image filters
- [ ] Add multiple images (carousel)
- [ ] Add image optimization pipeline
- [ ] Add CDN integration

---

## 📞 Quick Reference

### Upload Image
```tsx
<HeroImageUpload
  currentImageUrl={url}
  onUploadSuccess={(url) => handleUpload(url)}
  editable={true}
/>
```

### Get Hero Settings
```typescript
const { data } = await supabase
  .from('hero_settings')
  .select('*')
  .eq('id', '00000000-0000-0000-0000-000000000001')
  .single();
```

### Update Hero Image
```typescript
await supabase
  .from('hero_settings')
  .update({ hero_image_url: newUrl })
  .eq('id', '00000000-0000-0000-0000-000000000001');
```

---

## ✅ Summary

**What You Get:**
- ✅ Complete upload system for hero image
- ✅ Drag & drop support
- ✅ File validation
- ✅ Supabase integration
- ✅ Responsive design
- ✅ Dark mode support

**Setup Time:** ⏱️ 3 minutes

**Status:** ✅ Ready to Use

---

**Build Status:** ✅ Success  
**Last Updated:** May 11, 2026  
**Version:** 1.0.0

**Selamat mencoba! 🚀📸**
