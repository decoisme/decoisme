# 📝 CARA EDIT TESTIMONIALS DI SUPABASE

## ✅ Status: SUDAH TERINTEGRASI
Testimonials section di website kamu **SUDAH** fetch data dari Supabase. Setiap perubahan yang kamu buat di Supabase akan **langsung muncul** di website (refresh browser).

---

## 🎯 LANGKAH-LANGKAH EDIT TESTIMONIALS

### 1️⃣ **Buka Supabase Dashboard**
- Login ke [https://supabase.com](https://supabase.com)
- Pilih project: **decoisme**

### 2️⃣ **Masuk ke Table Editor**
- Sidebar kiri → klik **"Table Editor"**
- Pilih table: **`testimonials`**

### 3️⃣ **Lihat Data yang Ada**
Kamu akan melihat table dengan kolom:
- `id` - ID unik (auto-generated)
- `client_name` - Nama client (contoh: "BUDI SANTOSO")
- `client_company` - Nama perusahaan (contoh: "UMKM.QRIS")
- `review` - Isi review/testimonial
- `project_type` - Jenis project (contoh: "Carousel Post")
- `date` - Tanggal (format: "2024.01")
- `order_index` - Urutan tampil (1, 2, 3, dst)
- `is_published` - Tampil di website? (true/false)
- `created_at` / `updated_at` - Auto timestamps

---

## ✏️ CARA EDIT TESTIMONIAL YANG SUDAH ADA

### **Method 1: Edit Langsung di Table Editor**
1. Klik pada **cell** yang mau kamu edit
2. Edit text-nya
3. Tekan **Enter** atau klik di luar cell
4. **Refresh browser** untuk lihat perubahan di website

### **Method 2: Edit via Row Menu**
1. Hover pada row yang mau diedit
2. Klik **icon pensil** (edit) di kiri row
3. Edit field yang mau diubah
4. Klik **"Save"**
5. **Refresh browser**

---

## ➕ CARA TAMBAH TESTIMONIAL BARU

### **Method 1: Insert Row (Recommended)**
1. Klik tombol **"+ Insert row"** di atas table
2. Isi semua field:
   ```
   client_name: "NAMA CLIENT" (uppercase)
   client_company: "NAMA.PERUSAHAAN" (uppercase, pakai dots)
   review: "Review lengkap dari client..."
   project_type: "Carousel Post" / "Brand Design" / "UI Design" / etc
   date: "2024.05" (format YYYY.MM)
   order_index: 7 (urutan berikutnya)
   is_published: true (centang checkbox)
   ```
3. Klik **"Save"**
4. **Refresh browser**

### **Method 2: Duplicate Row**
1. Hover pada row yang mau diduplikasi
2. Klik **icon 3 dots** → **"Duplicate row"**
3. Edit data duplikatnya
4. Klik **"Save"**

---

## 🗑️ CARA HAPUS TESTIMONIAL

### **Method 1: Soft Delete (Recommended)**
Lebih baik **sembunyikan** daripada hapus permanen:
1. Edit row yang mau disembunyikan
2. Set `is_published` = **false** (uncheck)
3. Save
4. Testimonial **tidak akan muncul** di website, tapi **data masih ada** di database

### **Method 2: Hard Delete (Permanent)**
⚠️ **HATI-HATI**: Data akan **hilang permanen**!
1. Hover pada row yang mau dihapus
2. Klik **icon 3 dots** → **"Delete row"**
3. Confirm deletion
4. **Refresh browser**

---

## 🔢 CARA GANTI URUTAN TESTIMONIAL

Testimonials ditampilkan berdasarkan **`order_index`** (ascending):

1. Edit `order_index` dari row yang mau dipindah
   - `order_index = 1` → Tampil **paling atas**
   - `order_index = 2` → Tampil kedua
   - Dan seterusnya...

2. Contoh: Mau pindah review "JESSICA TAN" dari posisi 6 ke posisi 1?
   - Edit row JESSICA TAN → set `order_index = 1`
   - Edit row BUDI SANTOSO → set `order_index = 2`
   - Edit row SARAH WIJAYA → set `order_index = 3`
   - Dan seterusnya...

3. Save semua perubahan
4. **Refresh browser**

---

## 🎨 FORMAT STYLE GUIDE

Supaya konsisten dengan design brutalist, ikuti format ini:

### **Client Name**
- ✅ **GOOD**: "BUDI SANTOSO" (all caps, spasi)
- ❌ **BAD**: "budi santoso", "Budi Santoso"

### **Client Company**
- ✅ **GOOD**: "UMKM.QRIS", "SKINCARE.BRAND", "TECH.STARTUP"
- ❌ **BAD**: "Umkm Qris", "skincare brand"
- Format: **UPPERCASE** dengan **dots** (.) sebagai separator

### **Project Type**
- Contoh: "Carousel Post", "Brand Design", "UI Design", "Social Media", "Campaign Design"
- Gunakan **Title Case**

### **Date**
- Format: **"YYYY.MM"**
- ✅ **GOOD**: "2024.05", "2024.12"
- ❌ **BAD**: "May 2024", "2024-05", "05/2024"

### **Review**
- Tulis natural, campur Indo/English boleh
- Panjang ideal: **50-150 kata**
- Fokus pada **hasil konkret** dan **pengalaman kerja**

---

## 🔒 SECURITY & PERMISSIONS

**RLS (Row Level Security) sudah aktif:**
- ✅ **Public**: Bisa **READ** testimonials yang `is_published = true`
- ✅ **Admin** (authenticated): Bisa **CRUD** semua data
- ❌ **Public**: **TIDAK BISA** edit/delete data

Jadi, data kamu **aman**. User biasa hanya bisa lihat, tidak bisa edit.

---

## 🐛 TROUBLESHOOTING

### **Testimonial tidak muncul di website?**
1. ✅ Pastikan `is_published` = **true**
2. ✅ Refresh browser dengan **hard reload**: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac)
3. ✅ Cek console browser untuk error: `F12` → Tab "Console"

