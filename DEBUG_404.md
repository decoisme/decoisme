# 🔍 Debug 404 Error - Step by Step

## 🚨 Masih 404? Mari kita cari tahu kenapa!

---

## 📋 Langkah Debug Sistematis

### STEP 1: Check Database Ada Data

**Cara:**
1. Login ke https://supabase.com/dashboard
2. Pilih project Anda
3. Klik **"SQL Editor"** di sidebar
4. Klik **"New Query"**
5. Copy isi file `CHECK_BLOG_DATA.sql`
6. Paste & Run

**Yang Harus Muncul:**
```sql
-- Result harus ada data:
table_exists: true
total_posts: 3 (atau lebih)
published_posts: 1 (atau lebih)

-- Dan list slugs seperti:
slug                    | published
------------------------|----------
my-design-process-2026  | true
figma-tutorial         | true
```

**❌ Jika Tidak Ada Data:**
```
MASALAH: Database kosong!
SOLUSI: Buat post baru di admin panel dulu
```

**✅ Jika Ada Data:**
```
Lanjut ke STEP 2
Copy salah satu slug untuk testing
```

---

### STEP 2: Test Database Connection

**Cara:**
1. Pastikan dev server running: `npm run dev`
2. Buka browser: `http://localhost:3000/blog/test-db`
3. Lihat hasil

**Yang Harus Muncul:**
```
✓ NEXT_PUBLIC_SUPABASE_URL: Set
✓ NEXT_PUBLIC_SUPABASE_ANON_KEY: Set
Total Posts: 3

List posts dengan button "TEST URL"
```

**❌ Jika Credentials Missing:**
```
MASALAH: .env.local tidak ter-load
SOLUSI:
1. Stop dev server (Ctrl+C)
2. Check file .env.local ada
3. Check isi nya benar
4. Restart: npm run dev
```

**❌ Jika "No posts found":**
```
MASALAH: Database kosong atau RLS blocking
SOLUSI:
1. Run FIX_BLOG_RLS_POLICY.sql di Supabase
2. Atau buat post baru di admin panel
```

**✅ Jika Ada Posts:**
```
Click button "TEST URL: /blog/[slug]"
Lihat apakah masih 404
```

---

### STEP 3: Check Console Logs

**Cara:**
1. Buka browser DevTools (F12)
2. Go to **Console** tab
3. Clear console (icon 🚫)
4. Visit: `http://localhost:3000/blog/[slug-dari-database]`
5. Lihat console output

**Yang Harus Muncul:**
```
[lib/blog] getPostBySlugHybrid called for: [slug]
[lib/blog] Fetching post by slug: [slug]
[lib/blog] Post found: [title]
[BlogPostPage] Requested slug: [slug]
[BlogPostPage] Post found: true
[BlogPostPage] Post title: [title]
```

**❌ Jika Muncul:**
```
[lib/blog] Supabase client is null
→ MASALAH: Env variables tidak ter-load
→ SOLUSI: Restart dev server

[lib/blog] Error fetching post: [error]
→ MASALAH: Database error atau RLS
→ SOLUSI: Run FIX_BLOG_RLS_POLICY.sql

[lib/blog] No post found for slug: [slug]
→ MASALAH: Slug tidak ada di database
→ SOLUSI: Check spelling atau buat post baru

[BlogPostPage] Post is NULL - calling notFound()
→ MASALAH: Query return null
→ SOLUSI: Check database & RLS policy
```

---

### STEP 4: Check Terminal Logs

**Cara:**
1. Lihat terminal tempat `npm run dev` jalan
2. Visit blog URL
3. Lihat output di terminal

**Yang Harus Muncul:**
```
[lib/blog] getPostBySlugHybrid called for: [slug]
[lib/blog] Fetching post by slug: [slug]
[lib/blog] Post found: [title]
```

**❌ Jika Muncul Error:**
```
Catat error nya dan lanjut ke STEP 5
```

---

### STEP 5: Manual Test Query

**Cara:**
1. Login Supabase Dashboard
2. Go to SQL Editor
3. Run query ini (ganti 'your-slug' dengan slug Anda):

```sql
-- Test query exactly like the app does:
SELECT * FROM blog_posts 
WHERE slug = 'your-slug' 
AND published = true;
```

**Expected Result:**
```
Harus return 1 row dengan data post
```

**❌ Jika Return 0 Rows:**
```
KEMUNGKINAN 1: Slug salah
→ Check spelling

KEMUNGKINAN 2: Published = false
→ Change to: SELECT * FROM blog_posts WHERE slug = 'your-slug';
→ Jika muncul tapi published = false, toggle di admin panel

KEMUNGKINAN 3: Slug tidak exists
→ Buat post baru dengan slug sederhana: "test-post"
```

