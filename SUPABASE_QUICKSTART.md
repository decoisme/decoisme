# 🚀 Supabase Quick Start (5 Menit)

## Step 1: Buat Project Supabase

1. Buka https://supabase.com → Sign in
2. Klik "New Project"
3. Isi nama & password → Create
4. Tunggu 2 menit

## Step 2: Copy API Keys

1. Settings (⚙️) → API
2. Copy:
   - **Project URL**
   - **anon public key**

## Step 3: Setup Database

1. SQL Editor → New query
2. Copy & paste SQL dari `supabase-schema.sql`
3. Klik "Run"

## Step 4: Setup Environment

Buat file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

## Step 5: Restart Server

```bash
npm run dev
```

## ✅ Test

- Buka http://localhost:3000
- Cek apakah projects muncul
- Test contact form

**Done!** 🎉

---

**Need detailed guide?** Lihat `SUPABASE_SETUP_LENGKAP.md`
