# 🚀 Deployment ke Cloudflare Pages (GRATIS)

Panduan lengkap untuk deploy portfolio Anda ke Cloudflare Pages dengan hosting gratis.

## ✅ Prerequisites

Pastikan sudah:
- [x] Akun Cloudflare (gratis)
- [x] Akun GitHub
- [x] Project sudah ada di GitHub repository
- [x] Wrangler CLI sudah terinstall (`npm install -g wrangler`)
- [x] Sudah login wrangler (`wrangler login`)

## 📋 Langkah-Langkah Deployment

### 1. Push Project ke GitHub

```bash
# Inisialisasi git jika belum
git init

# Tambahkan semua file
git add .

# Commit
git commit -m "Initial commit - Portfolio Daniel Sinambela"

# Tambahkan remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push ke GitHub
git push -u origin main
```

### 2. Setup Database Production di Cloudflare

```bash
# Create D1 database untuk production (remote)
wrangler d1 create portfolio-db-production

# Output akan menampilkan database_id, simpan ini!
```

Copy `database_id` dari output, lalu update `wrangler.toml`:

```toml
[env.production]
name = "portfolio-daniel-sinambela"

[[env.production.d1_databases]]
binding = "DB"
database_name = "portfolio-db-production"
database_id = "PASTE_YOUR_DATABASE_ID_HERE"
migrations_dir = "drizzle"
```

### 3. Apply Migrations ke Production Database

```bash
# Apply migrations ke remote database
wrangler d1 migrations apply portfolio-db-production --remote
```

### 4. Seed Data Production

Gunakan file `scripts/seed-production.sql` untuk insert data:

```bash
# Execute seed script ke remote database
wrangler d1 execute portfolio-db-production --remote --file=scripts/seed-production.sql
```

Atau seed manual satu per satu:

```bash
# Profile
wrangler d1 execute portfolio-db-production --remote --command "INSERT INTO profile (id, name, email, phone, location, bio, description, avatar, github_url, linkedin_url, created_at, updated_at) VALUES ('prof-1', 'Daniel Sinambela', 'sinambeladaniel07@gmail.com', '+6281263167246', 'Toba, North Sumatera, Indonesia', 'Applied Software Engineering Technology student', 'Full description...', '/images/profile.jpg', 'https://github.com/dannel07', 'https://linkedin.com/in/daniel-sinambela-aaba18389', 1719849600000, 1719849600000)"

# Projects (contoh untuk 1 project)
wrangler d1 execute portfolio-db-production --remote --command "INSERT INTO projects (id, title, description, long_description, featured, status, start_date, end_date, \"order\", created_at, updated_at) VALUES ('proj-1', 'GJM & GKM Administrative Automation', 'Web-based administrative automation system', 'Full description...', 1, 'completed', '2026-01', NULL, 0, 1719849600000, 1719849600000)"

# ... dst untuk data lainnya
```

### 5. Build untuk Production

```bash
# Install dependencies jika belum
npm install

# Build project
npm run build
```

Pastikan build berhasil tanpa error.

### 6. Deploy ke Cloudflare Pages

Ada 2 cara deploy:

#### Opsi A: Deploy via Dashboard (Recommended untuk Pemula)

1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pilih **Pages** dari sidebar
3. Click **Create a project**
4. **Connect to Git** → Pilih GitHub
5. Authorize Cloudflare untuk akses GitHub repository Anda
6. Pilih repository portfolio Anda
7. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npx @cloudflare/next-on-pages@1`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: `/` (kosongkan)
   - **Node version**: 18 atau lebih

8. **Environment Variables** - Tambahkan:
   ```
   NODE_VERSION=18
   AUTH_SECRET=OLi7cFjiWxJeCIi9+OhPUSLxnLyQy6sc5XUDsZhJYg4=
   AUTH_GITHUB_ID=Ov23li4pLk0xJisBzz6g
   AUTH_GITHUB_SECRET=06443944607a75a9c26262bd7e7cb633bf7f4e39
   ADMIN_GITHUB_USERNAME=dannel07
   NEXTAUTH_URL=https://YOUR-PAGES-URL.pages.dev
   ```

9. **Bindings** (Penting!):
   - Click **Add binding**
   - Type: **D1 Database**
   - Variable name: `DB`
   - D1 database: Pilih `portfolio-db-production`

10. Click **Save and Deploy**

#### Opsi B: Deploy via Wrangler CLI

```bash
# Deploy dengan wrangler
npm run pages:deploy

