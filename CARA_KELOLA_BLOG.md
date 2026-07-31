# 📝 Cara Mengelola Blog - Panduan Cepat

## 🚀 Setup Awal (Hanya Sekali)

### 1. Setup Database Supabase

1. **Buka Supabase Dashboard**
   - Login ke https://supabase.com
   - Pilih project kamu

2. **Jalankan SQL**
   - Klik "SQL Editor" di sidebar
   - Klik "New Query"
   - Buka file `SETUP_BLOG_SUPABASE.sql` di folder project
   - Copy **semua isi file**
   - Paste ke SQL Editor
   - Klik "Run" atau tekan `Ctrl+Enter`

3. **Cek Berhasil**
   - Klik "Table Editor"
   - Cari table `blog_posts`
   - Harus ada 3 sample posts

✅ **Setup selesai!** Kamu nggak perlu ngulang step ini lagi.

---

## ✍️ Cara Bikin Post Baru

### Method 1: Via Admin Panel (Paling Mudah) 👍

1. **Login ke Admin**
   ```
   URL: https://[domain-kamu]/admin
   Masukkan username & password
   ```

2. **Buka Blog Management**
   - Klik tombol "BLOG" di header
   - Atau langsung ke: `/admin/dashboard/blog`

3. **Klik "NEW POST"**

4. **Isi Form:**
   - **Title**: Judul post (misal: "Tips Design Instagram")
   - **Slug**: URL-friendly version (misal: "tips-design-instagram")
   - **Description**: Ringkasan 1-2 kalimat untuk SEO
   - **Content**: Isi post kamu (pakai Markdown)
   - **Category**: Pilih kategori
   - **Tags**: Pisahkan dengan koma (misal: "design, instagram, tips")
   - **Reading Time**: Otomatis dihitung
   - **Publish**: Centang kalau mau langsung publish

5. **Klik "SAVE POST"**

✅ Post berhasil dibuat!

### Method 2: Via MDX File (Advanced)

1. **Buat file baru** di folder `content/blog/`
   ```
   content/blog/nama-post-kamu.mdx
   ```

2. **Template MDX:**
   ```mdx
   ---
   title: "Judul Post Kamu"
   description: "Deskripsi singkat untuk SEO"
   date: "2026-02-01"
   author: "Muhammad Dinan Ghifari"
   category: "Design"
   tags: ["Design", "Tutorial", "Instagram"]
   coverImage: "/blog/cover.jpg"
   ---

   # Judul Utama

   Isi post kamu di sini...

   ## Section 2

   Lebih banyak konten...
   ```

3. **Save & Build**
   ```bash
   npm run build
   ```

---

## 📝 Format Markdown (Untuk Content)

### Heading / Judul
```markdown
# Heading 1 (Paling Besar)
## Heading 2 (Sedang)
### Heading 3 (Kecil)
```

### Text Formatting
```markdown
**Bold text** (Tebal)
*Italic text* (Miring)
[Link text](https://example.com)
```

### List / Daftar
```markdown
- Item 1
- Item 2
- Item 3

Atau bernomor:

1. Item pertama
2. Item kedua
3. Item ketiga
```

### Code
```markdown
Inline code: `const x = 10;`

Block code:
```javascript
function hello() {
  console.log("Hello World");
}
```
```

### Blockquote
```markdown
> Ini adalah quote atau kutipan
> Bisa banyak baris
```

### Image
```markdown
![Alt text](/path/to/image.jpg)
```

---

## 🔄 Edit Post yang Sudah Ada

1. **Buka Admin Panel**
   - Login ke `/admin`
   - Klik "BLOG"

2. **Cari Post yang Mau Diedit**
   - Scroll ke list post di bawah

3. **Klik Icon Pensil (Edit)**
   - Form akan terbuka dengan data yang ada

4. **Edit Apa yang Perlu**
   - Ubah title, content, dll

5. **Klik "SAVE POST"**

✅ Post berhasil diupdate!

---

## 👁️ Publish / Unpublish Post

