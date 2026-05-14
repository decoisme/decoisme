# 🚀 Admin Dashboard - Quick Setup

## ⚡ 3 Steps Setup (2 Menit)

### Step 1: Set Password

Edit file `.env.local` (buat jika belum ada):

```env
# Admin Credentials
NEXT_PUBLIC_ADMIN_EMAIL=admin@decoisme.com
ADMIN_PASSWORD=your_password_here
```

**⚠️ GANTI `your_password_here` dengan password kamu!**

### Step 2: Restart Server

```bash
npm run dev
```

### Step 3: Login

1. Buka: http://localhost:3000/admin
2. Login dengan:
   - Email: `admin@decoisme.com`
   - Password: Password yang kamu set di Step 1

---

## ✅ Done!

Sekarang kamu bisa:
- ✅ Upload hero image
- ✅ Manage projects
- ✅ View messages
- ✅ View statistics

---

## 🔐 Security Features

### ✅ Protected Routes
- Tidak bisa akses `/admin/dashboard` tanpa login
- Otomatis redirect ke login page
- Session expires setelah 7 hari

### ✅ Secure Authentication
- HTTP-only cookies (tidak bisa diakses JavaScript)
- Middleware protection
- Environment variables untuk credentials

---

## 🐛 Troubleshooting

### Can't Login?

1. **Check `.env.local` exists:**
   ```bash
   ls -la .env.local
   ```

2. **Restart server:**
   ```bash
   # Stop: Ctrl+C
   npm run dev
   ```

3. **Clear browser cookies:**
   - Chrome: Ctrl+Shift+Delete
   - Or use Incognito mode

### Still Can't Access Dashboard?

1. Check console (F12) for errors
2. Make sure email matches exactly: `admin@decoisme.com`
3. Make sure password matches `.env.local`
4. Try different browser

---

## 📝 Default Credentials (For Testing)

If `.env.local` doesn't exist or `ADMIN_PASSWORD` not set:

- **Email:** `admin@decoisme.com`
- **Password:** `admin123`

**⚠️ CHANGE THIS IN PRODUCTION!**

---

## 🎯 Features Available

### 1. Hero Image Tab
- Upload hero image untuk homepage
- Drag & drop support
- Preview current image
- Max 5MB, JPG/PNG/WebP

### 2. Projects Tab
- Add/Edit/Delete projects
- Upload project images
- Manage project details
- Gallery images support

### 3. Messages Tab
- View contact form submissions
- Mark as read/unread
- See submission time

### 4. Statistics Tab
- Total projects count
- Total messages count
- Unread messages count

---

## 🔒 Production Checklist

Before deploy:

- [ ] Change admin password to strong password
- [ ] Don't commit `.env.local` to git
- [ ] Use different credentials for production
- [ ] Enable HTTPS (automatic on Vercel/Netlify)

---

**Time:** 2 minutes  
**Difficulty:** Easy  
**Status:** ✅ Ready to use

🚀 Start now!
