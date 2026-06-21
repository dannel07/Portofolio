# ✅ Deployment Checklist

Gunakan checklist ini untuk memastikan semua tahap deployment selesai dengan benar.

---

## 📋 Pre-Deployment

### Project Setup
- [ ] Project berjalan dengan baik di local (test: `npm run dev`)
- [ ] Tidak ada error TypeScript (`npm run build` success)
- [ ] Semua dependencies ter-install
- [ ] `.env.example` sudah ada dengan semua variable yang dibutuhkan
- [ ] `.gitignore` sudah include `.env` dan file sensitif lainnya

### Git Repository
- [ ] Repository GitHub sudah dibuat
- [ ] Project sudah di-push ke GitHub
- [ ] Branch `main` sudah ada
- [ ] README.md sudah lengkap

---

## 🔐 Authentication Setup

### GitHub OAuth App (Production)
- [ ] OAuth App sudah dibuat di GitHub
- [ ] Application name: `Portfolio Daniel Sinambela (Production)`
- [ ] Homepage URL sudah di-set
- [ ] Callback URL sudah di-set
- [ ] Client ID sudah dicopy ✍️ `________________`
- [ ] Client Secret sudah dicopy ✍️ `________________`

### AUTH_SECRET
- [ ] AUTH_SECRET sudah digenerate
- [ ] Copy hasil generate ✍️ `________________`

---

## 🗄️ Database Setup (Cloudflare D1)

### API Token
- [ ] Cloudflare account sudah dibuat
- [ ] API Token sudah dibuat dengan permissions yang benar
- [ ] Token sudah di-set di environment: `$env:CLOUDFLARE_API_TOKEN="..."`

### Database Creation
- [ ] Database D1 sudah dibuat: `wrangler d1 create portfolio-db`
- [ ] Database ID sudah dicopy ✍️ `________________`
- [ ] `wrangler.toml` sudah diupdate dengan database ID

### Migrations
- [ ] Migrations sudah digenerate: `npm run db:generate`
- [ ] Migrations sudah di-apply: `wrangler d1 migrations apply portfolio-db`
- [ ] Verify migrations: `wrangler d1 execute portfolio-db --command="SELECT name FROM sqlite_master WHERE type='table'"`

### Seed Data
- [ ] File `scripts/seed-production.sql` sudah ada
- [ ] Seed data sudah diexecute: `wrangler d1 execute portfolio-db --file=./scripts/seed-production.sql`
- [ ] Verify data: `wrangler d1 execute portfolio-db --command="SELECT * FROM profile"`

---

## 🌐 Cloudflare Pages Setup

### Project Creation
- [ ] Login ke Cloudflare Dashboard
- [ ] Connect repository ke Cloudflare Pages
- [ ] Project name: `portfolio-daniel-sinambela`
- [ ] Production branch: `main`

### Build Configuration
- [ ] Framework preset: `Next.js`
- [ ] Build command: `npm run build`
- [ ] Build output directory: `.next`
- [ ] Root directory: `/`
- [ ] Node version: `20`

### Environment Variables
Set semua environment variables berikut:

- [ ] `NODE_VERSION` = `20`
- [ ] `AUTH_GITHUB_ID` = `[production-client-id]`
- [ ] `AUTH_GITHUB_SECRET` = `[production-client-secret]`
- [ ] `AUTH_SECRET` = `[generated-secret]`
- [ ] `ADMIN_GITHUB_USERNAME` = `dannel07`
- [ ] `NEXTAUTH_URL` = `https://portfolio-daniel-sinambela.pages.dev`

### Bindings
- [ ] D1 database binding sudah ditambahkan
  - Variable name: `DB`
  - D1 database: `portfolio-db`
- [ ] Deployment sudah di-retry setelah menambahkan binding

### First Deployment
- [ ] Klik "Save and Deploy"
- [ ] Wait for deployment (2-5 minutes)
- [ ] Deployment status: SUCCESS ✅
- [ ] Site URL: ✍️ `https://______________________.pages.dev`

---

## ✅ Verification

### Public Site Tests
Visit: `https://portfolio-daniel-sinambela.pages.dev`

- [ ] Homepage loads without errors
- [ ] Profile section displays correctly
  - [ ] Name: Daniel Sinambela
  - [ ] Bio displays
  - [ ] Social links work
- [ ] About section displays
  - [ ] Education info shows
  - [ ] Contact info correct
- [ ] Skills section displays
  - [ ] All categories show (Backend, Frontend, Database, Tools, Data Analytics)
  - [ ] Tech badges render correctly
- [ ] Projects section displays
  - [ ] At least 2 featured projects show
  - [ ] Project descriptions visible
  - [ ] Tech stack badges show
- [ ] Experience section displays
  - [ ] Timeline renders correctly
  - [ ] All 6 experiences show
  - [ ] Dates formatted correctly
- [ ] Contact section displays
  - [ ] Form renders
  - [ ] Contact info correct
- [ ] Theme toggle works
  - [ ] Can switch to dark mode
  - [ ] Can switch to light mode
  - [ ] Preference persists
