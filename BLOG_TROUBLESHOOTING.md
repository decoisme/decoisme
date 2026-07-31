# 🔧 Blog System Troubleshooting

## ❌ Masalah: Fungsi Tidak Bekerja

Jika button Edit, Delete, Visibility, dan View tidak bekerja, kemungkinan penyebabnya:

---

## 🔍 Diagnosa Masalah

### Step 1: Cek Browser Console

1. **Buka Browser** (Chrome/Edge)
2. **Tekan F12** untuk buka DevTools
3. **Klik tab "Console"**
4. **Refresh page** (Ctrl+R)
5. **Lihat error messages**

#### Error yang Mungkin Muncul:

**Error 1: Table tidak ditemukan**
```
Error: relation "blog_posts" does not exist
```
**Solusi**: Database belum disetup ➜ Lanjut ke Step 2

**Error 2: Permission denied**
```
Error: permission denied for table blog_posts
```
**Solusi**: RLS policy salah ➜ Lanjut ke Step 3

**Error 3: Supabase client null**
```
Error: Cannot read properties of null
```
**Solusi**: Credentials salah ➜ Lanjut ke Step 4

---

### Step 2: Setup Database (CRITICAL!)

**Kemungkinan besar ini masalahnya!** Kalau database belum disetup, semua fungsi tidak akan bekerja.

#### Cara Setup:

1. **Login ke Supabase**
   ```
   https://supabase.com/dashboard
   ```

2. **Pilih Project Kamu**

3. **Buka SQL Editor**
   - Klik "SQL Editor" di sidebar kiri
   - Klik "New Query"

4. **Copy & Paste SQL**
   - Buka file: `SETUP_BLOG_SUPABASE.sql`
   - Copy **SEMUA ISI FILE**
   - Paste ke SQL Editor

5. **Run SQL**
   - Klik tombol "Run" (atau Ctrl+Enter)
   - Tunggu sampai selesai (5-10 detik)

6. **Verify Table Created**
   ```sql
   SELECT * FROM blog_posts;
   ```
   - Harus return 3 sample posts
   - Kalau error "table does not exist" → Setup gagal

#### Verifikasi Manual:

1. **Go to Table Editor**
   - Klik "Table Editor" di sidebar
   - Cari table `blog_posts`
   - Kalau tidak ada → Setup belum dijalankan

2. **Check Columns**
   Table harus punya columns:
   - ✓ id (UUID)
   - ✓ slug (TEXT)
   - ✓ title (TEXT)
   - ✓ description (TEXT)
   - ✓ content (TEXT)
   - ✓ author (TEXT)
   - ✓ category (TEXT)
   - ✓ tags (ARRAY)
   - ✓ cover_image (TEXT)
   - ✓ published (BOOLEAN)
   - ✓ published_at (TIMESTAMPTZ)
   - ✓ reading_time (INTEGER)
   - ✓ created_at (TIMESTAMPTZ)
   - ✓ updated_at (TIMESTAMPTZ)

---

### Step 3: Cek RLS Policies

Jika table ada tapi button tidak bekerja:

1. **Buka Supabase Dashboard**
2. **Go to Authentication → Policies**
3. **Find `blog_posts` table**
4. **Verify policies exist:**

   ✓ **Public can view published blog posts**
   ```sql
   Policy for: SELECT
   Using: published = true
   ```

   ✓ **Authenticated users can do everything**
   ```sql
   Policy for: ALL
   Using: auth.role() = 'authenticated'
   ```

#### Jika Policy Tidak Ada:

Run SQL ini:
```sql
-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public can view published blog posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);

-- Admin all access
CREATE POLICY "Authenticated users can do everything"
  ON blog_posts
  FOR ALL
  USING (auth.role() = 'authenticated');
```

---

### Step 4: Cek Supabase Credentials

1. **Buka file `.env.local`**

2. **Verify credentials:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Test Connection:**
   - Open browser console (F12)
   - Paste this:
   ```javascript
   const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
   const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
   console.log('URL:', url);
   console.log('Key:', key ? 'Set ✓' : 'Missing ✗');
   ```

4. **Kalau Missing:**
   - Get dari Supabase Dashboard → Settings → API
   - Copy "Project URL" dan "anon public" key
   - Paste ke `.env.local`
   - **Restart dev server** (Ctrl+C, npm run dev)

---

### Step 5: Cek Supabase Client

1. **Buka file `lib/supabase.ts`**

2. **Verify function `getSupabase()`:**
   ```typescript
   export function getSupabase() {
     const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
     const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
     
     if (!url || !key) {
       console.error('Supabase credentials missing!');
       return null;
     }
     
     return createClient(url, key);
   }
   ```

3. **Test dalam browser console:**
   ```javascript
   import { getSupabase } from '@/lib/supabase';
   const client = getSupabase();
   console.log('Client:', client);
   ```

---

## 🧪 Testing Individual Functions

### Test 1: Fetch Posts

1. **Open browser console (F12)**
2. **Paste:**
   ```javascript
   const { createClient } = await import('@supabase/supabase-js');
   const url = 'YOUR_SUPABASE_URL';
   const key = 'YOUR_SUPABASE_KEY';
   const client = createClient(url, key);
   
   const { data, error } = await client
     .from('blog_posts')
     .select('*');
   
   console.log('Data:', data);
   console.log('Error:', error);
   ```

3. **Expected:**
   - `Data:` array of posts (or empty array)
   - `Error:` null

4. **If Error:**
   - "relation does not exist" → Database tidak disetup
   - "permission denied" → RLS policy salah
   - "Invalid API key" → Credentials salah

---

### Test 2: Toggle Publish

1. **Buka admin panel blog**
2. **Open browser console**
3. **Click eye icon pada post**
4. **Watch console for errors**

