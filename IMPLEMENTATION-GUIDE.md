# 🎯 Full CRUD Implementation Guide

## ✅ Yang Sudah Dibuat

### 1. **Server Actions** (Backend Logic)
- ✅ `src/lib/actions/profile.ts` - Profile CRUD
- ✅ `src/lib/actions/projects.ts` - Projects CRUD
- ✅ `src/lib/actions/tech-stack.ts` - Tech Stack CRUD
- ✅ `src/lib/actions/experience.ts` - Experience CRUD

### 2. **Database Connection**
- ✅ `src/lib/db-local.ts` - Local SQLite connection untuk development

### 3. **Admin Pages (Functional)**
- ✅ `src/app/admin/profile/page.tsx` - Profile management dengan real data
- ✅ `src/components/admin/profile-form.tsx` - Working form dengan save functionality
- ✅ `src/app/admin/projects/page.tsx` - Projects list dengan real data

## 🚀 Cara Menggunakan yang Sudah Ada

### Profile Management (SUDAH BERFUNGSI!)

1. Buka http://localhost:3000/admin/profile
2. Edit data profile Anda
3. Klik "Save Changes"
4. Data tersimpan ke database lokal
5. Refresh homepage untuk melihat perubahan

### Projects Management (List Sudah Berfungsi)

1. Buka http://localhost:3000/admin/projects
2. Akan menampilkan list projects dari database
3. Tombol Add/Edit belum fully implemented (perlu form)

## 📝 Yang Masih Perlu Dibuat

### 1. **Project Form** (Create/Edit)
File yang perlu dibuat:
- `src/app/admin/projects/new/page.tsx`
- `src/app/admin/projects/[id]/edit/page.tsx`
- `src/components/admin/project-form.tsx`

### 2. **Experience Pages** (Full CRUD)
File yang perlu dibuat:
- Update `src/app/admin/experience/page.tsx` untuk list
- `src/app/admin/experience/new/page.tsx`
- `src/app/admin/experience/[id]/edit/page.tsx`
- `src/components/admin/experience-form.tsx`

### 3. **Tech Stack Pages** (Full CRUD)
File yang perlu dibuat:
- Update `src/app/admin/tech-stack/page.tsx` untuk list by category
- `src/components/admin/tech-stack-form.tsx` (modal/dialog)
- Delete confirmation dialog

### 4. **CV Upload**
File yang perlu dibuat:
- Update `src/app/admin/cv/page.tsx`
- `src/lib/actions/cv.ts`
- File upload handler

### 5. **Connect Public Pages to Real Data**
Update these files to use real database data:
- `src/components/sections/hero-section.tsx` - Use profile data
- `src/components/sections/about-section.tsx` - Use profile & education
- `src/components/sections/skills-section.tsx` - Use tech stacks
- `src/components/sections/projects-section.tsx` - Use projects
- `src/components/sections/experience-section.tsx` - Use experiences

## 🔧 Install Dependencies yang Dibutuhkan

```bash
npm install better-sqlite3
npm install -D @types/better-sqlite3
```

## ⚠️ IMPORTANT: Database Path

File `src/lib/db-local.ts` mengakses database di:
```
.wrangler/state/v3/d1/miniflare-D1DatabaseObject/db.sqlite
```

Ini adalah local D1 database yang dibuat oleh wrangler. Pastikan database sudah di-migrate dan di-seed.

## 🧪 Testing

### Test Profile Management

1. Go to `/admin/profile`
2. Edit nama jadi "Test Name"
3. Save
4. Check database:
```bash
npm run db:studio
```
5. Verify data tersimpan

### Test Projects List

1. Go to `/admin/projects`
2. Seharusnya menampilkan 4 projects dari seed data
3. Jika kosong, run seed lagi:
```bash
npm run db:seed
```

## 📊 Next Steps to Complete

### Priority 1: Complete Projects CRUD

**Create Project Form:**

```tsx
// src/components/admin/project-form.tsx
"use client";

import { useState } from "react";
import { createProject, updateProject } from "@/lib/actions/projects";
// ... implement form similar to profile-form.tsx
```

**Create New Project Page:**

```tsx
// src/app/admin/projects/new/page.tsx
import { ProjectForm } from "@/components/admin/project-form";

export default async function NewProjectPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Add New Project</h1>
      <ProjectForm />
    </div>
  );
}
```

### Priority 2: Delete Functionality

Add delete action with confirmation dialog:

```tsx
"use client";

import { deleteProject } from "@/lib/actions/projects";
import { useRouter } from "next/navigation";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter();
  
  async function handleDelete() {
    if (confirm("Are you sure you want to delete this project?")) {
      const result = await deleteProject(projectId);
      if (result.success) {
        router.refresh();
      }
    }
  }
  
  return (
    <Button onClick={handleDelete} variant="destructive">
      Delete
    </Button>
  );
}
```

### Priority 3: Connect Public Pages

Update hero section to use real profile data:

```tsx
// src/components/sections/hero-section.tsx
import { getProfile } from "@/lib/actions/profile";

export async function HeroSection() {
  const profile = await getProfile();
  
  return (
    <section>
      <h1>{profile?.name || "Your Name"}</h1>
      <p>{profile?.bio || "Your bio"}</p>
      {/* ... */}
    </section>
  );
}
```

## 🎨 UI Improvements

### Toast Notifications

Install sonner for better notifications:
```bash
npm install sonner
```

Use in forms:
```tsx
import { toast } from "sonner";

toast.success("Profile updated successfully!");
toast.error("Failed to update profile");
```

### Loading States

Already implemented in ProfileForm with:
- Disabled button during save
- Loading spinner
- Success/error messages

## 📚 Code Patterns

### Server Action Pattern

```typescript
"use server";

export async function myAction(data: FormData) {
  try {
    const db = getLocalDb();
    // ... database operations
    revalidatePath("/path");
    return { success: true, message: "Success" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Error message" };
  }
}
```

### Client Form Pattern

```tsx
"use client";

export function MyForm() {
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await myAction(new FormData(e.currentTarget));
    setLoading(false);
    // Handle result
  }
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

## 🔍 Debugging

### Check Database

```bash
# Open Drizzle Studio
npm run db:studio

# Or query directly
npm run db:seed  # Re-seed if needed
```

### Check Server Actions

Add console.log in server actions to debug:
```typescript
export async function updateProfile(data) {
  console.log("Received data:", data);
  // ...
}
```

Check terminal output saat submit form.

## 📖 Resources

- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [React Hook Form](https://react-hook-form.com/) - Optional untuk advanced validation
- [Zod](https://zod.dev/) - Schema validation

## ✨ Summary

**What Works Now:**
- ✅ Admin authentication
- ✅ Profile CRUD (fully functional!)
- ✅ Projects list (read only)
- ✅ Database connection
- ✅ Server actions ready

**Next to Implement:**
- [ ] Project create/edit forms
- [ ] Delete confirmations
- [ ] Experience CRUD
- [ ] Tech Stack CRUD
- [ ] CV upload
- [ ] Connect public pages to DB

**Estimated Time to Complete:**
- Projects CRUD: 30-45 min
- Experience CRUD: 30 min  
- Tech Stack CRUD: 30 min
- CV Upload: 20 min
- Connect Public Pages: 20 min
- **Total: ~2-3 hours**

Mau saya lanjutkan implement yang mana dulu? 🚀
