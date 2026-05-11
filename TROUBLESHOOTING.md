# Troubleshooting Guide - Decoisme Portfolio

## Masalah Umum dan Solusinya

### 1. ✅ FIXED: Gambar Project Tidak Muncul

**Masalah:** Gambar project tidak ditampilkan di halaman portfolio.

**Penyebab:**
- Demo projects menggunakan URL gambar kosong (`''`)
- Next.js Image component memerlukan konfigurasi domain

**Solusi yang Sudah Diterapkan:**
1. ✅ Menambahkan konfigurasi `remotePatterns` di `next.config.ts` untuk mengizinkan gambar dari domain eksternal
2. ✅ Mengupdate demo projects dengan URL gambar dari Unsplash:
   - E-Commerce Mobile App: Gambar shopping/mobile
   - SaaS Dashboard: Gambar analytics/dashboard
   - Brand Identity: Gambar branding/design

**Cara Menggunakan Gambar Sendiri:**

Jika Anda ingin menggunakan gambar sendiri, ada 2 cara:

#### Opsi A: Menggunakan Supabase Storage (Recommended)
1. Setup Supabase (ikuti `SUPABASE_SETUP_LENGKAP.md`)
2. Upload gambar ke Supabase Storage
3. Gunakan URL public dari Supabase
4. Masukkan URL ke database projects

#### Opsi B: Menggunakan Folder Public
1. Letakkan gambar di folder `public/projects/`
2. Gunakan path relatif: `/projects/nama-gambar.jpg`
3. Update demo projects atau database dengan path tersebut

**Contoh:**
```typescript
// Di projects-section-new.tsx
image_url: '/projects/my-project.jpg'
// atau
image_url: 'https://your-supabase-url.supabase.co/storage/v1/object/public/projects/image.jpg'
```

---

### 2. ✅ FIXED: Contact Form Tidak Mengirim Pesan

**Masalah:** Form contact tidak menyimpan pesan ke database.

**Penyebab:**
- Supabase belum dikonfigurasi (menggunakan demo mode)
- File `.env.local` belum dibuat

**Solusi yang Sudah Diterapkan:**
1. ✅ Menambahkan error handling yang lebih baik
2. ✅ Menampilkan notifikasi yang jelas:
   - **Demo Mode**: Jika Supabase belum setup, pesan akan di-log ke console dengan notifikasi info
   - **Production Mode**: Jika Supabase sudah setup, pesan akan tersimpan ke database dengan notifikasi success
   - **Error**: Jika ada error, akan ditampilkan pesan error yang detail

**Cara Mengaktifkan Contact Form:**

#### Langkah 1: Setup Supabase
Ikuti panduan lengkap di `SUPABASE_SETUP_LENGKAP.md` atau quick guide di `SUPABASE_QUICKSTART.md`

#### Langkah 2: Buat File `.env.local`
```bash
# Copy dari .env.example
cp .env.example .env.local
```

#### Langkah 3: Isi Credentials Supabase
Edit `.env.local` dan isi dengan credentials dari Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

#### Langkah 4: Restart Development Server
```bash
# Stop server (Ctrl+C)
# Start ulang
npm run dev
```

**Testing Contact Form:**

1. **Demo Mode** (Supabase belum setup):
   - Isi form dan klik "Send Message"
   - Akan muncul notifikasi biru (info) bahwa pesan di-log ke console
   - Buka browser console (F12) untuk melihat data yang dikirim

2. **Production Mode** (Supabase sudah setup):
   - Isi form dan klik "Send Message"
   - Akan muncul notifikasi hijau (success)
   - Pesan tersimpan di Supabase table `contact_messages`
   - Bisa dilihat di Admin Dashboard atau Supabase Dashboard

---

### 3. Hydration Errors (Sudah Diperbaiki)

**Masalah:** Error "Target ref is defined but not hydrated" di console.

**Solusi yang Sudah Diterapkan:**
- ✅ Menambahkan `mounted` state check
- ✅ Menggunakan conditional target: `target: mounted ? containerRef : undefined`
- ✅ Menambahkan `suppressHydrationWarning` pada elemen parallax
- ✅ Return `null` jika belum mounted

---

### 4. Dark Mode Tidak Smooth (Sudah Diperbaiki)

**Masalah:** Transisi dark/light mode terlalu cepat.

**Solusi yang Sudah Diterapkan:**
- ✅ Menambahkan CSS transition 0.3-0.5s dengan cubic-bezier
- ✅ Animasi pada theme toggle button (rotate, slide, fade)
- ✅ Smooth transition untuk semua elemen (background, text, border)

---

## Tips Debugging

### Melihat Console Logs
1. Buka browser (Chrome/Edge/Firefox)
2. Tekan `F12` atau klik kanan → Inspect
3. Pilih tab "Console"
4. Lihat pesan error atau warning

### Melihat Network Requests
1. Buka Developer Tools (F12)
2. Pilih tab "Network"
3. Submit form atau load page
4. Lihat request yang gagal (merah)

### Melihat Supabase Logs
1. Buka Supabase Dashboard
2. Pilih project Anda
3. Klik "Logs" di sidebar
4. Filter by "API" atau "Database"

---

## Kontak Support

Jika masih ada masalah:
1. Cek file dokumentasi lainnya:
   - `SUPABASE_SETUP_LENGKAP.md` - Setup Supabase lengkap
   - `SUPABASE_QUICKSTART.md` - Quick setup guide
   - `QUICKSTART.md` - Getting started guide
   - `README.md` - Project overview

2. Cek console browser untuk error messages

3. Pastikan semua dependencies terinstall:
   ```bash
   npm install
   ```

4. Coba rebuild project:
   ```bash
   npm run build
   ```
