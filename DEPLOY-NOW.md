# 🚀 DEPLOY KE CLOUDFLARE PAGES - READY!

## ✅ Yang Sudah Selesai

1. ✅ **Production Database Created**
   - Database ID: `fa5e590c-1acd-4bc8-81c2-80b920220173`
   - Name: `portfolio-db-production`
   - Region: APAC

2. ✅ **Migrations Applied**
   - 14 commands executed
   - All tables created

3. ✅ **Data Seeded**
   - Profile: 1 entry
   - Projects: 4 entries
   - Tech Stacks: 25 entries
   - Experiences: 6 entries
   - Database size: 0.13 MB

4. ✅ **Configuration Updated**
   - `wrangler.toml` configured for production
   - Database binding ready

---

## 🎯 DEPLOY SEKARANG (3 Cara)

### Cara 1: Via GitHub + Cloudflare Dashboard (RECOMMENDED) ⭐

**Step 1: Push ke GitHub**
```bash
git add .
git commit -m "Ready for Cloudflare Pages deployment"
git push origin main
```

**Step 2: Deploy via Cloudflare Dashboard**

1. Buka: https://dash.cloudflare.com
2. Login dengan akun Cloudflare Anda
3. Click **Pages** di sidebar kiri
4. Click **Create a project**
5. Click **Connect to Git** → **GitHub**
6. Authorize Cloudflare (jika belum)
7. Pilih repository: `Portofolio` atau sesuai nama repo Anda
8. Click **Begin setup**

**Step 3: Configure Build Settings**

```
Framework preset: Next.js
Branch: main
Build command: npx @cloudflare/next-on-pages@1
Build output directory: .vercel/output/static
Root directory: (leave empty)
```

**Environment Variables:**
```
NODE_VERSION = 18
AUTH_SECRET = OLi7cFjiWxJeCIi9+OhPUSLxnLyQy6sc5XUDsZhJYg4=
AUTH_GITHUB_ID = Ov23li4pLk0xJisBzz6g
AUTH_GITHUB_SECRET = 06443944607a75a9c26262bd7e7cb633bf7f4e39
ADMIN_GITHUB_USERNAME = dannel07
```

**⚠️ PENTING: D1 Database Binding**

Scroll ke bagian **Functions** di setup page:

1. Click **Add binding**
2. Type: **D1 Database**
3. Variable name: `DB` (MUST be uppercase!)
4. D1 database: Select `portfolio-db-production`
5. Click **Add binding**

**Step 4: Deploy!**

Click **Save and Deploy**

Deployment akan memakan waktu 2-5 menit.

---

### Cara 2: Via Wrangler CLI (Advanced)

```bash
# Build project
npx @cloudflare/next-on-pages@1

# Deploy
wrangler pages deploy .vercel/output/static --project-name=portfolio-daniel-sinambela --branch=main
```

**Note:** Masih perlu setup bindings dan environment variables via dashboard setelah deploy.

---

### Cara 3: Auto Deploy (Setup Once)

Setelah connect GitHub di Cara 1, setiap `git push` akan otomatis deploy!

```bash
# Edit files
# ...

git add .
git commit -m "Update content"
git push

# Cloudflare auto-deploy dalam 2-3 menit
```

---

## 🔧 After Deployment

### 1. Get Your URL

Setelah deploy selesai, Anda akan dapat URL:
```
https://portfolio-daniel-sinambela.pages.dev
```

### 2. Update Environment Variables

Kembali ke **Cloudflare Dashboard** → **Pages** → **Your Project** → **Settings** → **Environment variables**

Add variable baru:
```
NEXTAUTH_URL = https://portfolio-daniel-sinambela.pages.dev
```

Click **Save**

### 3. Redeploy

Go to **Deployments** tab → Click latest deployment → **Retry deployment**

### 4. Update GitHub OAuth Callback

1. Go to: https://github.com/settings/developers
2. Click your OAuth App
3. Update **Authorization callback URL**:
   ```
   https://portfolio-daniel-sinambela.pages.dev/api/auth/callback/github
   ```
4. Save

---

## ✅ Verify Deployment

