# ⚡ Quick Start Guide

Get your portfolio up and running in 15 minutes!

## 🎯 Prerequisites

- Node.js 18+ installed
- GitHub account
- Cloudflare account (free)

## 🚀 Step-by-Step Setup

### 1. Clone & Install (2 minutes)

```bash
git clone https://github.com/dannel07/portfolio-daniel-sinambela.git
cd portfolio-daniel-sinambela
npm install
```

### 2. Create GitHub OAuth App (3 minutes)

1. Go to https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   - Name: `My Portfolio (Dev)`
   - Homepage: `http://localhost:3000`
   - Callback: `http://localhost:3000/api/auth/callback/github`
4. Click **"Register application"**
5. Copy the **Client ID**
6. Click **"Generate a new client secret"**
7. Copy the **Client Secret**

### 3. Setup Environment Variables (2 minutes)

```bash
# Copy example file
cp .env.example .env
```

Edit `.env` and add your values:

```env
AUTH_GITHUB_ID="paste-your-client-id-here"
AUTH_GITHUB_SECRET="paste-your-client-secret-here"
AUTH_SECRET="run-this-command: openssl rand -base64 32"
ADMIN_GITHUB_USERNAME="your-github-username"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Setup Cloudflare (5 minutes)

Install Wrangler:
```bash
npm install -g wrangler
```

Login to Cloudflare:
```bash
wrangler login
```

Create database:
```bash
wrangler d1 create portfolio-db
```

Copy the database ID from output and update `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "portfolio-db"
database_id = "paste-your-database-id-here"
```

### 5. Setup Database (2 minutes)

Generate migrations:
```bash
npm run db:generate
```

Apply migrations:
```bash
wrangler d1 migrations apply portfolio-db
```

Seed database with your CV data:
```bash
npm run db:seed
```

### 6. Run Development Server (1 minute)

```bash
npm run dev
```

Open http://localhost:3000 🎉

## ✅ Verify Everything Works

### Check Public Portfolio
- [ ] Visit http://localhost:3000
- [ ] See your name and bio
- [ ] Dark/light mode toggle works
- [ ] All sections load properly

### Check Admin Dashboard
- [ ] Visit http://localhost:3000/admin
- [ ] Click "Sign in with GitHub"
- [ ] Authorize the app
- [ ] You should see the admin dashboard

### Test CRUD Operations
- [ ] Go to Projects section
- [ ] Click "Add New Project"
- [ ] Fill in the form
- [ ] Save successfully
- [ ] See it appear on public site

## 🎨 Customize Your Portfolio

### Update Personal Information

Edit `src/db/seed.ts` and modify:

```typescript
export const profileSeedData = {
  name: "Your Name",
  email: "your.email@example.com",
  phone: "+1234567890",
  location: "Your City, Country",
  bio: "Your short bio",
  description: "Your longer description",
  githubUrl: "https://github.com/yourusername",
  linkedinUrl: "https://linkedin.com/in/yourusername",
};
```

Then re-seed:
```bash
npm run db:seed
```

### Add Your Photo

1. Add your photo to `public/images/profile.jpg`
2. Or update the avatar URL in admin dashboard

### Customize Colors

Edit `src/app/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Your brand color */
}
```

## 📱 Next Steps

### Deploy to Production

Follow the [Deployment Guide](DEPLOYMENT.md) to deploy to Cloudflare Pages.

Quick deploy:
```bash
npm run build
npx wrangler pages deploy .vercel/output/static
```

### Add Custom Domain

1. Go to Cloudflare Pages dashboard
2. Click "Custom domains"
3. Add your domain
4. Update DNS records

### Add Content

Use the admin dashboard to:
- Update your profile
- Add your tech stack
- Add your projects
- Add your experience
- Upload your CV

## 🐛 Troubleshooting

### Build Errors

**Problem**: `Module not found`
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
```

**Problem**: `TypeScript errors`
```bash
# Solution: Rebuild types
npm run build
```

### Database Errors

**Problem**: `Cannot connect to database`
```bash
# Solution: Verify Wrangler is logged in
wrangler whoami
wrangler login

# Recreate database
wrangler d1 create portfolio-db
npm run db:generate
wrangler d1 migrations apply portfolio-db
```

### Auth Errors

**Problem**: `OAuthCallback error`

Solution:
1. Check GitHub OAuth callback URL matches exactly
2. Verify `.env` has correct values
3. Clear browser cookies
4. Try again

**Problem**: `Not authorized to access admin`

Solution:
1. Check `ADMIN_GITHUB_USERNAME` in `.env`
2. Make sure it matches your GitHub username exactly
3. Sign out and sign in again

### Port Already in Use

**Problem**: `Port 3000 is already in use`

```bash
# Solution: Use different port
npm run dev -- -p 3001
```

Or kill the process:
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 💡 Pro Tips

### 1. Use VS Code Extensions

Install these for better DX:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier
- ESLint

### 2. Hot Reload Issues?

If changes don't appear:
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### 3. Faster Development

Use Turbopack (experimental):
```bash
npm run dev --turbo
```

### 4. Database Inspection

View your data with Drizzle Studio:
```bash
npm run db:studio
```

### 5. Git Best Practices

```bash
# Never commit secrets!
git add .env
# ERROR! Don't do this!

# Use .env.example instead
git add .env.example
```

## 📚 Learn More

- [Full Documentation](README.md)
- [Architecture Guide](ARCHITECTURE.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Cloudflare Docs](https://developers.cloudflare.com)

## 🆘 Need Help?

- 🐛 Found a bug? [Open an issue](https://github.com/dannel07/portfolio-daniel-sinambela/issues)
- 💬 Have questions? [Start a discussion](https://github.com/dannel07/portfolio-daniel-sinambela/discussions)
- 📧 Email: sinambeladaniel07@gmail.com

---

**Happy coding! 🚀**
