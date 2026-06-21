# 🚀 Commands Quick Reference

Daftar command penting untuk development dan deployment portfolio.

---

## 📦 NPM Commands

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser: http://localhost:3000
```

### Build & Production
```bash
# Build for production
npm run build

# Start production server locally
npm run start

# Run linter
npm run lint
```

### Database (Drizzle)
```bash
# Generate migrations from schema
npm run db:generate

# Run migrations (local)
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio

# Seed database (local)
npm run db:seed
```

---

## ☁️ Cloudflare Wrangler Commands

### Authentication
```bash
# Login to Cloudflare
wrangler login

# Check who is logged in
wrangler whoami

# Logout
wrangler logout

# Use API Token instead (if login fails)
$env:CLOUDFLARE_API_TOKEN="your-token-here"
```

### D1 Database
```bash
# Create new database
wrangler d1 create portfolio-db

# List all databases
wrangler d1 list

# Execute SQL command
wrangler d1 execute portfolio-db --command="SELECT * FROM profile"

# Execute SQL file
wrangler d1 execute portfolio-db --file=./scripts/seed-production.sql

# Apply migrations
wrangler d1 migrations apply portfolio-db

# List migrations
wrangler d1 migrations list portfolio-db

# Export database
wrangler d1 export portfolio-db --output=backup.sql

# Import database
wrangler d1 execute portfolio-db --file=backup.sql
```

### Pages Deployment
```bash
# Deploy to Pages
npx wrangler pages deploy .next --project-name=portfolio-daniel-sinambela

# List deployments
wrangler pages deployment list --project-name=portfolio-daniel-sinambela

# View deployment logs
wrangler pages deployment tail --project-name=portfolio-daniel-sinambela

# Rollback to previous deployment
wrangler pages deployment rollback --project-name=portfolio-daniel-sinambela
```

### Environment Variables (Secrets)
```bash
# Set secret (will prompt for value)
wrangler pages secret put AUTH_GITHUB_ID --project-name=portfolio-daniel-sinambela

# List all secrets
wrangler pages secret list --project-name=portfolio-daniel-sinambela

# Delete secret
wrangler pages secret delete AUTH_GITHUB_ID --project-name=portfolio-daniel-sinambela
```

### R2 Storage (Future)
```bash
# Create bucket
wrangler r2 bucket create portfolio-assets

# List buckets
wrangler r2 bucket list

# Upload file
wrangler r2 object put portfolio-assets/profile.jpg --file=./public/images/profile.jpg

# List objects
wrangler r2 object list portfolio-assets

# Delete object
wrangler r2 object delete portfolio-assets/profile.jpg
```

---

## 🔍 Useful SQL Queries

### Check Data
```sql
-- Count all records
SELECT 'Profile:', COUNT(*) FROM profile;
SELECT 'Education:', COUNT(*) FROM education;
SELECT 'Tech Stacks:', COUNT(*) FROM tech_stacks;
SELECT 'Projects:', COUNT(*) FROM projects;
SELECT 'Experiences:', COUNT(*) FROM experiences;

-- View profile
SELECT * FROM profile;

-- View tech stacks by category
SELECT category, COUNT(*) as count 
FROM tech_stacks 
GROUP BY category;

-- View featured projects
SELECT id, title, status, featured 
FROM projects 
WHERE featured = 1;

-- View current experiences
SELECT title, company, start_date 
FROM experiences 
WHERE is_currently = 1;
```

### Update Data
```sql
-- Update profile
UPDATE profile 
SET bio = 'New bio text',
    updated_at = unixepoch() * 1000
WHERE id = 'cprofile001';

-- Mark project as featured
UPDATE projects 
SET featured = 1,
    updated_at = unixepoch() * 1000
WHERE id = 'cproj001';

-- Update tech stack proficiency
UPDATE tech_stacks 
SET proficiency = 90
WHERE name = 'Laravel';
```

### Delete Data
```sql
-- Delete a project
DELETE FROM projects WHERE id = 'cproj001';

-- Delete a tech stack
DELETE FROM tech_stacks WHERE name = 'OldTech';

-- Clear analytics older than 30 days
DELETE FROM analytics 
WHERE timestamp < (unixepoch() - 2592000) * 1000;
```

---

## 🐙 Git Commands

### Basic Workflow
```bash
# Check status
git status

# Add files
git add .                    # Add all files
git add src/app/page.tsx    # Add specific file

# Commit
git commit -m "Update: description of changes"

# Push to GitHub (triggers auto-deploy)
git push

# Pull latest changes
git pull
```

### Branching
```bash
# Create new branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# Merge branch
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature
```

### Undo Changes
```bash
# Discard changes in file
git checkout -- src/app/page.tsx

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a commit
git revert <commit-hash>
```

---

## 🧪 Testing Commands

### Manual Testing
```bash
# Test build locally
npm run build && npm run start

# Check TypeScript errors
npx tsc --noEmit

# Check for unused dependencies
npx depcheck

# Check bundle size
npx next-bundle-analyzer
```

### Environment Testing
```bash
# Test with production env vars
cp .env.example .env.production.local
npm run build
npm run start
```

---

## 🔧 Troubleshooting Commands

### Clear Caches
```bash
# Clear Next.js cache
Remove-Item -Recurse -Force .next

# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Clear npm cache
npm cache clean --force
```

### Check Versions
```bash
# Node version
node --version

# npm version
npm --version

# Wrangler version
wrangler --version