### Publish Post (Tampilkan di Web)
1. Buka admin panel blog
2. Cari post yang masih "Draft"
3. **Klik icon mata (Eye)**
4. Status berubah jadi "Published"
5. Post langsung muncul di `/blog`

### Unpublish Post (Sembunyikan)
1. Cari post yang "Published"
2. **Klik icon mata dengan garis (Eye Off)**
3. Status berubah jadi "Draft"
4. Post hilang dari `/blog` tapi masih ada di admin

---

## 🗑️ Hapus Post

1. **Buka Admin Panel**
2. **Klik Icon Tong Sampah (Trash)**
3. **Confirm "Are you sure?"**
4. Post terhapus permanen

⚠️ **PERINGATAN**: Nggak bisa di-undo! Backup dulu kalau penting.

---

## 👀 Preview Post Sebelum Publish

### Cara 1: Save as Draft Dulu
1. **Uncheck "Publish Immediately"**
2. Klik "SAVE POST"
3. **Klik icon dokumen** di list post
4. Post terbuka di tab baru
5. Cek tampilan, formatting, link
6. Kalau sudah OK, kembali ke admin dan publish

### Cara 2: Dev Server
```bash
npm run dev
```
Buka: `http://localhost:3000/blog/slug-post-kamu`

---

## 📂 Kategori Post

### Kategori yang Tersedia:
- **Design** - Tips design, prinsip, teori
- **Tutorial** - Step-by-step guide
- **Case Study** - Breakdown project
- **Development** - Coding tutorial
- **Business** - Client work, pricing, tips bisnis

### Buat Kategori Baru:
Tinggal tulis nama baru di dropdown "Category" waktu bikin post.

---

## 🏷️ Tips Menulis Post yang Bagus

### 1. Judul yang Menarik
```
❌ Bad: "Design Tips"
✅ Good: "10 Design Tips Instagram yang Terbukti Tingkatkan Engagement"
```

### 2. Hook di Paragraf Pertama
Langsung tangkap perhatian reader di kalimat pertama:
```
✅ "Setelah design 50+ carousel Instagram untuk klien, 
   ini yang saya pelajari..."
```

### 3. Struktur Jelas
```
1. Hook (kalimat pertama yang menarik)
2. Problem (apa masalahnya?)
3. Solution (solusi kamu)
4. Steps/Examples (contoh konkret)
5. Conclusion (ringkasan + CTA)
```

### 4. Visual / Gambar
- Pakai screenshot
- Before/after comparison
- Infografis sederhana
- Break up text yang panjang

### 5. Actionable
Kasih advice yang bisa langsung dipraktekin:
```
❌ Bad: "Design yang bagus itu penting"
✅ Good: "Pakai font size minimum 16px untuk body text di mobile"
```

### 6. SEO-Friendly
- Pakai keyword di title
- Pakai keyword di 100 kata pertama
- Pakai keyword di heading (H2/H3)
- Internal link ke post lain
- External link ke sumber terpercaya

---

## 📅 Jadwal Posting

### Minggu 1-2: Build Momentum
- **Frekuensi**: 1 post per minggu
- **Focus**: Quality over quantity
- **Goal**: 3-4 posts di bulan pertama

### Bulan 2-3: Konsistensi
- **Frekuensi**: 2 post per minggu
- **Focus**: Mix kategori (tutorial, case study, tips)
- **Goal**: 8-12 posts per bulan

### Bulan 4+: Scale
- **Frekuensi**: 3+ post per minggu
- **Focus**: SEO optimization, topik trending
- **Goal**: 12-16 posts per bulan

---

## 🎯 Ide Konten (Content Ideas)

### Quick Posts (30-60 menit):
1. "3 Kesalahan Design yang Sering Saya Lihat"
2. "Tools Design Favorit Saya di 2026"
3. "Before/After: Project [Nama]"
4. "Tips Cepat: [Topik Spesifik]"
5. "Behind the Scenes: [Project]"

