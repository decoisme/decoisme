# Supabase Setup Guide - Decoisme Portfolio

Panduan lengkap untuk setup Supabase sebagai backend portfolio Anda.

## 📋 Prerequisites

- Akun Supabase (gratis di [supabase.com](https://supabase.com))
- File `.env.local` di root project

## 🚀 Step-by-Step Setup

### 1. Buat Project Supabase

1. **Login ke Supabase**
   - Kunjungi [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Login dengan GitHub/Google

2. **Create New Project**
   - Click "New Project"
   - Isi form:
     - **Name**: `decoisme-portfolio` (atau nama lain)
     - **Database Password**: Buat password yang kuat (simpan!)
     - **Region**: Pilih yang terdekat (e.g., Southeast Asia)
     - **Pricing Plan**: Free (cukup untuk portfolio)
   - Click "Create new project"
   - Tunggu 2-3 menit sampai project ready

### 2. Setup Database Schema

1. **Buka SQL Editor**
   - Di sidebar kiri, click "SQL Editor"
   - Click "New Query"

2. **Copy & Run Schema**
   - Buka file `supabase-schema.sql` di project
   - Copy SEMUA isi file
   - Paste ke SQL Editor
   - Click "Run" atau tekan `Ctrl+Enter`
   - Tunggu sampai muncul "Success. No rows returned"

3. **Verifikasi Tables**
   - Di sidebar, click "Table Editor"
   - Anda harus melihat 3 tables:
     - ✅ `projects` (3 sample rows)
     - ✅ `contact_messages` (0 rows)
     - ✅ `skills` (31 rows)

### 3. Get API Keys

1. **Buka Settings**
   - Di sidebar, click ⚙️ "Project Settings"
   - Click "API"

2. **Copy Keys**
   Anda akan melihat:
   
   **Project URL**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   
   **anon/public key** (panjang, dimulai dengan `eyJ...`)
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   
   **service_role key** (panjang, dimulai dengan `eyJ...`)
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 4. Configure Environment Variables

1. **Buka `.env.local`**
   - Di root project, buka file `.env.local`
   - Jika belum ada, copy dari `.env.example`

2. **Paste API Keys**
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   # Admin Credentials
   NEXT_PUBLIC_ADMIN_EMAIL=admin@decoisme.com
   ADMIN_PASSWORD=your_secure_password_here
   ```

3. **Save File**
   - Pastikan file tersimpan
   - **JANGAN** commit file ini ke Git (sudah ada di .gitignore)

### 5. Restart Development Server

```bash
# Stop server (Ctrl+C)
# Start again
npm run dev
```

### 6. Test Connection

1. **Buka Browser**
   - Go to `http://localhost:3000`
   - Scroll ke section "Projects"
   - Anda harus melihat 3 sample projects

2. **Test Contact Form**
   - Scroll ke section "Contact"
   - Isi form dan submit
   - Check Supabase Table Editor → `contact_messages`
   - Message baru harus muncul

3. **Test Admin Dashboard**
   - Go to `http://localhost:3000/admin`
   - Login dengan email: `admin@decoisme.com`
   - Anda harus melihat 3 projects di dashboard

## 🎨 Customize Sample Data

### Update Sample Projects

1. **Buka Table Editor**
   - Click "Table Editor" → "projects"

2. **Edit Each Row**
   - Click row untuk edit
   - Update fields:
     - `title` - Nama project Anda
     - `short_description` - Deskripsi singkat
     - `description` - Deskripsi lengkap
     - `category` - UI/UX Design, Web Design, dll
     - `date` - Tanggal project
     - `platform` - Tools yang digunakan (array)
     - `tech_stack` - Technologies (array)
     - `image_url` - URL gambar utama
     - `gallery_images` - Array URL gambar galeri
     - `live_url` - Link project
   - Click "Save"

### Add Your Own Projects

**Via Admin Dashboard** (Recommended):
1. Go to `/admin/dashboard`
2. Click "Add Project"
3. Fill form
4. Click "Create Project"

**Via Supabase** (Manual):
1. Table Editor → projects
2. Click "Insert row"
3. Fill all fields
4. Click "Save"

### Delete Sample Projects

1. Table Editor → projects
2. Select rows to delete
3. Click "Delete" button
4. Confirm

## 📸 Upload Images

### Option 1: Use External URLs (Easiest)

Gunakan image hosting seperti:
- **Unsplash** - `https://images.unsplash.com/photo-xxxxx`
- **Imgur** - Upload gratis
- **Cloudinary** - Free tier bagus
- **Your own hosting**

Paste URL langsung ke field `image_url` dan `gallery_images`.

### Option 2: Supabase Storage (Recommended)

1. **Create Storage Bucket**
   - Sidebar → "Storage"
   - Click "New bucket"
   - Name: `project-images`
   - Public bucket: ✅ Yes
   - Click "Create bucket"

2. **Upload Images**
   - Click bucket `project-images`
   - Click "Upload file"
   - Select images
   - Wait for upload

3. **Get Public URL**
   - Click uploaded image
   - Click "Copy URL"
   - Paste ke database field

4. **Set Storage Policy** (Already done in schema)
   ```sql
   -- Public can view images
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING ( bucket_id = 'project-images' );
   ```

## 🔐 Security Notes

### Row Level Security (RLS)

Schema sudah include RLS policies:

**Projects**:
- ✅ Public dapat view
- ✅ Authenticated dapat insert/update/delete

**Contact Messages**:
- ✅ Anyone dapat insert (submit form)
- ✅ Authenticated dapat view/update/delete

**Skills**:
- ✅ Public dapat view
- ✅ Authenticated dapat manage

### Production Recommendations

Untuk production, implement proper auth:

1. **Enable Supabase Auth**
   ```typescript
   // lib/auth.ts
   import { supabase } from './supabase';
   
   export async function signIn(email: string, password: string) {
     const { data, error } = await supabase.auth.signInWithPassword({
       email,
       password,
     });
     return { data, error };
   }
   ```

2. **Protect Admin Routes**
   ```typescript
   // middleware.ts
   export function middleware(request: NextRequest) {
     // Check auth token
     // Redirect if not authenticated
   }
   ```

3. **Remove Hardcoded Credentials**
   - Hapus `ADMIN_EMAIL` dan `ADMIN_PASSWORD` dari env
   - Gunakan Supabase Auth

## 🐛 Troubleshooting

### Error: "Invalid supabaseUrl"

**Problem**: Environment variables tidak terbaca

**Solution**:
1. Check `.env.local` ada di root project
2. Restart dev server
3. Verify URL format: `https://xxxxx.supabase.co`

### Error: "Failed to fetch projects"

**Problem**: RLS policies atau API keys salah

**Solution**:
1. Check API keys di `.env.local`
2. Verify RLS policies di Supabase
3. Check browser console untuk error detail

### Projects Tidak Muncul

**Problem**: Database kosong atau query error

**Solution**:
1. Check Table Editor → projects ada data
2. Run schema lagi jika perlu
3. Check browser console

### Contact Form Tidak Kirim

**Problem**: RLS policy atau network error

**Solution**:
1. Check RLS policy untuk `contact_messages`
2. Verify API keys
3. Check browser network tab

### Images Tidak Muncul

**Problem**: URL salah atau CORS issue

**Solution**:
1. Verify image URLs valid
2. Use HTTPS URLs
3. Check image accessible di browser
4. Consider using Supabase Storage

## 📊 Database Structure

### Projects Table
```
id                UUID (Primary Key)
title             TEXT
short_description TEXT
description       TEXT
image_url         TEXT
gallery_images    TEXT[] (Array)
category          TEXT
date              TEXT
platform          TEXT[] (Array)
tech_stack        TEXT[] (Array)
github_url        TEXT
live_url          TEXT
featured          BOOLEAN
order_index       INTEGER
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

### Contact Messages Table
```
id          UUID (Primary Key)
name        TEXT
email       TEXT
message     TEXT
read        BOOLEAN
created_at  TIMESTAMP
```

### Skills Table
```
id          UUID (Primary Key)
name        TEXT
category    TEXT
icon        TEXT
order_index INTEGER
created_at  TIMESTAMP
```

## 🎯 Next Steps

1. ✅ Setup Supabase - DONE
2. ✅ Run schema - DONE
3. ✅ Configure env vars - DONE
4. ⬜ Update sample projects dengan data Anda
5. ⬜ Upload images
6. ⬜ Test semua fitur
7. ⬜ Deploy to Vercel

## 📞 Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- Check `SETUP.md` untuk general setup
- Check `README.md` untuk project overview

---

**Setup Complete!** 🎉

Supabase Anda sudah ready. Sekarang customize dengan data Anda sendiri!
