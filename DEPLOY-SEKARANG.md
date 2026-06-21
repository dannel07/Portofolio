# 🚀 DEPLOY KE CLOUDFLARE PAGES - LANGKAH DEMI LANGKAH

## ✅ Persiapan Sudah Selesai!

- ✅ Code sudah di-push ke GitHub
- ✅ Build lokal berhasil
- ✅ Database production sudah ready dengan data
- ✅ Runtime adapter untuk Cloudflare D1 sudah dibuat

---

## 📋 LANGKAH 1: Buka Cloudflare Dashboard

1. Buka browser, pergi ke: **https://dash.cloudflare.com/**
2. Login dengan akun kamu
3. Di sidebar kiri, klik **"Workers & Pages"**

---

## 📋 LANGKAH 2: Create New Pages Project

1. Klik tombol **"Create application"** (warna biru)
2. Pilih tab **"Pages"**
3. Klik **"Connect to Git"**

---

## 📋 LANGKAH 3: Connect Repository GitHub

1. **Authorize Cloudflare** untuk akses GitHub kamu (kalau pertama kali)
2. **Pilih repository**: `dannel07/Portofolio`
3. Klik **"Begin setup"**

---

## 📋 LANGKAH 4: Configure Build Settings

Isi dengan nilai berikut:

```
Project name: portfolio-daniel-sinambela
Production branch: main
```

**Build settings:**
```
Framework preset: Next.js (Static HTML Export)
Build command: npx @cloudflare/next-on-pages
Build output directory: .vercel/output/static
Root directory: (leave empty / kosongkan)
```

**PENTING**: 
- Jangan pilih "Next.js" biasa, pilih **"Next.js (Static HTML Export)"**
- Build command HARUS: `npx @cloudflare/next-on-pages`
- Build output directory HARUS: `.vercel/output/static`

Klik **"Save and Deploy"** (JANGAN KLIK DULU!)

---

## 📋 LANGKAH 5: Add Environment Variables (WAJIB!)

**Sebelum deploy**, scroll ke bawah ke section **"Environment variables"**

Klik **"Add variable"** dan tambahkan satu per satu:

### Variable 1: AUTH_SECRET
```
Variable name: AUTH_SECRET
Value: OLi7cFjiWxJeCIi9+OhPUSLxnLyQy6sc5XUDsZhJYg4=
```

### Variable 2: GITHUB_ID  
```
Variable name: GITHUB_ID
Value: Ov23liEsjkAhMUKDSMeK
```

### Variable 3: GITHUB_SECRET
```
Variable name: GITHUB_SECRET
Value: f26d5b0f92f9eb7a3e0fb93ce0e9c0b35bc2bae9
```

### Variable 4: NEXTAUTH_URL (sementara)
```
Variable name: NEXTAUTH_URL
Value: https://portfolio-daniel-sinambela.pages.dev
```

**Note**: NEXTAUTH_URL ini akan kita update lagi nanti dengan URL yang sebenarnya

Setelah semua variable ditambahkan, klik **"Save and Deploy"**

---

## 📋 LANGKAH 6: Wait for Build

Cloudflare akan mulai build project kamu. Proses ini memakan waktu **2-5 menit**.

Kamu akan lihat:
- ⏳ Initializing...
- ⏳ Building...  
- ⏳ Deploying...
- ✅ Success!

**Jangan tutup halaman ini!** Tunggu sampai selesai.

---

## 📋 LANGKAH 7: Bind D1 Database

Setelah deployment selesai:

1. Di halaman project, klik tab **"Settings"**
2. Scroll ke **"Functions"** section
3. Klik **"D1 database bindings"**
4. Klik **"Add binding"**

Isi dengan:
```
Variable name: DB
D1 database: portfolio-db-production
```

5. Klik **"Save"**

**PENTING**: Setelah save, project akan otomatis redeploy!

---

## 📋 LANGKAH 8: Copy Production URL

