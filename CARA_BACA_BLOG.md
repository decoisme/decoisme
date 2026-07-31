# 📖 Cara Membaca Blog - User Flow

## 🎯 Alur Pengunjung (Visitor Journey)

```
┌─────────────────────────────────────────────────────────┐
│  STEP 1: Homepage (Landing Page)                        │
│  URL: http://localhost:3000/                            │
│  atau: https://decoisme.com/                            │
├─────────────────────────────────────────────────────────┤
│  Di halaman ini ada:                                    │
│  • Navigation/Menu di atas                              │
│  • File Explorer di kiri (sidebar)                      │
│  • Ada item "blog/" dengan icon folder                  │
└─────────────────────────────────────────────────────────┘
                           │
                           │ Pengunjung klik "blog/"
                           ▼
┌─────────────────────────────────────────────────────────┐
│  STEP 2: Blog Index (Daftar Semua Blog)                │
│  URL: http://localhost:3000/blog                        │
│  atau: https://decoisme.com/blog                        │
├─────────────────────────────────────────────────────────┤
│  Tampilan:                                              │
│  • Header: "Insights & Case Studies"                    │
│  • Filter kategori: All, Design, Tutorial, dll          │
│  • List semua blog post (yang published)                │
│  • Setiap item menampilkan:                             │
│    - Nomor urut (01, 02, 03...)                         │
│    - Kategori badge                                     │
│    - Tanggal publish                                    │
│    - Reading time (misal: "5 min read")                 │
│    - Judul blog (besar, bold)                           │
│    - Deskripsi singkat                                  │
│    - Tags (Design, UI/UX, etc)                          │
│    - Arrow icon di kanan (▶)                            │
└─────────────────────────────────────────────────────────┘
                           │
                           │ Pengunjung klik judul atau arrow
                           ▼
┌─────────────────────────────────────────────────────────┐
│  STEP 3: Individual Blog Post (Halaman Baca)           │
│  URL: http://localhost:3000/blog/[slug]                │
│  Contoh: http://localhost:3000/blog/my-design-process  │
│  atau: https://decoisme.com/blog/my-design-process     │
├─────────────────────────────────────────────────────────┤
│  Tampilan:                                              │
│  • Back button → kembali ke /blog                       │
│  • Category badge                                       │
│  • Judul besar (H1)                                     │
│  • Deskripsi                                            │
│  • Meta: Date, Reading time, Author                     │
│  • Tags                                                 │
│  • ──────────────────────────                           │
│  • KONTEN LENGKAP BLOG (Markdown → HTML)                │
│    - Heading (h1, h2, h3)                               │
│    - Paragraphs                                         │
│    - Bold, italic text                                  │
│    - Lists, quotes, code blocks (jika ada)              │
│  • ──────────────────────────                           │
│  • Footer CTA:                                          │
│    [Contact Me] [More Posts]                            │
└─────────────────────────────────────────────────────────┘
                           │
                           │ Pengunjung bisa:
                           ▼
                    ┌──────┴──────┐
                    │             │
            Klik "More Posts"   Klik "Contact Me"
                    │             │
                    ▼             ▼
              Kembali ke       Go to contact
              /blog page       page
```

---

## 🔗 Link Yang Tersedia

### 1. Di Homepage (Navigation)

**Lokasi:** File explorer sidebar kiri
```
Structure/
  components/
  pages/
  blog/ ← KLIK INI
  styles/
  contact.tsx
```

**Action:** Klik "blog/" → Redirect ke `/blog`

---

### 2. Di Halaman `/blog`

**Link ke individual post:**
```html
<!-- Setiap blog card adalah link -->
<a href="/blog/[slug]">
  <h2>Judul Blog Post</h2>
  <p>Deskripsi...</p>
</a>
```

**Contoh:**
- `/blog/my-first-design-project`
- `/blog/figma-tutorial-beginners`
- `/blog/case-study-ecommerce-redesign`

---

### 3. Di Halaman `/blog/[slug]`

**Link kembali:**
```
← Back to Blog  (ke /blog)
```

**Link footer:**
```
[Contact Me]   (ke /contact)
[More Posts]   (ke /blog)
```

---

## 📝 Contoh Real URLs

### Development (Local):
```
Homepage:     http://localhost:3000/
Blog Index:   http://localhost:3000/blog
Blog Post 1:  http://localhost:3000/blog/my-design-process
Blog Post 2:  http://localhost:3000/blog/figma-to-code
Blog Post 3:  http://localhost:3000/blog/brutalist-design-guide
```

### Production (Setelah Deploy):
```
Homepage:     https://decoisme.com/
Blog Index:   https://decoisme.com/blog
Blog Post 1:  https://decoisme.com/blog/my-design-process
Blog Post 2:  https://decoisme.com/blog/figma-to-code
Blog Post 3:  https://decoisme.com/blog/brutalist-design-guide
```

---

## 🎨 Tampilan Visual

### Blog Index Page (`/blog`):

