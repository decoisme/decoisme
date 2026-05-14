# 🔐 Admin Authentication Setup

## Overview

Admin dashboard dilindungi dengan authentication system yang menggunakan:
- **HTTP-only cookies** untuk security
- **Middleware** untuk protect routes
- **API routes** untuk login/logout
- **Environment variables** untuk credentials

---

## 🚀 Setup

### Step 1: Configure Environment Variables

1. **Copy `.env.example` to `.env.local`:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` dan set admin credentials:**
   ```env
   # Admin Credentials
   NEXT_PUBLIC_ADMIN_EMAIL=admin@decoisme.com
   ADMIN_PASSWORD=your_secure_password_here
   ```

   **⚠️ IMPORTANT:**
   - Change `ADMIN_PASSWORD` to a strong password
   - Never commit `.env.local` to git
   - Use different credentials for production

### Step 2: Restart Dev Server

```bash
npm run dev
```

---

## 🔑 Login

### Access Admin Dashboard

1. **Go to:** http://localhost:3000/admin
2. **Enter credentials:**
   - Email: `admin@decoisme.com` (or your custom email)
   - Password: Your password from `.env.local`
3. **Click "Sign In"**

### Default Demo Credentials

For testing purposes:
- **Email:** `admin@decoisme.com`
- **Password:** `admin123` (default, change in `.env.local`)

---

## 🛡️ Security Features

### 1. HTTP-Only Cookies
- Authentication token stored in HTTP-only cookie
- Cannot be accessed by JavaScript (XSS protection)
- Automatically sent with requests

### 2. Middleware Protection
- File: `middleware.ts`
- Automatically checks authentication before accessing `/admin/dashboard/*`
- Redirects to login if not authenticated

### 3. Secure API Routes
- `/api/admin/login` - Validates credentials and sets cookie
- `/api/admin/logout` - Clears authentication cookie

### 4. Environment Variables
- Credentials stored in `.env.local` (not in code)
- Different credentials for dev/production

---

## 🔒 Route Protection

### Protected Routes
- `/admin/dashboard` - Main dashboard
- `/admin/dashboard/*` - All dashboard pages

### Public Routes
- `/admin` - Login page
- `/` - Homepage
- All other public pages

### How It Works

```
User tries to access /admin/dashboard
         ↓
Middleware checks cookie
         ↓
   Cookie valid?
    ↓         ↓
   Yes        No
    ↓         ↓
  Allow    Redirect to /admin
```

---

## 🔧 Customization

### Change Admin Email

Edit `.env.local`:
```env
NEXT_PUBLIC_ADMIN_EMAIL=your-email@example.com
```

### Change Admin Password

Edit `.env.local`:
```env
ADMIN_PASSWORD=your_new_secure_password
```

### Add Multiple Admins

Currently supports single admin. To add multiple admins:

1. **Option A: Use Supabase Auth** (Recommended for production)
   - Create `auth.users` table
   - Implement Supabase authentication
   - Add role-based access control

2. **Option B: Simple array** (Quick solution)
   
   Edit `app/api/admin/login/route.ts`:
   ```typescript
   const ADMINS = [
     { email: 'admin1@decoisme.com', password: 'password1' },
     { email: 'admin2@decoisme.com', password: 'password2' },
   ];

   const admin = ADMINS.find(
     (a) => a.email === email && a.password === password
   );

   if (admin) {
     // Login successful
   }
   ```

---

## 🐛 Troubleshooting

### Issue 1: Can't Login

**Symptoms:**
- "Invalid credentials" error
- Login button doesn't work

**Solutions:**
1. Check `.env.local` exists and has correct credentials
2. Restart dev server after changing `.env.local`
3. Clear browser cookies and try again
4. Check browser console for errors

### Issue 2: Redirected to Login After Login

**Symptoms:**
- Login successful but immediately redirected back
- Can't access dashboard

**Solutions:**
1. Clear browser cookies
2. Check middleware.ts is working
3. Check browser allows cookies
4. Try incognito/private mode

### Issue 3: "Unauthorized" After Some Time

**Symptoms:**
- Logged out automatically
- Need to login again

**Explanation:**
- Cookie expires after 7 days (default)
- This is normal security behavior

**Solution:**
- Login again
- To change expiry, edit `app/api/admin/login/route.ts`:
  ```typescript
  maxAge: 60 * 60 * 24 * 30, // 30 days
  ```

### Issue 4: Can Access Dashboard Without Login

**Symptoms:**
- Can access `/admin/dashboard` without logging in
- Security not working

**Solutions:**
1. Check `middleware.ts` exists in root directory
2. Restart dev server
3. Clear browser cache
4. Check middleware config:
   ```typescript
   export const config = {
     matcher: ['/admin/dashboard/:path*'],
   };
   ```

---

## 🔐 Production Security

### Before Deploying to Production:

1. **Change Admin Password**
   ```env
   ADMIN_PASSWORD=very_strong_password_here_123!@#
   ```

2. **Use Strong Password**
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Don't use common words

3. **Enable HTTPS**
   - Cookies only work over HTTPS in production
   - Vercel/Netlify automatically provide HTTPS

4. **Consider Supabase Auth**
   - More secure than simple password
   - Built-in features: password reset, email verification
   - Role-based access control

5. **Add Rate Limiting**
   - Prevent brute force attacks
   - Use middleware or API route protection

6. **Monitor Access**
   - Log login attempts
   - Alert on suspicious activity

---

## 📊 Session Management

### Cookie Settings

```typescript
{
  httpOnly: true,           // Cannot be accessed by JavaScript
  secure: true,             // Only sent over HTTPS (production)
  sameSite: 'strict',       // CSRF protection
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',                // Available for all routes
}
```

### Session Duration
- **Default:** 7 days
- **Auto-logout:** After cookie expires
- **Manual logout:** Click "Logout" button

---

## 🚀 Upgrade to Supabase Auth (Recommended)

For production, consider upgrading to Supabase Auth:

### Benefits:
- ✅ Secure password hashing
- ✅ Email verification
- ✅ Password reset
- ✅ Multiple admin users
- ✅ Role-based access control
- ✅ Session management
- ✅ OAuth providers (Google, GitHub, etc.)

### Quick Migration:

1. **Enable Supabase Auth** in dashboard
2. **Create admin user** in Supabase
3. **Update login logic:**
   ```typescript
   const { data, error } = await supabase.auth.signInWithPassword({
     email,
     password,
   });
   ```
4. **Update middleware** to check Supabase session

---

## 📝 API Routes

### POST /api/admin/login

**Request:**
```json
{
  "email": "admin@decoisme.com",
  "password": "your_password"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### POST /api/admin/logout

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## ✅ Security Checklist

Before going to production:

- [ ] Changed default admin password
- [ ] Using strong password (12+ characters)
- [ ] `.env.local` not committed to git
- [ ] Different credentials for production
- [ ] HTTPS enabled
- [ ] Tested login/logout flow
- [ ] Tested middleware protection
- [ ] Cookies working correctly
- [ ] No console errors
- [ ] Considered Supabase Auth upgrade

---

## 🎯 Quick Commands

### Test Login
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@decoisme.com","password":"admin123"}'
```

### Test Logout
```bash
curl -X POST http://localhost:3000/api/admin/logout
```

### Check Middleware
```bash
# Try accessing dashboard without login
curl http://localhost:3000/admin/dashboard
# Should redirect to /admin
```

---

**Status:** ✅ Secure Admin Authentication Implemented  
**Last Updated:** May 11, 2026  
**Version:** 1.0

🔐 Your admin dashboard is now protected!
