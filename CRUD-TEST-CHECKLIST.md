# ✅ CRUD Functions Test Checklist

Panduan testing untuk memastikan semua fungsi CRUD bekerja dengan baik.

## 🔐 Prerequisites

1. **Local Development:**
   - [x] Dev server running: `npm run dev`
   - [x] Database seeded: `node scripts/seed-local.js`
   - [x] Dapat akses http://localhost:3000

2. **Authentication:**
   - [x] GitHub OAuth configured
   - [x] Login berhasil dengan akun `dannel07`
   - [x] Redirect ke `/admin` dashboard

---

## 📋 Testing Checklist

### 1. ✅ Profile Management (UPDATE)

**Location:** `/admin/profile`

- [ ] **View Profile**
  - [ ] Form terisi dengan data existing (Daniel Sinambela)
  - [ ] Email, phone, location, bio, description tampil

- [ ] **Update Profile**
  - [ ] Edit bio: Ubah text
  - [ ] Click "Update Profile"
  - [ ] Muncul toast "Profile updated successfully"
  - [ ] Refresh page → perubahan tersimpan

- [ ] **Verify on Homepage**
  - [ ] Buka `/` (homepage)
  - [ ] Bio yang diupdate muncul di Hero section
  - [ ] Data profile konsisten

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

---

### 2. 🚀 Projects Management (CREATE, READ, UPDATE, DELETE)

**Location:** `/admin/projects`

#### CREATE Project

- [ ] **Navigate to Create**
  - [ ] Click "Create New Project" button
  - [ ] Form kosong muncul

- [ ] **Fill Form**
  ```
  Title: Test Project CRUD
  Description: Testing project creation
  Long Description: This is a test project to verify CRUD functions
  Status: completed
  Featured: Yes (checked)
  Start Date: 2026-01
  End Date: (leave empty for ongoing)
  GitHub URL: https://github.com/dannel07/test-project
  Demo URL: https://test-project.com
  Tech Stacks: Select Laravel, React, MySQL
  ```

- [ ] **Submit**
  - [ ] Click "Create Project"
  - [ ] Muncul toast "Project created successfully"
  - [ ] Redirect ke `/admin/projects`
  - [ ] Project baru muncul di list

#### READ Projects

- [ ] **View All Projects**
  - [ ] `/admin/projects` menampilkan semua projects
  - [ ] Test project yang baru dibuat ada di list
  - [ ] Featured badge muncul untuk featured projects
  - [ ] Tech stacks badge tampil

- [ ] **Verify on Homepage**
  - [ ] Buka `/` (homepage)
  - [ ] Scroll ke Projects section
  - [ ] Test project muncul (karena featured)

#### UPDATE Project

- [ ] **Navigate to Edit**
  - [ ] Di `/admin/projects`, click "Edit" pada Test Project
  - [ ] Form terisi dengan data existing

- [ ] **Update Data**
  - [ ] Ubah title: "Test Project CRUD - Updated"
  - [ ] Ubah description
  - [ ] Add/remove tech stacks
  - [ ] Click "Update Project"

- [ ] **Verify Update**
  - [ ] Toast "Project updated successfully"
  - [ ] Redirect ke `/admin/projects`
  - [ ] Perubahan tampil di list
  - [ ] Buka homepage → perubahan juga tampil

#### DELETE Project

- [ ] **Delete Action**
  - [ ] Di `/admin/projects`, click "Delete" pada Test Project
  - [ ] Confirmation dialog muncul
  - [ ] Click "Delete" di dialog

- [ ] **Verify Delete**
  - [ ] Toast "Project deleted successfully"
  - [ ] Test Project hilang dari list
  - [ ] Buka homepage → Test Project tidak muncul lagi

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

---

### 3. 💼 Experience Management (CREATE, READ, UPDATE, DELETE)

**Location:** `/admin/experience`

#### CREATE Experience

- [ ] **Navigate to Create**
  - [ ] Click "Create New Experience"
  - [ ] Form kosong muncul

- [ ] **Fill Form**
  ```
  Title: Test Experience Entry
  Company: Test Company Ltd.
  Location: Jakarta, Indonesia
  Type: internship
  Start Date: 2026-05
  End Date: (leave empty)
  Currently Working: Yes (checked)
  Description: Testing experience creation
  Responsibilities: Testing CRUD functions
  ```

- [ ] **Submit**
  - [ ] Click "Create Experience"
  - [ ] Toast "Experience created successfully"
  - [ ] Redirect ke `/admin/experience`
  - [ ] Experience baru muncul di list

#### READ Experiences

- [ ] **View All**
  - [ ] `/admin/experience` menampilkan semua experiences
  - [ ] Test experience ada di list
  - [ ] "Currently Working" badge muncul

- [ ] **Verify on Homepage**
  - [ ] Buka `/` (homepage)
  - [ ] Scroll ke Experience section
  - [ ] Test experience muncul di timeline

#### UPDATE Experience

- [ ] **Navigate to Edit**
  - [ ] Click "Edit" pada Test Experience
  - [ ] Form terisi dengan data existing

- [ ] **Update Data**
  - [ ] Ubah title: "Test Experience Entry - Updated"
  - [ ] Uncheck "Currently Working"
  - [ ] Set end date: 2026-12
  - [ ] Click "Update Experience"

- [ ] **Verify Update**
  - [ ] Toast "Experience updated successfully"
  - [ ] Perubahan tampil di list
  - [ ] Homepage juga update

#### DELETE Experience

- [ ] **Delete Action**
  - [ ] Click "Delete" pada Test Experience
  - [ ] Confirm deletion

