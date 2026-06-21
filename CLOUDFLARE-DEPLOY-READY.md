# ☁️ Cloudflare Pages Deployment - Siap Deploy!

## ✅ Yang Sudah Selesai

### 1. Database Runtime Adapter ✅
- File `src/lib/db.ts` sudah dibuat untuk detect runtime
- Otomatis pakai Cloudflare D1 di production
- Otomatis pakai better-sqlite3 di local development

### 2. Semua Action Files Updated ✅
- ✅ `src/lib/actions/profile.ts` - pakai `getDb()`
- ✅ `src/lib/actions/projects.ts` - pakai `getDb()`
- ✅ `src/lib/actions/experience.ts` - pakai `getDb()`
- ✅ `src/lib/actions/tech-stack.ts` - pakai `getDb()`
- ✅ `src/lib/actions/cv.ts` - pakai `getDb()`

### 3. Production Database Ready ✅
- Database: `portfolio-db-production`
- ID: `fa5e590c-1acd-4bc8-81c2-80b920220173`
- Migrations applied: ✅
- Data seeded: ✅
  - 1 Profile
  - 4 Projects
  - 25 Tech Stacks
  - 6 Experiences

### 4. Configuration Files ✅
- `wrangler.toml` - configured with production database
- `next.config.mjs` - build settings optimized
- `.env` - AUTH_SECRET generated

## ⚠️ Issue Terakhir: Edge Runtime vs Node.js

### Masalah
Next.js build gagal karena `better-sqlite3` (Node.js module) tidak compatible dengan Edge Runtime.

### Solusi untuk Cloudflare Pages
Cloudflare Pages **tidak butuh** `export const runtime = 'edge'` declaration! Cloudflare Pages akan **otomatis** detect dan run code di environment yang tepat.

## 🚀 Langkah Deploy ke Cloudflare Pages

### Option 1: Deploy via GitHub (RECOMMENDED)

1. **Push code ke GitHub**
   ```bash
   git add .
   git commit -m "Ready for Cloudflare Pages deployment"
   git push origin main
   ```

2. **Connect ke Cloudflare Pages**
   - Buka https://dash.cloudflare.com/
   - Go to Workers & Pages > Create application > Pages > Connect to Git
   - Pilih repository GitHub kamu
   - Build settings:
     - **Build command**: `npm run build`
     - **Build output directory**: `.next`
     - **Root directory**: (leave empty)
     - **Framework preset**: Next.js

3. **Environment Variables**
   Add di Cloudflare Pages dashboard:
   ```
   AUTH_SECRET=OLi7cFjiWxJeCIi9+OhPUSLxnLyQy6sc5XUDsZhJYg4=
   GITHUB_ID=Ov23liEsjkAhMUKDSMeK
   GITHUB_SECRET=f26d5b0f92f9eb7a3e0fb93ce0e9c0b35bc2bae9
   NEXTAUTH_URL=(akan diisi setelah deployment)
   ```

4. **D1 Database Binding**
   - Go to Settings > Functions > D1 database bindings
   - Add binding:
     - Variable name: `DB`
     - D1 database: `portfolio-db-production`

5. **Deploy!**
   - Cloudflare akan otomatis build dan deploy
   - Akan dapat URL seperti: `https://portfolio-daniel-sinambela.pages.dev`

6. **Update NEXTAUTH_URL**
   - Copy URL deployment
   - Update environment variable `NEXTAUTH_URL` dengan URL tersebut
   - Redeploy

7. **Update GitHub OAuth**
   - Go to https://github.com/settings/developers
   - Edit OAuth App
   - Update callback URL: `https://your-domain.pages.dev/api/auth/callback/github`

### Option 2: Deploy via Wrangler CLI

```bash
# Build Next.js app
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy .next --project-name=portfolio-daniel-sinambela --branch=main

# Add D1 binding (hanya pertama kali)
npx wrangler pages deployment tail
```

## 🔧 Troubleshooting

### Build Error: "Can't resolve fs/path"
**Penyebab**: Next.js trying to bundle Node.js modules for Edge Runtime  
**Solusi**: Remove all `export const runtime = 'edge'` declarations (Cloudflare handles this automatically)

### D1 Binding Not Found
**Penyebab**: D1 database belum di-bind ke Pages project  
**Solusi**: Add D1 binding via dashboard (Settings > Functions > D1 database bindings)

### Authentication Not Working
**Penyebab**: NEXTAUTH_URL atau GitHub callback URL salah  
**Solusi**: 
1. Set NEXTAUTH_URL ke actual deployment URL
2. Update GitHub OAuth callback URL

## 📊 Local Development

Local development tetap jalan normal:
```bash
npm run dev
```

Runtime detection akan otomatis pakai local database (better-sqlite3).

## 🎯 Next Steps After Deployment

1. **Test authentication** - Login via GitHub
2. **Test admin dashboard** - Create/Update/Delete content
3. **Test public pages** - Verify data display correctly  
4. **Add your CV** - Upload CV file via admin panel
5. **Update profile photo** - Add your photo to `/public/images/profile.jpg`
6. **Customize content** - Update all sections via admin dashboard

## 📝 Important URLs

- Production site: `https://portfolio-daniel-sinambela.pages.dev`
- Admin dashboard: `https://portfolio-daniel-sinambela.pages.dev/admin`
- Cloudflare Dashboard: `https://dash.cloudflare.com/`
- GitHub OAuth Apps: `https://github.com/settings/developers`

## 🆘 Need Help?

Kalau masih ada error, check:
1. Cloudflare Pages build logs
2. Browser console untuk runtime errors
3. Environment variables sudah lengkap?
4. D1 binding sudah di-set?

---

**Status**: ✅ Ready to deploy!  
**Last Updated**: 2026-06-21
