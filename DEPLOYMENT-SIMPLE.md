# 🚀 Panduan Deploy Portfolio ke Cloudflare Pages

Panduan lengkap deployment untuk Windows - langkah demi langkah.

---

## 📋 Yang Anda Butuhkan

- ✅ Akun GitHub (sudah ada)
- ✅ Akun Cloudflare (gratis) - https://dash.cloudflare.com/sign-up
- ✅ Project portfolio sudah jalan di local

---

## 🎯 TAHAP 1: Persiapan Project

### 1.1 Push Project ke GitHub

```bash
# Inisialisasi Git (jika belum)
git init

# Tambahkan semua file
git add .

# Commit pertama
git commit -m "Initial commit - Portfolio Daniel Sinambela"

# Buat branch main
git branch -M main

# Tambahkan remote repository (ganti dengan repo Anda)
git remote add origin https://github.com/dannel07/portfolio-daniel-sinambela.git

# Push ke GitHub
git push -u origin main
```

**✅ Checklist:**
- [ ] Repository sudah ada di GitHub
- [ ] Semua file sudah ter-push
- [ ] Branch main sudah ada

---

## 🗄️ TAHAP 2: Setup Cloudflare D1 Database

### 2.1 Login ke Cloudflare (Opsi A - Menggunakan API Token)

Jika `wrangler login` bermasalah, gunakan API Token:

**Langkah 1: Dapatkan API Token**

1. Login ke https://dash.cloudflare.com
2. Klik profil Anda (pojok kanan atas)
3. Klik **"My Profile"**
4. Klik **"API Tokens"** di sidebar kiri
5. Klik **"Create Token"**
6. Pilih **"Edit Cloudflare Workers"** template
7. Atau buat custom dengan permissions:
   - Account → D1 → Edit
   - Account → Pages → Edit
   - Account → Workers Scripts → Edit
8. Klik **"Continue to summary"**
9. Klik **"Create Token"**
10. **COPY TOKEN** (hanya tampil sekali!)

**Langkah 2: Set API Token di Terminal**

```bash
# Set sebagai environment variable
$env:CLOUDFLARE_API_TOKEN="paste-token-anda-disini"

# Atau buat file .env
echo CLOUDFLARE_API_TOKEN=paste-token-anda-disini >> .env
```

### 2.2 Buat Database D1

```bash
# Buat database
wrangler d1 create portfolio-db
```

**Output akan seperti ini:**
```
✅ Successfully created DB 'portfolio-db'!

[[d1_databases]]
binding = "DB"
database_name = "portfolio-db"
database_id = "xxxx-xxxx-xxxx-xxxx-xxxx"
```

**COPY database_id dari output!**

### 2.3 Update wrangler.toml

Edit file `wrangler.toml` dan ganti `database_id`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "portfolio-db"
database_id = "xxxx-xxxx-xxxx-xxxx-xxxx"  # Paste database_id Anda di sini
```

### 2.4 Generate dan Apply Migrations

```bash
# Generate migration files
npm run db:generate

# Apply migrations ke database production
wrangler d1 migrations apply portfolio-db
```

Ketik **"y"** ketika ditanya untuk apply migrations.

### 2.5 Seed Database dengan Data CV

Buat file SQL untuk seed data:

```bash
# Buat folder untuk SQL files
mkdir -p scripts
```

Buat file `scripts/seed-production.sql`:

```sql
-- Insert Profile
INSERT INTO profile (id, name, email, phone, location, bio, description, github_url, linkedin_url, created_at, updated_at)
VALUES (
  'profile001',
  'Daniel Sinambela',
  'sinambeladaniel07@gmail.com',
  '+6281263167246',
  'Toba, North Sumatera, Indonesia',
  'Applied Software Engineering Technology student',
  'An Applied Software Engineering Technology student at Institut Teknologi Del with hands-on experience in fullstack web development, modern database management, and system analysis. Proficient in building scalable applications using Laravel, Go, PHP, and JavaScript.',
  'https://github.com/dannel07',
  'https://linkedin.com/in/daniel-sinambela-aaba18389',
  1640000000000,
  1640000000000
);

