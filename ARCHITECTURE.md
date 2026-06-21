# 🏗️ Architecture Documentation

## System Overview

This portfolio application follows Clean Architecture principles with clear separation of concerns and dependency inversion.

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Cloudflare Edge                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   CDN Cache   │  │   DDoS       │  │   Firewall   │     │
│  │   & Delivery  │  │   Protection │  │   & WAF      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Application                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Presentation Layer (UI)                  │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │  │
│  │  │   Public    │  │    Auth     │  │    Admin    │  │  │
│  │  │    Pages    │  │    Pages    │  │  Dashboard  │  │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Application Layer (Business Logic)          │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │  │
│  │  │   Server    │  │    Auth     │  │  Analytics  │  │  │
│  │  │   Actions   │  │   Logic     │  │   Tracker   │  │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Data Access Layer (ORM)                  │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │  │
│  │  │   Drizzle   │  │  Repository │  │   Schema    │  │  │
│  │  │     ORM     │  │   Pattern   │  │  Validation │  │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Infrastructure Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Cloudflare  │  │  Cloudflare  │  │   GitHub     │     │
│  │  D1 Database │  │  R2 Storage  │  │   OAuth      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## 🗂️ Folder Structure & Responsibilities

### `/src/app` - Next.js App Router
```
app/
├── layout.tsx              # Root layout with providers
├── page.tsx                # Home page (public portfolio)
├── globals.css             # Global styles & Tailwind
├── (public)/               # Public routes group
│   ├── projects/           # Projects listing & detail
│   └── experience/         # Experience listing
├── (auth)/                 # Auth routes group
│   ├── signin/             # Sign in page
│   └── error/              # Auth error page
├── (protected)/            # Protected routes group
│   └── admin/              # Admin dashboard
│       ├── layout.tsx      # Admin layout
│       ├── page.tsx        # Dashboard home
│       ├── profile/        # Profile management
│       ├── tech-stacks/    # Skills management
│       ├── projects/       # Projects CRUD
│       ├── experience/     # Experience CRUD
│       ├── cv/             # CV management
│       └── analytics/      # Analytics dashboard
└── api/                    # API routes
    ├── auth/[...nextauth]/ # NextAuth endpoints
    ├── upload/             # File upload endpoint
    └── analytics/          # Analytics endpoint
```

### `/src/components` - React Components
```
components/
├── ui/                     # Shadcn UI primitives
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── layout/                 # Layout components
│   ├── navbar.tsx          # Site navigation
│   └── footer.tsx          # Site footer
├── sections/               # Page sections
│   ├── hero-section.tsx
│   ├── about-section.tsx
│   ├── skills-section.tsx
│   ├── projects-section.tsx
│   ├── experience-section.tsx
│   └── contact-section.tsx
├── admin/                  # Admin components
│   ├── sidebar.tsx
│   ├── data-table.tsx
│   └── forms/
└── theme-provider.tsx      # Theme context provider
```

### `/src/db` - Database Layer
```
db/
├── schema.ts               # Drizzle schema definitions
├── index.ts                # Database connection
├── seed.ts                 # Seed data
└── repositories/           # Repository pattern (future)
    ├── profile.ts
    ├── projects.ts
    └── ...
```

### `/src/lib` - Utilities & Configuration
```
lib/
├── auth.ts                 # Auth configuration
├── utils.ts                # Helper functions
├── constants.ts            # App constants
├── validations/            # Zod schemas
└── actions/                # Server actions
    ├── profile.ts
    ├── projects.ts
    └── analytics.ts
```

## 🔄 Data Flow

### Public Portfolio (Read Path)
```
User Request
    ↓
Cloudflare CDN (Cache Check)
    ↓
Next.js Server Component
    ↓
Drizzle ORM Query
    ↓
Cloudflare D1 Database
    ↓
Server Component (RSC Payload)
    ↓
Client Hydration
    ↓
Rendered Page
```

### Admin Operations (Write Path)
```
Admin User Action
    ↓
Client-Side Form Validation
    ↓
Server Action Call
    ↓
Authentication Check
    ↓
Authorization Check (isAdmin)
    ↓
Input Validation (Zod)
    ↓
Business Logic
    ↓
Drizzle ORM Mutation
    ↓
Cloudflare D1 Database
    ↓
Revalidation/Refresh
    ↓
Updated UI
```

### File Upload Flow
```
Admin Uploads File
    ↓
Client-Side Size/Type Check
    ↓
API Route (/api/upload)
    ↓
Auth Check
    ↓
File Validation
    ↓
Cloudflare R2 Storage
    ↓
Database Record Creation
    ↓
Return File URL
    ↓
Update Form State
```

