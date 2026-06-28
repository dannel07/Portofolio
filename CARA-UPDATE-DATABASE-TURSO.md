# 🔧 Cara Update Database Turso - Tambah Kolom Gambar

## ❗ Masalah
Database Turso di production belum punya kolom untuk gambar:
- ❌ Tabel `projects` belum ada kolom `thumbnail`
- ❌ Tabel `profile` belum ada kolom `avatar` dan `resume_url`

## ✅ Solusi
Jalankan SQL untuk menambahkan kolom yang hilang.

---

## 🚀 LANGKAH 1: Login ke Turso Dashboard

1. Buka browser, pergi ke: **https://turso.tech/**
2. **Login** dengan akun kamu
3. Pilih database: **portfolio-db**
4. Klik tab **"SQL Console"** atau **"Query"**

---

## 📝 LANGKAH 2: Jalankan SQL Commands

Copy dan paste SQL di bawah ini **SATU PER SATU** ke SQL Console, lalu klik **"Run"** atau **"Execute"**:

### 2.1. Tambah Kolom `thumbnail` ke Tabel `projects`
```sql
ALTER TABLE projects ADD COLUMN thumbnail text;
```

**Kalau muncul error:**
- `duplicate column name: thumbnail` → **SKIP**, kolom sudah ada ✅
- Error lain → Screenshot dan beritahu saya

---

### 2.2. Tambah Kolom `avatar` ke Tabel `profile`
```sql
ALTER TABLE profile ADD COLUMN avatar text;
```

**Kalau muncul error:**
- `duplicate column name: avatar` → **SKIP**, kolom sudah ada ✅
- Error lain → Screenshot dan beritahu saya

---

### 2.3. Tambah Kolom `resume_url` ke Tabel `profile`
```sql
ALTER TABLE profile ADD COLUMN resume_url text;
```

**Kalau muncul error:**
- `duplicate column name: resume_url` → **SKIP**, kolom sudah ada ✅
- Error lain → Screenshot dan beritahu saya

---

## ✅ LANGKAH 3: Verify - Cek Kolom Sudah Ada

Jalankan query ini untuk memastikan kolom sudah ada:

### 3.1. Cek Struktur Tabel `projects`
```sql
PRAGMA table_info(projects);
```

**Output harus ada:**
- `thumbnail` (type: text)

### 3.2. Cek Struktur Tabel `profile`
```sql
PRAGMA table_info(profile);
```

**Output harus ada:**
- `avatar` (type: text)
- `resume_url` (type: text)

---

## 🎉 LANGKAH 4: Test Upload dari Admin

1. Vercel akan auto-redeploy (tunggu ~2 menit)
2. Login ke admin: `https://portofolio-omega-lovat.vercel.app/admin/signin`
3. **Test Profile:**
   - Klik **"Profile"**
   - Sekarang ada form **"Profile Photo"** dan **"Resume/CV"** ✅
   - Upload foto atau masukkan URL: `/images/profile.jpg`
   - Upload CV atau masukkan URL: `/cv/CV_Name.pdf`
   - Klik **"Save Changes"**
   
4. **Test Projects:**
   - Klik **"Projects"** → **"Add New Project"** atau **Edit project**
   - Sekarang ada form **"Project Thumbnail"** dengan tombol upload ✅
   - Upload foto atau masukkan URL: `/images/project-name.jpg`
   - Klik **"Create Project"** atau **"Update Project"**

5. **Refresh Homepage:**
   - Foto profile muncul di hero section ✅
   - Foto project muncul di projects section ✅
   - Icon tech stack muncul di skills section ✅

---

## 🐛 Troubleshooting

### Error: "no such table: projects"
**Solusi:** Database belum dibuat. Jalankan semua SQL dari file `TURSO-SQL-SETUP.sql`

### Error: "duplicate column name"
**Solusi:** Kolom sudah ada, skip command ini ✅

### Upload button tidak muncul di admin form
**Solusi:** 
1. Tunggu Vercel selesai deploy (~2 menit)
2. Hard refresh browser: `Ctrl + F5` atau `Cmd + Shift + R`
3. Clear cache browser
4. Cek di: https://vercel.com/dannel07s-projects/portofolio → Deployments → pastikan status "Ready"

### Gambar tidak muncul setelah upload
**Solusi:**
1. Cek file ada di GitHub: `https://github.com/dannel07/Portofolio/tree/main/public/images`
2. Pastikan path URL benar: `/images/filename.jpg` (pakai `/` di depan)
3. Jangan pakai: `public/images/` atau `D:\...` (salah)

### CV tidak bisa didownload
**Solusi:**
1. Cek file ada di: `https://github.com/dannel07/Portofolio/tree/main/public/cv`
2. Pastikan format file: `.pdf` (lowercase)
3. Pastikan path URL: `/cv/filename.pdf`
4. Test URL: `https://portofolio-omega-lovat.vercel.app/cv/download`

---

## 📋 Checklist

- [ ] Login ke Turso Dashboard
- [ ] Jalankan `ALTER TABLE projects ADD COLUMN thumbnail`
- [ ] Jalankan `ALTER TABLE profile ADD COLUMN avatar`
- [ ] Jalankan `ALTER TABLE profile ADD COLUMN resume_url`
- [ ] Verify dengan `PRAGMA table_info()`
- [ ] Tunggu Vercel auto-deploy
- [ ] Test upload foto profile di admin
- [ ] Test upload CV di admin
- [ ] Test upload foto project di admin
- [ ] Refresh homepage - semua gambar muncul ✅

---

## 🎓 File Reference

- **SQL Commands:** `TURSO-ADD-COLUMNS.sql`
- **Panduan Upload:** `PANDUAN-LENGKAP.md`
- **Icon URLs:** `ICON-URLS-CORRECT.md`

---

## ☎️ Butuh Bantuan?

Kalau ada error atau masalah:
1. Screenshot error message
2. Screenshot SQL Console
3. Screenshot admin form
4. Beritahu saya!

Saya siap bantu! 💪
