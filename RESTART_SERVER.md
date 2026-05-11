# 🔄 Cara Restart Development Server

## Masalah: Perubahan Code Tidak Muncul

Jika Anda sudah update code atau admin dashboard tapi perubahan tidak muncul, Anda perlu **restart development server**.

---

## ✅ Cara Restart Server

### **Step 1: Stop Server**

Di terminal yang menjalankan `npm run dev`, tekan:
```
Ctrl + C
```

Anda akan melihat pesan seperti:
```
^C
PS C:\Users\WIN10\Downloads\Decoisme\decoisme>
```

### **Step 2: Start Server Lagi**

Jalankan command ini:
```bash
npm run dev
```

Tunggu sampai muncul:
```
✓ Ready in 437ms
- Local:         http://localhost:3000
```

### **Step 3: Hard Refresh Browser**

Buka browser dan tekan:
- **Windows**: `Ctrl + Shift + R` atau `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`

---

## 🎯 Untuk Masalah Gambar Project

Jika gambar project masih tidak muncul setelah restart:

### **Opsi A: Gunakan Demo Projects (Paling Mudah)**

Demo projects sudah saya update dengan gambar Unsplash. Untuk menggunakannya:

1. **Pastikan Supabase BELUM dikonfigurasi** (demo mode)
   - Jangan buat file `.env.local` dulu
   - Atau rename `.env.local` jadi `.env.local.backup`

2. **Restart server:**
   ```bash
   # Stop dengan Ctrl+C
   npm run dev
   ```

3. **Buka homepage:**
   ```
   http://localhost:3000
   ```

4. **Gambar seharusnya muncul!**

Demo projects sudah punya gambar:
- E-Commerce Mobile App → ✅ Ada gambar
- SaaS Dashboard → ✅ Ada gambar  
- Brand Identity → ✅ Ada gambar

---

### **Opsi B: Setup Supabase dan Input Manual**

Jika Anda ingin menggunakan admin dashboard untuk manage projects:

1. **Setup Supabase** (ikuti `SUPABASE_SETUP_LENGKAP.md`)

2. **Buat file `.env.local`:**
   ```bash
   cp .env.example .env.local
   ```

3. **Isi credentials Supabase** di `.env.local`

4. **Restart server:**
   ```bash
   npm run dev
   ```

5. **Buka Admin Dashboard:**
   ```
   http://localhost:3000/admin/dashboard
   ```

6. **Add Project dengan URL gambar:**
   
   **Image URL:**
   ```
   https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop
   ```
   
   **Gallery Images:**
   ```
   https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop, https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&h=600&fit=crop, https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop
   ```

---

## 🐛 Troubleshooting

### Server Tidak Mau Stop?

Jika `Ctrl+C` tidak bekerja:

1. **Tutup terminal window**
2. **Buka terminal baru**
3. **Jalankan:**
   ```bash
   cd decoisme
   npm run dev
   ```

### Port 3000 Sudah Digunakan?

Jika muncul error "Port 3000 is already in use":

1. **Kill process di port 3000:**
   ```bash
   npx kill-port 3000
   ```

2. **Atau gunakan port lain:**
   ```bash
   npm run dev -- -p 3001
   ```
   Buka: http://localhost:3001

### Gambar Masih Tidak Muncul?

1. **Cek mode apa yang digunakan:**
   - Buka browser console (F12)
   - Lihat pesan: "Supabase not configured. Using demo mode."
   - Jika ada pesan ini = demo mode ✅
   - Jika tidak ada = production mode (perlu Supabase)

2. **Cek demo projects:**
   - Buka: http://localhost:3000
   - Scroll ke section "Projects"
   - Apakah ada 3 project cards?
   - Jika tidak ada = ada error, cek console

3. **Cek console errors:**
   - Tekan F12
   - Tab "Console"
   - Ada error merah?
   - Screenshot dan kirim ke developer

---

## ✨ Quick Fix

Cara tercepat untuk melihat gambar:

```bash
# 1. Stop server (Ctrl+C)

# 2. Pastikan tidak ada .env.local (demo mode)
# Jika ada, rename dulu:
mv .env.local .env.local.backup

# 3. Start server
npm run dev

# 4. Buka browser
# http://localhost:3000

# 5. Hard refresh
# Ctrl + Shift + R
```

Gambar seharusnya langsung muncul karena demo projects sudah punya gambar! 🎉

---

## 📝 Catatan Penting

- **Demo Mode** = Tidak perlu Supabase, data hardcoded di code
- **Production Mode** = Perlu Supabase, data dari database
- Jika file `.env.local` ada dan valid = Production Mode
- Jika file `.env.local` tidak ada = Demo Mode

Untuk testing, gunakan **Demo Mode** dulu agar lebih mudah!