-- Insert Education
INSERT INTO education (id, institution, degree, field, start_date, end_date, gpa, location, description, is_currently, "order", created_at)
VALUES (
  'edu001',
  'Institut Teknologi Del',
  'Diploma 4, Bachelor of Applied Software Engineering Technology',
  'Software Engineering',
  '2023-08',
  NULL,
  '3.47',
  'Toba, North Sumatera',
  'Relevant Coursework: Web Development I & II, Object-Oriented Programming, Database Systems, Distributed Application Development, Software Requirement Analysis, Software Testing, Algorithms and Data Structures, Software Quality Assurance.',
  1,
  0,
  1640000000000
);

-- Insert Tech Stacks (Backend)
INSERT INTO tech_stacks (id, name, category, proficiency, "order", created_at)
VALUES 
  ('tech001', 'Laravel', 'Backend', 85, 1, 1640000000000),
  ('tech002', 'Go', 'Backend', 75, 2, 1640000000000),
  ('tech003', 'PHP', 'Backend', 85, 3, 1640000000000),
  ('tech004', 'REST API', 'Backend', 80, 4, 1640000000000);

-- Insert Tech Stacks (Frontend)
INSERT INTO tech_stacks (id, name, category, proficiency, "order", created_at)
VALUES 
  ('tech010', 'JavaScript', 'Frontend', 80, 10, 1640000000000),
  ('tech011', 'TypeScript', 'Frontend', 70, 11, 1640000000000),
  ('tech012', 'React', 'Frontend', 75, 12, 1640000000000);

-- Insert Tech Stacks (Database)
INSERT INTO tech_stacks (id, name, category, proficiency, "order", created_at)
VALUES 
  ('tech020', 'MySQL', 'Database', 85, 20, 1640000000000),
  ('tech021', 'PostgreSQL', 'Database', 80, 21, 1640000000000),
  ('tech022', 'MongoDB', 'Database', 80, 22, 1640000000000);

-- Insert Projects
INSERT INTO projects (id, title, description, long_description, status, featured, start_date, end_date, "order", created_at, updated_at)
VALUES 
  (
    'proj001',
    'Web-Based Agent for GJM and GKM Administrative Automation',
    'Administrative automation system for academic quality assurance processes',
    'Developed a web-based administrative automation system for GJM and GKM to streamline academic quality assurance processes and reduce manual workloads.',
    'completed',
    1,
    '2026-01',
    '2026-06',
    1,
    1640000000000,
    1640000000000
  ),
  (
    'proj002',
    'Hommie: Boarding House and Homestay Booking System',
    'Mobile-friendly accommodation booking platform for Lake Toba area',
    'Developed a mobile-friendly web accommodation booking system to help users search, view, and reserve homestays in the Lake Toba area.',
    'completed',
    1,
    '2025-03',
    '2025-08',
    2,
    1640000000000,
    1640000000000
  );

-- Insert Experiences
INSERT INTO experiences (id, title, company, location, type, start_date, end_date, is_currently, description, "order", created_at)
VALUES 
  (
    'exp001',
    'Head of Multimedia Division',
    'Department of Science and Technology (DIPTEK)',
    'Toba, North Sumatera',
    'organization',
    '2026-02',
    NULL,
    1,
    'Lead the multimedia division in designing, creating, and managing visual and digital content to support organizational branding and publications.',
    1,
    1640000000000
  ),
  (
    'exp002',
    'Gen AI Engineer Bootcamp Participant',
    'Dicoding x DBS Foundation',
    'Remote',
    'bootcamp',
    '2026-04',
    '2026-04',
    0,
    'Completed an intensive training program focused on Artificial Intelligence, Generative AI fundamentals, and Machine Learning engineering.',
    2,
    1640000000000
  );
```

**Execute SQL ke database:**

```bash
wrangler d1 execute portfolio-db --file=./scripts/seed-production.sql
```

**✅ Checklist:**
- [ ] Database D1 sudah dibuat
- [ ] Migrations sudah di-apply
- [ ] Data sudah di-seed
- [ ] Bisa query data: `wrangler d1 execute portfolio-db --command="SELECT * FROM profile"`

---

## 🔐 TAHAP 3: Setup GitHub OAuth (Production)

### 3.1 Buat OAuth App untuk Production

1. Go to https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: `Portfolio Daniel Sinambela (Production)`
   - **Homepage URL**: `https://portfolio-daniel-sinambela.pages.dev` (sementara)
   - **Authorization callback URL**: `https://portfolio-daniel-sinambela.pages.dev/api/auth/callback/github`
4. Click **"Register application"**
5. **COPY Client ID**
6. Click **"Generate a new client secret"**
7. **COPY Client Secret** (hanya tampil sekali!)