- [ ] **Verify Delete**
  - [ ] Toast "Experience deleted successfully"
  - [ ] Test Experience hilang

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

---

### 4. 💻 Tech Stack Management (CREATE, READ, UPDATE, DELETE)

**Location:** `/admin/tech-stack`

#### CREATE Tech Stack

- [ ] **Open Dialog**
  - [ ] Click "Add Tech Stack" button
  - [ ] Dialog form muncul

- [ ] **Fill Form**
  ```
  Name: Test Stack
  Category: Backend
  Proficiency: 75
  Order: 100
  ```

- [ ] **Submit**
  - [ ] Click "Create"
  - [ ] Toast "Tech stack created successfully"
  - [ ] Dialog close
  - [ ] Test Stack muncul di Backend category

#### READ Tech Stacks

- [ ] **View All**
  - [ ] Tech stacks grouped by categories
  - [ ] Test Stack ada di Backend section
  - [ ] Proficiency percentage tampil
  - [ ] Progress bar sesuai proficiency

- [ ] **Verify on Homepage**
  - [ ] Buka homepage
  - [ ] Skills section menampilkan Test Stack

#### UPDATE Tech Stack

- [ ] **Open Edit Dialog**
  - [ ] Click "Edit" pada Test Stack
  - [ ] Dialog terisi dengan data existing

- [ ] **Update Data**
  - [ ] Ubah name: "Test Stack Updated"
  - [ ] Ubah proficiency: 85
  - [ ] Click "Update"

- [ ] **Verify Update**
  - [ ] Toast "Tech stack updated successfully"
  - [ ] Perubahan tampil
  - [ ] Homepage juga update

#### DELETE Tech Stack

- [ ] **Delete Action**
  - [ ] Click "Delete" pada Test Stack
  - [ ] Confirm deletion

- [ ] **Verify Delete**
  - [ ] Toast "Tech stack deleted successfully"
  - [ ] Test Stack hilang dari list
  - [ ] Homepage tidak tampilkan lagi

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

---

### 5. 📄 CV Management (READ)

**Location:** `/admin/cv`

- [ ] **View CV Page**
  - [ ] Shows instructions for CV upload
  - [ ] Path `/public/cv/Daniel-Sinambela-CV.pdf` explained
  - [ ] Download button status shown

- [ ] **Test Download (if CV exists)**
  - [ ] Homepage download button works
  - [ ] API route `/api/cv/download` returns file

**Status:** ⬜ Not Tested | ✅ Passed | ❌ Failed

---

## 🔍 Browser Console Checks

While testing, open browser console (F12) and verify:

- [ ] **No JavaScript errors**
- [ ] **No 404 errors** (missing files/endpoints)
- [ ] **No 500 errors** (server errors)
- [ ] **API calls return success** (200 status)
- [ ] **Toast notifications appear** on all actions

---

## 🌐 Homepage Verification

After all CRUD operations, verify homepage displays data correctly:

- [ ] **Hero Section**
  - [ ] Profile name, bio, location
  - [ ] Social links work
  - [ ] Top 5 tech stacks display
  - [ ] Photo placeholder visible

- [ ] **About Section**
  - [ ] Description from profile
  - [ ] Contact info correct

- [ ] **Skills Section**
  - [ ] All tech stacks displayed
  - [ ] Grouped by categories
  - [ ] Proficiency bars accurate

- [ ] **Projects Section**
  - [ ] Featured projects display
  - [ ] Project cards complete (title, description, tech stacks)
  - [ ] Links work (GitHub, Demo)

- [ ] **Experience Section**
  - [ ] Timeline layout
  - [ ] All experiences listed
  - [ ] "Currently" badge on active positions
  - [ ] Dates formatted correctly

---

## 🐛 Common Issues & Solutions

### Issue: Toast tidak muncul
**Solution:**
- Check `<Toaster />` component di `src/app/layout.tsx`
- Verify sonner installed: `npm install sonner`

### Issue: Form tidak submit
**Solution:**
- Check browser console untuk errors
- Verify server actions di `src/lib/actions/`
- Check database connection

### Issue: Data tidak update di homepage
**Solution:**
- Hard refresh browser (Ctrl+Shift+R)
- Clear cache
- Verify server action actually saves to DB

### Issue: Delete tidak bekerja
**Solution:**
- Check if deleteProject/deleteExperience actions exist
- Verify foreign key constraints di database
- Check console untuk errors

### Issue: Redirect loop di admin
**Solution:**
- Verify admin layout tidak redirect di signin page
- Check auth configuration di `src/lib/auth.ts`

---

## ✅ Test Result Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Profile Update | ⬜ | |
| Project Create | ⬜ | |
| Project Read | ⬜ | |
| Project Update | ⬜ | |
| Project Delete | ⬜ | |
| Experience Create | ⬜ | |
| Experience Read | ⬜ | |
| Experience Update | ⬜ | |
| Experience Delete | ⬜ | |
| Tech Stack Create | ⬜ | |
| Tech Stack Read | ⬜ | |
| Tech Stack Update | ⬜ | |
| Tech Stack Delete | ⬜ | |
| CV Management | ⬜ | |
| Homepage Display | ⬜ | |

**Legend:**
- ⬜ Not Tested
- ✅ Passed
- ❌ Failed
- 🔧 Fixed

---

## 📝 Notes & Observations

Catat semua issues atau hal yang ditemukan selama testing:

```
Tanggal: ___________
Tester: ___________

Issues found:
1. 
2. 
3. 

Fixes applied:
1. 
2. 
3. 
```

---

**Testing Complete?**
- [ ] All features tested
- [ ] All issues documented
- [ ] Critical bugs fixed
- [ ] Ready for production deployment
