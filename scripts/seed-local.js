/**
 * Seed Script for Local D1 Database
 * Run with: node scripts/seed-local.js
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🌱 Starting database seed...\n');

// Profile
console.log('📊 Seeding Profile...');
execSync(`wrangler d1 execute portfolio-db --local --command "INSERT OR REPLACE INTO profile (id, name, email, phone, location, bio, description, avatar, github_url, linkedin_url, created_at, updated_at) VALUES ('prof-1', 'Daniel Sinambela', 'sinambeladaniel07@gmail.com', '+6281263167246', 'Toba, North Sumatera, Indonesia', 'Applied Software Engineering Technology student with hands-on experience in fullstack web development', 'Applied Software Engineering Technology student at Institut Teknologi Del with hands-on experience in fullstack web development, modern database management, and system analysis.', '/images/profile.jpg', 'https://github.com/dannel07', 'https://linkedin.com/in/daniel-sinambela-aaba18389', 1719849600000, 1719849600000)"`, { stdio: 'inherit' });

// Tech Stacks - Backend
console.log('\n💻 Seeding Tech Stacks...');
const techStacks = [
  ['ts-1', 'Laravel', 'Backend', 85],
  ['ts-2', 'Go', 'Backend', 75],
  ['ts-3', 'PHP', 'Backend', 85],
  ['ts-4', 'REST API', 'Backend', 80],
  ['ts-5', 'Node.js', 'Backend', 70],
  ['ts-6', 'JavaScript', 'Frontend', 85],
  ['ts-7', 'TypeScript', 'Frontend', 80],
  ['ts-8', 'React', 'Frontend', 75],
  ['ts-9', 'Next.js', 'Frontend', 70],
  ['ts-10', 'Tailwind CSS', 'Frontend', 85],
  ['ts-11', 'HTML/CSS', 'Frontend', 90],
  ['ts-12', 'MySQL', 'Database', 85],
  ['ts-13', 'PostgreSQL', 'Database', 75],
  ['ts-14', 'MongoDB', 'Database', 70],
  ['ts-15', 'SQL Server', 'Database', 75],
  ['ts-16', 'Firebase', 'Database', 65],
  ['ts-17', 'Python', 'Data Analytics', 70],
  ['ts-18', 'Tableau', 'Data Analytics', 65],
  ['ts-19', 'Microsoft Excel', 'Data Analytics', 80],
  ['ts-20', 'Apache Spark', 'Data Analytics', 60],
  ['ts-21', 'Git', 'Tools', 85],
  ['ts-22', 'Docker', 'Tools', 65],
  ['ts-23', 'Postman', 'Tools', 80],
  ['ts-24', 'Figma', 'Tools', 70],
  ['ts-25', 'Railway', 'Tools', 65],
];

techStacks.forEach(([id, name, category, proficiency], index) => {
  const sql = `INSERT OR REPLACE INTO tech_stacks (id, name, category, proficiency, \\"order\\", created_at) VALUES ('${id}', '${name}', '${category}', ${proficiency}, ${index}, ${Date.now()})`;
  execSync(`wrangler d1 execute portfolio-db --local --command "${sql}"`, { stdio: 'inherit' });
});

// Projects
console.log('\n🚀 Seeding Projects...');
const projects = [
  ['proj-1', 'GJM & GKM Administrative Automation', 'Web-based administrative automation system for academic quality assurance', 'Developed secure backend services with Laravel and MongoDB. Built high-throughput data processing modules.', 1, '2026-01', null],
  ['proj-2', 'Hommie - Boarding House Booking', 'Mobile-friendly accommodation booking platform for homestays', 'Built with Laravel and PHP featuring JWT authentication and optimized MySQL database.', 1, '2025-01', '2025-12'],
  ['proj-3', 'Mutiara Kindergarten System', 'Web-based information system for kindergarten management', 'Led project planning and requirements analysis. Coordinated development team.', 0, '2024-06', '2024-12'],
  ['proj-4', 'E-Wallet Analysis Dashboard', 'Interactive Tableau dashboard analyzing e-wallet adoption factors', 'Performed EDA on survey data and created visualizations.', 0, '2025-01', '2025-03'],
];

projects.forEach(([id, title, description, longDescription, featured, startDate, endDate]) => {
  const endDateValue = endDate ? `'${endDate}'` : 'NULL';
  const sql = `INSERT OR REPLACE INTO projects (id, title, description, long_description, featured, status, start_date, end_date, \\"order\\", created_at, updated_at) VALUES ('${id}', '${title}', '${description}', '${longDescription}', ${featured}, 'completed', '${startDate}', ${endDateValue}, 0, ${Date.now()}, ${Date.now()})`;
  execSync(`wrangler d1 execute portfolio-db --local --command "${sql}"`, { stdio: 'inherit' });
});

// Experiences
console.log('\n💼 Seeding Experiences...');
const experiences = [
  ['exp-1', 'Head of Multimedia Division', 'Department of Science and Technology (DIPTEK)', 'organization', 'Toba, North Sumatera', '2026-02', null, 1],
  ['exp-2', 'Gen AI Engineer Bootcamp', 'Dicoding x DBS Foundation', 'bootcamp', 'Remote', '2026-04', '2026-04', 0],
  ['exp-3', 'International Project Member', 'OSIP | IT Del x Singapore Institute of Technology', 'organization', 'Parapat, North Sumatera', '2025-12', '2025-12', 0],
  ['exp-4', 'Data Science & AI Trainee', 'Microsoft Elevate Training | Dicoding', 'bootcamp', 'Remote', '2025-08', '2025-08', 0],
  ['exp-5', 'Humanitarian Volunteer', 'Disaster Relief - Sibolga Landslide', 'volunteer', 'Sibolga, North Sumatera', '2025-12', '2025-12', 0],
  ['exp-6', 'Active Member', 'HIMATERA (Student Association)', 'organization', 'Toba, North Sumatera', '2023-09', null, 1],
];

experiences.forEach(([id, title, company, type, location, startDate, endDate, isCurrently]) => {
  const endDateValue = endDate ? `'${endDate}'` : 'NULL';
  const sql = `INSERT OR REPLACE INTO experiences (id, title, company, type, location, start_date, end_date, is_currently, \\"order\\", created_at) VALUES ('${id}', '${title}', '${company}', '${type}', '${location}', '${startDate}', ${endDateValue}, ${isCurrently}, 0, ${Date.now()})`;
  execSync(`wrangler d1 execute portfolio-db --local --command "${sql}"`, { stdio: 'inherit' });
});

console.log('\n✅ Database seeded successfully!');
console.log('\n📊 Summary:');
console.log('  - Profile: 1 entry');
console.log('  - Tech Stacks: 25 entries');
console.log('  - Projects: 4 entries');
console.log('  - Experiences: 6 entries');
console.log('\n🎉 Done!\n');
