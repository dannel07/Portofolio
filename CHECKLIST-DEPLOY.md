# ✅ Checklist Deploy Portfolio

## Status: Website SUDAH LIVE, Tinggal Setup Database

### ☑️ Yang Sudah Selesai:
- ✅ Code di GitHub
- ✅ Project di Vercel
- ✅ Build berhasil
- ✅ Website LIVE
- ✅ Database Turso terkoneksi
- ✅ Environment variables sudah diset

### 📝 Yang Perlu Dilakukan (Ikuti Urutan):

#### 1. Setup Database Turso
- [ ] Buka https://turso.tech/app
- [ ] Pilih database `portfolio-db`
- [ ] Klik **SQL Console** atau **SQL Shell**
- [ ] Copy semua SQL dari file `TURSO-SQL-SETUP.sql` bagian **STEP 1**
- [ ] Paste ke SQL Console
- [ ] Klik Execute/Run
- [ ] Tunggu sampai sukses (11 tabel dibuat)

#### 2. Isi Data Awal
- [ ] Di SQL Console yang sama
- [ ] Copy semua SQL dari file `TURSO-SQL-SETUP.sql` bagian **STEP 2**
- [ ] Paste ke SQL Console
- [ ] Klik Execute/Run
- [ ] Tunggu sampai sukses (data sample masuk)

#### 3. Update URL Production
- [ ] Buka https://vercel.com/dashboard
- [ ] Pilih project portfolio
- [ ] Copy URL production (contoh: `portfolio-dannel07.vercel.app`)
- [ ] Buka Settings → Environment Variables
- [ ] Edit `NEXTAUTH_URL` → Ganti dengan URL production
- [ ] Save

#### 4. Update GitHub OAuth
- [ ] Buka https://github.com/settings/developers
- [ ] Pilih OAuth App: `Ov23li4pLk0xJisBzz6g`
- [ ] Update **Authorization callback URL**:
  ```
  https://PRODUCTION-URL/api/auth/callback/github
  ```
- [ ] Update application

#### 5. Redeploy Vercel
- [ ] Kembali ke Vercel dashboard
- [ ] Tab Deployments
- [ ] Klik **...** (three dots) pada deployment terakhir
- [ ] Klik **Redeploy**
- [ ] Tunggu ±2 menit

#### 6. Test Website! 🎉
- [ ] Buka URL production
- [ ] Klik **Sign in with GitHub**
- [ ] Authorize aplikasi
- [ ] Masuk ke Admin Dashboard
- [ ] Test tambah project baru
- [ ] Test edit profile
- [ ] Selesai! 🎊

---

## 📁 File Penting:
- `DEPLOY-NOW.md` - Panduan lengkap dengan penjelasan
- `TURSO-SQL-SETUP.sql` - SQL yang perlu dijalankan (copy-paste ready!)
- File ini - Checklist ringkas

## ⏱️ Estimasi Waktu:
Total: **5-10 menit** (kalau lancar)
- Setup database: 3 menit
- Update URLs: 2 menit
- Redeploy & test: 5 menit

## 💡 Tips:
- Jalankan SQL satu step dulu (STEP 1), baru STEP 2
- Kalau error di SQL Console, screenshot dan tunjukkan ke saya
- Pastikan URL production tidak pakai `http://` atau trailing slash `/`
- Test login GitHub setelah semua selesai

## 🆘 Kalau Stuck:
Beritahu saya di langkah mana dan error message apa yang muncul!
