# Setup Guide - Decoisme Portfolio

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Fill in project details and wait for setup to complete

#### Run Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire content from `supabase-schema.sql`
4. Paste and click "Run"
5. You should see "Success. No rows returned"

#### Get API Keys
1. Go to **Settings** > **API**
2. Copy your **Project URL**
3. Copy your **anon/public key**
4. Copy your **service_role key** (keep this secret!)

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   
   NEXT_PUBLIC_ADMIN_EMAIL=admin@decoisme.com
   ADMIN_PASSWORD=your-secure-password
   ```

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

## Customization Checklist

### Personal Information
- [ ] Update name in `components/sections/hero-section.tsx`
- [ ] Update bio in `components/sections/about-section.tsx`
- [ ] Update contact info in `components/sections/contact-section.tsx`
- [ ] Update social media links in `components/sections/hero-section.tsx`
- [ ] Update footer in `components/layout/footer.tsx`

### Branding
- [ ] Replace "Decoisme" with your brand name (search & replace)
- [ ] Update metadata in `app/layout.tsx`
- [ ] Add your logo/favicon to `public/`
- [ ] Update colors in `app/globals.css` if desired

### Content
- [ ] Add your profile photo to `public/` folder
- [ ] Update hero section image in `components/sections/hero-section.tsx`
- [ ] Customize tech stack in `components/sections/about-section.tsx`
- [ ] Update experience timeline in `components/sections/about-section.tsx`
- [ ] Customize skills in `components/sections/skills-section.tsx`

### Projects
- [ ] Login to admin dashboard at `/admin`
- [ ] Add your real projects with images and links
- [ ] Delete sample projects

## Supabase Tables Overview

### projects
Stores your portfolio projects
- `title` - Project name
- `description` - Project description
- `image_url` - Project screenshot URL
- `tech_stack` - Array of technologies used
- `github_url` - GitHub repository link
- `live_url` - Live demo link
- `featured` - Show on homepage
- `order_index` - Display order

### contact_messages
Stores contact form submissions
- `name` - Sender name
- `email` - Sender email
- `message` - Message content
- `read` - Read status
- `created_at` - Timestamp

### skills (optional)
Stores your skills and proficiency levels
- `name` - Skill name
- `icon` - Icon identifier
- `category` - Skill category
- `proficiency` - Skill level (0-100)

## Admin Dashboard

### Access
Navigate to `/admin` and login with your credentials.

### Features
1. **Projects Tab**
   - Add new projects
   - Edit existing projects
   - Delete projects
   - Reorder projects

2. **Messages Tab**
   - View contact form submissions
   - Mark messages as read
   - See sender details

3. **Statistics Tab**
   - Total projects count
   - Total messages count
   - Unread messages count

## Deployment to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Add environment variables from `.env.local`
5. Click "Deploy"

### 3. Configure Domain (Optional)
1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Troubleshooting

### Supabase Connection Issues
- Verify your API keys are correct
- Check if `.env.local` is in the root directory
- Restart the development server after changing env variables

### Admin Login Not Working
- Check `NEXT_PUBLIC_ADMIN_EMAIL` in `.env.local`
- Clear browser localStorage
- For production, implement Supabase Auth

### Projects Not Showing
- Verify Supabase schema was created successfully
- Check browser console for errors
- Ensure RLS policies are set correctly

### Animations Not Working
- Clear browser cache
- Check if JavaScript is enabled
- Verify Framer Motion is installed

## Production Recommendations

### Security
- [ ] Implement Supabase Authentication for admin
- [ ] Remove hardcoded admin credentials
- [ ] Enable HTTPS only
- [ ] Add rate limiting for contact form
- [ ] Sanitize user inputs

### Performance
- [ ] Optimize images (use WebP format)
- [ ] Enable caching headers
- [ ] Minimize bundle size
- [ ] Use CDN for static assets
- [ ] Enable compression

### SEO
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Implement structured data
- [ ] Add Open Graph images
- [ ] Optimize meta descriptions

### Analytics
- [ ] Add Google Analytics
- [ ] Add Vercel Analytics
- [ ] Track contact form submissions
- [ ] Monitor performance metrics

## Support

Need help? Check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)

---

Happy coding! 🚀
