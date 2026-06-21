# 🎯 Admin Dashboard Guide

Admin dashboard untuk mengelola portfolio Daniel Sinambela.

## 🔑 Akses Admin

### URL Admin
- **Development**: http://localhost:3000/admin
- **Production**: https://your-domain.com/admin

### Login
1. Buka halaman `/admin`
2. Klik "Sign in with GitHub"
3. Authorize aplikasi dengan GitHub account Anda
4. Jika username GitHub Anda sesuai dengan `ADMIN_GITHUB_USERNAME` di file `.env`, Anda akan mendapat akses

### Konfigurasi Admin
Edit file `.env`:
```env
ADMIN_GITHUB_USERNAME="dannel07"  # Ganti dengan username GitHub Anda
```

## 📋 Fitur Admin Dashboard

### 1. Dashboard Overview (`/admin`)
- Statistik portfolio (views, downloads, clicks)
- Quick links ke semua section
- Recent activity log

### 2. Profile Management (`/admin/profile`)
Kelola informasi personal:
- **Basic Info**: Nama, email, phone, location
- **Bio & Description**: Short bio dan full description
- **Social Links**: GitHub, LinkedIn, Twitter, Website
- **Profile Photo**: Upload foto profile

### 3. Projects Management (`/admin/projects`)
Kelola portfolio projects:
- Create, Read, Update, Delete projects
- Upload project thumbnails
- Add GitHub/Demo links
- Assign tech stacks to projects
- Mark projects as featured

### 4. Experience Management (`/admin/experience`)
Kelola work experience:
- Internships
- Organizations
- Freelance work
- Volunteer work
- Bootcamps/Courses

### 5. Tech Stack Management (`/admin/tech-stack`)
Kelola skills dan technologies:
- **Categories**: Frontend, Backend, Database, Mobile, Data Analytics, Tools
- Set proficiency level (0-100)
- Add icons untuk setiap technology
- Reorder dengan drag & drop

### 6. CV Files Management (`/admin/cv`)
Upload dan kelola CV/Resume:
- Upload PDF files
- Set active CV untuk download
- Track download statistics
- Version management

## 🎨 UI Public Portfolio yang Baru

### Hero Section dengan Foto
**Fitur baru di homepage:**
- ✅ **Large profile photo** di sebelah kiri (responsive)
- ✅ **Gradient decorative elements** dengan hover effects
- ✅ **"Available for work" badge** dengan animated pulse
- ✅ **Tech stack badges** (Laravel, Next.js, Go, TypeScript, React)
- ✅ **Quick info** (University, Location) dengan icons
- ✅ **Animated elements** pada buttons dan social links

### Cara Menambahkan Foto Profil

1. **Siapkan foto Anda**:
   - Format: JPG, PNG, atau WEBP
   - Size: 800x800px atau lebih (square/persegi)
   - Quality: High resolution untuk hasil terbaik

2. **Upload foto**:
   ```
   /public/images/profile.jpg
   ```

3. **Aktifkan foto di code** (jika belum):
   Edit file `src/components/sections/hero-section.tsx`:
   ```tsx
   {/* Uncomment code ini: */}
   <Image
     src="/images/profile.jpg"
     alt="Daniel Sinambela"
     fill
     className="object-cover"
     priority
   />
   
   {/* Dan hapus placeholder DS */}
   ```

## 🚀 Next Steps

### Development Tasks
1. **Implement CRUD Actions**
   - [ ] Create Server Actions untuk database operations
   - [ ] Add form validation dengan Zod
   - [ ] Implement file upload untuk photos dan CV

2. **Add Real Database Queries**
   - [ ] Fetch data dari Cloudflare D1
   - [ ] Display real data di admin pages
   - [ ] Display real data di public pages

3. **Enhance UI**
   - [ ] Add loading states
   - [ ] Add error handling
   - [ ] Add success/error toasts
   - [ ] Add confirmation dialogs

4. **Add More Features**
   - [ ] Drag & drop file upload
   - [ ] Image cropping/resizing
   - [ ] Rich text editor untuk descriptions
   - [ ] Analytics dashboard dengan charts

## 📖 File Structure

```
src/
├── app/
│   ├── admin/                    # Admin pages
│   │   ├── layout.tsx           # Admin layout dengan nav
│   │   ├── page.tsx             # Dashboard
│   │   ├── signin/              # Sign in page
│   │   ├── profile/             # Profile management
│   │   ├── projects/            # Projects management
│   │   ├── experience/          # Experience management
│   │   ├── tech-stack/          # Tech stack management
│   │   └── cv/                  # CV files management
│   └── api/
│       └── auth/
│           └── [...nextauth]/   # NextAuth API route
├── components/
│   ├── admin/
│   │   ├── admin-nav.tsx       # Admin navigation
│   │   └── signin-button.tsx   # GitHub sign in button
│   └── sections/
│       └── hero-section.tsx    # Updated with photo
└── lib/
    └── auth.ts                  # Auth configuration
```

## 🔒 Security

### Protected Routes
Semua halaman `/admin/*` dilindungi dengan:
1. **Authentication**: Harus login dengan GitHub
2. **Authorization**: Username harus sesuai dengan `ADMIN_GITHUB_USERNAME`

### Best Practices
- ❌ Jangan commit `.env` ke Git
- ✅ Gunakan environment variables untuk secrets
- ✅ Validasi input di server side
- ✅ Sanitize user input
- ✅ Use HTTPS di production

## 🐛 Troubleshooting

### "Access Denied" di Admin
**Problem**: Setelah login, mendapat pesan "Access Denied"

**Solution**:
1. Cek `ADMIN_GITHUB_USERNAME` di `.env`
2. Pastikan sama dengan GitHub username Anda (case-sensitive)
3. Sign out dan sign in lagi

### Foto Tidak Muncul
**Problem**: Foto profil tidak tampil di homepage

**Solution**:
1. Pastikan file ada di `/public/images/profile.jpg`
2. Uncomment `<Image>` component di `hero-section.tsx`
3. Hapus placeholder code
4. Restart dev server

### GitHub OAuth Error
**Problem**: Error saat sign in dengan GitHub

**Solution**:
1. Cek `AUTH_GITHUB_ID` dan `AUTH_GITHUB_SECRET` di `.env`
2. Verifikasi callback URL di GitHub OAuth App settings
3. Pastikan `AUTH_SECRET` sudah di-generate
4. Clear browser cookies dan coba lagi

## 💡 Tips

1. **Gunakan Drizzle Studio** untuk view database:
   ```bash
   npm run db:studio
   ```

2. **Test dengan real data** menggunakan seed script:
   ```bash
   npm run db:seed
   ```

3. **View public site** sambil edit admin:
   - Open localhost:3000 (public)
   - Open localhost:3000/admin (admin)
   - Changes reflect immediately

## 📞 Support

Jika ada pertanyaan atau masalah:
- Check documentation di README.md
- Check QUICKSTART.md untuk setup guide
- Check error logs di terminal
