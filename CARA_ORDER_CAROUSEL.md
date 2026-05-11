# 🛒 Cara Order Carousel - Quick Guide

## Yang Baru Ditambahkan ✨

### 1. **Halaman Order Khusus** (`/order`)
- Form multi-step yang interaktif
- Kalkulator harga otomatis
- Langsung kirim ke WhatsApp

### 2. **Update Pricing Section**
- Base package: **up to 3 slides** (bukan 5 lagi)
- Button "Order Carousel" langsung ke halaman order
- Harga tetap: **Rp 60.000** start from

### 3. **Floating Calculator Dihapus**
- Lebih clean
- Pengalaman lebih fokus
- Semua order via halaman khusus

---

## 🎯 Cara Pakai (User Flow)

### Step 1: Dari Homepage
1. Scroll ke section **Pricing**
2. Lihat paket **Carousel Post** (yang tengah, ada badge POPULAR)
3. Klik button **"Order Carousel"**

### Step 2: Pilih Jumlah Slides
- Base: 3 slides = Rp 60.000
- Tambah slides: +Rp 10.000/slide
- Gunakan tombol +/- untuk adjust

### Step 3: Pilih Tambahan & Diskon
**Tambahan (Opsional):**
- ⚡ Express <24 jam: +50%
- 💡 Konsep dari nol: +Rp 25.000

**Diskon (Jika Ada):**
- 🎨 Brand guidelines lengkap: -Rp 10.000
- 🖼️ Assets ready: -Rp 5.000
- ✍️ Copywriting ready: -Rp 5.000

### Step 4: Isi Data Diri
- Nama lengkap
- Email
- WhatsApp
- Deskripsi project

### Step 5: Review & Kirim
- Cek semua detail
- Lihat estimasi harga total
- Klik **"Kirim via WhatsApp"**
- Otomatis buka WhatsApp dengan message lengkap

---

## 💰 Contoh Perhitungan Harga

### Contoh 1: Basic Order
```
Base (3 slides)           = Rp 60.000
Brand guidelines ready    = -Rp 10.000
Assets ready              = -Rp  5.000
─────────────────────────────────────
TOTAL                     = Rp 45.000
```

### Contoh 2: Premium Order
```
Base (3 slides)           = Rp 60.000
Extra 2 slides            = +Rp 20.000
Express delivery          = +Rp 30.000 (50%)
Konsep dari nol           = +Rp 25.000
─────────────────────────────────────
TOTAL                     = Rp 135.000
```

### Contoh 3: Standard Order
```
Base (3 slides)           = Rp 60.000
Extra 1 slide             = +Rp 10.000
Copywriting ready         = -Rp  5.000
─────────────────────────────────────
TOTAL                     = Rp 65.000
```

---

## 📱 Format WhatsApp Message

Setelah submit, client akan dikirim ke WhatsApp dengan message:

```
*Order Carousel Post Design*

*Detail Order:*
• Jumlah Slides: 5 slides
• Express Delivery: Ya (<24 jam)
• Konsep dari Nol: Ya

*Estimasi Harga: Rp 135.000*

*Info Client:*
• Nama: John Doe
• Email: john@example.com
• Phone: 08123456789

*Deskripsi Project:*
Butuh design carousel untuk promosi produk baru...
```

---

## ⚙️ Setup WhatsApp Number

**PENTING:** Ganti nomor WhatsApp placeholder!

1. Buka file: `decoisme/app/order/page.tsx`
2. Cari baris: `const whatsappUrl = \`https://wa.me/6281234567890?text=...`
3. Ganti `6281234567890` dengan nomor WhatsApp kamu
4. Format: `62` + nomor (tanpa 0 di depan)
   - Contoh: 0812-3456-7890 → 6281234567890

---

## 🎨 Fitur UI/UX

- ✅ Progress indicator (4 steps)
- ✅ Real-time price preview (sticky di bottom)
- ✅ Smooth animations
- ✅ Dark mode support
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Form validation
- ✅ Visual feedback untuk setiap action

---

## 🧪 Testing

### Cara Test:
1. Buka terminal di folder `decoisme`
2. Run: `npm run dev`
3. Buka browser: `http://localhost:3000`
4. Scroll ke Pricing section
5. Klik "Order Carousel"
6. Test semua steps
7. Cek WhatsApp message yang di-generate

### Yang Perlu Dicek:
- [ ] Navigasi antar steps lancar
- [ ] Harga update otomatis
- [ ] Form validation bekerja
- [ ] WhatsApp link berfungsi
- [ ] Responsive di mobile
- [ ] Dark mode OK
- [ ] Animasi smooth

---

## 📂 Files Yang Diubah

1. **`app/order/page.tsx`** - NEW ✨
   - Halaman order lengkap

2. **`components/sections/pricing-section.tsx`** - UPDATED
   - "up to 3 slides" (bukan 5)
   - Button link ke `/order`

3. **`app/page.tsx`** - UPDATED
   - Hapus `<PriceCalculator />`

4. **`components/sections/price-calculator.tsx`** - DEPRECATED
   - Tidak dipakai lagi (bisa dihapus)

---

## 🚀 Status

- ✅ Build successful
- ✅ No TypeScript errors
- ✅ Ready for testing
- ⏳ Perlu update WhatsApp number
- ⏳ Perlu testing di browser

---

## 💡 Tips

1. **Untuk Client:**
   - Jelaskan bahwa harga adalah "estimasi"
   - Final price dikonfirmasi via chat
   - Bisa nego untuk project besar

2. **Untuk Development:**
   - Test di mobile first
   - Pastikan WhatsApp number benar
   - Monitor form submissions

3. **Untuk Marketing:**
   - Highlight "up to 3 slides" di social media
   - Promosikan express delivery option
   - Showcase discount options

---

**Build Status:** ✅ Success  
**Last Updated:** May 11, 2026  
**Next:** Update WhatsApp number & test di browser
