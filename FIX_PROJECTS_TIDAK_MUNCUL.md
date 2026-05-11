# 🔧 FIX: Projects Tidak Muncul di Homepage

## 🎯 Solusi Tercepat (5 Menit)

### **Step 1: Buka Supabase SQL Editor**

1. Login ke https://supabase.com
2. Pilih project Anda: `dralqqfeqmhgrkjuebhd`
3. Klik **"SQL Editor"** di sidebar kiri
4. Klik **"New Query"**

### **Step 2: Copy-Paste SQL Ini**

Copy semua SQL dari file `INSERT_PROJECTS_SIMPLE.sql` atau copy ini:

```sql
-- Hapus projects lama
DELETE FROM projects;

-- Insert 3 projects baru dengan gambar
INSERT INTO projects (
  title,
  short_description,
  description,
  image_url,
  gallery_images,
  category,
  date,
  platform,
  tech_stack,
  live_url,
  featured,
  order_index
) VALUES
(
  'E-Commerce Mobile App',
  'Modern shopping experience with intuitive UI and smooth animations',
  'A comprehensive e-commerce mobile application featuring a clean, modern interface with smooth animations and intuitive navigation. Designed with user experience in mind, incorporating best practices in mobile UI/UX design.',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop'
  ],
  'UI/UX Design',
  'January 2024',
  ARRAY['Figma', 'Mobile Design', 'Prototyping'],
  ARRAY['React Native', 'TypeScript', 'Tailwind'],
  'https://example.com',
  true,
  1
),
(
  'SaaS Dashboard',
  'Analytics dashboard with data visualization and real-time updates',
  'A powerful SaaS dashboard featuring comprehensive data visualization, real-time analytics, and an intuitive interface. Built with modern design principles and optimized for performance.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop'
  ],
  'Web Design',
  'December 2023',
  ARRAY['Figma', 'Web Design', 'Design System'],
  ARRAY['Next.js', 'Supabase', 'Chart.js'],
  'https://example.com',
  true,
  2
),
(
  'Brand Identity Design',
  'Complete brand identity including logo, colors, and guidelines',
  'A comprehensive brand identity project including logo design, color palette, typography system, and brand guidelines. Created to establish a strong, memorable brand presence.',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop'
  ],
  'Branding',
  'November 2023',
  ARRAY['Adobe Illustrator', 'Figma', 'Brand Design'],
  ARRAY['Design System', 'Style Guide'],
  'https://example.com',
  true,
  3
);
```

### **Step 3: Klik "Run" atau Tekan Ctrl+Enter**

Tunggu sampai muncul pesan "Success"

### **Step 4: Verifikasi Data**

Jalankan query ini untuk cek:

```sql
SELECT title, image_url FROM projects ORDER BY order_index;
```

Anda harus melihat 3 rows dengan title dan image_url yang lengkap.

### **Step 5: Refresh Website**

1. Buka http://localhost:3000
2. Tekan **Ctrl+Shift+R** (hard refresh)
3. **Projects seharusnya muncul!** ✨

---

## 🔍 Debug: Cek Console Browser

### **Step 1: Buka Console**
- Tekan **F12**
- Klik tab **"Console"**

### **Step 2: Lihat Log Messages**

Anda akan melihat log seperti ini:

#### **Jika Berhasil:**
```
ProjectsSection mounted
Fetching projects...
Supabase client available, fetching from database...
Fetched projects from Supabase: [{...}, {...}, {...}]
Number of projects: 3
Project: E-Commerce Mobile App
  Image URL: https://images.unsplash.com/...
  Gallery: 3 images
Project: SaaS Dashboard
  Image URL: https://images.unsplash.com/...
  Gallery: 3 images
Project: Brand Identity Design
  Image URL: https://images.unsplash.com/...
  Gallery: 3 images
Loading complete
```

#### **Jika Data Kosong:**
```
ProjectsSection mounted
Fetching projects...
Supabase client available, fetching from database...
Fetched projects from Supabase: []
Number of projects: 0
No projects in database, using demo projects
Demo projects: [{...}, {...}, {...}]
Loading complete
```

#### **Jika Error:**
```
ProjectsSection mounted
Fetching projects...
Supabase error: [error message]
Error fetching projects: [error]
Falling back to demo projects
Demo projects count: 3
Loading complete
```

---

## 🎯 Kemungkinan Masalah & Solusi

### **Problem 1: Table "projects" Tidak Ada**

**Error di console:**
```
relation "projects" does not exist
```

**Solusi:**
1. Buka Supabase Dashboard
2. Jalankan SQL dari file `supabase-schema.sql`
3. Ini akan create table projects
4. Lalu jalankan `INSERT_PROJECTS_SIMPLE.sql`

