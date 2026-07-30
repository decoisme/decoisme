# Cara Upload Logo Client ke Supabase - Quick Guide

## 🎯 STEP-BY-STEP (5 Menit)

### STEP 1: Setup Database Table
1. Buka **Supabase Dashboard** → SQL Editor
2. Copy-paste isi file `SETUP_CLIENT_LOGOS_SUPABASE.sql`
3. Click **RUN**
4. ✅ Table `client_logos` created!

### STEP 2: Create Storage Bucket
1. Buka **Supabase Dashboard** → Storage
2. Click **New Bucket**
3. Isi form:
   - **Name**: `client-logos`
   - **Public bucket**: ✅ CHECKMARK (penting!)
   - **File size limit**: 2 MB
   - **Allowed MIME types**: `image/png, image/jpeg, image/svg+xml`
4. Click **Create Bucket**
5. ✅ Bucket created!

### STEP 3: Upload Logo Files
1. Masih di Storage → Click bucket `client-logos`
2. Click **Upload File** button
3. Pilih logo-logo dari computer kamu (boleh berwarna!)
4. Upload semua sekaligus
5. ✅ Files uploaded!

**Nama file recommended**:
- `tokopedia.png`
- `gojek.png`
- `shopee.png`
- `bukalapak.png`
- dst...

### STEP 4: Copy Public URLs
Untuk setiap logo:
1. Click logo file di list
2. Copy **Public URL** (di sebelah kanan)
3. Paste ke notepad sementara

**Contoh URL**:
```
https://dralqqfeqmhgrkjuebhd.supabase.co/storage/v1/object/public/client-logos/tokopedia.png
```

### STEP 5: Update Database dengan URLs
1. Balik ke SQL Editor
2. Run query ini (ganti URL dengan URL real):

```sql
-- Update Tokopedia
UPDATE client_logos 
SET logo_url = 'https://dralqqfeqmhgrkjuebhd.supabase.co/storage/v1/object/public/client-logos/tokopedia.png'
WHERE name = 'TOKOPEDIA';

-- Update Gojek
UPDATE client_logos 
SET logo_url = 'https://dralqqfeqmhgrkjuebhd.supabase.co/storage/v1/object/public/client-logos/gojek.png'
WHERE name = 'GOJEK';

-- Update Shopee
UPDATE client_logos 
SET logo_url = 'https://dralqqfeqmhgrkjuebhd.supabase.co/storage/v1/object/public/client-logos/shopee.png'
WHERE name = 'SHOPEE';

-- ... dst untuk semua logo
```

3. Click **RUN**
4. ✅ URLs updated!

### STEP 6: Verify
1. Run query:
```sql
SELECT * FROM client_logos ORDER BY order_index;
```

2. Check semua `logo_url` sudah berisi URL Supabase yang benar
3. ✅ Done!

---

## 🚀 SELESAI!

Website kamu sekarang:
- ✅ Logo auto-fetch dari Supabase
- ✅ Logo berwarna auto-jadi B&W dengan CSS
- ✅ Hover menampilkan warna asli
- ✅ Auto-scrolling infinite loop

---

## 🎨 BONUS: Tambah Logo Baru (Kapan Saja)

### Via SQL (Cepat):
```sql
-- 1. Upload logo ke Storage dulu
-- 2. Copy public URL
-- 3. Run query ini:

INSERT INTO client_logos (name, logo_url, website_url, order_index)
VALUES ('NETFLIX', 'https://...url-logo-netflix.png', 'https://netflix.com', 9);
```

### Via Admin Dashboard (Nanti):
Bisa bikin form CRUD di admin dashboard untuk manage logos lebih mudah!

---

## 📋 CHECKLIST

- [ ] Run SQL setup script
- [ ] Create `client-logos` bucket (PUBLIC!)
- [ ] Upload logo files (berwarna OK!)
- [ ] Copy public URLs
- [ ] Update database dengan URLs
- [ ] Verify dengan SELECT query
- [ ] Refresh website → logo muncul!

---

## 💡 TIPS

### Logo Preparation:
- Format: **PNG dengan transparent background** (BEST!)
- Ukuran: 120x60px atau 240x120px (@2x retina)
- File size: Max 200KB (compress pakai TinyPNG)
- Warna: **Boleh berwarna** (CSS auto-convert jadi B&W!)

### Troubleshooting:
**Logo tidak muncul?**
- Check URL di database benar (copy dari Storage)
- Pastikan bucket `client-logos` set PUBLIC
- Check `is_published = true` di table
- Refresh hard (Ctrl+Shift+R)

**Logo masih placeholder?**
- Supabase belum dikonfigurasi → fallback ke sample
- Check `.env.local` ada SUPABASE_URL & ANON_KEY

---

## 🎊 RESULT

Logo berwarna kamu akan otomatis:
1. ✅ Jadi **B&W** (grayscale) by default
2. ✅ **Hover** menampilkan warna asli
3. ✅ **Auto-scroll** infinite loop
4. ✅ **Smooth** gradient fade kiri-kanan

**DONE! Logo ticker ready!** 🚀
