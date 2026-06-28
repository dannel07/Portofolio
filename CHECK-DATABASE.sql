-- ============================================
-- SQL untuk Cek Data di Database Turso
-- ============================================
-- Jalankan di Turso SQL Console untuk debug

-- 1. Cek data profile (avatar dan resume_url)
SELECT id, name, email, avatar, resume_url FROM profile;

-- 2. Cek struktur kolom profile (pastikan avatar dan resume_url ada)
PRAGMA table_info(profile);

-- 3. Cek data projects (thumbnail)
SELECT id, title, thumbnail, featured FROM projects;

-- 4. Cek struktur kolom projects (pastikan thumbnail ada)
PRAGMA table_info(projects);

-- 5. Cek data tech_stacks (icon)
SELECT id, name, category, icon FROM tech_stacks ORDER BY category, name;

-- ============================================
-- EXPECTED OUTPUT:
-- ============================================

-- Profile harus punya:
-- - avatar: /images/profile.jpg atau URL
-- - resume_url: /cv/CV_Name.pdf atau URL

-- Projects harus punya:
-- - thumbnail: /images/project-name.jpg atau URL

-- Tech_stacks harus punya:
-- - icon: https://cdn.simpleicons.org/react/61DAFB (dengan warna hex)

-- ============================================
-- KALAU NULL atau KOSONG:
-- ============================================

-- Update profile dengan avatar dan CV:
UPDATE profile 
SET avatar = '/images/profile.jpg',
    resume_url = '/cv/resume.pdf',
    updated_at = strftime('%s', 'now') * 1000
WHERE id = (SELECT id FROM profile LIMIT 1);

-- Update project dengan thumbnail:
UPDATE projects 
SET thumbnail = '/images/project-sample.jpg',
    updated_at = strftime('%s', 'now') * 1000
WHERE id IN (SELECT id FROM projects LIMIT 1);

-- Update tech stack dengan icon (PENTING: harus ada warna hex!):
-- React
UPDATE tech_stacks SET icon = 'https://cdn.simpleicons.org/react/61DAFB' WHERE name = 'React';

-- Next.js (gunakan nextdotjs bukan nextjs!)
UPDATE tech_stacks SET icon = 'https://cdn.simpleicons.org/nextdotjs/000000' WHERE name LIKE '%Next%';

-- TypeScript
UPDATE tech_stacks SET icon = 'https://cdn.simpleicons.org/typescript/3178C6' WHERE name = 'TypeScript';

-- JavaScript
UPDATE tech_stacks SET icon = 'https://cdn.simpleicons.org/javascript/F7DF1E' WHERE name = 'JavaScript';

-- Tailwind CSS
UPDATE tech_stacks SET icon = 'https://cdn.simpleicons.org/tailwindcss/06B6D4' WHERE name LIKE '%Tailwind%';

-- Node.js (gunakan nodedotjs bukan nodejs!)
UPDATE tech_stacks SET icon = 'https://cdn.simpleicons.org/nodedotjs/339933' WHERE name LIKE '%Node%';

-- Laravel
UPDATE tech_stacks SET icon = 'https://cdn.simpleicons.org/laravel/FF2D20' WHERE name = 'Laravel';

-- Go
UPDATE tech_stacks SET icon = 'https://cdn.simpleicons.org/go/00ADD8' WHERE name = 'Go' OR name = 'Golang';

-- PostgreSQL
UPDATE tech_stacks SET icon = 'https://cdn.simpleicons.org/postgresql/4169E1' WHERE name LIKE '%PostgreSQL%' OR name LIKE '%Postgres%';

-- MySQL
UPDATE tech_stacks SET icon = 'https://cdn.simpleicons.org/mysql/4479A1' WHERE name = 'MySQL';

-- HTML/CSS
UPDATE tech_stacks SET icon = 'https://cdn.simpleicons.org/html5/E34F26' WHERE name LIKE '%HTML%';
