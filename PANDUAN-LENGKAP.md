# 📚 PANDUAN LENGKAP - Portfolio Website

## 🎉 Fitur yang Sudah Ditambahkan:

1. ✅ Upload & tampilkan foto profile
2. ✅ Upload & download CV
3. ✅ Upload & tampilkan foto projects
4. ✅ Tampilkan icon untuk tech stack/skills
5. ✅ Image optimization dengan Next.js Image

---

## 📸 1. Cara Upload & Tampilkan Foto Profile

### Step 1: Upload Foto ke Project

1. **Copy foto kamu** ke folder: `public/images/`
2. **Rename** foto menjadi nama yang simple, contoh: `profile.jpg` atau `profile.jpeg`

### Step 2: Update di Admin Dashboard

1. Login ke admin: `https://portofolio-omega-lovat.vercel.app/admin/signin`
2. Klik **"Profile"**
3. Di field **"Avatar URL"**, masukkan:
   ```
   /images/profile.jpg
   ```
   (Sesuaikan dengan nama file foto kamu)
4. Klik **"Save"**
5. **Refresh homepage** → Foto kamu akan muncul! 🎉

### Format URL yang Benar:

✅ **BENAR:**
```
/images/profile.jpg
/images/my-photo.png
/images/daniel.jpeg
```

❌ **SALAH:**
```
public/images/profile.jpg (jangan include "public")
D:\Magang\...\profile.jpg (jangan pakai path Windows)
images/profile.jpg (harus pakai "/" di depan)
```

---

## 📄 2. Cara Upload & Download CV

### Step 1: Upload CV ke Project

1. **Copy file CV** (PDF) ke folder: `public/cv/`
2. Nama file yang bagus: `CV_Nama_Kamu.pdf`
   - Contoh: `CV_Daniel_Sinambela.pdf`

### Step 2: Update di Admin Dashboard

1. Login ke admin
2. Klik **"Profile"**
3. Di field **"Resume URL"**, masukkan:
   ```
   /cv/CV_Daniel_Sinambela.pdf
   ```
   (Sesuaikan dengan nama file CV kamu)
4. Klik **"Save"**

### Test Download:

- **Dari Homepage:** Klik tombol **"Download CV"** → CV akan terdownload!
- **Direct URL:** `https://portofolio-omega-lovat.vercel.app/cv/download`

---

## 🖼️ 3. Cara Upload & Tampilkan Foto Projects

### Step 1: Upload Foto Project

1. **Copy foto project** ke folder: `public/images/`
2. Nama file yang bagus: `project-nama.jpg`
   - Contoh: `project-ecommerce.jpg`, `project-taskmanager.png`

### Step 2: Tambah/Edit Project di Admin

1. Login ke admin
2. Klik **"Projects"** → **"Add New Project"**
3. Isi form project:
   - **Title**: Nama project
   - **Description**: Deskripsi singkat
   - **Long Description**: Penjelasan lengkap
   - **Thumbnail URL**: `/images/project-ecommerce.jpg`
   - **GitHub URL**: Link GitHub repo (opsional)
   - **Demo URL**: Link live demo (opsional)
   - **Status**: Completed/In Progress/Planning
   - **Featured**: Centang jika ingin tampil di homepage
4. Klik **"Create Project"**

### Foto Project akan Muncul:

- ✅ Homepage (Featured Projects section)
- ✅ Projects page
- ✅ Dengan placeholder jika tidak ada foto

---

## 🎨 4. Cara Tampilkan Icon untuk Tech Stack

### Format Icon URL yang Diterima:

**Option 1: Simple Icons (Recommended)**
```
https://cdn.simpleicons.org/react
https://cdn.simpleicons.org/nextdotjs
https://cdn.simpleicons.org/typescript
https://cdn.simpleicons.org/tailwindcss
https://cdn.simpleicons.org/nodejs
https://cdn.simpleicons.org/postgresql
```

**Option 2: DevIcon**
```
https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg
https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg
https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg
```

**Option 3: Icon dari File Lokal**
```
/images/icons/react-icon.png
/images/icons/nextjs-icon.svg
```

### Cara Update Tech Stack dengan Icon:

1. Login ke admin
2. Klik **"Tech Stack"**
3. Klik **"Edit"** pada skill yang ingin ditambahkan icon
4. Di field **"Icon URL"**, masukkan salah satu format di atas
5. Klik **"Save"**

### Contoh Icon URLs untuk Tech Stack Populer:

```
React: https://cdn.simpleicons.org/react
Next.js: https://cdn.simpleicons.org/nextdotjs
TypeScript: https://cdn.simpleicons.org/typescript
JavaScript: https://cdn.simpleicons.org/javascript
Tailwind CSS: https://cdn.simpleicons.org/tailwindcss
Node.js: https://cdn.simpleicons.org/nodedotjs
Express: https://cdn.simpleicons.org/express
Laravel: https://cdn.simpleicons.org/laravel
Go: https://cdn.simpleicons.org/go
Python: https://cdn.simpleicons.org/python

PostgreSQL: https://cdn.simpleicons.org/postgresql
MySQL: https://cdn.simpleicons.org/mysql
MongoDB: https://cdn.simpleicons.org/mongodb
SQLite: https://cdn.simpleicons.org/sqlite
Prisma: https://cdn.simpleicons.org/prisma

Git: https://cdn.simpleicons.org/git
GitHub: https://cdn.simpleicons.org/github
VS Code: https://cdn.simpleicons.org/visualstudiocode
Docker: https://cdn.simpleicons.org/docker
Figma: https://cdn.simpleicons.org/figma
```

