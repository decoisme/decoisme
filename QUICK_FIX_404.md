# ⚡ Quick Fix 404 - 5 Menit

## 🎯 Langkah Cepat (Ikuti Urutan!)

### 1. Check Database Ada Post (1 menit)

```
Visit: http://localhost:3000/blog/test-db
```

**❌ Jika tidak bisa akses:**
```bash
# Restart server dulu:
Ctrl+C
npm run dev
```

**❌ Jika "No posts found":**
```
Buat post baru dulu! (Lanjut ke STEP 1B)
```

**✅ Jika ada posts:**
```
Click button "TEST URL" pada salah satu post
→ Masih 404? Lanjut ke STEP 2
```

---

### 1B. Buat Post Test (2 menit)

**Jika database kosong, buat post dulu:**

```
1. Visit: http://localhost:3000/admin
2. Login: admin@decoisme.com / admin123
3. Click "BLOG"
4. Click "NEW POST"
5. Isi:
   Title: Test Post
   Slug: test-post
   Description: Testing 123
   Content: # Hello World\n\nThis is a test.
   Published: ✓ CENTANG!
6. Click "SAVE POST"
7. Test URL: http://localhost:3000/blog/test-post
```

**Masih 404?** Lanjut ke STEP 2.

---

### 2. Check Console Logs (1 menit)

```
1. F12 (buka DevTools)
2. Tab "Console"
3. Clear (icon 🚫)
4. Visit: http://localhost:3000/blog/test-post
5. Lihat logs
```

**Copy semua logs dan kasih tau saya!**

Contoh yang saya butuh:
```
[lib/blog] getPostBySlugHybrid called for: test-post
[lib/blog] Fetching post by slug: test-post
[lib/blog] Post found: Test Post
```

Atau error:
```
[lib/blog] Supabase client is null
[lib/blog] Error fetching post: ...
```

---

### 3. Run SQL Fix (2 menit)

**Mungkin RLS blocking:**

```
1. https://supabase.com/dashboard
2. SQL Editor → New Query
3. Copy file: FIX_BLOG_RLS_POLICY.sql
4. Paste & Run
5. Test URL lagi
```

---

### 4. Clear Cache & Restart (1 menit)

**Jika masih 404:**

```bash
# Stop server
Ctrl+C

# Clear build cache
rmdir /s /q .next

# Restart
npm run dev

# Hard refresh browser
Ctrl+Shift+R

# Test URL lagi
```

---

## 📊 Quick Checklist

Cek ini cepat:

- [ ] Dev server running? (`npm run dev`)
- [ ] File `.env.local` ada?
- [ ] Database punya post dengan `published = true`?
- [ ] Slug di URL sesuai dengan database? (case-sensitive!)
- [ ] RLS policy sudah di-fix?

---

## 🆘 Masih 404?

**Kasih tau saya:**

1. Screenshot dari `http://localhost:3000/blog/test-db`
2. Console logs (F12 → Console tab)
3. URL yang Anda coba

Saya akan fix dengan pasti! 🎯

---

## 📁 Files Untuk Debug Lengkap

Jika quick fix tidak berhasil, baca:

- `DEBUG_404.md` - Step by step lengkap
- `CHECK_BLOG_DATA.sql` - Query untuk check database
- Visit `/blog/test-db` - Test database connection

**Kita pasti bisa solve ini!** 💪