## 🔐 Authentication & Authorization

### Authentication Flow
```
1. User clicks "Sign in with GitHub"
2. Redirect to GitHub OAuth
3. User authorizes application
4. Callback to /api/auth/callback/github
5. NextAuth creates session
6. Check if user is admin (GitHub username match)
7. Set session with isAdmin flag
8. Redirect to dashboard or homepage
```

### Authorization Layers

**1. Middleware Level** (planned)
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Check if route is protected
  // Verify session exists
  // Redirect if unauthorized
}
```

**2. Server Action Level**
```typescript
// lib/actions/profile.ts
export async function updateProfile(data) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized");
  }
  // Proceed with update
}
```

**3. Component Level**
```typescript
// app/admin/layout.tsx
export default async function AdminLayout() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    redirect("/auth/signin");
  }
  // Render admin layout
}
```

## 💾 Database Design

### Entity Relationship Diagram

```
┌─────────────┐
│    users    │
├─────────────┤
│ id (PK)     │
│ name        │
│ email       │
│ github_user │
└──────┬──────┘
       │ 1:N
       ↓
┌─────────────┐
│  accounts   │
├─────────────┤
│ id (PK)     │
│ user_id(FK) │
│ provider    │
│ token       │
└─────────────┘

┌──────────────┐
│   profile    │
├──────────────┤
│ id (PK)      │
│ name         │
│ email        │
│ bio          │
│ avatar       │
│ github_url   │
│ linkedin_url │
└──────────────┘

┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│   projects   │  N:M  │ project_tech_    │  M:N  │ tech_stacks  │
├──────────────┤───────┤     stacks       │───────├──────────────┤
│ id (PK)      │       ├──────────────────┤       │ id (PK)      │
│ title        │       │ id (PK)          │       │ name         │
│ description  │       │ project_id (FK)  │       │ category     │
│ thumbnail    │       │ tech_stack_id(FK)│       │ icon         │
│ github_url   │       └──────────────────┘       │ proficiency  │
│ demo_url     │                                   └──────────────┘
│ featured     │
└──────────────┘

┌──────────────┐       ┌──────────────┐
│ experiences  │       │  education   │
├──────────────┤       ├──────────────┤
│ id (PK)      │       │ id (PK)      │
│ title        │       │ institution  │
│ company      │       │ degree       │
│ type         │       │ field        │
│ start_date   │       │ gpa          │
│ end_date     │       │ start_date   │
│ description  │       │ end_date     │
└──────────────┘       └──────────────┘

┌──────────────┐       ┌──────────────┐
│  cv_files    │       │  analytics   │
├──────────────┤       ├──────────────┤
│ id (PK)      │       │ id (PK)      │
│ filename     │       │ event_type   │
│ file_url     │       │ event_data   │
│ file_size    │       │ ip_address   │
│ is_active    │       │ timestamp    │
└──────────────┘       └──────────────┘
```

### Indexing Strategy

**Primary Keys**: All tables use CUID as primary key
**Indexes**:
- `users.email` - Unique index for auth lookup
- `users.github_username` - Index for admin check
- `projects.featured` - Index for featured projects query
- `tech_stacks.category` - Index for category filtering
- `analytics.event_type` - Index for analytics aggregation
- `analytics.timestamp` - Index for date range queries

## 🚀 Performance Optimizations

### 1. Caching Strategy

**Edge Caching** (Cloudflare)
```
Static Assets: 1 year
Images: 1 year
Pages: 5 minutes (stale-while-revalidate)
API: No cache (dynamic)
```

**Server-Side Caching**
```typescript
// React Cache for request deduplication
import { cache } from 'react';

export const getProfile = cache(async () => {
  // Only fetches once per request
  return db.query.profile.findFirst();
});
```

### 2. Component Optimization

**Server Components** (Default)
- Zero JavaScript to client
- Direct database access
- Better SEO

**Client Components** (When Needed)
```typescript
'use client'; // Only for interactive components
```

### 3. Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="Daniel Sinambela"
  width={200}
  height={200}
  priority // For above-the-fold images
/>
```

### 4. Code Splitting

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const AnalyticsChart = dynamic(
  () => import('@/components/admin/analytics-chart'),
  { ssr: false }
);
```

### 5. Database Query Optimization

```typescript
// Select only needed fields
const projects = await db
  .select({
    id: projects.id,
    title: projects.title,
    description: projects.description,
  })
  .from(projects)
  .limit(10);

