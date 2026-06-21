# 🚀 Deploy ke Vercel - Panduan Lengkap

## ✅ Kenapa Vercel?

- ✅ **GRATIS SELAMANYA** untuk personal projects
- ✅ Next.js App Router **native support**
- ✅ Server Actions **works perfectly**
- ✅ Setup hanya **10 menit**
- ✅ Auto-deploy dari GitHub
- ✅ Custom domain support
- ✅ Excellent performance

---

## 📋 LANGKAH 1: Sign Up di Vercel

1. Buka: **https://vercel.com/signup**
2. Pilih **"Continue with GitHub"**
3. Authorize Vercel untuk akses GitHub kamu
4. Done! Kamu sekarang punya akun Vercel

---

## 📋 LANGKAH 2: Import Project dari GitHub

1. Di Vercel dashboard, klik **"Add New..."**
2. Pilih **"Project"**
3. Cari repository: **"dannel07/Portofolio"**
4. Klik **"Import"**

---

## 📋 LANGKAH 3: Configure Project

Vercel akan auto-detect Next.js. Pastikan setting berikut:

```
Framework Preset: Next.js
Root Directory: ./
Build Command: (leave default - npm run build)
Output Directory: (leave default)
Install Command: (leave default - npm install)
```

**JANGAN DEPLOY DULU!** Scroll ke bawah dulu...

---

## 📋 LANGKAH 4: Add Environment Variables

Sebelum deploy, tambahkan environment variables:

Klik **"Environment Variables"** tab, lalu tambahkan:

### Variable 1: AUTH_SECRET
```
Name: AUTH_SECRET
Value: OLi7cFjiWxJeCIi9+OhPUSLxnLyQy6sc5XUDsZhJYg4=
```

### Variable 2: GITHUB_ID
```
Name: GITHUB_ID
Value: Ov23liEsjkAhMUKDSMeK
```

### Variable 3: GITHUB_SECRET
```
Name: GITHUB_SECRET
Value: f26d5b0f92f9eb7a3e0fb93ce0e9c0b35bc2bae9
```

### Variable 4: NEXTAUTH_URL (temporary)
```
Name: NEXTAUTH_URL
Value: https://portfolio-daniel-sinambela.vercel.app
```
*(akan kita update nanti dengan URL yang actual)*

**Setelah semua variable ditambahkan**, klik **"Deploy"**!

---

## 📋 LANGKAH 5: Wait for Deployment

Vercel akan build & deploy project kamu. Ini займет **2-3 menit**.

Kamu akan lihat:
- ⏳ Building...
- ⏳ Deploying...
- ✅ Success!

---

## 📋 LANGKAH 6: Setup Database (Turso - SQLite Compatible!)

Setelah deployment selesai, kita perlu setup database. Kita akan pakai **Turso** karena:
- ✅ SQLite-compatible (mirip D1!)
- ✅ FREE 9 GB storage
- ✅ Super fast
- ✅ Easy setup

### 6.1 Sign up di Turso

1. Buka: **https://turso.tech/**
2. Klik **"Sign Up"**
3. **"Continue with GitHub"**
4. Authorize Turso

### 6.2 Create Database

1. Di Turso dashboard, klik **"Create Database"**
2. Database name: **"portfolio-db"**
3. Location: **Choose closest to you** (e.g., Singapore)
4. Klik **"Create"**

### 6.3 Get Connection Credentials

Setelah database dibuat:

1. Klik database **"portfolio-db"**
2. Copy **"Database URL"**
   - Format: `libsql://portfolio-db-username.turso.io`
3. Klik **"Create Token"**
4. Copy **"Auth Token"**

### 6.4 Add Turso Credentials ke Vercel

Kembali ke Vercel:

1. Go to Project **"Portofolio"**
2. Settings > **Environment Variables**
3. Add new variables:

**TURSO_DATABASE_URL**:
```
Name: TURSO_DATABASE_URL
Value: libsql://portfolio-db-xxxx.turso.io (paste your URL)
```

**TURSO_AUTH_TOKEN**:
```
Name: TURSO_AUTH_TOKEN
Value: (paste your token)
```

4. Klik **"Save"**

---

## 📋 LANGKAH 7: Update Code untuk Turso

Kita perlu update database connection dari Cloudflare D1 ke Turso.

### 7.1 Install Turso Client

Di local, jalankan:
```bash
npm install @libsql/client
```

### 7.2 Update `src/lib/db.ts`

Ganti isi file dengan:

```typescript
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';

// Check if we're in production (Vercel) or development
const isDevelopment = process.env.NODE_ENV === 'development';

export async function getDb() {
  if (isDevelopment) {
    // Development: use local better-sqlite3
    const { getLocalDb } = await import('./db-local');
    return getLocalDb();
  } else {
    // Production: use Turso
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });
    
    return drizzle(client, { schema });
  }
}

export type Database = Awaited<ReturnType<typeof getDb>>;
```

### 7.3 Commit & Push

```bash
git add .
git commit -m "feat: Switch to Turso database for production"
git push origin main
```

Vercel akan **otomatis redeploy**!

---

## 📋 LANGKAH 8: Run Migrations di Turso

Kita perlu apply migrations ke Turso database.

### 8.1 Install Turso CLI (Local)

**Windows**:
```powershell
# Via Scoop
scoop install turso-cli

# Atau download dari: https://github.com/tursodatabase/turso-cli/releases
```

### 8.2 Login to Turso