### 3.2 Generate AUTH_SECRET

```bash
# Windows PowerShell
$bytes = New-Object Byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

**COPY output** sebagai AUTH_SECRET.

**✅ Checklist:**
- [ ] GitHub OAuth App sudah dibuat
- [ ] Client ID sudah dicopy
- [ ] Client Secret sudah dicopy
- [ ] AUTH_SECRET sudah digenerate

---

## 🌐 TAHAP 4: Deploy ke Cloudflare Pages

### Opsi A: Deploy via GitHub Integration (RECOMMENDED)

#### 4.1 Connect Repository ke Cloudflare Pages

1. Login ke https://dash.cloudflare.com
2. Klik **"Workers & Pages"** di sidebar kiri
3. Klik **"Create application"**
4. Tab **"Pages"** → Klik **"Connect to Git"**
5. **Authorize Cloudflare** untuk akses GitHub
6. **Select repository**: `portfolio-daniel-sinambela`
7. Klik **"Begin setup"**

#### 4.2 Configure Build Settings

**Project name**: `portfolio-daniel-sinambela`

**Production branch**: `main`

**Build settings**:
- Framework preset: `Next.js`
- Build command: `npm run build`
- Build output directory: `.next`
- Root directory: `/`

**Environment variables** (klik "Add variable"):

| Variable Name | Value |
|--------------|-------|
| `NODE_VERSION` | `20` |
| `AUTH_GITHUB_ID` | `paste-production-client-id` |
| `AUTH_GITHUB_SECRET` | `paste-production-client-secret` |
| `AUTH_SECRET` | `paste-generated-auth-secret` |
| `ADMIN_GITHUB_USERNAME` | `dannel07` |
| `NEXTAUTH_URL` | `https://portfolio-daniel-sinambela.pages.dev` |

#### 4.3 Deploy!

1. Klik **"Save and Deploy"**
2. Wait 2-5 minutes...
3. ✅ **Deployment successful!**

#### 4.4 Add D1 Binding

Setelah deployment pertama selesai:

1. Go to your Pages project
2. Click **"Settings"**
3. Click **"Functions"**
4. Scroll to **"D1 database bindings"**
5. Click **"Add binding"**
   - Variable name: `DB`
   - D1 database: `portfolio-db`
6. Click **"Save"**
7. Go to **"Deployments"** tab
8. Click **"Retry deployment"** (untuk apply bindings)

### Opsi B: Deploy Manual dengan Wrangler

Jika prefer deploy manual:

```bash
# Build project
npm run build

# Deploy ke Cloudflare Pages
npx wrangler pages deploy .next --project-name=portfolio-daniel-sinambela

# Set environment variables
wrangler pages secret put AUTH_GITHUB_ID --project-name=portfolio-daniel-sinambela
# Paste value: [your-production-client-id]

wrangler pages secret put AUTH_GITHUB_SECRET --project-name=portfolio-daniel-sinambela
# Paste value: [your-production-client-secret]

wrangler pages secret put AUTH_SECRET --project-name=portfolio-daniel-sinambela
# Paste value: [your-generated-auth-secret]

wrangler pages secret put ADMIN_GITHUB_USERNAME --project-name=portfolio-daniel-sinambela
# Paste value: dannel07

wrangler pages secret put NEXTAUTH_URL --project-name=portfolio-daniel-sinambela
# Paste value: https://portfolio-daniel-sinambela.pages.dev
```

**✅ Checklist:**
- [ ] Project ter-deploy ke Cloudflare Pages
- [ ] Environment variables sudah di-set
- [ ] D1 binding sudah ditambahkan
- [ ] Site bisa diakses

---

## ✅ TAHAP 5: Verifikasi Deployment

### 5.1 Test Public Site

Visit: `https://portfolio-daniel-sinambela.pages.dev`

**Check:**
- [ ] Homepage loads
- [ ] Profile information muncul
- [ ] Skills section tampil
- [ ] Projects tampil
- [ ] Experience timeline tampil
- [ ] Contact form tampil
- [ ] Dark/Light mode bekerja
- [ ] Mobile responsive

### 5.2 Test Admin Access

1. Visit: `https://portfolio-daniel-sinambela.pages.dev/admin`
2. Click **"Sign in with GitHub"**
3. Authorize application
4. **Should redirect to admin dashboard**

