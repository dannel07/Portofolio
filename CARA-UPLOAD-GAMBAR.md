# 📸 Cara Upload Gambar & CV ke Portfolio

## ⚠️ Penting Diketahui

Portfolio ini di-deploy di **Vercel (serverless)**, jadi **tidak bisa upload file langsung** dari browser. 

File harus di-upload ke **GitHub** dulu, baru bisa ditampilkan di website.

---

## 📁 Cara Upload Gambar/CV (Step by Step)

### STEP 1: Siapkan File

**Untuk Foto Profile:**
- Format: JPG, PNG, atau WebP
- Ukuran disarankan: 500x500px - 1000x1000px
- Rename file: `profile.jpg` atau `avatar.png`

**Untuk Foto Project:**
- Format: JPG atau PNG
- Ukuran disarankan: 1280x720px (16:9)
- Rename file: `project-[nama].jpg` (contoh: `project-ecommerce.jpg`)

**Untuk CV/Resume:**
- Format: PDF
- Rename file: `CV_NamaKamu.pdf` (contoh: `CV_Daniel_Sinambela.pdf`)

---

### STEP 2: Copy File ke Folder Public

#### Via Windows Explorer (Termudah):

1. Buka folder project kamu di Windows Explorer:
   ```
   D:\Magang\magang_projek\Portofolio
   ```

2. **Untuk Gambar:** Copy file ke folder:
   ```
   D:\Magang\magang_projek\Portofolio\public\images\
   ```

3. **Untuk CV:** Copy file ke folder:
   ```
   D:\Magang\magang_projek\Portofolio\public\cv\
   ```

#### Via Command Prompt:

```cmd
REM Copy foto profile
copy "C:\path\to\your\photo.jpg" "D:\Magang\magang_projek\Portofolio\public\images\profile.jpg"

REM Copy foto project
copy "C:\path\to\project.jpg" "D:\Magang\magang_projek\Portofolio\public\images\project-ecommerce.jpg"

REM Copy CV
copy "C:\path\to\CV.pdf" "D:\Magang\magang_projek\Portofolio\public\cv\CV_Daniel_Sinambela.pdf"
```

---

### STEP 3: Commit & Push ke GitHub

Buka Command Prompt di folder project, lalu jalankan:

```cmd
REM Masuk ke folder project
cd D:\Magang\magang_projek\Portofolio

REM Add semua file baru
git add public/images/* public/cv/*

REM Commit dengan message
git commit -m "chore: add profile photo, project images, and CV"

REM Push ke GitHub
git push
```

**Pastikan semua berhasil!** Cek di GitHub:
- https://github.com/dannel07/Portofolio/tree/main/public/images
- https://github.com/dannel07/Portofolio/tree/main/public/cv

---

### STEP 4: Tunggu Vercel Deploy

1. Buka: https://vercel.com/dannel07s-projects/portofolio
2. Tunggu status berubah jadi **"Ready"** (~2 menit)
3. Atau cek di Deployments → pastikan build success ✅

---

### STEP 5: Update Path di Admin Dashboard

1. **Login ke Admin:**
   ```
   https://portofolio-omega-lovat.vercel.app/admin/signin
   ```

2. **Update Profile:**
   - Klik **"Profile"**
   - Di field **"Profile Photo"** → masukkan: `/images/profile.jpg`
   - Di field **"Resume/CV"** → masukkan: `/cv/CV_Daniel_Sinambela.pdf`
   - Klik **"Save Changes"**

3. **Update Project:**
   - Klik **"Projects"** → pilih project
   - Di field **"Project Thumbnail"** → masukkan: `/images/project-ecommerce.jpg`
   - Klik **"Update Project"**

4. **Update Tech Stack Icons:**
   - Klik **"Tech Stack"** → pilih tech
   - Di field **"Icon URL"** → masukkan icon URL dari `ICON-URLS-CORRECT.md`
   - Contoh: `https://cdn.simpleicons.org/react/61DAFB`
   - Klik **"Save"**

---

### STEP 6: Test di Homepage

1. **Refresh Homepage:**
   ```
   https://portofolio-omega-lovat.vercel.app
   ```
   - Hard refresh: `Ctrl + F5`

2. **Cek apakah muncul:**
   - ✅ Foto profile di hero section
   - ✅ Foto projects di projects section
   - ✅ Icon tech stack di skills section

3. **Test Download CV:**
   - Klik tombol **"Download CV"**
   - File PDF harus terdownload ✅

---

## 📝 Format Path yang Benar

### ✅ BENAR:
```
/images/profile.jpg
/images/project-ecommerce.png
/cv/CV_Daniel_Sinambela.pdf
https://cdn.simpleicons.org/react/61DAFB
```

### ❌ SALAH:
```
public/images/profile.jpg          ❌ jangan include "public"
D:\Magang\...\profile.jpg         ❌ jangan pakai path Windows
images/profile.jpg                ❌ harus pakai "/" di depan
C:\Users\...\CV.pdf              ❌ harus upload ke GitHub dulu
```

---

## 🚀 Quick Commands (Copy Paste)

