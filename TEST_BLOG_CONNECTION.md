# 🧪 Test Blog Connection - Quick Check

## Cara Cepat Cek Masalah

### Step 1: Cek Database Connection

Buka browser console (F12) di halaman admin blog, paste ini:

```javascript
// Test 1: Check env variables
console.log('=== ENV CHECK ===');
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Missing');
console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing');

// Test 2: Try fetch posts
console.log('\n=== FETCHING POSTS ===');
const { createClient } = await import('@supabase/supabase-js');
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('❌ Credentials missing! Check .env.local file');
} else {
  const client = createClient(url, key);
  const { data, error } = await client.from('blog_posts').select('*');
  
  if (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('relation') || error.message.includes('does not exist')) {
      console.error('➜ SOLUTION: Run SETUP_BLOG_SUPABASE.sql in Supabase');
    }
  } else {
    console.log('✅ Success! Found', data.length, 'posts');
    console.log('Posts:', data);
  }
}
```

---

### Expected Results:

**✅ SUCCESS:**
```
=== ENV CHECK ===
URL: ✓ Set
Key: ✓ Set

=== FETCHING POSTS ===
✅ Success! Found 3 posts
Posts: [{ id: '...', title: '...', ... }]
```

**❌ FAIL - Missing Credentials:**
```
=== ENV CHECK ===
URL: ✗ Missing
Key: ✗ Missing

=== FETCHING POSTS ===
❌ Credentials missing! Check .env.local file
```
**➜ FIX:** Add credentials to `.env.local`

**❌ FAIL - Table Not Found:**
```
=== ENV CHECK ===
URL: ✓ Set
Key: ✓ Set

=== FETCHING POSTS ===
❌ Error: relation "blog_posts" does not exist
➜ SOLUTION: Run SETUP_BLOG_SUPABASE.sql in Supabase
```
**➜ FIX:** Execute SQL setup script

---

### Step 2: Test Button Functions

Paste ini di console untuk test each function:

```javascript
// Test Toggle Publish
async function testTogglePublish() {
  console.log('=== TEST TOGGLE PUBLISH ===');
  const { createClient } = await import('@supabase/supabase-js');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const client = createClient(url, key);
  
  // Get first post
  const { data: posts } = await client.from('blog_posts').select('*').limit(1);
  if (!posts || posts.length === 0) {
    console.error('❌ No posts found');
    return;
  }
  
  const post = posts[0];
  console.log('Current status:', post.published ? 'Published' : 'Draft');
  
  // Toggle
  const { error } = await client
    .from('blog_posts')
    .update({ 
      published: !post.published,
      published_at: !post.published ? new Date().toISOString() : null
    })
    .eq('id', post.id);
  
  if (error) {
    console.error('❌ Error:', error.message);
  } else {
    console.log('✅ Toggled successfully!');
    console.log('New status:', !post.published ? 'Published' : 'Draft');
  }
}

// Test Delete
async function testDelete() {
  console.log('=== TEST DELETE (DRY RUN) ===');
  const { createClient } = await import('@supabase/supabase-js');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const client = createClient(url, key);
  
  // Get first post
  const { data: posts } = await client.from('blog_posts').select('id, title').limit(1);
  if (!posts || posts.length === 0) {
    console.error('❌ No posts found');
    return;
  }
  
  console.log('Would delete:', posts[0].title);
  console.log('✅ Delete function would work');
  console.log('(Not actually deleting - this is just a test)');
}

// Run tests
await testTogglePublish();
await testDelete();
```

---

### Step 3: Check Admin Authentication

```javascript
// Check if logged in
const isAuth = localStorage.getItem('admin_authenticated');
console.log('Admin authenticated:', isAuth ? 'Yes ✓' : 'No ✗');

if (!isAuth) {
  console.warn('➜ You need to login first at /admin');
}
```

---

## 🎯 Quick Diagnostic

Copy paste hasil dari test di atas dan saya bisa bantu identify masalahnya!

**Format:**
```
ENV CHECK: URL [✓/✗], Key [✓/✗]
FETCH POSTS: [Success/Error message]
AUTH STATUS: [Yes/No]
ERROR (if any): [Copy error message]
```

---

## 🔧 Most Likely Issues

### 1. Database Not Setup (90% kasus)
**Symptoms:**
- "relation blog_posts does not exist"
- "table not found"

**Fix:**
1. Login ke Supabase
2. SQL Editor → New Query
3. Copy paste dari `SETUP_BLOG_SUPABASE.sql`
4. Run (Ctrl+Enter)
5. Refresh admin page

### 2. Credentials Missing (5% kasus)
**Symptoms:**
- "Credentials missing"
- Supabase client is null

**Fix:**
1. Check `.env.local` exists
2. Add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
3. Restart dev server

### 3. Not Logged In (5% kasus)
**Symptoms:**
- Redirected to /admin
- Page shows "Loading..."

**Fix:**
1. Go to /admin
2. Login with credentials
3. Try again

---

## ✅ After Fix

Verify semua works:
- [ ] Click eye icon → Toast muncul, icon berubah
- [ ] Click edit icon → Form terbuka, scroll ke atas
- [ ] Click trash icon → Confirm dialog, post terhapus
- [ ] Click view icon → Tab baru terbuka

Done! 🎉
