# 🚀 Deployment Guide - Cloudflare Pages

Complete guide to deploy your portfolio to Cloudflare Pages with D1 database.

## 📋 Prerequisites

- Cloudflare account (free tier is sufficient)
- GitHub account
- Domain (optional, Cloudflare provides free subdomain)

## 🔧 Step 1: Cloudflare Setup

### 1.1 Create Cloudflare Account

1. Go to [cloudflare.com](https://cloudflare.com)
2. Sign up for a free account
3. Verify your email

### 1.2 Install Wrangler CLI

```bash
npm install -g wrangler
```

### 1.3 Login to Cloudflare

```bash
wrangler login
```

This will open a browser for authentication.

## 🗄️ Step 2: Database Setup

### 2.1 Create D1 Database

```bash
wrangler d1 create portfolio-db
```

Save the output - you'll need the database ID:
```
✅ Successfully created DB 'portfolio-db'

[[d1_databases]]
binding = "DB"
database_name = "portfolio-db"
database_id = "your-database-id-here"
```

### 2.2 Update wrangler.toml

Replace the database_id in `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "portfolio-db"
database_id = "YOUR_ACTUAL_DATABASE_ID"
```

### 2.3 Generate Migrations

```bash
npm run db:generate
```

### 2.4 Apply Migrations to Production

```bash
wrangler d1 migrations apply portfolio-db
```

### 2.5 Seed Production Database

Create a file `src/db/seed-production.sql` from your seed data:

```sql
-- Insert profile
INSERT INTO profile (id, name, email, phone, location, bio, description, github_url, linkedin_url)
VALUES (
  'your-id',
  'Daniel Sinambela',
  'sinambeladaniel07@gmail.com',
  '+6281263167246',
  'Toba, North Sumatera, Indonesia',
  'Applied Software Engineering Technology student',
  'Full description here...',
  'https://github.com/dannel07',
  'https://linkedin.com/in/daniel-sinambela-aaba18389'
);

-- Add more INSERT statements for education, tech_stacks, projects, experiences
```

Then execute:
```bash
wrangler d1 execute portfolio-db --file=./src/db/seed-production.sql
```

## 📦 Step 3: File Storage Setup (R2)

### 3.1 Create R2 Bucket

```bash
wrangler r2 bucket create portfolio-assets
```

### 3.2 Update wrangler.toml

Add to `wrangler.toml`:
```toml
[[r2_buckets]]
binding = "R2"
bucket_name = "portfolio-assets"
```

## 🔐 Step 4: GitHub OAuth Setup

### 4.1 Create Production OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Daniel Sinambela Portfolio (Production)
   - **Homepage URL**: `https://your-domain.pages.dev`
   - **Authorization callback URL**: `https://your-domain.pages.dev/api/auth/callback/github`
4. Click "Register application"
5. Copy the **Client ID**
6. Click "Generate a new client secret"
7. Copy the **Client Secret** (you won't see it again!)

### 4.2 Generate AUTH_SECRET

```bash
openssl rand -base64 32
```

Copy the output.

## 🌐 Step 5: Deploy to Cloudflare Pages

### Option A: GitHub Integration (Recommended)

#### 5.1 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/dannel07/portfolio-daniel-sinambela.git
git push -u origin main
```

#### 5.2 Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Pages** in the sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Select your repository: `portfolio-daniel-sinambela`
6. Click **Begin setup**

#### 5.3 Configure Build Settings

- **Project name**: `portfolio-daniel-sinambela`
- **Production branch**: `main`
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.vercel/output/static`
- **Root directory**: `/`
- **Node version**: `18` or `20`

#### 5.4 Add Environment Variables

Click **Add environment variables** and add:

```
AUTH_GITHUB_ID=your-production-github-client-id
AUTH_GITHUB_SECRET=your-production-github-client-secret
AUTH_SECRET=your-generated-auth-secret
ADMIN_GITHUB_USERNAME=dannel07
NEXTAUTH_URL=https://your-project.pages.dev
```

#### 5.5 Add Bindings

1. After first deployment, go to **Settings** → **Functions**
2. Add **D1 database binding**:
   - Variable name: `DB`
   - D1 database: `portfolio-db`
3. Add **R2 bucket binding**:
   - Variable name: `R2`
   - R2 bucket: `portfolio-assets`
4. Click **Save**

#### 5.6 Deploy

Click **Save and Deploy**

Your site will be available at: `https://your-project.pages.dev`

### Option B: Manual Deployment with Wrangler

#### 5.1 Build the Project

```bash
npm run build
```

#### 5.2 Deploy with Wrangler

```bash
npx wrangler pages deploy .vercel/output/static --project-name=portfolio-daniel-sinambela
```

#### 5.3 Set Environment Variables

```bash
wrangler pages secret put AUTH_GITHUB_ID --project-name=portfolio-daniel-sinambela
wrangler pages secret put AUTH_GITHUB_SECRET --project-name=portfolio-daniel-sinambela
wrangler pages secret put AUTH_SECRET --project-name=portfolio-daniel-sinambela
wrangler pages secret put ADMIN_GITHUB_USERNAME --project-name=portfolio-daniel-sinambela
wrangler pages secret put NEXTAUTH_URL --project-name=portfolio-daniel-sinambela
```

## 🌍 Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain

1. Go to your Cloudflare Pages project
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain (e.g., `danielsinambela.com`)
5. Follow the DNS setup instructions

### 6.2 Update GitHub OAuth

Update your GitHub OAuth app's URLs to use your custom domain:
- Homepage URL: `https://danielsinambela.com`
- Callback URL: `https://danielsinambela.com/api/auth/callback/github`

### 6.3 Update Environment Variables

Update `NEXTAUTH_URL` to your custom domain:
```
NEXTAUTH_URL=https://danielsinambela.com
```

## ✅ Step 7: Verification

### 7.1 Check Deployment

Visit your site: `https://your-project.pages.dev`

Verify:
- ✅ Site loads correctly
- ✅ Dark/Light mode works
- ✅ All sections display properly
- ✅ Links work
- ✅ Contact form works

### 7.2 Test Admin Access

1. Visit `/admin`
2. Click "Sign in with GitHub"
3. Authorize the application
4. Verify you can access the dashboard
5. Test CRUD operations

### 7.3 Check Database

```bash
# View data in D1
wrangler d1 execute portfolio-db --command="SELECT * FROM profile"
wrangler d1 execute portfolio-db --command="SELECT * FROM tech_stacks LIMIT 5"
```

## 🔄 Step 8: Continuous Deployment

With GitHub integration, every push to `main` automatically deploys:

```bash
git add .
git commit -m "Update content"
git push
```

Cloudflare Pages will:
1. Detect the push
2. Build the project
3. Deploy automatically
4. Available at your URL in ~1-2 minutes

## 📊 Step 9: Monitor and Analytics

### 9.1 Cloudflare Analytics

- Go to your Pages project
- Click **Analytics** tab
- View traffic, requests, bandwidth

### 9.2 Custom Analytics

Access your custom analytics at:
`https://your-domain.pages.dev/admin/analytics`

## 🛠️ Troubleshooting

### Build Fails

**Error**: `Command failed with exit code 1`

**Solution**:
1. Check build logs in Cloudflare dashboard
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`
4. Check Node.js version matches (18 or 20)

### Database Connection Issues

**Error**: `Cannot find D1 database`

**Solution**:
1. Verify database binding in Settings → Functions
2. Check binding name is `DB`
3. Redeploy the project

### Authentication Issues

**Error**: `OAuthCallback error`

**Solution**:
1. Verify GitHub OAuth app callback URL matches deployed URL
2. Check `NEXTAUTH_URL` environment variable
3. Verify `AUTH_SECRET` is set correctly
4. Clear cookies and try again

### Environment Variables Not Working

**Solution**:
1. Go to Settings → Environment variables
2. Verify all variables are set
3. Click **Redeploy** to apply changes

## 🚀 Performance Optimization

### Enable Caching

In `next.config.mjs`:
```js
const nextConfig = {
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png|webp|woff|woff2)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

### Enable Compression

Cloudflare automatically enables:
- Brotli compression
- Gzip compression
- Minification

### Image Optimization

Use Cloudflare Images (paid) or optimize with Next.js Image component.

## 📈 Scaling

The free tier includes:
- Unlimited requests
- Unlimited bandwidth
- 500 builds per month
- 100 custom domains

## 🔒 Security Checklist

- [x] HTTPS enabled (automatic)
- [x] Authentication configured
- [x] Environment variables secured
- [x] CORS configured
- [x] Rate limiting (Cloudflare default)
- [x] DDoS protection (Cloudflare automatic)

## 📝 Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
git commit -am "Update dependencies"
git push
```

### Database Migrations

```bash
# Create new migration
npm run db:generate

# Apply to production
wrangler d1 migrations apply portfolio-db

# Verify
wrangler d1 execute portfolio-db --command="PRAGMA table_info(your_table)"
```

### Backup Database

```bash
# Export database
wrangler d1 export portfolio-db --output=backup-$(date +%Y%m%d).sql

# Import backup
wrangler d1 execute portfolio-db --file=backup-20240315.sql
```

## 🎉 Success!

Your portfolio is now live on Cloudflare Pages!

- **Production URL**: `https://your-project.pages.dev`
- **Admin Dashboard**: `https://your-project.pages.dev/admin`
- **Analytics**: Cloudflare Dashboard

---

**Need Help?**
- Cloudflare Docs: https://developers.cloudflare.com/pages/
- Wrangler Docs: https://developers.cloudflare.com/workers/wrangler/
- Community Discord: https://discord.cloudflare.com