```cmd
REM 1. Add all files
git add public/images/* public/cv/*

REM 2. Commit
git commit -m "chore: add images and CV"

REM 3. Push to GitHub
git push

REM 4. Check status
git status
```

---

## 🐛 Troubleshooting

### Gambar tidak muncul di website?

**Cek 1: Apakah file ada di GitHub?**
- Buka: https://github.com/dannel07/Portofolio/tree/main/public/images
- Apakah file kamu ada di list?
- Kalau tidak, berarti belum di-push → ulangi STEP 3

**Cek 2: Apakah path URL benar?**
- Path harus dimulai dengan `/`
- Contoh benar: `/images/profile.jpg`
- Contoh salah: `images/profile.jpg` atau `public/images/profile.jpg`

**Cek 3: Apakah Vercel sudah deploy?**
- Buka: https://vercel.com/dannel07s-projects/portofolio
- Status harus **"Ready"**
- Kalau masih **"Building"**, tunggu selesai

**Cek 4: Clear cache browser**
- Hard refresh: `Ctrl + F5`
- Atau clear cache: `Ctrl + Shift + Del`

---

### CV tidak bisa didownload?

**Cek 1: Apakah file extension `.pdf`?**
- Harus lowercase: `.pdf` bukan `.PDF`
- Kalau di Windows file extension hidden, enable dulu

**Cek 2: Apakah path benar?**
- Contoh benar: `/cv/CV_Daniel_Sinambela.pdf`
- Contoh salah: `cv/CV_Daniel_Sinambela.pdf` (tanpa `/`)

**Cek 3: Test direct URL**
```
https://portofolio-omega-lovat.vercel.app/cv/CV_Daniel_Sinambela.pdf
```
- Kalau 404, berarti file belum ada di GitHub
- Kalau download, berarti path di admin form salah

---

### Icon tech stack tidak muncul?

**Gunakan Simple Icons CDN:**
```
React:       https://cdn.simpleicons.org/react/61DAFB
Next.js:     https://cdn.simpleicons.org/nextdotjs/000000
TypeScript:  https://cdn.simpleicons.org/typescript/3178C6
JavaScript:  https://cdn.simpleicons.org/javascript/F7DF1E
```

**Lihat daftar lengkap:** `ICON-URLS-CORRECT.md`

---

## 📋 Checklist Upload

### Upload Foto Profile:
- [ ] Siapkan foto (500x500px, JPG/PNG)
- [ ] Rename: `profile.jpg`
- [ ] Copy ke: `public/images/profile.jpg`
- [ ] `git add public/images/profile.jpg`
- [ ] `git commit -m "Add profile photo"`
- [ ] `git push`
- [ ] Tunggu Vercel deploy
- [ ] Admin → Profile → Avatar URL: `/images/profile.jpg`
- [ ] Refresh homepage → foto muncul ✅

### Upload CV:
- [ ] Siapkan CV (PDF)
- [ ] Rename: `CV_NamaKamu.pdf`
- [ ] Copy ke: `public/cv/CV_NamaKamu.pdf`
- [ ] `git add public/cv/CV_NamaKamu.pdf`
- [ ] `git commit -m "Add CV"`
- [ ] `git push`
- [ ] Tunggu Vercel deploy
- [ ] Admin → Profile → Resume URL: `/cv/CV_NamaKamu.pdf`
- [ ] Test download CV ✅

### Upload Foto Project:
- [ ] Siapkan foto (1280x720px, JPG/PNG)
- [ ] Rename: `project-namaproject.jpg`
- [ ] Copy ke: `public/images/project-namaproject.jpg`
- [ ] `git add public/images/project-namaproject.jpg`
- [ ] `git commit -m "Add project images"`
- [ ] `git push`
- [ ] Tunggu Vercel deploy
- [ ] Admin → Projects → Edit → Thumbnail: `/images/project-namaproject.jpg`
- [ ] Refresh homepage → foto project muncul ✅

---

## 💡 Tips Pro

1. **Compress gambar sebelum upload:**
   - Tools: TinyPNG (https://tinypng.com/)
   - Target: < 500KB untuk foto profile
   - Target: < 1MB untuk foto project

2. **Gunakan nama file yang descriptive:**
   - ✅ Good: `profile.jpg`, `project-ecommerce.jpg`, `CV_Daniel_Sinambela.pdf`
   - ❌ Avoid: `IMG_20240101.jpg`, `file.png`, `document.pdf`

3. **Use WebP format untuk gambar:**
   - Lebih kecil ukurannya
   - Kualitas sama bagusnya
   - Convert: https://squoosh.app/

4. **Use CDN untuk icons:**
   - Simple Icons: https://simpleicons.org/
   - Tidak perlu upload, langsung pakai URL
   - Faster loading time

---

## 📚 File Reference

- **Icon URLs:** `ICON-URLS-CORRECT.md`
- **Update Database:** `CARA-UPDATE-DATABASE-TURSO.md`
- **Panduan Lengkap:** `PANDUAN-LENGKAP.md`

---

Selamat mencoba! 🎉