### **Urutan testimonial salah?**
- Cek `order_index` nya. Urutan diurutkan dari **angka terkecil ke terbesar**.

### **Data tidak tersave?**
- Pastikan semua **required fields** terisi: `client_name`, `client_company`, `review`, `project_type`, `date`

### **Website masih pakai sample data?**
- Pastikan file `.env.local` sudah diisi dengan Supabase credentials yang benar
- Restart dev server: `npm run dev`

---

## 📊 TIPS & BEST PRACTICES

1. **Keep it Real**: Pakai testimonial asli dari client beneran
2. **Mix Indo & English**: Sesuai dengan target audience (local + international)
3. **Specific Results**: Mention angka konkret (contoh: "engagement naik 300%")
4. **Variety**: Campur berbagai project types
5. **Update Regularly**: Tambah testimonial baru secara berkala
6. **Social Proof**: Pakai nama perusahaan yang recognizable

---

## 📝 SAMPLE SQL QUERIES (OPTIONAL)

Kalau mau edit via SQL Editor, bisa pakai query ini:

```sql
-- Tambah testimonial baru
INSERT INTO testimonials (client_name, client_company, review, project_type, date, order_index)
VALUES ('JOHN DOE', 'STARTUP.ID', 'Amazing work!', 'UI Design', '2024.05', 7);

-- Update review
UPDATE testimonials 
SET review = 'New review text here'
WHERE client_name = 'BUDI SANTOSO';

-- Sembunyikan testimonial
UPDATE testimonials 
SET is_published = false
WHERE id = 'uuid-here';

-- Hapus testimonial (permanent)
DELETE FROM testimonials WHERE id = 'uuid-here';

-- Lihat semua testimonials (sorted)
SELECT * FROM testimonials ORDER BY order_index;
```

---

## ✅ CHECKLIST

Sebelum publish perubahan, pastikan:
- [ ] Semua nama client di-**UPPERCASE**
- [ ] Company name pakai format **DOTS** (COMPANY.NAME)
- [ ] Date pakai format **YYYY.MM**
- [ ] `is_published` = **true**
- [ ] `order_index` sudah benar
- [ ] Review **tidak ada typo**
- [ ] Test di **browser** (refresh halaman)

---

**DONE!** 🎉

Sekarang kamu bisa edit testimonials **kapan saja** langsung dari Supabase Dashboard. Semua perubahan akan **auto-sync** ke website.
