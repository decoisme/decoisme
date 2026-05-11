# 🚀 Profile Picture Upload - Quick Start

## ⚡ 5-Minute Setup

### Step 1: Setup Supabase (2 minutes)

1. **Buka Supabase Dashboard** → SQL Editor
2. **Copy & Paste** semua code dari `SETUP_PROFILE_PICTURE.sql`
3. **Click "Run"**
4. **Done!** ✅

### Step 2: Get Your User ID (1 minute)

```sql
-- Run this in SQL Editor
SELECT id FROM auth.users;
```

Copy the ID (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Step 3: Update Profile (1 minute)

```sql
-- Replace YOUR_USER_ID with the ID from Step 2
UPDATE profiles 
SET user_id = 'YOUR_USER_ID'
WHERE user_id = '00000000-0000-0000-0000-000000000000';
```

### Step 4: Use Component (1 minute)

```tsx
// Option A: Use complete About section with profile
import { AboutSectionWithProfile } from '@/components/sections/about-section-with-profile';

// In your page.tsx:
<AboutSectionWithProfile />

// Option B: Use standalone component
import { ProfilePictureUpload } from '@/components/ui/profile-picture-upload';

<ProfilePictureUpload
  currentImageUrl={profile?.profile_picture_url}
  onUploadSuccess={(url) => console.log('Uploaded:', url)}
  userId={profile?.user_id}
  size="lg"
  editable={true}
/>
```

---

## 🎯 What You Get

✅ **Drag & Drop Upload**  
✅ **Click to Upload**  
✅ **File Validation** (type & size)  
✅ **Image Preview**  
✅ **Toast Notifications**  
✅ **Responsive Design**  
✅ **Dark Mode Support**  
✅ **Loading States**  

---

## 📸 How to Use

### For Users:

1. **Click** profile picture atau **drag & drop** image
2. File akan di-validate (max 2MB, JPG/PNG/WebP)
3. Preview muncul instantly
4. Upload ke Supabase Storage
5. Database updated automatically
6. Toast notification muncul
7. Done! ✅

### For Developers:

```typescript
// Load profile
const { data } = await supabase
  .from('profiles')
  .select('*')
  .single();

// Upload callback
const handleUpload = async (url: string) => {
  await supabase
    .from('profiles')
    .update({ profile_picture_url: url })
    .eq('id', profileId);
};
```

---

## 🗂️ Files Created

| File | Purpose |
|------|---------|
| `components/ui/profile-picture-upload.tsx` | Upload component |
| `components/sections/about-section-with-profile.tsx` | About section with profile |
| `SETUP_PROFILE_PICTURE.sql` | Database setup |
| `CARA_UPLOAD_PROFILE_PICTURE.md` | Full documentation |
| `lib/supabase.ts` | Updated with Profile type |

---

## 🔧 Configuration

### File Specs:
- **Formats:** JPG, PNG, WebP
- **Max Size:** 2MB
- **Recommended:** 400x400px (1:1 ratio)

### Storage:
- **Bucket:** `profile-pictures`
- **Public:** Yes
- **Path:** `profile-pictures/[user-id]/[timestamp].[ext]`

### Database:
- **Table:** `profiles`
- **Column:** `profile_picture_url` (TEXT)
- **RLS:** Enabled (public read, user update)

---

## 🧪 Quick Test

```bash
# 1. Run dev server
cd decoisme
npm run dev

# 2. Open browser
http://localhost:3000

# 3. Navigate to About section

# 4. Click "Edit Profile" button

# 5. Click profile picture or drag image

# 6. Watch the magic happen! ✨
```

---

## 🐛 Troubleshooting

### Upload fails?
- Check `.env.local` has Supabase credentials
- Verify bucket `profile-pictures` exists
- Check bucket is public

### Image not showing?
- Verify file uploaded to Storage
- Check URL format is correct
- Verify RLS policies are set

### Database error?
- Run SQL setup script again
- Check user_id is correct
- Verify profiles table exists

---

## 💡 Pro Tips

1. **Compress images** before upload (recommended)
2. **Use square images** (1:1 ratio) for best results
3. **Test on mobile** - drag & drop works on mobile too!
4. **Monitor storage** - Free tier has 1GB limit
5. **Clean old images** - Delete unused files periodically

---

## 📊 Storage Structure

```
Supabase Storage
└── profile-pictures/
    ├── user-123/
    │   ├── 1234567890.jpg  ← Current
    │   └── 1234567891.jpg  ← Old (can delete)
    └── user-456/
        └── 1234567892.png
```

---

## 🎨 Customization

### Change Size:
```tsx
<ProfilePictureUpload size="xl" /> // sm, md, lg, xl
```

### Disable Editing:
```tsx
<ProfilePictureUpload editable={false} />
```

### Custom Callback:
```tsx
<ProfilePictureUpload
  onUploadSuccess={(url) => {
    console.log('New URL:', url);
    // Your custom logic here
  }}
/>
```

---

## ✅ Checklist

Setup:
- [ ] SQL script executed
- [ ] User ID updated
- [ ] Storage bucket verified
- [ ] Component imported

Testing:
- [ ] Click upload works
- [ ] Drag & drop works
- [ ] File validation works
- [ ] Image displays correctly
- [ ] Toast notifications appear

Production:
- [ ] Environment variables set
- [ ] Build successful
- [ ] Deployed to production
- [ ] Tested in production

---

## 🚀 Next Steps

1. **Customize profile fields** (bio, location, etc.)
2. **Add image cropping** (optional)
3. **Add image compression** (recommended)
4. **Add multiple images** (for gallery)
5. **Add profile editing form** (full CRUD)

---

## 📞 Quick Links

- **Full Docs:** `CARA_UPLOAD_PROFILE_PICTURE.md`
- **SQL Setup:** `SETUP_PROFILE_PICTURE.sql`
- **Component:** `components/ui/profile-picture-upload.tsx`
- **Example:** `components/sections/about-section-with-profile.tsx`

---

**Build Status:** ✅ Success  
**Ready to Use:** ✅ Yes  
**Time to Setup:** ⏱️ 5 minutes

**Selamat mencoba! 🎉**