---

## 🔄 5. Workflow: Update Website dengan Gambar Baru

### A. Tambah Gambar Baru (Local Development)

1. **Copy gambar** ke folder `public/images/` atau `public/cv/`
2. **Commit & push** ke GitHub:
   ```bash
   git add public/images/* public/cv/*
   git commit -m "chore: add new images"
   git push
   ```
3. **Tunggu Vercel auto-deploy** (~2 menit)
4. **Update URL di admin dashboard**

### B. Update dari Admin Dashboard (Recommended)

Untuk gambar yang sudah ada di project:
1. Login ke admin
2. Update URL field dengan path yang benar
3. Save
4. Refresh page → Gambar muncul!

---

## 📋 Checklist Setup Images

### Profile Photo:
- [ ] Upload foto ke `public/images/profile.jpg`
- [ ] Commit & push ke GitHub
- [ ] Update Admin → Profile → Avatar URL: `/images/profile.jpg`
- [ ] Test: Refresh homepage, foto muncul di hero section

### CV/Resume:
- [ ] Upload CV ke `public/cv/CV_Nama.pdf`
- [ ] Commit & push ke GitHub
- [ ] Update Admin → Profile → Resume URL: `/cv/CV_Nama.pdf`
- [ ] Test: Klik tombol "Download CV" di homepage

### Projects Photos:
- [ ] Upload foto projects ke `public/images/project-*.jpg`
- [ ] Commit & push ke GitHub
- [ ] Update Admin → Projects → Thumbnail URL: `/images/project-*.jpg`
- [ ] Test: Check homepage dan projects page

### Tech Stack Icons:
- [ ] Copy icon URLs dari list di atas
- [ ] Update Admin → Tech Stack → Icon URL
- [ ] Test: Check skills section di homepage

---

## 🐛 Troubleshooting

### Gambar Tidak Muncul?

**1. Cek Path URL:**
```
✅ Benar: /images/profile.jpg
❌ Salah: public/images/profile.jpg
❌ Salah: images/profile.jpg (tanpa slash)
```

**2. Cek File Ada di GitHub:**
- Buka: `https://github.com/dannel07/Portofolio/tree/main/public/images`
- Apakah file kamu ada di sana?
- Kalau tidak, berarti belum di-commit & push

**3. Cek Console Browser (F12):**
- Buka Developer Tools → Console
- Apakah ada error 404?
- Cek URL lengkap yang di-request

**4. Clear Cache:**
```
Ctrl + Shift + Del → Clear cached images
Atau hard refresh: Ctrl + F5
```

### CV Tidak Bisa Didownload?

**1. Cek File Extension:**
- Harus `.pdf` (lowercase)
- File harus valid PDF

**2. Cek Path:**
```
✅ Benar: /cv/CV_Name.pdf
❌ Salah: cv/CV_Name.pdf (tanpa slash)
❌ Salah: /cv/CV_Name.PDF (case sensitive di Linux)
```

**3. Test Direct URL:**
```
https://portofolio-omega-lovat.vercel.app/cv/download
```

### Icon Tidak Muncul?

**1. Test URL di Browser:**
- Copy icon URL
- Paste di browser address bar
- Apakah icon muncul?

**2. Gunakan Simple Icons (Paling Reliable):**
```
https://cdn.simpleicons.org/[nama-tech]
```

**3. Alternatif: Upload Icon Sendiri:**
- Download icon (SVG/PNG)
- Upload ke `public/images/icons/`
- Use path: `/images/icons/tech-name.svg`

---

## 💡 Tips & Best Practices

### Ukuran Gambar yang Disarankan:

**Profile Photo:**
- Resolusi: 500x500px hingga 1000x1000px
- Format: JPG, PNG, atau WebP
- Size: < 500KB

**Project Thumbnails:**
- Resolusi: 1280x720px (16:9 ratio)
- Format: JPG atau PNG
- Size: < 1MB

**Icons:**
- Format: SVG (paling bagus, scalable)
- Alternatif: PNG 64x64px atau 128x128px
- Use CDN seperti Simple Icons untuk performa terbaik

### Nama File yang Bagus:

✅ **GOOD:**
```
profile.jpg
project-ecommerce.jpg
project-chat-app.png
CV_Daniel_Sinambela.pdf
```

❌ **AVOID:**
```
IMG_20240101.jpg (tidak descriptive)
my photo.jpg (ada spasi)
Project#1.png (ada karakter special)
```

### Optimization:

1. **Compress images** sebelum upload:
   - Tools: TinyPNG, Squoosh, ImageOptim
   
2. **Use WebP format** untuk web:
   - Better compression
   - Smaller file size
   
3. **Use CDN untuk icons:**
   - Simple Icons CDN
   - Faster loading
   - No need to upload

---

## 🎓 Resources

### Icon CDNs:
- **Simple Icons**: https://simpleicons.org/
- **DevIcon**: https://devicon.dev/
- **Icons8**: https://icons8.com/icons

### Image Tools:
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **Remove.bg**: https://www.remove.bg/ (remove background)

### Free Stock Photos (for projects):
- **Unsplash**: https://unsplash.com/
- **Pexels**: https://www.pexels.com/

---

## 📞 Need Help?

Kalau masih ada masalah:
1. Screenshot error message
2. Screenshot admin form yang diisi
3. Screenshot console browser (F12)
4. Beritahu saya!

Saya siap bantu! 💪
