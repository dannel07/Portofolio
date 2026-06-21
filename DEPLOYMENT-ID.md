# 🚀 Panduan Deploy ke Cloudflare Pages (GRATIS)

Panduan lengkap deploy portfolio Anda ke Cloudflare Pages dengan hosting 100% gratis.

---

## 📌 Yang Anda Butuhkan

- [x] Akun Cloudflare (daftar gratis di [cloudflare.com](https://cloudflare.com))
- [x] Akun GitHub
- [x] Project sudah di GitHub repository
- [x] Wrangler CLI sudah terinstall

---

## 🎯 Langkah Cepat (Quick Steps)

### 1️⃣ Push ke GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2️⃣ Buat Database Production

```bash
wrangler d1 create portfolio-db-production
```

Simpan `database_id` yang muncul!

### 3️⃣ Update wrangler.toml

Edit file `wrangler.toml`, tambahkan bagian production:

```toml
[env.production]
name = "portfolio-daniel-sinambela"

[[env.production.d1_databases]]
binding = "DB"
database_name = "portfolio-db-production"
database_id = "PASTE_DATABASE_ID_ANDA_DI_SINI"
migrations_dir = "drizzle"
```

### 4️⃣ Setup Database Production

```bash
# Apply migrations
wrangler d1 migrations apply portfolio-db-production --remote

# Seed data
wrangler d1 execute portfolio-db-production --remote --file=scripts/seed-production.sql
```

### 5️⃣ Deploy via Cloudflare Dashboard

1. Login ke [dash.cloudflare.com](https://dash.cloudflare.com)
2. Klik **Pages** di sidebar kiri
3. Klik **Create a project**
4. Pilih **Connect to Git** → **GitHub**
5. Authorize Cloudflare
6. Pilih repository portfolio Anda
7. Configure build:
   - Framework: **Next.js**
   - Build command: `npx @cloudflare/next-on-pages@1`
   - Build output: `.vercel/output/static`
   - Node version: **18**

8. **Environment Variables** (klik Add variable):
   ```
   NODE_VERSION = 18
   AUTH_SECRET = OLi7cFjiWxJeCIi9+OhPUSLxnLyQy6sc5XUDsZhJYg4=
   AUTH_GITHUB_ID = Ov23li4pLk0xJisBzz6g
   AUTH_GITHUB_SECRET = 06443944607a75a9c26262bd7e7cb633bf7f4e39
   ADMIN_GITHUB_USERNAME = dannel07
   ```

   **PENTING:** `NEXTAUTH_URL` set setelah deployment selesai!

9. **D1 Binding**:
   - Scroll ke **Functions**
   - Klik **Add binding**
   - Type: **D1 Database**
   - Variable name: `DB` (case-sensitive!)
   - D1 database: Pilih `portfolio-db-production`

10. Klik **Save and Deploy** 🚀

### 6️⃣ Update NEXTAUTH_URL

Setelah deploy selesai, Anda akan dapat URL: `https://portfolio-daniel-sinambela.pages.dev`

1. Copy URL tersebut
2. Balik ke dashboard Pages → Your Project → **Settings** → **Environment variables**
3. Add variable baru:
   ```
   NEXTAUTH_URL = https://portfolio-daniel-sinambela.pages.dev
   ```
4. **Redeploy:** Settings → Deployments → Latest deployment → **Retry deployment**

### 7️⃣ Update GitHub OAuth Callback

1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. Klik OAuth App Anda
3. Update **Authorization callback URL**:
   ```
   https://portfolio-daniel-sinambela.pages.dev/api/auth/callback/github
   ```
4. Save

---

## ✅ Verifikasi Deployment Berhasil

### Test Homepage
Buka `https://portfolio-daniel-sinambela.pages.dev`

Cek:
- ✅ Hero section tampil dengan data Anda
- ✅ Skills, Projects, Experience semua muncul
- ✅ Foto placeholder terlihat
- ✅ Social links bekerja

### Test Admin Login
1. Buka `https://portfolio-daniel-sinambela.pages.dev/admin`
2. Klik "Sign in with GitHub"
3. Login dengan akun `dannel07`
4. Harus masuk ke dashboard admin

### Test CRUD Functions

Gunakan checklist di file `CRUD-TEST-CHECKLIST.md` untuk test semua fungsi:
- Create project baru
- Edit project
- Delete project
- Update profile
- Manage tech stacks
- Add experience

Semua harus bekerja!

---

## 🎨 Upload Foto & CV

### Upload Foto Profil

1. Siapkan foto Anda:
   - Format: JPG atau PNG
   - Ukuran: maksimal 500KB
   - Dimensi: 400x400px (1:1 ratio)

2. Rename menjadi `profile.jpg`

3. Letakkan di folder `public/images/profile.jpg`

4. Commit dan push:
   ```bash
   git add public/images/profile.jpg
   git commit -m "Add profile photo"
   git push
   ```

5. Cloudflare Pages akan auto-deploy (1-2 menit)

6. Foto muncul di homepage!

### Upload CV PDF

1. Siapkan CV PDF Anda

2. Rename menjadi `Daniel-Sinambela-CV.pdf`

3. Letakkan di `public/cv/Daniel-Sinambela-CV.pdf`

4. Commit dan push:
   ```bash
   git add public/cv/Daniel-Sinambela-CV.pdf
   git commit -m "Add CV PDF"
   git push
   ```

5. Download button di homepage akan bekerja!

---

## 🔄 Update Website

Setiap push ke GitHub, website otomatis update:

```bash
# Edit files di admin dashboard atau langsung edit code
# ...

# Commit changes
git add .
git commit -m "Update content"

# Push
git push

# Cloudflare auto-deploy dalam 1-2 menit ⚡
```

---

## 🐛 Troubleshooting

### Masalah: Build Failed

**Error:** `Cannot find module`
```bash
npm install
git add package-lock.json
git commit -m "Fix dependencies"
git push
```

### Masalah: Database Error

**Error:** `DB is not defined`

**Solusi:**
1. Pastikan D1 binding name adalah `DB` (case-sensitive)
2. Go to Pages → Settings → Functions → Check binding
3. Redeploy

**Error:** `no such table`

**Solusi:**
```bash
# Run migrations lagi
wrangler d1 migrations apply portfolio-db-production --remote

# Seed lagi
wrangler d1 execute portfolio-db-production --remote --file=scripts/seed-production.sql
```

### Masalah: Admin Login Error

**Error:** `Callback URL mismatch`

**Solusi:**
1. GitHub Settings → Developer Settings → OAuth Apps
2. Update callback URL: `https://YOUR-URL.pages.dev/api/auth/callback/github`
3. Save

**Error:** `NEXTAUTH_URL not set`

**Solusi:**
1. Pages dashboard → Settings → Environment variables
2. Add `NEXTAUTH_URL` dengan URL production Anda
3. Redeploy

### Masalah: CRUD Tidak Bekerja

**Cek:**
1. Browser console (F12) untuk error
2. Database ada data: `wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM profile"`
3. D1 binding sudah benar (nama: `DB`)
4. Environment variables sudah set semua

**Debug:**
```bash
# Lihat logs real-time
wrangler pages deployment tail
```

---

## 📊 Manage Data Production

### Lihat Data

```bash
# Profile
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM profile"

# Projects
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM projects"

# Tech Stacks
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM tech_stacks"
```

### Update Manual (jika perlu)

```bash
# Update profile bio
wrangler d1 execute portfolio-db-production --remote --command "UPDATE profile SET bio='Updated bio text' WHERE id='prof-1'"
```

### Backup Database

```bash
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM profile" > backup.json
```

---

## 🎯 Custom Domain (Opsional)

Punya domain sendiri? (contoh: `danielsinambela.com`)

1. Dashboard Pages → Your Project → **Custom domains**
2. Klik **Set up a custom domain**
3. Masukkan domain Anda
4. Cloudflare setup DNS otomatis
5. Update `NEXTAUTH_URL` dengan domain custom
6. Update GitHub OAuth callback URL dengan domain custom

---

## 💰 Biaya

**100% GRATIS!**

Limit gratis Cloudflare Pages:
- ✅ 500 builds/bulan
- ✅ 100 GB bandwidth/bulan
- ✅ Unlimited requests
- ✅ Unlimited custom domains

Untuk portfolio pribadi, ini lebih dari cukup!

---

## 📱 Monitoring

### Lihat Analytics

1. Dashboard → Pages → Your Project
2. Klik **Analytics**
3. Lihat visitors, traffic, bandwidth

### Lihat Logs

```bash
wrangler pages deployment tail
```

---

## 🎉 Selesai!

Website Anda sekarang live di internet! 🌐

**URL Production:**
```
https://portfolio-daniel-sinambela.pages.dev
```

**Yang Bisa Anda Lakukan:**
- ✅ Edit semua content via admin dashboard (`/admin`)
- ✅ Create/edit/delete projects
- ✅ Update profile
- ✅ Manage tech stacks
- ✅ Add experiences
- ✅ Upload foto & CV
- ✅ Share link ke recruiter!

**Semua update via admin dashboard langsung tersimpan ke cloud database!**

---

## 📚 Dokumentasi Lengkap

Untuk panduan lebih detail (English):
- Baca `DEPLOYMENT-CLOUDFLARE.md`
- Checklist testing: `CRUD-TEST-CHECKLIST.md`
- Setup lengkap: `FINAL-SETUP-GUIDE.md`

---

**Need Help?**
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)

**Selamat! Portfolio Anda sudah online! 🎊**