**Check:**
- [ ] Login berhasil
- [ ] Admin dashboard tampil
- [ ] Bisa lihat data profile
- [ ] Bisa lihat projects
- [ ] Bisa lihat experiences

### 5.3 Test Database Connection

Di admin dashboard, coba:
- [ ] Edit profile
- [ ] Add new tech stack
- [ ] Add new project
- [ ] Edit experience

---

## 🎨 TAHAP 6: Customization (Optional)

### 6.1 Custom Domain

Jika punya domain sendiri:

1. Go to project settings
2. Click **"Custom domains"**
3. Click **"Set up a custom domain"**
4. Enter: `danielsinambela.com`
5. Follow DNS instructions
6. Wait for DNS propagation (5-60 minutes)

### 6.2 Update GitHub OAuth URLs

Jika sudah pakai custom domain:

1. Go to https://github.com/settings/developers
2. Edit OAuth App
3. Update URLs:
   - Homepage: `https://danielsinambela.com`
   - Callback: `https://danielsinambela.com/api/auth/callback/github`
4. Save

### 6.3 Update NEXTAUTH_URL

1. Go to Pages project → Settings → Environment variables
2. Edit `NEXTAUTH_URL`
3. Change to: `https://danielsinambela.com`
4. Save
5. Redeploy

---

## 🔄 TAHAP 7: Continuous Deployment

Setelah setup selesai, setiap kali Anda push ke GitHub:

```bash
# Make changes
git add .
git commit -m "Update content"
git push

# Cloudflare automatically:
# ✅ Detects push
# ✅ Builds project
# ✅ Deploys to production
# ✅ Live in ~2 minutes
```

---

## 🐛 Troubleshooting

### Problem 1: Build Failed

**Error**: `Command failed with exit code 1`

**Solution**:
```bash
# Test build locally first
npm run build

# If success locally, check:
# - NODE_VERSION environment variable is set
# - All dependencies in package.json
# - No local-only imports
```

### Problem 2: Database Not Connected

**Error**: `Cannot find D1 database`

**Solution**:
1. Check D1 binding is added (Settings → Functions)
2. Variable name must be exactly `DB`
3. Redeploy after adding binding

### Problem 3: Auth Not Working

**Error**: `OAuthCallback error`

**Solution**:
1. Verify GitHub OAuth callback URL matches deployed URL
2. Check all auth environment variables are set
3. Verify AUTH_SECRET is set
4. Clear browser cookies and try again

### Problem 4: 500 Internal Server Error

**Solution**:
1. Check Functions logs in Cloudflare dashboard
2. Verify database migrations are applied
3. Check environment variables are all set
4. Redeploy project

### Problem 5: Images Not Loading

**Solution**:
1. Check image paths are correct
2. Images must be in `public/` folder
3. Use relative paths: `/images/profile.jpg`
4. Or upload to R2 (future enhancement)

---

## 📊 Monitoring

### View Logs

1. Go to your Pages project
2. Click **"Functions"** tab
3. Click **"Real-time logs"**
4. See live request logs

### View Analytics

1. Go to **"Analytics"** tab
2. View:
   - Page views
   - Unique visitors
   - Bandwidth
   - Requests

---

## 🎉 Selesai!

Portfolio Anda sekarang live di internet! 🚀

**Your URLs:**
- 🌐 **Public Site**: https://portfolio-daniel-sinambela.pages.dev
- 🔐 **Admin Dashboard**: https://portfolio-daniel-sinambela.pages.dev/admin

**Share your portfolio:**
- Add to LinkedIn profile
- Add to GitHub README
- Add to CV
- Share on social media

---

## 📞 Need Help?

**Common Resources:**
- 📚 Cloudflare Pages Docs: https://developers.cloudflare.com/pages/
- 💬 Cloudflare Community: https://community.cloudflare.com/
- 🐛 Report Issues: https://github.com/dannel07/portfolio-daniel-sinambela/issues

**Contact:**
- 📧 Email: sinambeladaniel07@gmail.com
- 💼 LinkedIn: https://linkedin.com/in/daniel-sinambela-aaba18389

---

**Congratulations! 🎊**

Portfolio website Anda sudah online dan siap untuk menarik perhatian recruiter! 

Next steps:
- ✅ Share portfolio link di LinkedIn
- ✅ Add to CV/Resume
- ✅ Update content regularly
- ✅ Monitor analytics
- ✅ Apply for jobs with confidence!