# Atau manual
npx @cloudflare/next-on-pages@1
wrangler pages deploy .vercel/output/static --project-name=portfolio-daniel-sinambela
```

### 7. Configure Environment Variables via CLI (Opsional)

```bash
# Set environment variables
wrangler pages secret put AUTH_SECRET --project-name=portfolio-daniel-sinambela
# Paste: OLi7cFjiWxJeCIi9+OhPUSLxnLyQy6sc5XUDsZhJYg4=

wrangler pages secret put AUTH_GITHUB_ID --project-name=portfolio-daniel-sinambela
# Paste: Ov23li4pLk0xJisBzz6g

wrangler pages secret put AUTH_GITHUB_SECRET --project-name=portfolio-daniel-sinambela
# Paste: 06443944607a75a9c26262bd7e7cb633bf7f4e39

# Untuk non-secret variables, gunakan dashboard
```

### 8. Bind D1 Database ke Pages Project via CLI (Opsional)

```bash
wrangler pages project bind DB \
  --project-name=portfolio-daniel-sinambela \
  --d1=portfolio-db-production
```

### 9. Setup Custom Domain (Opsional)

1. Di Cloudflare Dashboard → Pages → Your Project
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Masukkan domain Anda (misal: `danielsinambela.com`)
5. Cloudflare akan setup DNS record otomatis
6. Update `NEXTAUTH_URL` di environment variables dengan domain custom Anda

## 🔍 Verifikasi Deployment

### 1. Check Website
Buka `https://YOUR-PROJECT-NAME.pages.dev` di browser

### 2. Test Homepage
- Hero section harus tampil dengan data dari database
- Foto profil placeholder terlihat
- Tech stacks badge muncul
- Social links bekerja

### 3. Test Admin Login
- Akses `/admin`
- Login dengan GitHub (username: dannel07)
- Harus bisa masuk ke dashboard

### 4. Test CRUD Operations

#### Test Profile Update:
1. Login admin
2. Go to Profile section
3. Update bio atau description
4. Save
5. Refresh homepage → harus update

#### Test Create Project:
1. Admin → Projects → Create New
2. Isi form project baru
3. Save
4. Check homepage → project baru muncul di Projects section

#### Test Edit Project:
1. Admin → Projects
2. Click Edit pada salah satu project
3. Update title atau description
4. Save
5. Verify changes

#### Test Delete Project:
1. Admin → Projects
2. Click Delete
3. Confirm
4. Project hilang dari list

#### Test Create Experience:
1. Admin → Experience → Create New
2. Isi form experience baru
3. Save
4. Check homepage → experience baru muncul

#### Test Tech Stack Management:
1. Admin → Tech Stack
2. Add new tech stack
3. Edit existing tech stack
4. Delete tech stack
5. Verify changes on homepage

## 🐛 Troubleshooting

### Build Gagal

**Error: `Cannot find module '@cloudflare/next-on-pages'`**
```bash
npm install @cloudflare/next-on-pages --save-dev
```

**Error: React version conflict**
```bash
# Pastikan menggunakan React 18
npm install react@18.3.1 react-dom@18.3.1
```

### Database Connection Error

**Error: `DB is not defined`**
- Pastikan D1 binding sudah setup dengan nama `DB` (case-sensitive)
- Restart deployment setelah add binding

**Error: `no such table`**
- Migrations belum dijalankan di production
- Run: `wrangler d1 migrations apply portfolio-db-production --remote`

### Authentication Error