Expected flow:
```
1. Click button
2. setActionLoading('publish-post-id')
3. Supabase UPDATE query
4. Toast notification
5. fetchPosts() refresh
6. setActionLoading(null)
```

Jika stuck pada step 2-3:
- **Check Supabase query failed**
- **Check RLS policy**

---

### Test 3: Delete Post

1. **Click trash icon**
2. **Confirm dialog appears?**
   - Yes → Good
   - No → JavaScript error (check console)

3. **Click OK**
4. **Watch console**

Expected:
```
DELETE FROM blog_posts WHERE id = 'post-id'
Toast: "Post deleted successfully!"
```

---

### Test 4: Edit Post

1. **Click pencil icon**
2. **Page scrolls to top?**
   - Yes → Good
   - No → Check `window.scrollTo()` works

3. **Form opens with data?**
   - Yes → Good
   - No → Check `setFormData()` function

---

### Test 5: View Post

1. **Click document icon**
2. **New tab opens?**
   - Yes → Good
   - No → Check browser popup blocker

3. **Post displays?**
   - Yes → Good
   - No → Check `/blog/[slug]/page.tsx`

---

## 🛠️ Quick Fixes

### Fix 1: Clear Cache & Rebuild

```bash
# Stop server (Ctrl+C)

# Clear Next.js cache
rmdir /s /q .next

# Reinstall dependencies
npm install

# Rebuild
npm run build

# Start dev server
npm run dev
```

---

### Fix 2: Reset Database

**⚠️ WARNING: Ini akan delete semua posts!**

```sql
-- Drop table
DROP TABLE IF EXISTS blog_posts CASCADE;

-- Run setup SQL again
-- (Copy paste from SETUP_BLOG_SUPABASE.sql)
```

---

### Fix 3: Hard Refresh Browser

```
1. Ctrl+Shift+R (hard refresh)
2. Ctrl+Shift+Delete (clear cache)
3. Restart browser
```

---

### Fix 4: Check Admin Authentication

```typescript
// In browser console
const auth = localStorage.getItem('admin_authenticated');
console.log('Authenticated:', auth);

// If null:
localStorage.setItem('admin_authenticated', 'true');
location.reload();
```

---

## 📋 Complete Diagnostic Checklist

Run through ini satu per satu:

**Database:**
- [ ] Supabase project created
- [ ] `SETUP_BLOG_SUPABASE.sql` executed
- [ ] Table `blog_posts` exists
- [ ] 3 sample posts inserted
- [ ] RLS enabled
- [ ] Policies created

**Credentials:**
- [ ] `.env.local` file exists
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] Dev server restarted after env change

**Code:**
- [ ] `lib/supabase.ts` exists
- [ ] `getSupabase()` function works
- [ ] `app/admin/dashboard/blog/page.tsx` exists
- [ ] No TypeScript errors (npm run build)

**Browser:**
- [ ] JavaScript enabled
- [ ] No console errors
- [ ] LocalStorage allowed
- [ ] Cookies enabled
- [ ] Popup blocker disabled

**Authentication:**
- [ ] Logged in to admin panel
- [ ] `admin_authenticated` in localStorage
- [ ] Session not expired

---

## 🆘 Still Not Working?

### Option 1: Run Dev Server & Check

```bash
npm run dev
```

Then:
1. Open http://localhost:3000/admin
2. Login
3. Click "BLOG"
4. Open console (F12)
5. Try clicking any button
6. **Copy paste error dari console** dan kasih tau saya

---

### Option 2: Test Database Manually

1. **Login ke Supabase**
2. **Go to Table Editor**
3. **Click `blog_posts` table**
4. **Manually add post:**
   - Click "Insert row"
   - Fill: title, slug, content, description
   - Save
5. **Refresh admin panel**
6. **Post muncul?**
   - Yes → Fetch works, buttons might be problem
   - No → Connection issue

---

### Option 3: Screenshot Error

1. **Buka admin blog page**
2. **Open console (F12)**
3. **Click any button**
4. **Screenshot console errors**
5. **Share screenshot**

---

## 🎯 Most Common Issues & Solutions

### Issue: "No posts yet. Create your first one!"

**Penyebab:**
- Database kosong (belum ada posts)
- Fetch query gagal

**Solusi:**
1. Check console for errors
2. Run `SETUP_BLOG_SUPABASE.sql` untuk insert sample posts
3. Atau manually create post

---

### Issue: Button Click Tidak Ada Reaksi

**Penyebab:**
- JavaScript error
- Event handler tidak attached

**Solusi:**
1. Check console errors
2. Hard refresh (Ctrl+Shift+R)
3. Clear cache

---

### Issue: Toast Notification Tidak Muncul

**Penyebab:**
- Sonner not imported
- Toast container missing

**Solusi:**
1. Check `import { toast } from 'sonner';`
2. Check `<Toaster />` in layout
3. Check package installed: `npm list sonner`

---

### Issue: "Database not configured"

**Penyebab:**
- `getSupabase()` returns null
- Credentials missing

**Solusi:**
1. Check `.env.local` exists
2. Check credentials set
3. Restart dev server

---

## ✅ Verification Steps

Setelah fix, verify semua works:

1. **Fetch posts** → Posts muncul di list
2. **Toggle visibility** → Icon berubah, toast muncul
3. **Edit post** → Form terbuka, scroll ke atas
4. **Save edit** → Post terupdate
5. **Delete post** → Confirm dialog, post hilang
6. **View post** → Tab baru terbuka
7. **Create new post** → Form kosong, save berhasil

---

**Kalau masih tidak bekerja setelah semua step ini, kemungkinan:**
1. Database belum disetup (paling sering!)
2. Credentials salah
3. RLS policy blocking

**Copy error message dari console dan info apa yang sudah dicoba!** 🔍
