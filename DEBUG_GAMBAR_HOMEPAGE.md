# 🔍 Debug: Gambar Preview di Homepage Tidak Muncul

## Yang Sudah Diperbaiki

Saya sudah menambahkan:
- ✅ Error handling untuk image loading
- ✅ Console logging untuk debug
- ✅ Fallback icon jika gambar tidak ada
- ✅ Better validation untuk image URL
- ✅ Empty state jika tidak ada projects

---

## 🎯 Langkah-langkah Debug

### **Step 1: Restart Development Server**

```bash
# Stop server (Ctrl+C di terminal)
# Start ulang:
npm run dev
```

### **Step 2: Buka Homepage**

```
http://localhost:3000
```

### **Step 3: Buka Browser Console**

1. Tekan **F12**
2. Klik tab **"Console"**
3. Lihat log messages

### **Step 4: Cek Log Messages**

Anda akan melihat salah satu dari ini:

#### **Scenario A: Supabase Configured**
```
Fetched projects from Supabase: [{...}, {...}, {...}]
Project: E-Commerce Mobile App, Image URL: https://images.unsplash.com/...
Project: SaaS Dashboard, Image URL: https://images.unsplash.com/...
```

**Artinya:**
- ✅ Supabase terhubung
- ✅ Data ter-fetch dari database
- ✅ Image URL ada

**Jika gambar masih tidak muncul:**
- Cek apakah ada error "Image failed to load: [URL]"
- Jika ada, URL gambar tidak valid atau tidak bisa diakses
- Copy URL dan paste di browser untuk test

#### **Scenario B: Demo Mode**
```
Supabase not configured, using demo projects
```

**Artinya:**
- ⚠️ Supabase tidak terhubung
- ✅ Menggunakan demo projects (hardcoded)
- ✅ Demo projects sudah punya gambar

**Jika gambar masih tidak muncul:**
- Ada masalah dengan Next.js Image component
- Cek Network tab untuk failed requests

#### **Scenario C: Error**
```
Error fetching projects: [error message]
Falling back to demo projects
```

**Artinya:**
- ❌ Supabase error (credentials salah, table tidak ada, dll)
- ✅ Fallback ke demo projects

---

## 🔧 Solusi Berdasarkan Scenario

### **Jika Scenario A (Supabase Connected):**

1. **Cek Image URL di Console:**
   - Apakah URL lengkap? (harus dimulai dengan `https://`)
   - Copy URL dan paste di browser address bar
   - Apakah gambar terbuka?

2. **Jika URL kosong atau null:**
   - Jalankan SQL di Supabase (lihat `FIX_GAMBAR_SUPABASE.sql`)
   - Atau update manual via Admin Dashboard

3. **Jika URL valid tapi gambar tidak muncul:**
   - Cek Network tab (F12 → Network → filter "Img")
   - Ada request yang failed?
   - Screenshot dan kirim

### **Jika Scenario B (Demo Mode):**

Demo projects sudah punya gambar, jadi seharusnya langsung muncul.

**Jika tidak muncul:**

1. **Cek apakah ada error di console**
2. **Cek Network tab:**
   - F12 → Network
   - Filter by "Img"
   - Refresh page
   - Apakah ada request ke Unsplash?
   - Apakah request berhasil (status 200)?

3. **Test koneksi internet:**
   - Buka URL ini di browser:
   ```
   https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop
   ```
   - Apakah gambar terbuka?
   - Jika tidak, ada masalah dengan internet atau firewall

### **Jika Scenario C (Error):**

1. **Cek error message di console**
2. **Kemungkinan masalah:**
   - Credentials Supabase salah
   - Table "projects" belum dibuat
   - RLS policy terlalu ketat

3. **Solusi:**
   - Ikuti setup di `SUPABASE_SETUP_LENGKAP.md`
   - Atau gunakan demo mode (hapus/rename `.env.local`)

---