```bash
turso auth login
```

### 8.3 Apply Migrations

```bash
# Generate SQL from migrations
cat drizzle/0000_supreme_captain_midlands.sql | turso db shell portfolio-db
```

Atau manually:
```bash
turso db shell portfolio-db
```

Lalu copy-paste isi dari `drizzle/0000_supreme_captain_midlands.sql`

### 8.4 Seed Database

Create file: `scripts/seed-turso.ts`

```typescript
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '../src/db/schema';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(client, { schema });

async function seed() {
  console.log('🌱 Seeding Turso database...');
  
  // Insert profile
  await db.insert(schema.profile).values({
    id: 'prof-' + Date.now(),
    name: 'Daniel Sinambela',
    email: 'daniel@example.com',
    bio: 'Full Stack Developer',
    description: 'Passionate about building web applications',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  
  // Insert tech stacks
  const techStackIds: string[] = [];
  const techStacks = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
  ];
  
  for (const tech of techStacks) {
    const id = 'ts-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    techStackIds.push(id);
    await db.insert(schema.techStacks).values({
      id,
      name: tech.name,
      category: tech.category,
      proficiency: 80,
      order: 0,
      createdAt: Date.now(),
    });
  }
  
  console.log('✅ Seeding complete!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
```

Run seed:
```bash
TURSO_DATABASE_URL=your_url TURSO_AUTH_TOKEN=your_token npx tsx scripts/seed-turso.ts
```

---

## 📋 LANGKAH 9: Update NEXTAUTH_URL

1. Copy production URL dari Vercel (e.g., `https://portfolio-daniel-sinambela.vercel.app`)
2. Di Vercel: Settings > Environment Variables
3. Edit **NEXTAUTH_URL** dengan URL yang correct
4. Klik **"Save"**
5. Vercel akan redeploy

---

## 📋 LANGKAH 10: Update GitHub OAuth Callback

1. Go to: **https://github.com/settings/developers**
2. Klik OAuth App kamu
3. Update **"Authorization callback URL"**:
   ```
   https://portfolio-daniel-sinambela.vercel.app/api/auth/callback/github
   ```
4. Klik **"Update application"**

---

## 🎉 LANGKAH 11: Test Website!

1. Buka production URL: `https://portfolio-daniel-sinambela.vercel.app`
2. Test halaman public
3. Go to `/admin`
4. **Sign in with GitHub**
5. Test CRUD operations!

---

## 🔄 Auto-Deploy

Setiap push ke GitHub `main` branch akan **otomatis trigger deployment** di Vercel!

```bash
git add .
git commit -m "update content"
git push origin main
```

Website update dalam **1-2 menit**! 🚀

---

## 📊 Vercel Free Tier Limits

✅ **Included FREE**:
- 100 GB bandwidth/month
- 100 GB-hours function execution
- Unlimited projects
- Unlimited deployments
- Custom domains
- Automatic HTTPS

**Untuk portfolio ini, 100% cukup!**

---

## 🎯 Next Steps Setelah Deploy

1. ✅ Test authentication
2. ✅ Test admin dashboard  
3. ✅ Upload CV kamu
4. ✅ Add foto profile
5. ✅ Update semua content dengan info asli kamu
6. ✅ (Optional) Add custom domain
7. ✅ Share portfolio link! 🎉

---

## 🌐 Custom Domain (Optional)

Mau pakai domain sendiri? (e.g., `danielsinambela.com`)

1. Beli domain di Namecheap/GoDaddy/dll
2. Di Vercel: Settings > **Domains**
3. Add your domain
4. Update DNS records (Vercel kasih instruksi)
5. Done! HTTPS automatic

---

## 🆘 Troubleshooting

### Build Error
- Check Vercel build logs
- Pastikan environment variables lengkap

### Database Error  
- Pastikan TURSO_DATABASE_URL dan TURSO_AUTH_TOKEN benar
- Check Turso dashboard untuk database status

### Auth Error
- Pastikan NEXTAUTH_URL pakai production URL
- Pastikan GitHub callback URL sudah diupdate

---

## 💡 Tips

1. **Vercel Analytics**: Enable di Settings > Analytics (FREE!)
2. **Speed Insights**: Enable untuk monitor performance
3. **Automatic Preview**: Setiap PR dapat preview URL otomatis
4. **Environment per Branch**: Bisa set env berbeda untuk dev/prod

---

## 📝 Summary

| Step | Time | Status |
|------|------|--------|
| 1. Sign up Vercel | 2 min | ⏳ |
| 2. Import project | 1 min | ⏳ |
| 3. Add env vars | 2 min | ⏳ |
| 4. First deploy | 3 min | ⏳ |
| 5. Setup Turso | 3 min | ⏳ |
| 6. Update code | 5 min | ⏳ |
| 7. Apply migrations | 3 min | ⏳ |
| 8. Seed database | 2 min | ⏳ |
| 9. Update URLs | 2 min | ⏳ |
| 10. Test | 5 min | ⏳ |
| **TOTAL** | **~30 min** | |

---

## 🎊 Done!

Portfolio kamu sekarang **LIVE di internet** dan **GRATIS SELAMANYA**! 🚀

**Production URL**: `https://portfolio-daniel-sinambela.vercel.app`

Share link ini ke teman, recruiter, atau social media! 🎉

---

**Need help?** Check Vercel docs: https://vercel.com/docs
**Turso docs**: https://docs.turso.tech/