### **Problem 2: RLS Policy Terlalu Ketat**

**Error di console:**
```
new row violates row-level security policy
```

**Solusi:**
1. Buka Supabase Dashboard
2. Klik "Authentication" → "Policies"
3. Pilih table "projects"
4. Pastikan ada policy "Enable read access for all users"
5. Atau disable RLS sementara untuk testing:
```sql
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
```

### **Problem 3: Credentials Supabase Salah**

**Error di console:**
```
Invalid API key
```

**Solusi:**
1. Cek file `.env.local`
2. Pastikan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` benar
3. Copy ulang dari Supabase Dashboard → Settings → API
4. Restart server: `npm run dev`

### **Problem 4: Data Ada Tapi Gambar Tidak Muncul**

**Console log:**
```
Number of projects: 3
Image URL: (empty or null)
```

**Solusi:**
- Jalankan SQL `INSERT_PROJECTS_SIMPLE.sql` untuk update image URLs
- Atau update manual via Admin Dashboard

### **Problem 5: Demo Projects Tidak Muncul**

**Console log:**
```
Supabase not configured, using demo projects
Demo projects: []
```

**Solusi:**
- Ada masalah dengan import demo projects
- Cek file `components/sections/projects-section-new.tsx`
- Pastikan `demoProjects` array ada di bawah file

---

## 🆘 Jika Masih Tidak Berhasil

### **Opsi A: Force Demo Mode**

1. **Rename `.env.local`:**
   ```bash
   mv .env.local .env.local.backup
   ```

2. **Restart server:**
   ```bash
   npm run dev
   ```

3. **Refresh browser:**
   ```
   Ctrl + Shift + R
   ```

Demo projects seharusnya muncul!

### **Opsi B: Check Component Error**

1. **Buka console (F12)**
2. **Lihat tab "Console"**
3. **Ada error React?**
4. **Screenshot dan kirim**

### **Opsi C: Reinstall Dependencies**

```bash
# Hapus node_modules
rm -rf node_modules

# Hapus package-lock.json
rm package-lock.json

# Install ulang
npm install

# Restart server
npm run dev
```

---

## ✅ Checklist Troubleshooting

Ikuti checklist ini step-by-step:

- [ ] **Supabase table "projects" sudah dibuat** (jalankan `supabase-schema.sql`)
- [ ] **Data projects sudah di-insert** (jalankan `INSERT_PROJECTS_SIMPLE.sql`)
- [ ] **Verifikasi data di Supabase** (SELECT * FROM projects)
- [ ] **File `.env.local` ada dan valid**
- [ ] **Credentials Supabase benar**
- [ ] **Development server running** (`npm run dev`)
- [ ] **Browser console tidak ada error**
- [ ] **Hard refresh browser** (Ctrl+Shift+R)

---

## 📸 Screenshot yang Dibutuhkan

Jika masih tidak berhasil, kirim screenshot:

1. **Supabase Table Editor:**
   - Table "projects"
   - Semua columns dan data

2. **Browser Console (F12):**
   - Tab "Console"
   - Semua log messages
   - Error messages (jika ada)

3. **Homepage:**
   - Section Projects
   - Apakah ada pesan "No Projects Yet"?
   - Atau blank/kosong?

4. **Network Tab (F12):**
   - Tab "Network"
   - Filter "Fetch/XHR"
   - Request ke Supabase (jika ada)

---

## 🎉 Expected Result

Setelah mengikuti solusi di atas, Anda seharusnya melihat:

### **Homepage - Section Projects:**
```
┌─────────────────────────────────────────────┐
│  Featured Projects                          │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │ │
│  │ E-Comm   │  │ SaaS     │  │ Brand    │ │
│  │ Mobile   │  │ Dash     │  │ Identity │ │
│  └──────────┘  └──────────┘  └──────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

### **Console Log:**
```
✅ ProjectsSection mounted
✅ Fetching projects...
✅ Fetched projects from Supabase: 3 items
✅ All images loaded successfully
✅ Loading complete
```

**Jika semua ini bekerja = SUKSES!** 🎉

---

## 💡 Tips

1. **Selalu cek console** - 90% masalah bisa dilihat di console
2. **Hard refresh** - Ctrl+Shift+R untuk clear cache
3. **Restart server** - Setelah ubah .env.local
4. **Verifikasi data** - Cek di Supabase Table Editor
5. **Test URL gambar** - Buka URL langsung di browser

---

## 📞 Next Steps

1. **Jalankan SQL** dari `INSERT_PROJECTS_SIMPLE.sql`
2. **Refresh browser** dengan Ctrl+Shift+R
3. **Cek console** untuk log messages
4. **Screenshot dan kirim** jika masih tidak berhasil

Projects seharusnya langsung muncul! 🚀
