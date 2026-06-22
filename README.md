# 🚀 Portfolio Website - Production Ready

> Modern portfolio website with admin dashboard, built with Next.js 15, TypeScript, and Turso Database.

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Turso](https://img.shields.io/badge/Database-Turso-4F5959?style=for-the-badge)](https://turso.tech)

---

## 📌 Quick Links

| 📖 Documentation | 🔗 Link |
|------------------|---------|
| **🎯 START HERE** | [START-HERE.md](./START-HERE.md) |
| **🚀 Deploy Guide** | [DEPLOY-SEKARANG.md](./DEPLOY-SEKARANG.md) |
| **📋 SQL Setup** | [TURSO-SQL-SETUP.sql](./TURSO-SQL-SETUP.sql) |
| **✅ Checklist** | [CHECKLIST-DEPLOY.md](./CHECKLIST-DEPLOY.md) |
| **📌 Quick Ref** | [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) |
| **📝 Summary** | [SUMMARY-COMPLETE.md](./SUMMARY-COMPLETE.md) |

---

## 🎯 Current Status

```
✅ Code completed and pushed to GitHub
✅ Vercel deployment successful
✅ Build passing
✅ Website LIVE on production
✅ Database connected (Turso)
⏳ Database tables need to be created (5-10 minutes)
```

**👉 Next Step**: Follow [DEPLOY-SEKARANG.md](./DEPLOY-SEKARANG.md) to complete deployment!

---

## ✨ Features

### 🌐 Public Website
- Modern, responsive portfolio homepage
- Projects showcase with filtering
- About page with experience timeline
- Tech stack display
- Contact information

### 🔐 Admin Dashboard
- **Authentication**: GitHub OAuth login
- **Profile Management**: Edit personal info, social links, bio
- **Projects Management**: Full CRUD operations
- **Experience Management**: Add/edit work history
- **Tech Stack Management**: Manage technologies & skills
- **CV Management**: Upload and manage resume files

### 🛠️ Technical Features
- Server-side rendering with Next.js 15
- Type-safe database queries with Drizzle ORM
- Edge database with Turso (SQLite)
- Protected routes with middleware
- Toast notifications
- Form validation
- Responsive design

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod

### Backend
- **API**: Next.js Server Actions
- **Authentication**: NextAuth.js (GitHub OAuth)
- **Database**: Turso (LibSQL/SQLite Edge)
- **ORM**: Drizzle ORM

### Deployment
- **Hosting**: Vercel (Free tier)
- **Database**: Turso (Free tier - 9GB)
- **SSL/HTTPS**: Automatic
- **CI/CD**: Auto-deploy from GitHub

---

## 📊 Database Schema

```
profile              - Personal information & social links
├── projects         - Portfolio projects
│   └── project_tech_stacks (many-to-many)
├── experiences      - Work history
├── tech_stacks      - Technologies & skills
├── cv_files         - Resume uploads
└── education        - Education history

users                - NextAuth users
├── accounts         - OAuth accounts
└── sessions         - User sessions

analytics            - Site analytics
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- GitHub account
- Vercel account (free)
- Turso account (free)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/dannel07/Portofolio.git
   cd Portofolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   # Copy .env.example to .env
   # Fill in the values
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

### Deployment

**📖 Follow the complete guide**: [DEPLOY-SEKARANG.md](./DEPLOY-SEKARANG.md)

**Quick Steps**:
1. Create tables in Turso database (SQL provided)
2. Update production URLs
3. Redeploy Vercel
4. Done! 🎉

---

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── app/                 # Next.js pages (App Router)
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── api/            # API routes
│   │   └── (public)/       # Public pages
│   ├── components/          # React components
│   │   ├── admin/          # Admin components
│   │   └── ui/             # UI components
│   ├── lib/                 # Utilities
│   │   ├── actions/        # Server actions (CRUD)
│   │   ├── auth.ts         # NextAuth config
│   │   └── db.ts           # Database adapter
│   └── db/
│       └── schema.ts        # Database schema
├── drizzle/                 # Database migrations
├── scripts/                 # Utility scripts
├── public/                  # Static files
└── [docs]                   # Documentation files
```

---

## 🔐 Environment Variables

```env
# Authentication
AUTH_SECRET=                 # Generate with: openssl rand -base64 32
AUTH_GITHUB_ID=             # GitHub OAuth App Client ID
AUTH_GITHUB_SECRET=         # GitHub OAuth App Client Secret
ADMIN_GITHUB_USERNAME=      # Your GitHub username

# Database (Turso)
TURSO_DATABASE_URL=         # Turso database URL
TURSO_AUTH_TOKEN=           # Turso auth token

# App URL
NEXTAUTH_URL=               # Production URL
```

---

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate migrations
npm run db:push          # Push schema to database
npm run db:studio        # Open Drizzle Studio
npm run db:seed          # Seed local database
```

---

## 🎨 Customization

### Update Your Information
1. Login to admin dashboard: `/admin/signin`
2. Navigate to Profile section
3. Update your details:
   - Name, email, phone
   - Bio and description
   - Social media links
   - Profile picture

### Add Your Projects
1. Go to Projects section
2. Click "Add New Project"
3. Fill in project details:
   - Title, description
   - GitHub and demo links
   - Tech stack used
   - Project images

### Customize Theme
- Edit `tailwind.config.js` for colors
- Modify `src/app/globals.css` for styles
- Update components in `src/components/`

---

## 🌐 Routes

### Public Routes
```
/                    - Homepage
/projects            - Projects listing
/projects/[id]       - Project detail
/about               - About page
/contact             - Contact page
```

### Admin Routes (Protected)
```
/admin               - Dashboard
/admin/signin        - Login page
/admin/profile       - Profile management
/admin/projects      - Projects management
/admin/experience    - Experience management
/admin/tech-stack    - Tech stack management
/admin/cv            - CV management
```

### API Routes
```
/api/auth/*          - NextAuth.js endpoints
```

---

## 💰 Cost Breakdown

| Service | Plan | Cost | Resources |
|---------|------|------|-----------|
| **Vercel** | Hobby | $0/month | Unlimited projects, 100GB bandwidth |
| **Turso** | Free | $0/month | 9GB storage, 500M row reads |
| **GitHub** | Free | $0/month | Unlimited public repos |
| **TOTAL** | | **$0/month** | ✨ **Free Forever** |

---

## 📈 Performance

- ⚡ **Lighthouse Score**: 95-100
- 🌍 **Global CDN**: Vercel Edge Network
- 🗄️ **Database**: Edge regions (low latency)
- 📱 **Mobile-Friendly**: Responsive design
- 🔒 **Security**: HTTPS, OAuth, SQL injection prevention

---

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- Fork the repository
- Use it as a template for your own portfolio
- Submit issues if you find bugs
- Suggest features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Daniel Sinambela**
- GitHub: [@dannel07](https://github.com/dannel07)
- Website: [Your Production URL]

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Vercel](https://vercel.com/) - Hosting platform
- [Turso](https://turso.tech/) - Edge database
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components

---

## 📞 Support

Need help? Check these resources:
1. 📖 [START-HERE.md](./START-HERE.md) - Main documentation
2. 🚀 [DEPLOY-SEKARANG.md](./DEPLOY-SEKARANG.md) - Deployment guide
3. 📌 [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) - Quick reference
4. 💬 Open an issue on GitHub

---

## 🎉 Ready to Deploy?

**👉 Start here**: [DEPLOY-SEKARANG.md](./DEPLOY-SEKARANG.md)

**Estimated time**: 5-10 minutes  
**Difficulty**: Easy  
**Result**: Live portfolio website! 🚀

---

<div align="center">

**Made with ❤️ using Next.js and TypeScript**

⭐ Star this repo if you find it helpful!

</div>