```
┌────────────────────────────────────────────────────┐
│  ← Home    BLOG.INDEX                              │
│                                                    │
│  Insights &                                        │
│  Case Studies                                      │
│                                                    │
│  [All] [Design] [Tutorial] [Case Study]           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│  ┌──────────────────────────────────────────────┐ │
│  │ 01  [DESIGN]  📅 Jan 15, 2026  🕐 5 min      │ │
│  │                                              │ │
│  │ My First Design Project                      │ │
│  │ A deep dive into the design process...       │ │
│  │ #Design #UI/UX #Figma                  ▶    │ │
│  └──────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────┐ │
│  │ 02  [TUTORIAL]  📅 Jan 20, 2026  🕐 8 min    │ │
│  │                                              │ │
│  │ Figma to Code: Complete Guide                │ │
│  │ Learn how to convert Figma designs...        │ │
│  │ #Development #React #Figma           ▶      │ │
│  └──────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────┐ │
│  │ 03  [CASE STUDY]  📅 Jan 25, 2026  🕐 10 min │ │
│  │                                              │ │
│  │ E-commerce Redesign: Results 2x              │ │
│  │ How we increased conversion rate...          │ │
│  │ #CaseStudy #Ecommerce #UX            ▶      │ │
│  └──────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

### Individual Blog Post (`/blog/[slug]`):

```
┌────────────────────────────────────────────────────┐
│  ← Back to Blog                                    │
│                                                    │
│  [DESIGN]                                          │
│                                                    │
│  My First Design Project                           │
│                                                    │
│  A deep dive into the design process and          │
│  everything I learned along the way.              │
│                                                    │
│  📅 January 15, 2026  🕐 5 min read               │
│  by Muhammad Dinan Ghifari                        │
│  #Design #UI/UX #Figma                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                                    │
│  # Introduction                                    │
│                                                    │
│  This is my first major design project. I         │
│  learned a lot about...                           │
│                                                    │
│  ## The Design Process                            │
│                                                    │
│  1. Research and discovery                        │
│  2. Wireframing in Figma                          │
│  3. High-fidelity mockups                         │
│                                                    │
│  **Key Takeaways:**                               │
│  - Always start with user research                │
│  - Iterate based on feedback                      │
│                                                    │
│  [Full markdown content here...]                  │
│                                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│  Liked this post?                                 │
│  Get in touch for design & development projects.  │
│  [CONTACT ME]  [MORE POSTS]                       │
└────────────────────────────────────────────────────┘
```

---

## 🧭 Navigation Map

```
                    Homepage (/)
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    Projects         Blog (/)          Contact
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   Design Posts    Tutorial Posts   Case Studies
        │                │                │
        └────────────────┴────────────────┘
                         │
                Individual Post
                  (/blog/[slug])
```

---

## ✅ Yang Sudah Tersedia

### Link di Homepage:
- ✅ Sidebar file explorer → "blog/" folder
- ✅ Klik folder → Navigate ke `/blog`

### Link di `/blog`:
- ✅ "← Back to Home" button
- ✅ Setiap blog post → Clickable card
- ✅ Category filters (All, Design, Tutorial, dll)

### Link di `/blog/[slug]`:
- ✅ "← Back to Blog" button
- ✅ "More Posts" button → Kembali ke `/blog`
- ✅ "Contact Me" button → Ke `/contact`

---

## 🎯 Kesimpulan

### Untuk Membaca Blog Yang Sudah Ada:

**Pengunjung akan:**
1. Masuk ke website Anda → `http://localhost:3000/`
2. Klik "blog/" di sidebar navigation
3. Diarahkan ke → `http://localhost:3000/blog`
4. Lihat daftar semua blog posts
5. Klik judul blog yang ingin dibaca
6. Diarahkan ke → `http://localhost:3000/blog/[slug]`
7. Baca konten lengkap blog post

**URL Pattern:**
```
/blog              → List semua blog
/blog/slug-1       → Blog post pertama
/blog/slug-2       → Blog post kedua
/blog/slug-3       → Blog post ketiga
```

**Slug** adalah URL-friendly version dari judul:
- "My First Design" → `my-first-design`
- "Figma Tutorial 2026" → `figma-tutorial-2026`
- "Case Study: E-commerce" → `case-study-ecommerce`

---

## 🚀 Test Sekarang

### Langkah Test:

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Buka browser:**
   ```
   http://localhost:3000/
   ```

3. **Test navigation:**
   ```
   Klik "blog/" di sidebar
   → Harusnya muncul page dengan list blog
   → Klik salah satu blog
   → Harusnya muncul konten blog lengkap (BUKAN 404!)
   ```

4. **Test URLs langsung:**
   ```
   http://localhost:3000/blog
   (Lihat list blog)
   
   http://localhost:3000/blog/my-design-process-2026
   (Contoh: sesuaikan dengan slug yang ada di database)
   ```

---

## ⚠️ Penting!

### Jika Masih 404:

**Pastikan:**
1. ✅ Database ada posts dengan `published = true`
2. ✅ Slug di URL match dengan slug di database
3. ✅ Run `FIX_BLOG_RLS_POLICY.sql` di Supabase
4. ✅ Dev server running (`npm run dev`)

**Check Database:**
```sql
-- Run di Supabase SQL Editor:
SELECT slug, title, published 
FROM blog_posts 
WHERE published = true;

-- Copy slug dari hasil query
-- Paste ke URL: /blog/[slug-dari-database]
```

**Contoh:**
```
Query result:
slug: "my-first-post"
title: "My First Post"
published: true

Try URL:
http://localhost:3000/blog/my-first-post
```

---

**Sekarang sudah jelas?** 🎯

Pengunjung akan:
1. Homepage → Klik "blog/" 
2. `/blog` → Klik judul post
3. `/blog/[slug]` → Baca konten lengkap

Semua link sudah tersedia dan bekerja! ✅
