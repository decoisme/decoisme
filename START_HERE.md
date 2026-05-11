# 🎯 START HERE: Hero Image Fix

## ⚠️ You Got This Error:
```
ERROR: ❌ Expected 4 policies, found 1
```

## ✅ Simple Fix (2 Minutes)

### 📝 Step 1: Run New SQL Script

**File to use:** `SETUP_HERO_IMAGE_FINAL.sql` ⚠️ (NOT the old one!)

1. Open **Supabase Dashboard** → **SQL Editor**
2. Open file: `SETUP_HERO_IMAGE_FINAL.sql`
3. Copy **ALL** code
4. Paste in SQL Editor
5. Click **Run**

**You should see:**
```
✅ Bucket "images" created and is public
✅ All 4 storage policies created successfully
✅ Table "hero_settings" created successfully
✅ Default hero_settings record created successfully

========================================
✅ SETUP COMPLETE!
========================================
```

---

### 🖼️ Step 2: Upload Image

1. **Restart server:**
   ```bash
   npm run dev
   ```

2. **Login:** http://localhost:3000/admin

3. **Upload:**
   - Click **"Hero Image"** tab
   - Click **"Upload Image"** button (yellow)
   - Select image (max 5MB)
   - Wait for success message

---

### ✅ Step 3: Check Homepage

1. Open: http://localhost:3000
2. Hero image should display
3. No errors in Console (F12)

---

## 🎉 Done!

That's it! Your hero image should now work.

---

## 📚 More Help?

- **Quick guide:** `QUICK_FIX_HERO_IMAGE.md`
- **Policy error fix:** `FIX_POLICY_ERROR.md`
- **Complete guide:** `HERO_IMAGE_COMPLETE_FIX.md`
- **Checklist:** `CHECKLIST_HERO_IMAGE.md`

---

**Time:** 2 minutes  
**Difficulty:** Easy  
**File:** `SETUP_HERO_IMAGE_FINAL.sql`

🚀 Go!