**Error: `NEXTAUTH_URL mismatch`**
- Update `NEXTAUTH_URL` di environment variables dengan URL production
- Format: `https://your-project.pages.dev` (tanpa trailing slash)

**Error: `GitHub OAuth tidak bekerja`**
1. Go to GitHub Settings → Developer Settings → OAuth Apps
2. Update **Authorization callback URL**:
   - `https://your-project.pages.dev/api/auth/callback/github`
3. Redeploy

### CRUD Functions Tidak Bekerja

**Symptoms:**
- Form submit tidak save
- Delete tidak hapus
- Update tidak berubah

**Solutions:**
1. Check browser console untuk errors
2. Check Cloudflare Pages logs:
   ```bash
   wrangler pages deployment tail
   ```
3. Verify database connection:
   ```bash
   wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM profile"
   ```
4. Check environment variables sudah set semua
5. Verify D1 binding name adalah `DB`

## 📊 Database Management Production

### View Data
```bash
# Profile
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM profile"

# Projects
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM projects"

# Tech Stacks
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM tech_stacks"

# Experiences
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM experiences"
```

### Manual Data Update
```bash
# Update profile
wrangler d1 execute portfolio-db-production --remote --command "UPDATE profile SET bio='New bio' WHERE id='prof-1'"

# Delete project
wrangler d1 execute portfolio-db-production --remote --command "DELETE FROM projects WHERE id='proj-1'"
```

### Backup Database
```bash
# Export semua data
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM profile" > backup-profile.json
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM projects" > backup-projects.json
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM tech_stacks" > backup-techstack.json
wrangler d1 execute portfolio-db-production --remote --command "SELECT * FROM experiences" > backup-experiences.json
```

## 🎨 Upload Foto Profil

1. Prepare foto Anda (format: JPG/PNG, ukuran: max 500KB, dimensi: 400x400px atau 1:1 ratio)
2. Rename menjadi `profile.jpg`
3. Upload ke repository: `/public/images/profile.jpg`
4. Commit dan push:
   ```bash
   git add public/images/profile.jpg
   git commit -m "Add profile photo"
   git push
   ```
5. Cloudflare Pages akan auto-deploy ulang
6. Foto akan muncul di hero section

## 📄 Upload CV

1. Prepare CV PDF Anda
2. Rename menjadi `Daniel-Sinambela-CV.pdf`
3. Upload ke repository: `/public/cv/Daniel-Sinambela-CV.pdf`
4. Commit dan push:
   ```bash
   git add public/cv/Daniel-Sinambela-CV.pdf
   git commit -m "Add CV PDF"
   git push
   ```
5. Download button di homepage akan otomatis bekerja

## 🔄 Update Website

Setiap kali push ke GitHub, Cloudflare Pages akan otomatis build dan deploy:

```bash
# Edit files
# ...

# Commit changes
git add .
git commit -m "Update projects and experience"

# Push to GitHub
git push

# Cloudflare akan auto-deploy dalam 1-2 menit
```

## 💰 Biaya

**100% GRATIS** dengan limit:
- 500 builds per month
- 100 GB bandwidth per month
- Unlimited requests
- Unlimited custom domains

Untuk portfolio pribadi, ini lebih dari cukup!

## 📱 Monitoring

### View Deployment Logs
```bash
wrangler pages deployment tail
```

### View Analytics
1. Dashboard Cloudflare → Pages → Your Project
2. Click **Analytics**
3. Lihat traffic, requests, bandwidth usage

## 🎉 Selesai!

Website portfolio Anda sekarang live di:
- `https://portfolio-daniel-sinambela.pages.dev`

Anda bisa:
- ✅ Manage semua content via admin dashboard
- ✅ Create/Edit/Delete projects
- ✅ Update profile info
- ✅ Manage tech stacks
- ✅ Add experiences
- ✅ Upload CV
- ✅ Upload foto profil

Semua update via admin dashboard langsung tersimpan ke Cloudflare D1 Database!

---

**Need Help?**
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
