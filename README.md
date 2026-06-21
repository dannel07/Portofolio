# 🌟 Daniel Sinambela - Portfolio Website

Modern, responsive, and professional portfolio website built with Next.js 15, TypeScript, and Cloudflare services.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-orange)

## ✨ Features

### Public Features
- 🎨 **Modern UI/UX** - Clean, minimal design inspired by Vercel, Linear, and Raycast
- 🌓 **Dark/Light Mode** - Automatic theme switching with system preference detection
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **Fast Performance** - Optimized with Next.js 15 App Router
- 🎯 **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards
- 📄 **Interactive Sections**:
  - Hero with profile and CTA
  - About Me with education and contact info
  - Skills organized by categories
  - Featured projects showcase
  - Experience timeline
  - Contact form with social links

### Admin Dashboard
- 🔐 **GitHub OAuth Authentication** - Secure admin access
- 👤 **Profile Management** - Update bio, education, contact info
- 💻 **Tech Stack Management** - CRUD operations for skills
- 🚀 **Project Management** - Add, edit, delete projects
- 💼 **Experience Management** - Manage work history
- 📑 **CV Management** - Upload and manage resume files
- 📊 **Analytics Dashboard** - Track visitor stats, downloads, and clicks

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Server**: Next.js Server Actions
- **Authentication**: Auth.js (NextAuth v5) with GitHub OAuth
- **ORM**: Drizzle ORM

### Database & Storage
- **Database**: Cloudflare D1 (SQLite)
- **File Storage**: Cloudflare R2 (S3-compatible)

### Deployment
- **Hosting**: Cloudflare Pages
- **CDN**: Cloudflare CDN
- **Domain**: Cloudflare DNS

## 📁 Project Structure

```
portfolio-daniel-sinambela/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout with theme provider
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles
│   │   ├── auth/                # Auth pages
│   │   ├── admin/               # Admin dashboard
│   │   └── api/                 # API routes
│   ├── components/
│   │   ├── ui/                  # Shadcn UI components
│   │   ├── layout/              # Layout components (Navbar, Footer)
│   │   ├── sections/            # Page sections (Hero, About, etc.)
│   │   └── admin/               # Admin components
│   ├── db/
│   │   ├── schema.ts            # Database schema
│   │   ├── index.ts             # Database connection
│   │   └── seed.ts              # Seed data from CV
│   └── lib/
│       ├── auth.ts              # Authentication config
│       ├── utils.ts             # Utility functions
│       └── constants.ts         # Constants and config
├── public/                       # Static assets
├── drizzle/                      # Database migrations
├── .env.example                  # Environment variables template
├── drizzle.config.ts            # Drizzle ORM config
├── wrangler.toml                # Cloudflare config
├── tailwind.config.ts           # Tailwind config
└── package.json                 # Dependencies

```

## 🗄️ Database Schema

### Core Tables
- **users** - User authentication (GitHub OAuth)
- **accounts** - OAuth provider accounts
- **sessions** - User sessions
- **profile** - Portfolio profile data
- **education** - Education history
- **tech_stacks** - Skills and technologies
- **projects** - Portfolio projects
- **project_tech_stacks** - Many-to-many relation
- **experiences** - Work experience
- **cv_files** - Resume files
- **analytics** - Visitor analytics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm
- Cloudflare account (free tier)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/dannel07/portfolio-daniel-sinambela.git
cd portfolio-daniel-sinambela
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and fill in the required values:
```env
# GitHub OAuth (create at https://github.com/settings/developers)
AUTH_GITHUB_ID="your-github-oauth-client-id"
AUTH_GITHUB_SECRET="your-github-oauth-client-secret"
AUTH_SECRET="generate-with-openssl-rand-base64-32"

# Admin access
ADMIN_GITHUB_USERNAME="dannel07"

# App URL
NEXTAUTH_URL="http://localhost:3000"
```

4. **Set up Cloudflare D1 Database**
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create portfolio-db

