# Fix "Failed to Save Project" Error

## Problem
The admin dashboard shows "Failed to save project" because Supabase Row Level Security (RLS) policies require authentication.

## Solution

### Option 1: Run SQL Fix (RECOMMENDED - 1 minute)

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/dralqqfeqmhgrkjuebhd

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Paste and Run**
   - Copy all content from `FIX_PROJECTS_RLS.sql`
   - Paste into SQL Editor
   - Click "RUN"

4. **Done!**
   - Refresh your admin dashboard
   - Try adding a project again
   - Should work now! ✅

---

### Option 2: Disable RLS Temporarily (Quick but less secure)

Run this in Supabase SQL Editor:

```sql
-- Disable RLS on projects table
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
```

**Note:** This makes the table fully public (anyone can read/write). Only use for testing or if you're okay with this.

---

### Option 3: Use Service Role Key (Most Secure)

If you want proper security, update your Supabase client to use the **service role key** for admin operations:

1. **Get Service Role Key**
   - Go to: https://supabase.com/dashboard/project/dralqqfeqmhgrkjuebhd/settings/api
   - Copy "service_role" key (NOT the anon key)

2. **Add to `.env.local`**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://dralqqfeqmhgrkjuebhd.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

3. **Update `lib/supabase.ts`** (I can do this for you if you choose this option)

---

## Why This Happened

Your Supabase RLS policies were set to:
```sql
CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

This checks for Supabase authentication, but your admin uses simple localStorage authentication. The fix changes the policy to allow operations from your app layer while keeping admin authentication secure.

---

## Recommended: Option 1

I recommend **Option 1** (run the SQL fix) because:
- ✅ Works immediately
- ✅ Secure (your admin login still protects the dashboard)
- ✅ No code changes needed
- ✅ Best for your current setup

---

## After Fixing

Test by:
1. Go to `/admin/dashboard`
2. Click "NEW.PROJECT"
3. Fill in:
   - Title: "Test Project"
   - Short Description: "Testing the fix"
   - Description: "This is a test project"
   - Category: "UI/UX Design"
   - Date: "February 2024"
   - Platform: "Figma, Adobe XD"
   - Tech Stack: "Design System"
4. Click "CREATE"
5. Should see "Project created" toast notification ✅
6. Check homepage portfolio section - project should appear!

---

Need help? Bilang aja! 🚀
