# 🚀 Langkah-Langkah Fix Gambar (Step by Step)

## ⚠️ MASALAH SEKARANG:
- File `profile.jpeg` ada di komputer kamu
- Tapi **BELUM di-push ke GitHub**
- Jadi website production tidak punya filenya
- Makanya preview broken dan gambar tidak tampil

---

## ✅ SOLUSI - Ikuti Langkah Ini:

### STEP 1: Cek File Apa yang Ada

Buka Command Prompt di folder project:
```cmd
cd D:\Magang\magang_projek\Portofolio
dir public\images
dir public\cv
```

Output harus menunjukkan:
- `public\images\profile.jpeg` ✅
- `public\cv\resume.pdf` ✅

---

### STEP 2: Push File ke GitHub

Jalankan command ini **SATU PER SATU**:

```cmd
REM 1. Masuk ke folder project
cd D:\Magang\magang_projek\Portofolio

REM 2. Add semua file di public
git add public/images/profile.jpeg
git add public/cv/resume.pdf

REM 3. Commit
git commit -m "chore: add profile photo and resume"

REM 4. Push ke GitHub
git push
```

**TUNGGU** sampai push berhasil!

---

### STEP 3: Verify File Ada di GitHub

1. Buka browser
2. Go to: **https://github.com/dannel07/Portofolio**
3. Klik folder: **public** → **images**
4. **Pastikan file `profile.jpeg` muncul di list!**
5. Klik folder: **public** → **cv**  
6. **Pastikan file `resume.pdf` muncul di list!**

**Kalau tidak ada**, berarti push gagal. Ulangi STEP 2.

---

### STEP 4: Tunggu Vercel Deploy

1. Buka: **https://vercel.com/dannel07s-projects/portofolio**
2. Klik tab **"Deployments"**
3. Tunggu status berubah jadi **"Ready"** (~2 menit)
4. Kalau ada error, screenshot dan beritahu saya

---

### STEP 5: Update Path di Admin

Sekarang update path di admin dashboard:

#### 5.1. Login Admin
```
https://portofolio-omega-lovat.vercel.app/admin/signin
```

#### 5.2. Update Profile
1. Klik **"Profile"**
2. Di field **"Image URL"**, ganti jadi:
   ```
   /images/profile.jpeg
   ```
   ⚠️ **PENTING:** Pakai `.jpeg` (BUKAN `.jpg`)!

3. Di field **"CV/Resume URL"**, masukkan:
   ```
   /cv/resume.pdf
   ```

4. Klik **"Save Changes"**

---

### STEP 6: Test di Homepage

1. Buka homepage: **https://portofolio-omega-lovat.vercel.app**
2. **Hard Refresh:** Tekan `Ctrl + F5`
3. **Cek hasil:**
   - ✅ Foto profile muncul besar di hero section
   - ✅ Tombol "Download CV" berfungsi

**Kalau masih tidak muncul:**
- Buka Developer Tools: `F12`
- Klik tab **"Console"**
- Screenshot error message
- Kirim ke saya

---

## 📋 Quick Checklist

Copy paste command ini di Command Prompt:

```cmd
cd D:\Magang\magang_projek\Portofolio
git add public/images/profile.jpeg public/cv/resume.pdf
git commit -m "chore: add profile photo and resume"
git push
```

Lalu:
- [ ] Verify file ada di GitHub
- [ ] Tunggu Vercel deploy selesai
- [ ] Login admin → Update path jadi `/images/profile.jpeg`
- [ ] Save changes
- [ ] Hard refresh homepage (`Ctrl + F5`)
- [ ] Foto muncul! ✅

---

## 🐛 Troubleshooting

### Problem: `git push` error "rejected"
**Solution:**
```cmd
git pull
git push
```

### Problem: File tidak muncul di GitHub setelah push
**Solution:**
```cmd
git status
git log --oneline -3
```
Screenshot dan kirim ke saya.

### Problem: Vercel deploy gagal
**Solution:**
1. Buka Vercel dashboard
2. Klik deployment yang failed
3. Scroll ke bawah, lihat error log
4. Screenshot dan kirim ke saya

### Problem: Gambar masih tidak muncul setelah semua langkah
**Solution:**
1. Test URL langsung di browser:
   ```
   https://portofolio-omega-lovat.vercel.app/images/profile.jpeg
   ```
2. Kalau 404 → File belum sampai production
3. Kalau muncul → Path di database salah
4. Screenshot dan beritahu saya

---

## 📞 Need Help?

Screenshot dan kirim:
1. Output dari: `git status`
2. Output dari: `git log --oneline -3`
3. Screenshot GitHub (folder public/images)
4. Screenshot Vercel dashboard
5. Browser Console errors (F12)

Saya siap bantu! 💪

---

## ⚡ Alternative: Pakai URL External

Kalau proses di atas terlalu ribet, upload foto ke:
- **Imgur**: https://imgur.com/upload
- **ImgBB**: https://imgbb.com/

Lalu paste URL langsung di admin form:
```
https://i.imgur.com/abc123.jpg
```

Ini lebih cepat tapi tidak recommended untuk production.