# Copy the database ID to wrangler.toml
```

5. **Generate and run migrations**
```bash
npm run db:generate
npx wrangler d1 migrations apply portfolio-db
```

6. **Seed the database**
```bash
npm run db:seed
```

7. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 📝 GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Daniel Sinambela Portfolio
   - **Homepage URL**: `http://localhost:3000` (dev) or your production URL
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and generate a Client Secret
5. Add them to your `.env` file

## 🌐 Deployment to Cloudflare Pages

### Option 1: Automatic GitHub Integration

1. **Connect your GitHub repository**
   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project"
   - Connect your GitHub account
   - Select the repository

2. **Configure build settings**
   - **Build command**: `npm run build`
   - **Build output directory**: `.vercel/output/static`
   - **Environment variables**: Add all variables from `.env`

3. **Add bindings**
   - Go to Settings → Functions
   - Add D1 binding: `DB` → your database
   - Add R2 binding: `R2` → your bucket

### Option 2: Manual Deployment with Wrangler

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy .vercel/output/static
```

## 🔒 Admin Access

Only the GitHub username specified in `ADMIN_GITHUB_USERNAME` can access the admin dashboard:

1. Navigate to `/admin`
2. Click "Sign in with GitHub"
3. Authorize the application
4. Access granted if your GitHub username matches

## 📊 Analytics Tracking

The portfolio automatically tracks:
- Page views
- CV downloads
- GitHub profile clicks
- LinkedIn profile clicks
- Project clicks
- Contact form submissions

View analytics in the admin dashboard at `/admin/analytics`.

## 🎨 Customization

### Update Personal Information

Edit `src/db/seed.ts` to update:
- Profile data (name, email, bio, etc.)
- Education history
- Tech stacks
- Projects
- Experiences

Then run:
```bash
npm run db:seed
```

### Change Theme Colors

Edit `src/app/globals.css` to customize the color scheme:
```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Change this */
  /* ... */
}
```

### Modify Components

All components are in `src/components/`:
- **UI components**: `src/components/ui/`
- **Page sections**: `src/components/sections/`
- **Layout**: `src/components/layout/`

## 📦 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio
npm run db:seed      # Seed database with initial data
```

## 🏗️ Architecture

### Clean Architecture Principles
- **Separation of Concerns**: Clear separation between UI, business logic, and data
- **Dependency Inversion**: Components depend on abstractions, not implementations
- **Single Responsibility**: Each component/function has one clear purpose

### Design Patterns
- **Repository Pattern**: Database access abstracted through repositories
- **Factory Pattern**: Component factories for reusable UI patterns
- **Observer Pattern**: Theme and state management with React hooks

## 🔐 Security

- **Authentication**: GitHub OAuth with secure token handling
- **Authorization**: Role-based access control (admin only)
- **Input Validation**: Zod schema validation on all forms
- **SQL Injection**: Parameterized queries via Drizzle ORM
- **XSS Protection**: React's built-in escaping
- **CSRF Protection**: NextAuth CSRF tokens

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Server Components**: Default Server Components for better performance
- **Edge Runtime**: Cloudflare Workers for global low-latency
- **Static Generation**: Pre-rendered pages where possible
- **Font Optimization**: Google Fonts with next/font

## 📱 Responsive Design

Breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing (Future Enhancement)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📈 Future Enhancements

- [ ] Blog section with MDX support
- [ ] Project detail pages
- [ ] Testimonials section
- [ ] Newsletter subscription
- [ ] Multi-language support (English/Indonesian)
- [ ] Advanced analytics (heatmaps, session recordings)
- [ ] Contact form email integration
- [ ] RSS feed
- [ ] Sitemap generation
- [ ] Progressive Web App (PWA)

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Contact

**Daniel Sinambela**

- Email: sinambeladaniel07@gmail.com
- Phone: +62 812 6316 7246
- GitHub: [@dannel07](https://github.com/dannel07)
- LinkedIn: [daniel-sinambela](https://linkedin.com/in/daniel-sinambela-aaba18389)
- Location: Toba, North Sumatera, Indonesia

---

**Built with ❤️ by Daniel Sinambela**

*Made with Next.js, TypeScript, Tailwind CSS, and deployed on Cloudflare Pages*
