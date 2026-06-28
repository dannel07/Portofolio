# 🔧 Fix: Gambar Tidak Tampil

## 🐛 Masalah yang Kamu Alami:

1. **Foto profile tidak muncul** - hanya icon kecil di kiri atas
2. **Icon tech stack rusak** - React dan Next.js hanya muncul "Re" dan "Ne"

---

## ✅ Solusi Sudah Diterapkan (Code Fix)

Saya sudah update code untuk:
- ✅ Add `unoptimized` flag untuk external images
- ✅ Fix rendering Simple Icons CDN

**Tunggu Vercel selesai deploy** (~2 menit), lalu lakukan langkah di bawah.

---

## 🎯 Yang Harus Kamu Lakukan Sekarang:

### LANGKAH 1: Cek & Update Database

Masalah utama: **Database belum punya data gambar!**

#### 1.1. Login ke Turso SQL Console

1. Buka: **https://turso.tech/**
2. Login dengan akun kamu
3. Pilih database: **portfolio-db**
4. Klik tab **"SQL Console"**

#### 1.2. Cek Data Profile

Jalankan query ini:
```sql
SELECT id, name, email, avatar, resume_url FROM profile;
```

**Kalau `avatar` dan `resume_url` NULL atau kosong:**
```sql
UPDATE profile 
SET avatar = '/images/profile.jpg',
    resume_url = '/cv/resume.pdf',
    updated_at = strftime('%s', 'now') * 1000
WHERE id = (SELECT id FROM profile LIMIT 1);
```

⚠️ **PENTING:** 
- Ganti `/images/profile.jpg` dengan nama file foto kamu yang **sudah di-upload ke GitHub**
- Ganti `/cv/resume.pdf` dengan nama file CV kamu
- Kalau belum upload file, lakukan dulu! (lihat `CARA-UPLOAD-GAMBAR.md`)

#### 1.3. Cek Data Tech Stack Icons

Jalankan query ini:
```sql
SELECT id, name, category, icon FROM tech_stacks ORDER BY category, name;
```

**Kalau kolom `icon` NULL atau kosong, atau formatnya salah (tanpa warna hex):**

Update dengan icon URL yang BENAR (harus ada warna hex):

```sql
-- React (WAJIB pakai /61DAFB untuk warna)
UPDATE tech_stacks 
SET icon = 'https://cdn.simpleicons.org/react/61DAFB' 
WHERE name = 'React';

-- Next.js (nama harus nextdotjs, bukan nextjs!)
UPDATE tech_stacks 
SET icon = 'https://cdn.simpleicons.org/nextdotjs/000000' 
WHERE name LIKE '%Next%';

-- TypeScript
UPDATE tech_stacks 
SET icon = 'https://cdn.simpleicons.org/typescript/3178C6' 
WHERE name = 'TypeScript';

-- JavaScript
UPDATE tech_stacks 
SET icon = 'https://cdn.simpleicons.org/javascript/F7DF1E' 
WHERE name = 'JavaScript';

-- Tailwind CSS
UPDATE tech_stacks 
SET icon = 'https://cdn.simpleicons.org/tailwindcss/06B6D4' 
WHERE name LIKE '%Tailwind%';

-- Node.js (nama harus nodedotjs!)
UPDATE tech_stacks 
SET icon = 'https://cdn.simpleicons.org/nodedotjs/339933' 
WHERE name LIKE '%Node%';

-- Laravel
UPDATE tech_stacks 
SET icon = 'https://cdn.simpleicons.org/laravel/FF2D20' 
WHERE name = 'Laravel';

-- Go
UPDATE tech_stacks 
SET icon = 'https://cdn.simpleicons.org/go/00ADD8' 
WHERE name = 'Go' OR name = 'Golang';
```

**Lihat daftar lengkap icon URLs:** `ICON-URLS-CORRECT.md`

---

### LANGKAH 2: Upload File Gambar ke GitHub (Kalau Belum)

#### 2.1. Siapkan File

- **Foto profile:** Rename jadi `profile.jpg` atau `avatar.png`
- **CV:** Rename jadi `resume.pdf` atau `CV_NamaKamu.pdf`

#### 2.2. Copy ke Folder Public

Via Windows Explorer:
```
D:\Magang\magang_projek\Portofolio\public\images\profile.jpg
D:\Magang\magang_projek\Portofolio\public\cv\resume.pdf
```

#### 2.3. Push ke GitHub

```cmd
cd D:\Magang\magang_projek\Portofolio
git add public/images/* public/cv/*
git commit -m "Add profile photo and CV"
git push
```

#### 2.4. Verify di GitHub

Cek apakah file sudah ada:
- https://github.com/dannel07/Portofolio/tree/main/public/images
- https://github.com/dannel07/Portofolio/tree/main/public/cv

---

### LANGKAH 3: Update Path di Admin Dashboard

Setelah file di GitHub dan database sudah update:

