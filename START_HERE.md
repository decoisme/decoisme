# 🎉 Welcome to Decoisme Portfolio!

Selamat! Website portfolio premium dengan style ala Apple sudah berhasil dibuat dan siap digunakan.

## 🚀 Langkah Pertama (5 Menit)

### 1. Jalankan Development Server

```bash
cd decoisme
npm run dev
```

Buka browser dan kunjungi: **http://localhost:3000**

### 2. Lihat Hasilnya

Anda akan melihat:
- ✨ Hero section dengan animasi smooth
- 🎨 About section dengan tech stack
- 📁 Projects section dengan demo data
- 💪 Skills section dengan animated marquee
- 📧 Contact form yang functional
- 🌓 Dark/Light mode toggle
- 📱 Responsive di semua device

## 📝 Kustomisasi Cepat (10 Menit)

### Update Informasi Personal

1. **Hero Section** (`components/sections/hero-section.tsx`)
   - Ganti nama Anda (line 50-60)
   - Update title dan deskripsi (line 70-80)
   - Update link social media (line 90-100)

2. **Contact Section** (`components/sections/contact-section.tsx`)
   - Update email, phone, location (line 60-80)
   - Update link social media (line 100-120)

3. **About Section** (`components/sections/about-section.tsx`)
   - Update bio Anda (line 40-50)
   - Update tech stack (line 20-30)
   - Update experience timeline (line 35-55)

### Tambah Foto Profil

1. Simpan foto Anda di folder `public/` (misal: `profile.jpg`)
2. Edit `components/sections/hero-section.tsx` line 120:
   ```tsx
   <Image src="/profile.jpg" alt="Nama Anda" fill />
   ```

## 🗄️ Setup Supabase (Opsional - 10 Menit)

**Lewati langkah ini jika hanya ingin melihat demo!**

Website sudah berfungsi dengan demo data. Tapi untuk fitur dinamis (add/edit projects via admin), setup Supabase:

### Langkah Setup:

1. **Buat Akun Supabase**
   - Kunjungi [supabase.com](https://supabase.com)
   - Sign up gratis
   - Buat project baru

2. **Jalankan Database Schema**
   - Buka Supabase Dashboard
   - Pilih "SQL Editor"
   - Copy isi file `supabase-schema.sql`
   - Paste dan klik "Run"

3. **Dapatkan API Keys**
   - Go to Settings > API
   - Copy "Project URL"
   - Copy "anon/public key"
   - Copy "service_role key"

4. **Update Environment Variables**
   - Copy `.env.example` ke `.env.local`
   - Isi dengan API keys Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_key_here
   ```

5. **Restart Server**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

## 🎨 Admin Dashboard

### Akses Admin:

1. Buka: **http://localhost:3000/admin**
2. Login dengan:
   - Email: `admin@decoisme.com`
   - Password: apa saja (di development)

### Fitur Admin:

- ➕ **Add Projects**: Tambah project baru
- ✏️ **Edit Projects**: Edit project yang ada
- 🗑️ **Delete Projects**: Hapus project
- 📧 **View Messages**: Lihat pesan dari contact form
- 📊 **Statistics**: Lihat statistik portfolio

## 📚 Dokumentasi Lengkap

Baca dokumentasi untuk panduan detail:

1. **[QUICKSTART.md](./QUICKSTART.md)** - Panduan cepat 5 menit
2. **[SETUP.md](./SETUP.md)** - Setup detail step-by-step
3. **[CUSTOMIZATION.md](./CUSTOMIZATION.md)** - Cara kustomisasi semua aspek
4. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy ke production
5. **[FEATURES.md](./FEATURES.md)** - Dokumentasi fitur lengkap
6. **[README.md](./README.md)** - Overview project

## 🎯 Checklist Sebelum Deploy

- [ ] Update nama dan informasi personal
- [ ] Tambah foto profil
- [ ] Ganti "Decoisme" dengan nama brand Anda
- [ ] Update link social media
- [ ] Setup Supabase (jika ingin fitur dinamis)
- [ ] Tambah project real via admin dashboard
- [ ] Test di mobile dan desktop
- [ ] Ganti warna jika perlu

## 🚀 Deploy ke Vercel (Termudah)

### Langkah Deploy:

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy di Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Pilih repository GitHub Anda
   - Tambahkan environment variables (jika pakai Supabase)
   - Click "Deploy"

3. **Selesai!**
   - Website Anda live dalam 2-3 menit
   - Dapat custom domain gratis
   - Auto-deploy setiap push ke GitHub

## 🎨 Fitur Utama

### Design
- ✅ Minimalist Apple-inspired design
- ✅ Clean typography dengan spacing luas
- ✅ Glassmorphism effects
- ✅ Gradient blur backgrounds
- ✅ Dark/Light mode seamless

### Animations
- ✅ Smooth scroll (Lenis)
- ✅ Fade in saat scroll
- ✅ Stagger animations
- ✅ Magnetic button effects
- ✅ Hover interactions premium
- ✅ Loading screen cinematic

### Technical
- ✅ Next.js 15 App Router
- ✅ TypeScript untuk type safety
- ✅ Tailwind CSS v4
- ✅ Supabase backend
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Fully responsive

## 💡 Tips

1. **Mulai Simple**: Jalankan dulu, lihat hasilnya, baru customize
2. **Demo Data**: Website sudah ada demo data, tidak perlu Supabase untuk testing
3. **Git Commit**: Commit perubahan secara berkala
4. **Test Mobile**: Selalu test di mobile device
5. **Baca Docs**: Dokumentasi sangat lengkap, baca sesuai kebutuhan

## 🆘 Troubleshooting

### Build Error?
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Supabase Tidak Konek?
- Cek `.env.local` ada dan isi benar
- Restart dev server setelah ubah env
- Demo data akan muncul jika Supabase tidak configured

### Admin Login Tidak Bisa?
- Email: `admin@decoisme.com`
- Password: apa saja di development
- Clear browser localStorage jika masih error

## 📞 Butuh Bantuan?

1. Baca dokumentasi di folder project
2. Check [Next.js Docs](https://nextjs.org/docs)
3. Check [Supabase Docs](https://supabase.com/docs)
4. Check [Tailwind Docs](https://tailwindcss.com/docs)

## 🎉 Selamat!

Portfolio premium Anda sudah siap! Sekarang:

1. ✅ Jalankan `npm run dev`
2. ✅ Buka http://localhost:3000
3. ✅ Lihat hasilnya
4. ✅ Customize sesuai kebutuhan
5. ✅ Deploy ke Vercel

---

**Happy Coding! 🚀**

Dibuat dengan ❤️ menggunakan Next.js, TypeScript, Tailwind CSS, dan Supabase.

Version: 1.0.0
