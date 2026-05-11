# Deployment Guide

## Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy your Next.js application. It's made by the creators of Next.js and offers the best performance.

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Decoisme portfolio"
   ```

2. **Push to GitHub**
   ```bash
   # Create a new repository on GitHub first
   git remote add origin https://github.com/yourusername/decoisme.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   
   Add these in the "Environment Variables" section:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_ADMIN_EMAIL=admin@decoisme.com
   ADMIN_PASSWORD=your_secure_password
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site is live! 🎉

### Step 3: Custom Domain (Optional)

1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records:
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`
   
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

5. Wait for DNS propagation (5-30 minutes)

## Deploy to Netlify

### Step 1: Build Configuration

Create `netlify.toml` in root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 2: Deploy

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Add environment variables
5. Click "Deploy site"

## Deploy to Railway

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Deploy

```bash
railway login
railway init
railway up
```

### Step 3: Add Environment Variables

```bash
railway variables set NEXT_PUBLIC_SUPABASE_URL=your_url
railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
# Add all other variables
```

## Deploy with Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
docker build -t decoisme .
docker run -p 3000:3000 decoisme
```

## Post-Deployment Checklist

### Security
- [ ] Enable HTTPS
- [ ] Set up proper authentication for admin
- [ ] Add rate limiting
- [ ] Configure CORS properly
- [ ] Remove console.logs from production

### Performance
- [ ] Enable caching headers
- [ ] Optimize images
- [ ] Enable compression
- [ ] Set up CDN
- [ ] Monitor Core Web Vitals

### SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics
- [ ] Set up Open Graph images
- [ ] Verify meta tags
- [ ] Test with Lighthouse

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Enable Vercel Analytics
- [ ] Monitor Supabase usage
- [ ] Set up uptime monitoring
- [ ] Configure alerts

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Admin login email | Yes |
| `ADMIN_PASSWORD` | Admin login password | Yes |

## Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Error: Environment variables not found**
- Ensure all required env vars are set in deployment platform
- Check for typos in variable names
- Restart the build after adding variables

### Runtime Errors

**Supabase connection fails**
- Verify API keys are correct
- Check Supabase project is active
- Ensure RLS policies are set correctly

**Admin login not working**
- Clear browser cache and localStorage
- Verify NEXT_PUBLIC_ADMIN_EMAIL is set
- Check browser console for errors

### Performance Issues

**Slow page loads**
- Enable caching in Vercel settings
- Optimize images (use WebP format)
- Check Supabase query performance
- Enable ISR for static pages

**High bandwidth usage**
- Compress images
- Enable lazy loading
- Use CDN for assets
- Minimize JavaScript bundle

## Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update portfolio"
git push
```

### Preview Deployments

Every pull request gets a preview URL:
1. Create a new branch
2. Make changes
3. Push and create PR
4. Get preview URL in PR comments

### Production Deployments

Only pushes to `main` branch deploy to production:
```bash
git checkout main
git merge feature-branch
git push
```

## Rollback

If something goes wrong:

1. Go to Vercel dashboard
2. Navigate to "Deployments"
3. Find the last working deployment
4. Click "..." → "Promote to Production"

## Support

Need help with deployment?
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Guides](https://supabase.com/docs/guides)

---

Happy deploying! 🚀