## 📸 Yang Seharusnya Anda Lihat

### **Homepage - Section Projects:**

```
┌─────────────────────────────────────────────┐
│  Featured Projects                          │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │ │
│  │          │  │          │  │          │ │
│  │ E-Comm   │  │ SaaS     │  │ Brand    │ │
│  │ Mobile   │  │ Dash     │  │ Identity │ │
│  └──────────┘  └──────────┘  └──────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

### **Jika Gambar Tidak Ada:**

Anda akan melihat **icon huruf pertama** dari title project:

```
┌──────────┐
│          │
│    E     │  ← Huruf "E" dari "E-Commerce"
│          │
│ E-Comm   │
└──────────┘
```

Ini adalah fallback jika `image_url` kosong atau gagal load.

---

## 🎯 Quick Test

### **Test 1: Cek Data Projects**

Buka console dan ketik:

```javascript
// Cek apakah ada projects
console.log('Projects loaded:', document.querySelectorAll('[class*="project"]').length);
```

### **Test 2: Cek Image Elements**

```javascript
// Cek apakah ada image elements
console.log('Images:', document.querySelectorAll('img').length);
document.querySelectorAll('img').forEach(img => {
  console.log('Image src:', img.src);
});
```

### **Test 3: Force Reload Demo Projects**

Jika Anda ingin force menggunakan demo projects:

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

Demo projects seharusnya langsung muncul dengan gambar!

---

## 📋 Checklist Debug

Ikuti checklist ini step-by-step:

- [ ] **Server running** (`npm run dev`)
- [ ] **Browser opened** (http://localhost:3000)
- [ ] **Console opened** (F12)
- [ ] **Lihat log messages** - ada "Fetched projects" atau "using demo projects"?
- [ ] **Lihat section Projects** - ada cards?
- [ ] **Lihat gambar** - muncul atau ada icon huruf?
- [ ] **Cek Network tab** - ada request gambar?
- [ ] **Test URL langsung** - buka URL gambar di browser

---

## 🆘 Jika Masih Tidak Berhasil

Kirim screenshot dari:

1. **Browser Console (F12 → Console):**
   - Semua log messages
   - Error messages (jika ada)

2. **Browser Network (F12 → Network → filter "Img"):**
   - List of image requests
   - Status codes (200 = success, 404 = not found, dll)

3. **Homepage:**
   - Section Projects
   - Apakah ada cards?
   - Apakah ada gambar atau icon?

4. **Supabase Table Editor:**
   - Table "projects"
   - Kolom "image_url"
   - Isi data

Dengan screenshot ini, saya bisa identifikasi masalah dengan lebih akurat.

---

## ✅ Expected Result

Setelah mengikuti langkah-langkah di atas:

1. **Console log menunjukkan:**
   ```
   Fetched projects from Supabase: [3 items]
   Project: E-Commerce Mobile App, Image URL: https://images.unsplash.com/...
   ```

2. **Homepage menampilkan:**
   - 3 project cards
   - Setiap card punya gambar yang muncul
   - Hover effect bekerja (gambar zoom in)

3. **Network tab menunjukkan:**
   - Request ke Unsplash dengan status 200
   - Gambar ter-load dengan sukses

**Jika semua ini bekerja = SUKSES!** 🎉

---

## 💡 Tips

1. **Gunakan Demo Mode untuk testing:**
   - Lebih mudah karena tidak perlu setup Supabase
   - Data sudah hardcoded dengan gambar

2. **Hard refresh browser:**
   - Ctrl+Shift+R (Windows)
   - Cmd+Shift+R (Mac)
   - Ini clear cache dan reload semua assets

3. **Clear browser cache:**
   - Jika gambar masih tidak muncul setelah update
   - F12 → Network → Disable cache (checkbox)

4. **Test di browser lain:**
   - Jika tidak berhasil di Chrome, coba Edge atau Firefox
   - Kadang ada masalah dengan browser extension