1. **Login Admin:**
   ```
   https://portofolio-omega-lovat.vercel.app/admin/signin
   ```

2. **Update Profile:**
   - Klik **"Profile"**
   - Field **"Profile Photo"** → masukkan: `/images/profile.jpg`
   - Field **"Resume/CV"** → masukkan: `/cv/resume.pdf`
   - Klik **"Save Changes"**

3. **Update Tech Stack:**
   - Klik **"Tech Stack"**
   - Edit setiap tech (React, Next.js, dll)
   - Paste icon URL dari `ICON-URLS-CORRECT.md`
   - **PENTING:** URL harus format: `https://cdn.simpleicons.org/[nama]/[warna]`
   - Klik **"Save"**

---

### LANGKAH 4: Test & Verify

1. **Tunggu Vercel Deploy Selesai:**
   - Check: https://vercel.com/dannel07s-projects/portofolio
   - Status harus: **"Ready"**

2. **Hard Refresh Homepage:**
   ```
   Ctrl + F5 (Windows)
   Cmd + Shift + R (Mac)
   ```

3. **Cek Hasil:**
   - ✅ Foto profile besar muncul di hero section
   - ✅ Icon tech stack muncul lengkap (tidak cuma "Re" atau "Ne")
   - ✅ Tombol "Download CV" berfungsi

---

## 📋 Quick Checklist

### Database Update:
- [ ] Login ke Turso SQL Console
- [ ] Jalankan: `SELECT * FROM profile;` → cek avatar dan resume_url
- [ ] Kalau NULL → Update dengan path yang benar
- [ ] Jalankan: `SELECT * FROM tech_stacks;` → cek icon URLs
- [ ] Update icon dengan format: `https://cdn.simpleicons.org/[nama]/[warna]`

### File Upload:
- [ ] Foto profile ada di: `public/images/profile.jpg`
- [ ] CV ada di: `public/cv/resume.pdf`
- [ ] Commit & push ke GitHub
- [ ] Verify file muncul di GitHub repo

### Admin Update:
- [ ] Login admin → Profile
- [ ] Update avatar URL: `/images/profile.jpg`
- [ ] Update resume URL: `/cv/resume.pdf`
- [ ] Save changes
- [ ] Login admin → Tech Stack
- [ ] Update icon URLs (dengan warna hex!)
- [ ] Save each tech

### Verify Result:
- [ ] Tunggu Vercel deploy (~2 menit)
- [ ] Hard refresh homepage
- [ ] Foto profile muncul ✅
- [ ] Icon tech stack muncul ✅
- [ ] CV bisa didownload ✅

---

## ⚠️ Common Mistakes (AVOID!)

### ❌ SALAH - Icon URLs Tanpa Warna:
```
https://cdn.simpleicons.org/react          ❌ Broken!
https://cdn.simpleicons.org/nextjs         ❌ Broken!
```

### ✅ BENAR - Icon URLs Dengan Warna Hex:
```
https://cdn.simpleicons.org/react/61DAFB          ✅ Works!
https://cdn.simpleicons.org/nextdotjs/000000     ✅ Works!
```

### ❌ SALAH - Path File:
```
public/images/profile.jpg     ❌ (jangan include "public")
images/profile.jpg           ❌ (harus pakai "/" di depan)
D:\Magang\...\profile.jpg   ❌ (ini path Windows, bukan web URL)
```

### ✅ BENAR - Path File:
```
/images/profile.jpg          ✅
/cv/resume.pdf              ✅
```

---

## 🔍 Debug: Cek Console Browser

Kalau masih tidak muncul:

1. **Buka Developer Tools:** `F12` atau `Ctrl + Shift + I`
2. **Klik tab "Console"**
3. **Refresh page:** `Ctrl + F5`
4. **Cek error messages:**
   - 404 errors → File tidak ada di GitHub atau path salah
   - CORS errors → Icon URL blocked
   - Image optimization errors → Gunakan external URL langsung

5. **Klik tab "Network"**
6. **Filter: Img**
7. **Refresh page**
8. **Cek status code untuk setiap gambar:**
   - 200 OK → Success ✅
   - 404 Not Found → File tidak ada atau path salah ❌
   - 403 Forbidden → URL blocked ❌

---

## 📚 Reference Files

- **Upload Guide:** `CARA-UPLOAD-GAMBAR.md`
- **Icon URLs:** `ICON-URLS-CORRECT.md`
- **Database Queries:** `CHECK-DATABASE.sql`
- **Database Update:** `CARA-UPDATE-DATABASE-TURSO.md`

---

## ☎️ Masih Bermasalah?

Screenshot dan kirim:
1. Output dari: `SELECT * FROM profile;`
2. Output dari: `SELECT * FROM tech_stacks;`
3. Browser Console errors (F12 → Console tab)
4. Network tab showing failed requests

Saya siap bantu! 💪
