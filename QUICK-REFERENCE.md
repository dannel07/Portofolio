# 📌 QUICK REFERENCE - Portfolio Deploy

## 🔑 Important Links

| Service | URL |
|---------|-----|
| Turso Dashboard | https://turso.tech/app |
| Vercel Dashboard | https://vercel.com/dashboard |
| GitHub OAuth Settings | https://github.com/settings/developers |
| GitHub Repo | https://github.com/dannel07/Portofolio |

## 🗂️ Database Info

```
Database Name: portfolio-db
Platform: Turso (SQLite Edge)
Free Tier: 9GB storage, 500M row reads/month
```

## 🔐 Environment Variables (Already Set in Vercel)

```env
AUTH_SECRET=OLi7cFjiWxJeCIi9+OhPUSLxnLyQy6sc5XUDsZhJYg4=
AUTH_GITHUB_ID=Ov23li4pLk0xJisBzz6g
AUTH_GITHUB_SECRET=06443944607a75a9c26262bd7e7cb633bf7f4e39
ADMIN_GITHUB_USERNAME=dannel07
TURSO_DATABASE_URL=(sudah diset)
TURSO_AUTH_TOKEN=(sudah diset)
NEXTAUTH_URL=(perlu update dengan production URL)
```

## 📋 Database Tables (11 Total)

1. ✅ `users` - NextAuth users
2. ✅ `accounts` - OAuth accounts
3. ✅ `sessions` - User sessions
4. ✅ `profile` - Your profile data
5. ✅ `projects` - Portfolio projects
6. ✅ `experiences` - Work experience
7. ✅ `tech_stacks` - Technologies
8. ✅ `project_tech_stacks` - Many-to-many relation
9. ✅ `education` - Education history
10. ✅ `cv_files` - Resume/CV uploads
11. ✅ `analytics` - Site analytics

## 📊 Sample Data Included

- **1 Profile**: Daniel Sinambela
- **20 Tech Stacks**: React, Next.js, TypeScript, etc.
- **4 Projects**: E-commerce, Task Manager, Weather, Blog
- **3 Experiences**: Internship, Freelance, Organization

## 🛠️ Tech Stack

```
Frontend: Next.js 15, React 18, TypeScript, Tailwind CSS
Backend: Next.js Server Actions, NextAuth.js
Database: Turso (LibSQL/SQLite)
ORM: Drizzle ORM
Hosting: Vercel
Auth: GitHub OAuth
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `DEPLOY-SEKARANG.md` | Main deployment guide (BACA INI!) |
| `TURSO-SQL-SETUP.sql` | SQL to run in Turso Console |
| `CHECKLIST-DEPLOY.md` | Simple checklist |
| `QUICK-REFERENCE.md` | This file (quick info) |

## 🚀 Deployment Status

```
✅ Code pushed to GitHub
✅ Vercel project created
✅ Build successful
✅ Website LIVE
✅ Turso database connected
✅ Environment variables set
❌ Database tables not created yet ← YOU ARE HERE
❌ Sample data not inserted yet
❌ Production URL not updated
❌ GitHub OAuth callback not updated
```

## ⚡ Quick Commands Reference

### For Future Development (Local)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Database migrations
npm run db:generate
npm run db:push

# Seed local database
npm run db:seed
```

## 🎯 Next Steps (In Order)

1. Run SQL in Turso Console (STEP 1 & 2)
2. Update NEXTAUTH_URL in Vercel
3. Update GitHub OAuth callback URL
4. Redeploy Vercel
5. Test website & login

**Estimated Time: 5-10 minutes**

## 💰 Cost Breakdown (FREE Forever!)

| Service | Plan | Cost | Limits |
|---------|------|------|--------|
| Vercel | Hobby | FREE | Unlimited projects, 100GB bandwidth/month |
| Turso | Free Tier | FREE | 9GB storage, 500M row reads/month |
| GitHub | Free | FREE | Unlimited repos, OAuth apps |
| **TOTAL** | | **$0/month** | More than enough for portfolio |

## 📱 Routes Overview

```
Public Routes:
/ - Homepage
/projects - Projects list
/projects/[id] - Project detail
/about - About page
/contact - Contact page

Admin Routes (Protected):
/admin/signin - Login page
/admin - Dashboard
/admin/profile - Edit profile
/admin/projects - Manage projects
/admin/experience - Manage experience
/admin/tech-stack - Manage tech stacks
/admin/cv - Manage CV files

API Routes:
/api/auth/* - NextAuth.js
/api/upload - File upload (future)
```

## 🔒 Security Features

- ✅ GitHub OAuth authentication
- ✅ Protected admin routes
- ✅ Environment variables for secrets
- ✅ SQL injection prevention (Drizzle ORM)
- ✅ CSRF protection (NextAuth.js)
- ✅ Secure session management

## 📞 Support

Stuck? Tell me:
1. What step you're on
2. What error you're seeing
3. Screenshot if possible

I'll help you fix it! 💪

---

**Last Updated**: June 22, 2026
**Version**: 1.0 (Production Ready)