- [ ] Mobile responsive
  - [ ] Test on mobile viewport
  - [ ] Navigation menu works
  - [ ] All sections readable

### Admin Dashboard Tests
Visit: `https://portfolio-daniel-sinambela.pages.dev/admin`

- [ ] Admin page loads
- [ ] "Sign in with GitHub" button visible
- [ ] Click login redirects to GitHub
- [ ] GitHub authorization page shows
- [ ] After authorizing, redirects back to site
- [ ] Successfully logged in as admin
- [ ] Admin dashboard displays
- [ ] Can navigate between sections:
  - [ ] Dashboard
  - [ ] Profile
  - [ ] Tech Stacks
  - [ ] Projects
  - [ ] Experience
  - [ ] CV
  - [ ] Analytics

### Database Connection Tests
From admin dashboard:

- [ ] Profile data loads correctly
- [ ] Can view tech stacks list
- [ ] Can view projects list
- [ ] Can view experiences list
- [ ] All counts match expected data:
  - Profile: 1
  - Education: 1
  - Tech Stacks: 25
  - Projects: 4
  - Experiences: 6

### Performance Tests
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] Page loads in < 2 seconds

---

## 🎨 Optional Enhancements

### Custom Domain
- [ ] Domain purchased
- [ ] DNS configured in Cloudflare
- [ ] Custom domain added to Pages project
- [ ] SSL certificate active
- [ ] Update GitHub OAuth URLs
- [ ] Update NEXTAUTH_URL environment variable
- [ ] Redeploy

### Content Updates
- [ ] Upload profile photo to `public/images/`
- [ ] Upload project thumbnails
- [ ] Add real GitHub URLs to projects
- [ ] Add demo URLs if available
- [ ] Update CV if needed

### SEO Optimization
- [ ] Add `robots.txt`
- [ ] Add `sitemap.xml`
- [ ] Update Open Graph image
- [ ] Add meta descriptions
- [ ] Submit to Google Search Console

---

## 📊 Post-Deployment

### Monitoring Setup
- [ ] Check Cloudflare Analytics
- [ ] View real-time logs
- [ ] Set up uptime monitoring (optional)
- [ ] Configure error alerts (optional)

### Documentation
- [ ] Update README with live URL
- [ ] Document any custom configurations
- [ ] Note any issues encountered
- [ ] Create internal docs if needed

### Sharing
- [ ] Add portfolio URL to LinkedIn profile
- [ ] Add to GitHub profile README
- [ ] Add to CV/Resume
- [ ] Share on social media
- [ ] Send to potential employers

---

## 🔄 Continuous Deployment

### Git Workflow
- [ ] Test locally before pushing
- [ ] Use meaningful commit messages
- [ ] Push to main branch triggers auto-deploy
- [ ] Monitor deployment status in dashboard

### Update Process
```bash
# Make changes
git add .
git commit -m "Update: [description]"
git push

# Cloudflare automatically deploys
# Check deployment status in dashboard
```

---

## 🐛 Common Issues Checklist

If something doesn't work, check:

### Build Failures
- [ ] `NODE_VERSION` environment variable is set
- [ ] All dependencies in `package.json`
- [ ] No local-only imports
- [ ] Build succeeds locally first

### Database Issues
- [ ] D1 binding is added (variable name: `DB`)
- [ ] Migrations are applied
- [ ] Seed data is loaded
- [ ] Check database in D1 dashboard

### Auth Issues
- [ ] GitHub OAuth callback URL matches deployed URL exactly
- [ ] All auth environment variables are set
- [ ] `AUTH_SECRET` is generated and set
- [ ] `ADMIN_GITHUB_USERNAME` matches your username

### General Issues
- [ ] Check Functions logs in dashboard
- [ ] Clear browser cache and cookies
- [ ] Try incognito/private mode
- [ ] Check all environment variables
- [ ] Verify bindings are correct
- [ ] Try redeploying

---

## 📝 Notes

### Important URLs
- **Live Site**: ________________________________
- **Admin Dashboard**: ________________________________
- **GitHub Repo**: ________________________________
- **Cloudflare Dashboard**: https://dash.cloudflare.com

### Credentials Storage
⚠️ **IMPORTANT**: Store these securely (use password manager)

- GitHub OAuth Client ID: ________________________________
- GitHub OAuth Client Secret: ________________________________
- AUTH_SECRET: ________________________________
- Cloudflare API Token: ________________________________
- Database ID: ________________________________

### Contact for Support
- Cloudflare Support: https://support.cloudflare.com
- Community Discord: https://discord.cloudflare.com
- GitHub Issues: https://github.com/dannel07/portfolio-daniel-sinambela/issues

---

## ✅ Deployment Complete!

Once all items are checked:

🎉 **Congratulations!** 

Your portfolio is now live on the internet!

**Next Steps:**
1. ✅ Share your portfolio URL
2. ✅ Add to professional profiles
3. ✅ Keep content updated
4. ✅ Monitor analytics
5. ✅ Apply for opportunities!

---

**Date Deployed**: ________________

**Deployed By**: Daniel Sinambela

**Version**: 1.0.0

**Status**: ✅ Production Ready
