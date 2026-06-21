# ⚠️ Cloudflare Pages Deployment Fix

## Masalah

Build di Cloudflare Pages gagal karena:
1. Next.js App Router **tidak bisa** langsung di-deploy ke Cloudflare Pages dengan setup standard
2. `@cloudflare/next-on-pages` sudah deprecated
3. Perlu menggunakan **Cloudflare Pages Functions** atau **Worker** mode

## ✅ Solusi: Deploy dengan Vercel ATAU Gunakan Next.js Pages Router

### Option 1: Deploy ke Vercel (RECOMMENDED - PALING MUDAH)

Vercel adalah platform native untuk Next.js dan paling mudah:

1. **Push code ke GitHub** (sudah done ✅)

2. **Sign up di Vercel**: https://vercel.com/signup

3. **Import Project**:
   - Click "Add New..." > "Project"
   - Import GitHub repo: `dannel07/Portofolio`
   - Framework Preset: **Next.js** (auto-detect)
   - Click **Deploy**

4. **Add Environment Variables** (after first deploy):
   - Settings > Environment Variables
   ```
   AUTH_SECRET=OLi7cFjiWxJeCIi9+OhPUSLxnLyQy6sc5XUDsZhJYg4=
   GITHUB_ID=Ov23liEsjkAhMUKDSMeK
   GITHUB_SECRET=f26d5b0f92f9eb7a3e0fb93ce0e9c0b35bc2bae9
   NEXTAUTH_URL=(will be your Vercel URL)
   ```

5. **Setup Database**:
   - Vercel > Storage > Create Database > **Postgres** (FREE tier available)
   - Atau pakai: **Turso** (SQLite-compatible, FREE)
   - Atau pakai: **Neon** (Postgres, FREE tier)

6. **Update Database Connection**:
   - Ganti dari Cloudflare D1 ke database provider yang dipilih
   - Update `src/lib/db.ts`

**Pros**:
- ✅ Next.js native support
- ✅ Zero configuration
- ✅ Auto-deploy dari GitHub
- ✅ Free tier available
- ✅ Excellent DX

**Cons**:
- ❌ Perlu migrate dari Cloudflare D1 ke database lain

---

### Option 2: Simplify untuk Cloudflare Pages

Untuk tetap pakai Cloudflare Pages, kita perlu **drastically simplify**:

#### Langkah-langkah:

1. **Remove Server Actions** - Convert semua ke API Routes
2. **Use Static Export** - Generate static HTML
3. **API Routes as Workers** - Deploy API routes sebagai Cloudflare Workers terpisah

Ini butuh **refactor besar-besaran** dan tidak recommended.

---

### Option 3: Deploy Admin di Vercel, Public Site di Cloudflare

**Split deployment**:
- **Admin Dashboard** → Vercel (perlu auth & database)
- **Public Portfolio** → Cloudflare Pages (static export)

#### Setup:

1. **Create two separate projects**:
   - `portfolio-admin` - Full Next.js app (all admin pages)
   - `portfolio-public` - Static export (only public pages)

2. **Public site** di Cloudflare Pages:
   ```bash
   # Generate static export
   next.config.mjs → add output: 'export'
   npm run build
   # Upload .next/out to Cloudflare Pages
   ```

3. **Admin site** di Vercel:
   - Normal Next.js deployment
   - Full database access

**Pros**:
- ✅ Public site super fast (static)
- ✅ Admin fully functional
- ✅ Can use Cloudflare for public site

**Cons**:
- ❌ Need to maintain two deployments
- ❌ More complex setup

---

## 🎯 RECOMMENDATION: Deploy ke Vercel

**Paling mudah dan paling cepat** adalah deploy ke Vercel karena:

1. Next.js App Router **native support**
2. Server Actions **works out of the box**
3. Free tier available
4. Excellent performance
5. Zero configuration needed
6. Auto-deploy dari GitHub

### Database Options untuk Vercel:

#### 1. **Vercel Postgres** (Recommended)
- Native integration
- Free tier: 256 MB storage
- Click to setup
- https://vercel.com/docs/storage/vercel-postgres

#### 2. **Turso** (SQLite-compatible)
- FREE tier: 9 GB storage
- SQLite-based (mirip D1!)
- Excellent DX
- https://turso.tech/

#### 3. **Neon** (Postgres)
- FREE tier: 0.5 GB storage
- Serverless Postgres
- Good performance
- https://neon.tech/

---

## 🔄 Migration Steps (D1 → Turso/Postgres)

Kalau mau migrate:

### 1. Export data dari D1:
```bash
wrangler d1 execute portfolio-db-production --command "SELECT * FROM profile;" --json > profile.json
wrangler d1 execute portfolio-db-production --command "SELECT * FROM projects;" --json > projects.json
# ... dst untuk table lainnya
```

### 2. Update `src/lib/db.ts`:
```typescript
// For Turso (SQLite-compatible)
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema });
```

### 3. Run migrations:
```bash
npx drizzle-kit push:sqlite  # for Turso
# or
npx drizzle-kit push:pg      # for Postgres
```

### 4. Import data
   - Gunakan script seed atau manual insert

---

## 📊 Comparison

| Feature | Cloudflare Pages | Vercel |
|---------|-----------------|--------|
| Next.js App Router | ❌ Complex | ✅ Native |
| Server Actions | ❌ Not supported | ✅ Supported |
| Database | D1 (SQLite) | Postgres/Turso/Neon |
| Setup Complexity | 😰 High | 😊 Easy |
| Free Tier | ✅ Yes | ✅ Yes |
| Performance | ⚡ Excellent | ⚡ Excellent |
| DX | 😐 OK | 😍 Excellent |

---

## 🎯 Final Recommendation

**Deploy ke Vercel dengan Turso database**:
- ✅ Easy setup (10 menit)
- ✅ SQLite-compatible (mirip D1)
- ✅ FREE tier generous
- ✅ Excellent performance
- ✅ Next.js App Router works perfectly
- ✅ Auto-deploy dari GitHub

**Ikuti panduan**: `DEPLOY-TO-VERCEL.md` (akan dibuat next)

---

## ❓ Questions?

Mau lanjut deploy ke Vercel atau mau tetap coba Cloudflare Pages dengan refactor besar?

Vercel jauh lebih mudah dan cepat! 🚀
