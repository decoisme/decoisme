# Cara Upload dan Menambahkan Gambar Project

## 🎯 Masalah: Gambar Project Tidak Muncul

Jika gambar project Anda tidak muncul, itu karena field **"Image URL"** di admin dashboard masih kosong atau tidak valid.

---

## ✅ Solusi: 3 Cara Menambahkan Gambar

### **Opsi 1: Menggunakan Unsplash (Paling Mudah - Recommended untuk Testing)**

Unsplash menyediakan gambar gratis berkualitas tinggi yang bisa langsung digunakan.

#### Langkah-langkah:

1. **Buka Unsplash:**
   - Kunjungi: https://unsplash.com
   - Cari gambar yang sesuai dengan project Anda

2. **Copy URL Gambar:**
   - Klik gambar yang Anda suka
   - Klik kanan pada gambar → "Copy Image Address" atau "Copy Image Link"
   - Atau gunakan format: `https://images.unsplash.com/photo-[ID]?w=800&h=600&fit=crop`

3. **Paste ke Admin Dashboard:**
   - Buka Admin Dashboard: http://localhost:3000/admin/dashboard
   - Klik "Add Project" atau Edit project yang sudah ada
   - Paste URL di field **"Image URL"**
   - Untuk gallery, paste 3 URL dipisah koma di **"Gallery Images"**

#### Contoh URL Unsplash yang Bisa Digunakan:

**Untuk E-Commerce / Shopping:**
```
https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop
```

**Untuk Dashboard / Analytics:**
```
https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop
```

**Untuk Branding / Design:**
```
https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop
```

**Untuk Mobile App:**
```
https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop
```

#### Contoh Mengisi Form:

**Image URL:**
```
https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop
```

**Gallery Images (comma separated):**
```
https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop, https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&h=600&fit=crop, https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop
```

---

### **Opsi 2: Upload ke Folder Public (Untuk Gambar Sendiri)**

Jika Anda punya gambar sendiri (screenshot project, mockup, dll), upload ke folder `public`.

#### Langkah-langkah:

1. **Buat Folder Projects:**
   ```
   decoisme/public/projects/
   ```

2. **Copy Gambar Anda:**
   - Copy file gambar (JPG, PNG, WebP) ke folder `public/projects/`
   - Contoh: `public/projects/ecommerce-app.jpg`

3. **Gunakan Path Relatif di Admin:**
   - Image URL: `/projects/ecommerce-app.jpg`
   - Gallery Images: `/projects/ecommerce-1.jpg, /projects/ecommerce-2.jpg, /projects/ecommerce-3.jpg`

#### Contoh Struktur Folder:
```
decoisme/
├── public/
│   ├── projects/
│   │   ├── ecommerce-app.jpg
│   │   ├── ecommerce-gallery-1.jpg
│   │   ├── ecommerce-gallery-2.jpg
│   │   ├── dashboard-main.jpg
│   │   └── branding-logo.jpg
```

#### Contoh Mengisi Form:

**Image URL:**
```
/projects/ecommerce-app.jpg
```

**Gallery Images:**
```
/projects/ecommerce-gallery-1.jpg, /projects/ecommerce-gallery-2.jpg, /projects/ecommerce-gallery-3.jpg
```

---

### **Opsi 3: Upload ke Supabase Storage (Production - Recommended)**

Untuk production, sebaiknya upload gambar ke Supabase Storage.

#### Langkah-langkah:

1. **Setup Supabase Storage:**
   - Login ke Supabase Dashboard
   - Pilih project Anda
   - Klik "Storage" di sidebar
   - Klik "Create Bucket"
   - Nama bucket: `projects`
   - Public bucket: **Yes** (centang)

2. **Upload Gambar:**
   - Klik bucket "projects"
   - Klik "Upload File"
   - Pilih gambar Anda
   - Setelah upload, klik gambar → "Get public URL"

3. **Copy URL dan Paste ke Admin:**
   - URL akan seperti: `https://[project-id].supabase.co/storage/v1/object/public/projects/image.jpg`
   - Paste ke field "Image URL" di admin dashboard

---

## 🔧 Troubleshooting

### Gambar Masih Tidak Muncul?

1. **Cek URL Valid:**
   - Copy URL gambar
   - Paste di browser address bar
   - Tekan Enter
   - Apakah gambar terbuka? Jika tidak, URL salah

2. **Cek Console Browser:**
   - Tekan F12
   - Lihat tab "Console"
   - Ada error merah tentang gambar?
   - Screenshot dan kirim ke developer

3. **Cek Network Tab:**
   - Tekan F12
   - Klik tab "Network"
   - Filter by "Img"
   - Refresh page
   - Ada request gambar yang failed (merah)?

4. **Hard Refresh Browser:**
   - Windows: Ctrl + Shift + R atau Ctrl + F5
   - Mac: Cmd + Shift + R

5. **Restart Dev Server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

---

## 📝 Contoh Lengkap: Menambah Project Baru

### Step-by-Step:

1. **Buka Admin Dashboard:**
   ```
   http://localhost:3000/admin/dashboard
   ```

2. **Klik "Add Project"**

3. **Isi Form:**

   **Title:**
   ```
   E-Commerce Mobile App
   ```

   **Image URL:**
   ```
   https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop
   ```

   **Short Description:**
   ```
   Modern shopping experience with intuitive UI
   ```

   **Description:**
   ```
   A comprehensive e-commerce mobile application featuring a clean, modern interface with smooth animations and intuitive navigation. Designed with user experience in mind.
   ```

   **Category:**
   ```
   UI/UX Design
   ```

   **Date:**
   ```
   January 2024
   ```

   **Gallery Images:**
   ```
   https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop, https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&h=600&fit=crop, https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop
   ```

   **Platform/Tools:**
   ```
   Figma, Mobile Design, Prototyping
   ```

   **Tech Stack:**
   ```
   React Native, TypeScript, Tailwind CSS
   ```

   **Live URL:**
   ```
   https://example.com
   ```

4. **Klik "Create Project"**

5. **Refresh Homepage:**
   - Buka http://localhost:3000
   - Scroll ke section "Projects"
   - Gambar seharusnya muncul!

---

## ✨ Tips

1. **Ukuran Gambar Optimal:**
   - Width: 800-1200px
   - Height: 600-900px
   - Format: JPG atau WebP (lebih kecil)

2. **Kualitas Gambar:**
   - Gunakan gambar berkualitas tinggi
   - Hindari gambar blur atau pixelated
   - Aspect ratio 4:3 atau 16:9

3. **Naming Convention:**
   - Gunakan nama file yang deskriptif
   - Contoh: `ecommerce-mobile-app-hero.jpg`
   - Hindari spasi, gunakan dash `-`

4. **Gallery Images:**
   - Minimal 3 gambar untuk gallery
   - Gambar pertama akan jadi default
   - Pisahkan dengan koma dan spasi

---

## 🎯 Quick Test

Untuk test cepat, copy-paste ini ke form admin:

**Image URL:**
```
https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop
```

**Gallery Images:**
```
https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop, https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&h=600&fit=crop, https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop
```

Klik "Update Project" dan refresh homepage. Gambar seharusnya langsung muncul!

---

Jika masih ada masalah, screenshot error di console (F12) dan kirim ke developer.