// Use joins instead of N+1 queries
const projectsWithTechStacks = await db.query.projects.findMany({
  with: {
    techStacks: true,
  },
});
```

## 🔒 Security Measures

### 1. Authentication Security
- OAuth tokens stored securely
- Session tokens httpOnly cookies
- CSRF protection via NextAuth

### 2. Input Validation
```typescript
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  githubUrl: z.string().url().optional(),
});
```

### 3. SQL Injection Prevention
- Parameterized queries via Drizzle ORM
- No raw SQL strings with user input

### 4. XSS Protection
- React auto-escapes by default
- Content Security Policy headers (planned)

### 5. Rate Limiting
- Cloudflare automatic DDoS protection
- API rate limiting via Cloudflare Workers (planned)

## 📊 Monitoring & Observability

### Metrics to Track
- **Performance**: Core Web Vitals (LCP, FID, CLS)
- **Availability**: Uptime percentage
- **Traffic**: Page views, unique visitors
- **Engagement**: Time on site, bounce rate
- **Conversions**: CV downloads, contact form submissions

### Logging Strategy
```typescript
// Structured logging
console.log(JSON.stringify({
  level: 'info',
  timestamp: new Date().toISOString(),
  message: 'User action',
  userId: session.user.id,
  action: 'project_created',
  metadata: { projectId },
}));
```

### Error Tracking (Future)
- Sentry integration for error monitoring
- User feedback on errors
- Automatic error reports to developer

## 🔄 Deployment Pipeline

```
Developer → Git Push → GitHub
                         ↓
                 Cloudflare Detects Change
                         ↓
                   Build Triggered
                         ↓
              npm install → npm run build
                         ↓
                   Tests Run (future)
                         ↓
               Deploy to Edge Network
                         ↓
              Global CDN Distribution
                         ↓
                   Live in < 2 minutes
```

## 🧪 Testing Strategy (Future)

### Unit Tests
```typescript
// Component tests
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/sections/hero-section';

test('renders hero section', () => {
  render(<HeroSection />);
  expect(screen.getByText(/Daniel Sinambela/i)).toBeInTheDocument();
});
```

### Integration Tests
```typescript
// API route tests
import { POST } from '@/app/api/upload/route';

test('uploads file to R2', async () => {
  const formData = new FormData();
  formData.append('file', mockFile);
  const response = await POST(new Request('/', { body: formData }));
  expect(response.status).toBe(200);
});
```

### E2E Tests
```typescript
// Playwright tests
test('admin can create project', async ({ page }) => {
  await page.goto('/admin/projects/new');
  await page.fill('[name="title"]', 'New Project');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/admin/projects');
});
```

## 📈 Scalability Considerations

### Horizontal Scaling
- Cloudflare Workers auto-scale globally
- No server management needed
- Unlimited concurrent users

### Database Scaling
- D1 supports up to 100,000 writes/day (free tier)
- Read replicas available on paid tiers
- Consider upgrading to PostgreSQL if needed

### Storage Scaling
- R2 has no egress fees
- Unlimited bandwidth
- CDN acceleration included

### Cost Optimization
```
Free Tier Limits:
- Cloudflare Pages: Unlimited requests
- D1: 100,000 reads/day, 100,000 writes/day
- R2: 10 GB storage, 1 million Class A ops/month
- Workers: 100,000 requests/day

Expected Costs (moderate traffic):
- 10,000 visitors/month: $0
- 100,000 visitors/month: $5-10
- 1,000,000 visitors/month: $20-50
```

## 🎯 Best Practices Implemented

✅ **Server Components by default**
✅ **Client Components only when needed**
✅ **TypeScript for type safety**
✅ **Zod for runtime validation**
✅ **Responsive design (mobile-first)**
✅ **Semantic HTML**
✅ **Accessibility (ARIA labels)**
✅ **SEO optimization**
✅ **Performance optimization**
✅ **Security best practices**
✅ **Clean code principles**
✅ **Documentation**

## 🔮 Future Architecture Enhancements

1. **Microservices**
   - Separate analytics service
   - Email notification service
   - Image processing service

2. **Real-time Features**
   - WebSocket for live analytics
   - Real-time visitor counter
   - Live chat support

3. **Advanced Caching**
   - Redis for session storage
   - CDN purging on updates
   - Stale-while-revalidate strategy

4. **CI/CD Pipeline**
   - Automated testing
   - Staged deployments
   - Rollback capability

5. **Monitoring & Alerts**
   - Uptime monitoring
   - Performance alerts
   - Error rate tracking

---

This architecture is designed to be:
- **Scalable**: Handles growth automatically
- **Maintainable**: Clear structure and patterns
- **Performant**: Optimized for speed
- **Secure**: Multiple security layers
- **Cost-Effective**: Free tier friendly