---

## 🎯 Common Issues & Solutions

### Issue 1: Database Kosong

**Symptoms:**
- Test page shows "No posts found"
- Query returns 0 rows

**Solution:**
```
1. Go to: http://localhost:3000/admin
2. Login (admin@decoisme.com / admin123)
3. Click "BLOG"
4. Click "NEW POST"
5. Fill form:
   Title: Test Post
   Slug: test-post
   Description: Testing
   Content: # Hello World
   Published: ✓ CHECKED (IMPORTANT!)
6. Save
7. Test URL: http://localhost:3000/blog/test-post
```

---

### Issue 2: RLS Policy Blocking

**Symptoms:**
- Console shows "RLS policy" error
- Query returns null despite data exists

**Solution:**
```
🚨 RUN FIX_BLOG_RLS_POLICY.SQL!

1. Supabase Dashboard → SQL Editor
2. Copy FIX_BLOG_RLS_POLICY.sql
3. Run
4. Test again
```

---

### Issue 3: Env Variables Not Loaded

**Symptoms:**
- Console: "Supabase client is null"
- Test page: "Missing credentials"

**Solution:**
```
1. Check file exists: .env.local
2. Check contents:
   NEXT_PUBLIC_SUPABASE_URL=https://...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
3. Stop dev server (Ctrl+C)
4. Restart: npm run dev
5. Test again
```

---

### Issue 4: Wrong Slug

**Symptoms:**
- Console: "No post found for slug: [slug]"
- Query returns 0 rows

**Solution:**
```
1. Go to: http://localhost:3000/blog/test-db
2. See exact slugs from database
3. Copy slug EXACTLY (case-sensitive!)
4. Use in URL: /blog/[exact-slug]
```

---

### Issue 5: Cache Issue

**Symptoms:**
- Everything looks correct but still 404

**Solution:**
```
1. Stop dev server (Ctrl+C)
2. Delete .next folder:
   rmdir /s /q .next
3. Restart: npm run dev
4. Hard refresh browser: Ctrl+Shift+R
5. Test again
```

---

## 📊 Debug Checklist

Run through ini satu per satu:

### Environment:
- [ ] ✅ .env.local file exists
- [ ] ✅ NEXT_PUBLIC_SUPABASE_URL is set
- [ ] ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY is set
- [ ] ✅ Dev server restarted after env changes

### Database:
- [ ] ✅ blog_posts table exists (run CHECK_BLOG_DATA.sql)
- [ ] ✅ Has at least 1 post with published = true
- [ ] ✅ RLS policy allows public read (run FIX_BLOG_RLS_POLICY.sql)
- [ ] ✅ Can query posts via SQL Editor

### Code:
- [ ] ✅ /blog/test-db shows posts
- [ ] ✅ Console logs show "Post found: true"
- [ ] ✅ Slug in URL matches slug in database (exact!)
- [ ] ✅ No TypeScript errors in build

### Server:
- [ ] ✅ Dev server running (npm run dev)
- [ ] ✅ No errors in terminal
- [ ] ✅ .next folder cleared and rebuilt
- [ ] ✅ Browser cache cleared (Ctrl+Shift+R)

---

## 🚀 Quick Test Flow

**Fastest way to test:**

```bash
# 1. Restart server
Ctrl+C
npm run dev

# 2. Test database connection
# Open: http://localhost:3000/blog/test-db
# Should show posts

# 3. Click "TEST URL" button on any post
# Should NOT be 404

# 4. Check console logs
# Should show "Post found: true"
```

---

## 📝 Report Back

**Jika masih 404, kasih tau saya:**

1. **Hasil dari `/blog/test-db`:**
   - Ada posts? Berapa?
   - Ada error?

2. **Console logs:**
   - Copy semua log yang ada
   - Paste ke chat

3. **Database check:**
   - Run CHECK_BLOG_DATA.sql
   - Berapa banyak posts?
   - Copy hasil query

4. **Slug yang dicoba:**
   - URL apa yang Anda test?
   - Example: http://localhost:3000/blog/test-post

Dengan info ini saya bisa fix dengan pasti! 🎯

---

## 🔄 Next Steps

1. ✅ Run **CHECK_BLOG_DATA.sql** di Supabase
2. ✅ Visit **http://localhost:3000/blog/test-db**
3. ✅ Click **"TEST URL"** button pada post
4. ✅ Check **Console logs** (F12)
5. ✅ Report hasil ke saya

**Kita akan solve ini!** 💪