1. Kembali ke tab **"Deployments"**
2. Tunggu sampai deployment selesai (hijau/Success)
3. Klik link deployment URL (biasanya: `https://portfolio-daniel-sinambela.pages.dev`)
4. **COPY URL ini!** Kita akan pakai untuk langkah berikutnya

---

## 📋 LANGKAH 9: Update NEXTAUTH_URL

1. Masih di project Cloudflare, klik tab **"Settings"**
2. Klik **"Environment variables"**
3. Cari variable **NEXTAUTH_URL**
4. Klik **"Edit"**
5. Ganti value dengan URL production yang tadi dicopy (contoh: `https://portfolio-daniel-sinambela.pages.dev`)
6. Klik **"Save"**

Project akan otomatis redeploy lagi.

---

## 📋 LANGKAH 10: Update GitHub OAuth Callback URL

1. Buka: **https://github.com/settings/developers**
2. Klik OAuth App **"Portfolio Admin"** (atau nama app kamu)
3. Update **"Authorization callback URL"** menjadi:
   ```
   https://portfolio-daniel-sinambela.pages.dev/api/auth/callback/github
   ```
   (Ganti dengan URL production kamu!)
4. Klik **"Update application"**

---

## 🎉 LANGKAH 11: Test Website!

1. Buka production URL kamu: `https://portfolio-daniel-sinambela.pages.dev`
2. **Test halaman public** - Apakah data muncul?
3. **Test admin login**:
   - Pergi ke `/admin`
   - Klik "Sign in with GitHub"
   - Authorize aplikasi
   - Masuk ke dashboard

4. **Test CRUD operations**:
   - Update profile
   - Create/edit project
   - Add experience
   - Manage tech stack

---

## 🔍 Troubleshooting

### ❌ Build Failed
- Check build logs di Cloudflare dashboard
- Pastikan semua environment variables sudah ditambahkan
- Coba redeploy: Settings > Deployments > ... > Retry deployment

### ❌ D1 Binding Error  
- Pastikan D1 binding sudah ditambahkan dengan nama variable **DB**
- Pastikan database yang dipilih adalah **portfolio-db-production**
- Redeploy setelah menambah binding

### ❌ Authentication Error
- Pastikan NEXTAUTH_URL sudah benar (harus URL production, bukan localhost!)
- Pastikan GitHub OAuth callback URL sudah diupdate
- Pastikan GITHUB_ID dan GITHUB_SECRET benar
- Clear browser cookies dan coba lagi

### ❌ Data Tidak Muncul
- Check Cloudflare Logs: Dashboard > Pages > Your Project > Logs
- Pastikan D1 binding sudah correct
- Pastikan production database sudah ada data (sudah kita seed sebelumnya)

---

## 📊 Monitoring & Logs

**Cara lihat logs:**
1. Cloudflare Dashboard > Pages > portfolio-daniel-sinambela
2. Klik tab **"Logs"** atau **"Real-time Logs"**
3. Monitor untuk errors atau issues

---

## 🎯 Setelah Deploy Sukses

1. ✅ Test semua fitur
2. ✅ Upload CV kamu via admin panel
3. ✅ Add foto profile ke `/public/images/profile.jpg`
4. ✅ Update semua content via admin dashboard
5. ✅ Share link portfolio kamu! 🚀

---

## 📝 URLs Penting

- **Production Site**: `https://portfolio-daniel-sinambela.pages.dev`
- **Admin Dashboard**: `https://portfolio-daniel-sinambela.pages.dev/admin`
- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **GitHub OAuth Settings**: https://github.com/settings/developers
- **Your GitHub Repo**: https://github.com/dannel07/Portofolio

---

## 🔄 Auto-Deploy

Setiap kali kamu push ke GitHub branch `main`, Cloudflare Pages akan **otomatis** build dan deploy!

```bash
git add .
git commit -m "update content"
git push origin main
```

Website akan update dalam 2-3 menit! 🎉

---

## ❓ Butuh Bantuan?

Kalau ada error atau stuck di langkah manapun:
1. Screenshot error message
2. Check Cloudflare build logs
3. Check browser console (F12)
4. Verifikasi semua environment variables dan bindings

**Good luck! 🚀**