### In-Depth Posts (2-3 jam):
1. "Panduan Lengkap: [Topik]"
2. "Case Study: [Project Name] - Budget $X"
3. "Cara Saya Dapat Klien Pertama"
4. "Step-by-Step: [Tutorial]"
5. "Dari Nol ke [Achievement] dalam [Timeframe]"

### Series Posts:
1. "Design Instagram Series" (Part 1, 2, 3...)
2. "PowerPoint Tutorial Series"
3. "Client Stories Series"
4. "Design Challenge Series"

---

## 📊 Tracking Success

### Metrics to Track:
1. **Traffic** - Berapa visitor per post?
2. **Engagement** - Berapa lama mereka baca?
3. **Conversions** - Berapa yang contact kamu?
4. **SEO** - Ranking di Google?
5. **Social Shares** - Berapa kali di-share?

### Tools:
- **Google Analytics** - Traffic data
- **Google Search Console** - SEO performance
- **Vercel Analytics** - Page performance

---

## 🆘 Troubleshooting

### Post Nggak Muncul di /blog
**Cek:**
- [ ] Post status "Published"? (bukan Draft)
- [ ] `published_at` date terisi?
- [ ] Database connected? (cek `.env.local`)
- [ ] Refresh halaman dengan `Ctrl+F5`

### Markdown Nggak Render
**Cek:**
- [ ] Spasi setelah `#` heading: `# Judul` ✅ bukan `#Judul` ❌
- [ ] Double enter antar paragraf
- [ ] Pakai straight quotes `"` bukan curly quotes `""`

### Admin Panel Nggak Bisa Diakses
**Solusi:**
1. Logout dulu
2. Clear browser cache
3. Login lagi
4. Coba akses blog management

### Reading Time Nggak Update
**Solusi:**
- Delete angka yang ada
- Ketik lagi manual
- Atau biarkan auto-calculate saat typing content

---

## 📱 Shortcut URLs

### Admin:
```
Login:        /admin
Dashboard:    /admin/dashboard
Blog Manage:  /admin/dashboard/blog
```

### Public:
```
Blog List:    /blog
Single Post:  /blog/[slug]
Homepage:     /
```

### Quick Actions:
```
New Post:     Admin → BLOG → NEW POST
Edit Post:    Admin → BLOG → Pencil Icon
Preview:      Admin → BLOG → Document Icon
Publish:      Admin → BLOG → Eye Icon
Delete:       Admin → BLOG → Trash Icon
```

---

## ✅ Quick Checklist: Bikin Post Baru

Sebelum publish, cek ini semua:

- [ ] **Title** menarik dan jelas
- [ ] **Slug** URL-friendly (lowercase, dash)
- [ ] **Description** ditulis untuk SEO
- [ ] **Content** minimal 500 kata
- [ ] **Heading** terstruktur (H1, H2, H3)
- [ ] **Paragraph** nggak terlalu panjang (max 3-4 baris)
- [ ] **Link** semua berfungsi
- [ ] **Category** dipilih
- [ ] **Tags** relevan (3-5 tags)
- [ ] **Reading time** sesuai
- [ ] **Preview** di draft mode dulu
- [ ] **Proofreading** typo & grammar
- [ ] **Mobile** cek di HP
- [ ] **Publish** kalau sudah OK!

---

## 💡 Pro Tips

1. **Batch Writing** - Tulis 3-4 post sekaligus, schedule publish
2. **Repurpose** - 1 case study jadi 5 tips posts
3. **Evergreen** - Tulis topik yang relevan setahun kemudian
4. **Update Old Posts** - Refresh konten lama dengan info baru
5. **Internal Linking** - Link antar post untuk SEO
6. **Save Drafts Often** - Jangan sampe hilang progress
7. **Templates** - Bikin template untuk post type tertentu
8. **Voice** - Tulis seperti ngobrol, jangan terlalu formal
9. **Storytelling** - Kasih contoh real dari experience kamu
10. **CTA** - Selalu ada call-to-action di akhir post

---

**Selamat Menulis! 🚀**

Kalau ada pertanyaan atau masalah, cek `BLOG_DEPLOYMENT_GUIDE.md` untuk detail lengkap.
