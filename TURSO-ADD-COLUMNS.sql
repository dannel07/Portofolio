-- ============================================
-- SQL untuk Update Database Turso Production
-- ============================================
-- Jalankan di Turso SQL Console: https://turso.tech/

-- 1. Cek apakah kolom thumbnail sudah ada di projects
-- (Kalau error "duplicate column name", berarti sudah ada - skip)
ALTER TABLE projects ADD COLUMN thumbnail text;

-- 2. Cek apakah kolom avatar dan resume_url ada di profile
-- (Kalau error "duplicate column name", berarti sudah ada - skip)
ALTER TABLE profile ADD COLUMN avatar text;
ALTER TABLE profile ADD COLUMN resume_url text;

-- ============================================
-- CARA PENGGUNAAN:
-- ============================================

-- OPTION 1: Via Turso Dashboard (Recommended)
-- 1. Login ke: https://turso.tech/
-- 2. Pilih database: portfolio-db
-- 3. Klik tab "SQL Console"
-- 4. Copy-paste SQL di atas satu per satu
-- 5. Klik "Run" untuk setiap query
-- 6. Kalau error "duplicate column", skip - sudah ada

-- OPTION 2: Via Turso CLI
-- turso db shell portfolio-db < TURSO-ADD-COLUMNS.sql

-- ============================================
-- VERIFY: Cek apakah kolom sudah ada
-- ============================================

-- Cek struktur tabel projects
PRAGMA table_info(projects);

-- Cek struktur tabel profile
PRAGMA table_info(profile);

-- Output harus menunjukkan:
-- projects: id, title, description, long_description, thumbnail, github_url, demo_url, status, featured, start_date, end_date, order, created_at, updated_at
-- profile: id, name, email, phone, location, bio, description, avatar, resume_url, github_url, linkedin_url, twitter_url, website_url, created_at, updated_at

-- ============================================
-- TEST: Insert sample data
-- ============================================

-- Test update profile dengan avatar dan resume
UPDATE profile 
SET avatar = '/images/profile.jpg',
    resume_url = '/cv/CV_Name.pdf',
    updated_at = strftime('%s', 'now') * 1000
WHERE id = (SELECT id FROM profile LIMIT 1);

-- Test insert/update project dengan thumbnail
-- (Ganti 'proj-xxx' dengan ID project yang ada)
UPDATE projects 
SET thumbnail = '/images/project-sample.jpg',
    updated_at = strftime('%s', 'now') * 1000
WHERE id IN (SELECT id FROM projects LIMIT 1);

-- Verify data
SELECT id, name, avatar, resume_url FROM profile;
SELECT id, title, thumbnail FROM projects LIMIT 5;
