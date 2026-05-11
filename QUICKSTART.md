# Quick Start Guide - Decoisme Portfolio

Get your portfolio up and running in 5 minutes!

## 🚀 Installation

```bash
# Navigate to project folder
cd decoisme

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio!

## ⚡ First Steps

### 1. Update Personal Info (2 minutes)

Edit these files with your information:

**Hero Section** (`components/sections/hero-section.tsx`):
- Line 50-60: Your name and title
- Line 70: Your description
- Line 90-100: Social media links

**Contact Section** (`components/sections/contact-section.tsx`):
- Line 60-80: Your contact information

### 2. Add Your Photo (1 minute)

1. Add your photo to `public/` folder (e.g., `profile.jpg`)
2. Update `components/sections/hero-section.tsx` line 120:
   ```tsx
   <Image src="/profile.jpg" alt="Your Name" fill />
   ```

### 3. Setup Supabase (Optional - 5 minutes)

**Skip this if you just want to see the demo!**

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor and run `supabase-schema.sql`
4. Copy `.env.example` to `.env.local`
5. Add your Supabase URL and keys

## 📝 Common Tasks

### Add Projects

**Without Supabase:**
- Projects will show demo data automatically

**With Supabase:**
1. Go to `/admin`
2. Login (default: admin@decoisme.com)
3. Click "Add Project"
4. Fill in details and save

### Change Colors

Edit `app/globals.css`:
```css
:root {
  --primary: your-color;
  --accent: your-color;
}
```

### Change Fonts

Edit `lib/fonts.ts` to use different Google Fonts or local fonts.

## 🎨 Customization

See [CUSTOMIZATION.md](./CUSTOMIZATION.md) for detailed customization guide.

## 🚀 Deployment

### Deploy to Vercel (Easiest)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables (if using Supabase)
6. Click "Deploy"

Done! Your site is live in 2 minutes.

## 📚 Documentation

- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [CUSTOMIZATION.md](./CUSTOMIZATION.md) - How to customize everything
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guides for all platforms
- [FEATURES.md](./FEATURES.md) - Complete feature documentation

## 🆘 Troubleshooting

**Build fails?**
```bash
rm -rf node_modules .next
npm install
npm run build
```

**Supabase not working?**
- Check `.env.local` exists and has correct values
- Restart dev server after changing env variables
- Demo data will show if Supabase is not configured

**Admin login not working?**
- Default email: admin@decoisme.com
- Any password works in development
- Clear browser localStorage if issues persist

## 💡 Tips

- Test on mobile devices early
- Commit changes to git frequently
- Use demo data while developing
- Setup Supabase when ready to deploy

## 🎯 Next Steps

1. ✅ Get it running locally
2. ✅ Update personal information
3. ✅ Add your photo
4. ⬜ Customize colors and fonts
5. ⬜ Setup Supabase
6. ⬜ Add real projects
7. ⬜ Deploy to Vercel
8. ⬜ Add custom domain

---

Need help? Check the other documentation files or open an issue!

Happy building! 🚀
