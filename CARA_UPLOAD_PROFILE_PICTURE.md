# 📸 Cara Upload Profile Picture dengan Supabase Storage

## 🎯 Overview

Sistem upload profile picture lengkap dengan:
- ✅ Drag & drop support
- ✅ Image preview
- ✅ File validation (type & size)
- ✅ Supabase Storage integration
- ✅ Real-time upload progress
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Dark mode support

---

## 🚀 Setup Supabase Storage

### Step 1: Run SQL Setup

1. Buka **Supabase Dashboard** → **SQL Editor**
2. Copy semua code dari file `SETUP_PROFILE_PICTURE.sql`
3. Paste dan **Run** query
4. Verify setup berhasil

### Step 2: Get Your User ID

```sql
-- Run this in Supabase SQL Editor
SELECT id FROM auth.users;
```

Copy user ID yang muncul (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Step 3: Update Default Profile

```sql
-- Replace 00000000-0000-0000-0000-000000000000 with your actual user_id
UPDATE profiles 
SET user_id = 'your-actual-user-id-here'
WHERE user_id = '00000000-0000-0000-0000-000000000000';
```

### Step 4: Verify Storage Bucket

1. Go to **Storage** di Supabase Dashboard
2. Pastikan bucket **"profile-pictures"** sudah ada
3. Check **Public** status = enabled

---

## 📂 File Structure

```
decoisme/
├── components/
│   ├── sections/
│   │   └── about-section-with-profile.tsx  ← About section dengan profile picture
│   └── ui/
│       └── profile-picture-upload.tsx      ← Upload component
├── lib/
│   └── supabase.ts                         ← Updated dengan Profile type
└── SETUP_PROFILE_PICTURE.sql               ← SQL setup script
```

---

## 🎨 Component Usage

### Basic Usage

```tsx
import { ProfilePictureUpload } from '@/components/ui/profile-picture-upload';

<ProfilePictureUpload
  currentImageUrl={profile?.profile_picture_url}
  onUploadSuccess={(url) => console.log('Uploaded:', url)}
  userId={profile?.user_id}
  size="lg"
  editable={true}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentImageUrl` | `string?` | - | URL gambar saat ini |
| `onUploadSuccess` | `(url: string) => void` | - | Callback setelah upload berhasil |
| `userId` | `string?` | - | User ID untuk folder structure |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Ukuran profile picture |
| `editable` | `boolean` | `true` | Enable/disable upload |

### Size Options

- **sm**: 80x80px (w-20 h-20)
- **md**: 128x128px (w-32 h-32)
- **lg**: 160x160px (w-40 h-40)
- **xl**: 224x224px (w-56 h-56)

---

## 🔧 Integration Steps

### Option 1: Replace Current About Section

```tsx
// File: app/page.tsx

// Before:
import { AboutSection } from '@/components/sections/about-section';

// After:
import { AboutSectionWithProfile } from '@/components/sections/about-section-with-profile';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSectionWithProfile /> {/* Changed */}
        <ProjectsSectionSimple />
        {/* ... */}
      </main>
    </>
  );
}
```

### Option 2: Add to Existing Component

```tsx
import { ProfilePictureUpload } from '@/components/ui/profile-picture-upload';
import { useState, useEffect } from 'react';
import { getSupabase, type Profile } from '@/lib/supabase';

export function YourComponent() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const supabase = getSupabase();
    if (!supabase) return;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .single();

    if (data) setProfile(data);
  };

  const handleUpload = async (url: string) => {
    const supabase = getSupabase();
    if (!supabase || !profile) return;

    await supabase
      .from('profiles')
      .update({ profile_picture_url: url })
      .eq('id', profile.id);

    setProfile({ ...profile, profile_picture_url: url });
  };

  return (
    <div>
      <ProfilePictureUpload
        currentImageUrl={profile?.profile_picture_url}
        onUploadSuccess={handleUpload}
        userId={profile?.user_id}
        size="xl"
        editable={true}
      />
    </div>
  );
}
```

---

## 📋 File Validation

### Accepted Formats
- ✅ JPG / JPEG
- ✅ PNG
- ✅ WebP

### File Size Limit
- **Maximum:** 2MB
- **Recommended:** 500KB - 1MB

### Recommended Specs
- **Dimensions:** 400x400px (square)
- **Aspect Ratio:** 1:1
- **Format:** JPG (best compression)
- **Quality:** 80-90%

---

## 🎯 Upload Flow

```
User clicks or drags image
  ↓
File validation (type & size)
  ↓
Show preview
  ↓
Upload to Supabase Storage
  ↓
Get public URL
  ↓
Update database (profiles table)
  ↓
Show success toast
  ↓
Display new image
```

---

## 🗂️ Storage Structure

```
profile-pictures/
├── user-id-1/
│   ├── 1234567890.jpg
│   └── 1234567891.jpg
├── user-id-2/
│   └── 1234567892.png
└── default/
    └── 1234567893.jpg
```

**URL Format:**
```
https://[project-ref].supabase.co/storage/v1/object/public/profile-pictures/[user-id]/[timestamp].[ext]
```

---

## 🔐 Security & Policies

### Storage Policies

1. **Public Read** - Anyone can view images
2. **Authenticated Upload** - Only logged-in users can upload
3. **User Update** - Users can update their own images
4. **User Delete** - Users can delete their own images

### Database Policies (profiles table)

1. **Public Read** - Anyone can view profiles
2. **Authenticated Insert** - Users can create their profile
3. **User Update** - Users can update their own profile

---

## 🎨 UI Features

### Drag & Drop
- Drag image over profile picture
- Visual feedback (overlay appears)
- Drop to upload

### Click to Upload
- Click profile picture
- File picker opens
- Select image to upload

### Loading State
- Spinner animation during upload
- Disabled interaction while uploading
- Progress feedback

### Preview
- Instant preview before upload
- Shows selected image immediately
- Smooth transition

### Toast Notifications
- ✅ Success: "Profile picture berhasil diupload!"
- ❌ Error: "Format file harus JPG, PNG, atau WebP"
- ❌ Error: "Ukuran file maksimal 2MB"
- ❌ Error: "Gagal upload gambar"

---

## 🧪 Testing Checklist

### Setup Testing
- [ ] SQL script executed successfully
- [ ] Storage bucket "profile-pictures" created
- [ ] Bucket is public
- [ ] Policies created correctly
- [ ] Profiles table created
- [ ] Default profile inserted

### Upload Testing
- [ ] Click to upload works
- [ ] Drag & drop works
- [ ] File validation works (wrong format)
- [ ] File validation works (too large)
- [ ] Preview shows correctly
- [ ] Upload to Supabase works
- [ ] Database updates correctly
- [ ] Toast notifications appear
- [ ] Image displays after upload

### UI Testing
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Dark mode works
- [ ] Hover effects work
- [ ] Loading state shows
- [ ] Edit button appears

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
SELECT * FROM storage.buckets WHERE id = 'profile-pictures';

-- If not exists, create it
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true);
```

**Problem:** "Permission denied"
```sql
-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'objects';

