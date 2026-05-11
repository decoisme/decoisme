# 🔧 Fix Profile Picture Error - Foreign Key Constraint

## ❌ Error Yang Muncul

```
ERROR: 23503: insert or update on table "profiles" violates foreign key constraint "profiles_user_id_fkey"
DETAIL: Key (user_id)=(00000000-0000-0000-0000-000000000000) is not present in table "users".
```

## 🎯 Penyebab

Error ini terjadi karena:
1. Table `profiles` punya foreign key ke `auth.users`
2. Kita belum punya user di `auth.users` table
3. SQL script mencoba insert profile dengan user_id yang tidak ada

## ✅ Solusi: 2 Pilihan

---

### 🚀 SOLUSI 1: Setup Simple (Tanpa Auth) - RECOMMENDED untuk Testing

Gunakan ini jika kamu mau **langsung testing** tanpa setup auth user dulu.

#### Step 1: Run SQL Script Baru

```sql
-- Buka Supabase Dashboard → SQL Editor
-- Copy SEMUA dari file: SETUP_PROFILE_SIMPLE.sql
-- Paste & Run
```

File `SETUP_PROFILE_SIMPLE.sql` sudah dibuat dan berisi:
- ✅ Storage bucket setup
- ✅ Policies yang lebih permissive (untuk testing)
- ✅ Table `profiles` TANPA foreign key constraint
- ✅ Demo profile yang langsung bisa dipakai

#### Step 2: Use Demo Component

```tsx
// File: app/page.tsx

// Ganti import ini:
import { AboutSection } from '@/components/sections/about-section';

// Dengan ini:
import { AboutSectionProfileDemo } from '@/components/sections/about-section-profile-demo';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSectionProfileDemo /> {/* Changed */}
        <ProjectsSectionSimple />
        {/* ... */}
      </main>
    </>
  );
}
```

#### Step 3: Test!

```bash
npm run dev
# Buka http://localhost:3000
# Scroll ke About section
# Click "Edit Profile Picture"
# Upload image!
```

**Keuntungan:**
- ✅ Langsung bisa testing
- ✅ Tidak perlu setup auth
- ✅ Tidak perlu user account
- ✅ Perfect untuk development

**Kekurangan:**
- ⚠️ Tidak secure (anyone can upload)
- ⚠️ Harus diganti untuk production

---

### 🔐 SOLUSI 2: Setup dengan Auth (Production-Ready)

Gunakan ini jika kamu mau setup yang **proper dengan authentication**.

#### Step 1: Create User di Supabase

1. Buka **Supabase Dashboard** → **Authentication** → **Users**
2. Click **"Add User"** atau **"Invite User"**
3. Masukkan email & password
4. Click **"Create User"**
5. Copy **User ID** yang muncul

#### Step 2: Update SQL Script

```sql
-- Buka Supabase Dashboard → SQL Editor
-- Copy SEMUA dari SETUP_PROFILE_PICTURE.sql
-- TAPI SKIP bagian INSERT (step 8)
-- Run script sampai step 7 saja
```

#### Step 3: Insert Profile dengan User ID yang Benar

```sql
-- Ganti YOUR_USER_ID dengan ID dari Step 1
INSERT INTO profiles (
  user_id,
  full_name,
  bio,
  job_title,
  location,
  profile_picture_url
) VALUES (
  'YOUR_USER_ID_HERE', -- Paste user ID dari Step 1
  'Your Name',
  'Passionate UI/UX Designer & Creative Professional.',
  'UI/UX Designer',
  'Jakarta, Indonesia',
  NULL
);
```

#### Step 4: Use Full Component

```tsx
// File: app/page.tsx

import { AboutSectionWithProfile } from '@/components/sections/about-section-with-profile';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSectionWithProfile />
        <ProjectsSectionSimple />
        {/* ... */}
      </main>
    </>
  );
}
```

**Keuntungan:**
- ✅ Secure (proper authentication)
- ✅ Production-ready
- ✅ Multi-user support
- ✅ Proper RLS policies

**Kekurangan:**
- ⚠️ Perlu setup auth user dulu
- ⚠️ Lebih kompleks

---

## 🎯 Rekomendasi

### Untuk Development/Testing:
👉 **Gunakan SOLUSI 1** (Setup Simple)
- Cepat
- Mudah
- Langsung bisa testing

### Untuk Production:
👉 **Gunakan SOLUSI 2** (Setup dengan Auth)
- Secure
- Proper authentication
- Multi-user support

---

## 📋 Quick Comparison

| Feature | Solusi 1 (Simple) | Solusi 2 (Auth) |
|---------|-------------------|-----------------|
| Setup Time | ⚡ 2 minutes | ⏱️ 5 minutes |
| Auth Required | ❌ No | ✅ Yes |
| Security | ⚠️ Low | ✅ High |
| Multi-user | ❌ No | ✅ Yes |
| Production Ready | ❌ No | ✅ Yes |
| Testing | ✅ Perfect | ⚠️ Need user |

---

## 🧪 Testing Checklist

### After Setup (Solusi 1):
- [ ] SQL script executed successfully
- [ ] Storage bucket created
- [ ] Demo profile exists
- [ ] Component imported
- [ ] Build successful
- [ ] Upload works

### After Setup (Solusi 2):
- [ ] User created in auth.users
- [ ] SQL script executed (step 1-7)
- [ ] Profile inserted with correct user_id
- [ ] Storage bucket created
- [ ] Component imported
- [ ] Build successful
- [ ] Upload works

---

## 🐛 Troubleshooting

### Error: "Bucket not found"
```sql
-- Check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'profile-pictures';

-- If not, create it
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true);
```

### Error: "Profile not found"
```sql
-- Check if profile exists
SELECT * FROM profiles;

-- If empty, insert demo profile (Solusi 1)
-- Or insert with your user_id (Solusi 2)
```

### Error: "Permission denied"
```sql
-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Re-run policy creation from SQL script
```

---

## 🔄 Migration: Simple → Auth

Jika kamu mulai dengan Solusi 1 dan mau upgrade ke Solusi 2:

```sql
-- 1. Drop existing table
DROP TABLE profiles CASCADE;

-- 2. Run SETUP_PROFILE_PICTURE.sql (full version)

-- 3. Create user in Supabase Auth

-- 4. Insert profile with real user_id

-- 5. Update component import
```

---

## 📞 Quick Commands

### Check if user exists:
```sql
SELECT id, email FROM auth.users;
```

### Check if profile exists:
```sql
SELECT * FROM profiles;
```

### Check if bucket exists:
```sql
SELECT * FROM storage.buckets WHERE id = 'profile-pictures';
```

### Delete and start over:
```sql
-- Delete everything and start fresh
DROP TABLE IF EXISTS profiles CASCADE;
DELETE FROM storage.buckets WHERE id = 'profile-pictures';
-- Then run setup script again
```

---

## ✅ Summary

**Error Fixed!** ✨

Pilih solusi yang sesuai kebutuhan:
- **Testing?** → Solusi 1 (Simple)
- **Production?** → Solusi 2 (Auth)

Kedua solusi sudah siap pakai dengan:
- ✅ SQL scripts
- ✅ Components
- ✅ Documentation
- ✅ Build successful

---

**Files Created:**
- `SETUP_PROFILE_SIMPLE.sql` - Simple setup (no auth)
- `about-section-profile-demo.tsx` - Demo component
- `FIX_PROFILE_PICTURE_ERROR.md` - This guide

**Next Steps:**
1. Choose your solution (1 or 2)
2. Run the SQL script
3. Import the component
4. Test upload!

**Selamat mencoba! 🚀**