# Check outdated packages
npm outdated
```

### Logs & Debugging
```bash
# View Wrangler logs
Get-Content "$env:APPDATA\xdg.config\.wrangler\logs\" | Select-Object -Last 50

# Check port usage
netstat -ano | findstr :3000

# Kill process on port
taskkill /PID <PID> /F
```

---

## 📊 Database Management

### Backup Database
```bash
# Create backup
wrangler d1 export portfolio-db --output="backup-$(Get-Date -Format 'yyyyMMdd').sql"

# Verify backup
Get-Content backup-20260621.sql | Select-Object -First 20
```

### Restore Database
```bash
# Restore from backup
wrangler d1 execute portfolio-db --file=backup-20260621.sql

# Verify restoration
wrangler d1 execute portfolio-db --command="SELECT COUNT(*) FROM profile"
```

### Reset Database
```bash
# Drop all data (careful!)
wrangler d1 execute portfolio-db --command="DELETE FROM analytics"
wrangler d1 execute portfolio-db --command="DELETE FROM project_tech_stacks"
wrangler d1 execute portfolio-db --command="DELETE FROM experiences"
wrangler d1 execute portfolio-db --command="DELETE FROM projects"
wrangler d1 execute portfolio-db --command="DELETE FROM tech_stacks"
wrangler d1 execute portfolio-db --command="DELETE FROM education"
wrangler d1 execute portfolio-db --command="DELETE FROM profile"

# Re-seed
wrangler d1 execute portfolio-db --file=./scripts/seed-production.sql
```

---

## 🌐 Deployment Shortcuts

### Quick Deploy
```bash
# One-command deploy
npm run build && npx wrangler pages deploy .next --project-name=portfolio-daniel-sinambela
```

### Full Update Pipeline
```bash
# 1. Update code
git add .
git commit -m "Update: [description]"
git push

# 2. Update database (if needed)
npm run db:generate
wrangler d1 migrations apply portfolio-db

# 3. Monitor deployment
# Check Cloudflare Dashboard or:
wrangler pages deployment tail --project-name=portfolio-daniel-sinambela
```

---

## 📱 Quick Actions

### Check if Site is Live
```powershell
# Test with curl (Windows)
curl https://portfolio-daniel-sinambela.pages.dev

# Or open in browser
start https://portfolio-daniel-sinambela.pages.dev
```

### View Logs
```bash
# Real-time logs
wrangler pages deployment tail --project-name=portfolio-daniel-sinambela

# View last deployment
wrangler pages deployment list --project-name=portfolio-daniel-sinambela | Select-Object -First 1
```

### Quick Status Check
```bash
# Check everything
echo "Node Version:" && node --version
echo "npm Version:" && npm --version
echo "Wrangler Version:" && wrangler --version
echo "Git Status:" && git status --short
echo "Build Status:" && npm run build
```

---

## 🔐 Security Commands

### Generate Secrets
```powershell
# Generate AUTH_SECRET
$bytes = New-Object Byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)

# Generate random password
Add-Type -AssemblyName System.Web
[System.Web.Security.Membership]::GeneratePassword(32, 10)
```

### Environment Variables
```powershell
# Set environment variable
$env:CLOUDFLARE_API_TOKEN="your-token"

# View environment variable
$env:CLOUDFLARE_API_TOKEN

# Remove environment variable
Remove-Item Env:CLOUDFLARE_API_TOKEN
```

---

## 📚 Documentation Commands

### Generate Docs (Future)
```bash
# Generate API docs
npx typedoc --out docs src

# Generate component docs
npx storybook
```

---

## 🎯 Common Workflows

### Daily Development
```bash
1. git pull
2. npm run dev
3. # Make changes
4. git add .
5. git commit -m "Update: [description]"
6. git push
```

### Adding New Feature
```bash
1. git checkout -b feature/new-feature
2. # Develop feature
3. npm run build  # Test
4. git commit -m "Add: new feature"
5. git checkout main
6. git merge feature/new-feature
7. git push
```

### Updating Database Schema
```bash
1. # Edit src/db/schema.ts
2. npm run db:generate
3. wrangler d1 migrations apply portfolio-db
4. # Update seed data if needed
5. git commit -m "Update: database schema"
6. git push
```

### Fixing Production Bug
```bash
1. git checkout -b hotfix/bug-name
2. # Fix bug
3. npm run build  # Verify fix
4. git commit -m "Fix: bug description"
5. git push -u origin hotfix/bug-name
6. # Create PR and merge
```

---

## 🆘 Emergency Commands

### Site Down?
```bash
# Check deployment status
wrangler pages deployment list --project-name=portfolio-daniel-sinambela

# Check logs
wrangler pages deployment tail --project-name=portfolio-daniel-sinambela

# Rollback if needed
wrangler pages deployment rollback --project-name=portfolio-daniel-sinambela
```

### Database Corrupted?
```bash
# Restore from backup
wrangler d1 execute portfolio-db --file=backup-latest.sql

# Or recreate fresh
wrangler d1 migrations apply portfolio-db
wrangler d1 execute portfolio-db --file=./scripts/seed-production.sql
```

---

## 📞 Get Help

### Useful Links
- Cloudflare Docs: https://developers.cloudflare.com
- Next.js Docs: https://nextjs.org/docs
- Wrangler Docs: https://developers.cloudflare.com/workers/wrangler

### Community
- Cloudflare Discord: https://discord.cloudflare.com
- Stack Overflow: Tag `cloudflare-pages`

---

**💡 Tip**: Save this file as a bookmark for quick reference!

**Last Updated**: June 2026