**Test Homepage:**
```
https://portfolio-daniel-sinambela.pages.dev
```

Harus menampilkan:
- ✅ Hero section dengan data Anda
- ✅ Skills section
- ✅ Projects section (4 projects)
- ✅ Experience section
- ✅ Semua data dari database production

**Test Admin:**
```
https://portfolio-daniel-sinambela.pages.dev/admin
```

1. Click "Sign in with GitHub"
2. Login dengan `dannel07`
3. Harus masuk ke admin dashboard
4. Test CRUD:
   - Create project
   - Update profile
   - Edit project
   - Delete test project

---

## 🐛 Troubleshooting

### Build Failed

**Error: Cannot find module**
```bash
# Rebuild locally first
npm install
npm run build
```

Jika berhasil local, commit dan push lagi.

### Database Connection Error

**Error: `DB is not defined`**

1. Go to Dashboard → Pages → Your Project → Settings → Functions
2. Check D1 binding:
   - Variable name harus `DB` (uppercase)
   - Database: `portfolio-db-production`
3. Redeploy

### Auth Error

**Error: `NEXTAUTH_URL not set`**

1. Dashboard → Settings → Environment variables
2. Add: `NEXTAUTH_URL = https://your-url.pages.dev`
3. Redeploy

**Error: GitHub OAuth redirect mismatch**

1. GitHub Settings → Developer Settings → OAuth Apps
2. Update callback URL dengan URL production Anda
3. Save

### Data Tidak Muncul

**Verify database has data:**
```bash
wrangler d1 execute portfolio-db-production --remote --command "SELECT COUNT(*) FROM projects"
```

Should return: `4`

If 0, re-seed:
```bash
wrangler d1 execute portfolio-db-production --remote --file=scripts/seed-production.sql
```

---

## 📊 Monitor Deployment

### View Logs Real-time

```bash
wrangler pages deployment tail
```

### View Analytics

Dashboard → Pages → Your Project → Analytics

---

## 🎨 Next Steps

### Upload Foto Profil

1. Siapkan foto: `profile.jpg` (400x400px, max 500KB)
2. Upload ke: `public/images/profile.jpg`
3. Commit & push
4. Auto-deploy in 2 minutes

### Upload CV

1. Prepare: `Daniel-Sinambela-CV.pdf`
2. Upload ke: `public/cv/Daniel-Sinambela-CV.pdf`
3. Commit & push
4. Download button akan otomatis bekerja

### Custom Domain (Optional)

1. Dashboard → Pages → Your Project → Custom domains
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `danielsinambela.com`)
4. Cloudflare akan setup DNS otomatis
5. Update `NEXTAUTH_URL` dengan custom domain
6. Update GitHub OAuth callback

---

## 💰 Biaya

**100% GRATIS** dengan Cloudflare Free Plan:
- ✅ 500 builds/month
- ✅ 100 GB bandwidth/month
- ✅ Unlimited requests
- ✅ Unlimited custom domains
- ✅ D1 Database: 5 GB storage, 5 million reads/day

**Lebih dari cukup untuk portfolio!**

---

## 📝 Quick Commands Reference

```bash
# Verify production database
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM profile"

# View all projects
wrangler d1 execute portfolio-db-production --remote --command "SELECT id, title, featured FROM projects"

# Manual data update
wrangler d1 execute portfolio-db-production --remote --command "UPDATE profile SET bio='New bio' WHERE id='prof-1'"

# Backup database
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM profile" > backup-profile.json
```

---

## 🎉 Summary

**Database Status:**
- ✅ Production database created
- ✅ Migrations applied
- ✅ Data seeded (Profile, Projects, Tech Stacks, Experiences)
- ✅ Ready to serve requests

**Next Action:**
1. **Push to GitHub** (if not yet)
2. **Deploy via Cloudflare Dashboard** (follow Cara 1 above)
3. **Update NEXTAUTH_URL** after deploy
4. **Update GitHub OAuth callback**
5. **Test website!**

**Estimated Time:** 10-15 menit

---

## 🆘 Need Help?

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)

---

**READY TO DEPLOY! Follow Cara 1 above to get your portfolio online! 🚀**