-- Re-run policy creation from SETUP_PROFILE_PICTURE.sql
```

### Image Not Displaying

**Problem:** Image URL returns 404
- Check if file actually uploaded to Storage
- Verify bucket is public
- Check URL format is correct

**Problem:** CORS error
- Supabase Storage should handle CORS automatically
- Check if domain is allowed in Supabase settings

### Database Issues

**Problem:** Profile not found
```sql
-- Check if profile exists
SELECT * FROM profiles;

-- Insert profile if missing
INSERT INTO profiles (user_id, full_name, job_title)
VALUES ('your-user-id', 'Your Name', 'Your Title');
```

---

## 💡 Advanced Features (Optional)

### Image Optimization

```typescript
// Add image compression before upload
import imageCompression from 'browser-image-compression';

const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };
  
  return await imageCompression(file, options);
};
```

### Crop & Resize

```typescript
// Add react-image-crop for cropping
import ReactCrop from 'react-image-crop';

// Allow users to crop before upload
```

### Multiple Images

```typescript
// Extend for gallery/portfolio images
const uploadMultiple = async (files: File[]) => {
  const urls = await Promise.all(
    files.map(file => uploadToSupabase(file))
  );
  return urls;
};
```

---

## 📊 Database Schema

### profiles table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key to auth.users |
| `full_name` | TEXT | User's full name |
| `bio` | TEXT | User bio/description |
| `profile_picture_url` | TEXT | URL to profile picture |
| `job_title` | TEXT | Job title/role |
| `location` | TEXT | Location |
| `website` | TEXT | Personal website |
| `github_url` | TEXT | GitHub profile |
| `linkedin_url` | TEXT | LinkedIn profile |
| `twitter_url` | TEXT | Twitter profile |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

---

## 🚀 Deployment Notes

### Environment Variables

Make sure these are set in production:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Vercel Deployment

1. Add environment variables in Vercel dashboard
2. Redeploy after adding variables
3. Test upload in production

### Storage Limits

**Supabase Free Tier:**
- Storage: 1GB
- Bandwidth: 2GB/month
- File uploads: Unlimited

**Recommendations:**
- Monitor storage usage
- Implement image compression
- Clean up old/unused images

---

## 📞 Quick Reference

### Upload Image
```typescript
<ProfilePictureUpload
  currentImageUrl={url}
  onUploadSuccess={(url) => handleUpload(url)}
  userId={userId}
  size="lg"
  editable={true}
/>
```

### Get Profile
```typescript
const { data } = await supabase
  .from('profiles')
  .select('*')
  .single();
```

### Update Profile Picture
```typescript
await supabase
  .from('profiles')
  .update({ profile_picture_url: newUrl })
  .eq('id', profileId);
```

### Get Public URL
```typescript
const { data } = supabase.storage
  .from('profile-pictures')
  .getPublicUrl(filePath);
```

---

## ✅ Summary

**What You Get:**
- ✅ Complete upload system
- ✅ Drag & drop support
- ✅ File validation
- ✅ Image preview
- ✅ Supabase integration
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Dark mode support

**Next Steps:**
1. Run SQL setup script
2. Update user_id in profiles table
3. Test upload functionality
4. Integrate into your pages
5. Deploy to production

---

**Version:** 1.0.0  
**Last Updated:** May 11, 2026  
**Status:** ✅ Ready to Use
