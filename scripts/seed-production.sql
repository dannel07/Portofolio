-- ========================================
-- Portfolio Daniel Sinambela - Seed Data
-- ========================================

-- Insert Profile
INSERT INTO profile (id, name, email, phone, location, bio, description, github_url, linkedin_url, created_at, updated_at)
VALUES (
  'cprofile001',
  'Daniel Sinambela',
  'sinambeladaniel07@gmail.com',
  '+6281263167246',
  'Toba, North Sumatera, Indonesia',
  'Applied Software Engineering Technology student with hands-on experience in fullstack web development and system analysis',
  'An Applied Software Engineering Technology student at Institut Teknologi Del with hands-on experience in fullstack web development, modern database management, and system analysis. Proficient in building scalable applications using Laravel, Go, PHP, and JavaScript, with a strong understanding of MVC architecture and RESTful API design. Passionate about exploring modern development practices and eager to apply technical skills in backend engineering and digital business processes.',
  'https://github.com/dannel07',
  'https://linkedin.com/in/daniel-sinambela-aaba18389',
  1640000000000,
  1640000000000
);

-- ========================================
-- Education
-- ========================================
INSERT INTO education (id, institution, degree, field, start_date, end_date, gpa, location, description, is_currently, "order", created_at)
VALUES (
  'cedu001',
  'Institut Teknologi Del',
  'Diploma 4, Bachelor of Applied Software Engineering Technology',
  'Software Engineering',
  '2023-08',
  NULL,
  '3.47',
  'Toba, North Sumatera',
  'Relevant Coursework: Web Development I & II, Object-Oriented Programming, Database Systems, Distributed Application Development, Software Requirement Analysis, Software Testing, Algorithms and Data Structures, Software Quality Assurance.',
  1,
  0,
  1640000000000
);

-- ========================================
-- Tech Stacks - Backend
-- ========================================
INSERT INTO tech_stacks (id, name, category, proficiency, "order", created_at)
VALUES 
  ('ctech001', 'Laravel', 'Backend', 85, 1, 1640000000000),
  ('ctech002', 'Go', 'Backend', 75, 2, 1640000000000),
  ('ctech003', 'PHP', 'Backend', 85, 3, 1640000000000),
  ('ctech004', 'REST API', 'Backend', 80, 4, 1640000000000),
  ('ctech005', 'Node.js', 'Backend', 70, 5, 1640000000000);

-- ========================================
-- Tech Stacks - Frontend
-- ========================================
INSERT INTO tech_stacks (id, name, category, proficiency, "order", created_at)
VALUES 
  ('ctech010', 'JavaScript', 'Frontend', 80, 10, 1640000000000),
  ('ctech011', 'TypeScript', 'Frontend', 70, 11, 1640000000000),
  ('ctech012', 'React', 'Frontend', 75, 12, 1640000000000),
  ('ctech013', 'Next.js', 'Frontend', 70, 13, 1640000000000),
  ('ctech014', 'HTML/CSS', 'Frontend', 85, 14, 1640000000000),
  ('ctech015', 'Tailwind CSS', 'Frontend', 80, 15, 1640000000000);

-- ========================================
-- Tech Stacks - Database
-- ========================================
INSERT INTO tech_stacks (id, name, category, proficiency, "order", created_at)
VALUES 
  ('ctech020', 'MySQL', 'Database', 85, 20, 1640000000000),
  ('ctech021', 'PostgreSQL', 'Database', 80, 21, 1640000000000),
  ('ctech022', 'MongoDB', 'Database', 80, 22, 1640000000000),
  ('ctech023', 'SQL Server', 'Database', 70, 23, 1640000000000),
  ('ctech024', 'Firebase', 'Database', 75, 24, 1640000000000);

-- ========================================
-- Tech Stacks - Tools & Platforms
-- ========================================
INSERT INTO tech_stacks (id, name, category, proficiency, "order", created_at)
VALUES 
  ('ctech030', 'Git', 'Tools', 85, 30, 1640000000000),
  ('ctech031', 'GitHub', 'Tools', 85, 31, 1640000000000),
  ('ctech032', 'Postman', 'Tools', 80, 32, 1640000000000),
  ('ctech033', 'Figma', 'Tools', 70, 33, 1640000000000),
  ('ctech034', 'Docker', 'Tools', 65, 34, 1640000000000),
  ('ctech035', 'Python', 'Tools', 75, 35, 1640000000000),
  ('ctech036', 'Java', 'Tools', 80, 36, 1640000000000),
  ('ctech037', 'C', 'Tools', 70, 37, 1640000000000);

-- ========================================
-- Tech Stacks - Data Analytics
-- ========================================
INSERT INTO tech_stacks (id, name, category, proficiency, "order", created_at)
VALUES 
  ('ctech040', 'Tableau', 'Data Analytics', 75, 40, 1640000000000),
  ('ctech041', 'Microsoft Excel', 'Data Analytics', 80, 41, 1640000000000),
  ('ctech042', 'Apache Spark', 'Data Analytics', 70, 42, 1640000000000),
  ('ctech043', 'EDA', 'Data Analytics', 75, 43, 1640000000000);

-- ========================================
-- Projects
-- ========================================
INSERT INTO projects (id, title, description, long_description, github_url, demo_url, status, featured, start_date, end_date, "order", created_at, updated_at)
VALUES 
  (
    'cproj001',
    'Web-Based Agent for GJM and GKM Administrative Automation',
    'Administrative automation system for academic quality assurance processes',
    'Developed a web-based administrative automation system for GJM and GKM to streamline academic quality assurance processes and reduce manual workloads. Designed and implemented secure backend services, database structures, and workflow automation features using Laravel, MongoDB, and REST APIs. Built high-throughput data processing modules to manage large volumes of academic evaluation and questionnaire data for centralized information management. Integrated reporting and monitoring functionalities using Apache Spark, improving data accessibility and operational efficiency for the Faculty of Vocational Studies.',
    '',
    '',
    'completed',
    1,
    '2026-01',
    '2026-06',
    1,
    1640000000000,
    1640000000000
  ),
  (
    'cproj002',
    'Hommie: Boarding House and Homestay Booking System',
    'Mobile-friendly accommodation booking platform for Lake Toba area',
    'Developed a mobile-friendly web accommodation booking system to help users search, view, and reserve homestays in the Lake Toba area. Designed and built core backend functionalities using Laravel and PHP, including JWT-based user authentication, accommodation management, and booking transactions. Formulated and optimized relational database structures in MySQL to ensure efficient storage and real-time retrieval of reservation data. Deployed the system to a cloud-based hosting platform (Railway), ensuring high availability and seamless API integration for front-end clients.',
    '',
    '',
    'completed',
    1,
    '2025-03',
    '2025-08',
    2,
    1640000000000,
    1640000000000
  ),
  (
    'cproj003',
    'Mutiara Kindergarten Information System',
    'Web-based information system for kindergarten management',
    'Coordinated project planning, task allocation, and team collaboration for the development of a web-based information system. Gathered and analyzed user requirements, translating business needs into functional and technical specifications. Collaborated with developers during database design, testing, deployment, and feature validation activities. Ensured project delivery through effective stakeholder communication and structured software development practices.',
    '',
    '',
    'completed',
    0,
    '2024-06',
    '2024-12',
    3,
    1640000000000,
    1640000000000
  ),
  (
    'cproj004',
    'E-Wallet Usage Analysis Dashboard in Toba Regency',
    'Interactive dashboard analyzing e-wallet adoption factors',
    'Built an interactive dashboard to analyze key socio-economic factors affecting e-wallet adoption and transaction intensity. Collected, cleaned, and processed regional survey data using Microsoft Excel and Exploratory Data Analysis (EDA) techniques. Created data visualizations in Tableau to communicate insights on consumer behavior and digital payment trends to stakeholders.',
    '',
    '',
    'completed',
    0,
    '2025-01',
    '2025-05',
    4,
    1640000000000,
    1640000000000
  );

-- ========================================
-- Project Tech Stacks (Relations)
-- ========================================

-- Project 1: GJM & GKM (Laravel, MongoDB, REST API, Apache Spark)
INSERT INTO project_tech_stacks (id, project_id, tech_stack_id)
VALUES 
  ('cpts001', 'cproj001', 'ctech001'), -- Laravel
  ('cpts002', 'cproj001', 'ctech022'), -- MongoDB
  ('cpts003', 'cproj001', 'ctech004'), -- REST API
  ('cpts004', 'cproj001', 'ctech042'); -- Apache Spark

-- Project 2: Hommie (Laravel, PHP, MySQL, JWT)
INSERT INTO project_tech_stacks (id, project_id, tech_stack_id)
VALUES 
  ('cpts005', 'cproj002', 'ctech001'), -- Laravel
  ('cpts006', 'cproj002', 'ctech003'), -- PHP
  ('cpts007', 'cproj002', 'ctech020'); -- MySQL

-- Project 3: Mutiara (Project Management)
-- No tech stacks specified (management role)

-- Project 4: E-Wallet Dashboard (Tableau, Excel, EDA)
INSERT INTO project_tech_stacks (id, project_id, tech_stack_id)
VALUES 
  ('cpts008', 'cproj004', 'ctech040'), -- Tableau
  ('cpts009', 'cproj004', 'ctech041'), -- Excel
  ('cpts010', 'cproj004', 'ctech043'); -- EDA

-- ========================================
-- Experiences
-- ========================================
INSERT INTO experiences (id, title, company, location, type, start_date, end_date, is_currently, description, responsibilities, "order", created_at)
VALUES 
  (
    'cexp001',
    'Head of Multimedia Division',
    'Department of Science and Technology (DIPTEK)',
    'Toba, North Sumatera',
    'organization',
    '2026-02',
    NULL,
    1,
    'Lead the multimedia division in designing, creating, and managing visual and digital content to support organizational branding and publications.',
    '["Lead the multimedia division in designing, creating, and managing visual and digital content", "Coordinate cross-functional team workflows to ensure timely asset delivery for science and technology initiatives"]',
    1,
    1640000000000
  ),
  (
    'cexp002',
    'Gen AI Engineer Bootcamp Participant',
    'Dicoding x DBS Foundation - Coding Camp 2026 Progressive',
    'Remote',
    'bootcamp',
    '2026-04',
    '2026-04',
    0,
    'Completed an intensive training program focused on Artificial Intelligence, Generative AI fundamentals, and Machine Learning engineering.',
    '["Completed intensive training on AI and Generative AI fundamentals", "Developed hands-on programming skills in Python and prompt engineering", "Built intelligent system workflows through project-based assessments"]',
    2,
    1640000000000
  ),
  (
    'cexp003',
    'International Collaborative Project Member',
    'Overseas Social Innovation Project (OSIP) | IT Del x SIT',
    'Parapat, North Sumatera',
    'internship',
    '2025-12',
    '2025-12',
    0,
    'Collaborated in cross-cultural teams with Singapore Institute of Technology (SIT) students to analyze real-world operational challenges faced by local MSMEs/UMKM.',
    '["Collaborated with international teams from Singapore Institute of Technology", "Conducted field observations and stakeholder interviews", "Designed sustainable digital solution proposals for local businesses", "Enhanced interpersonal communication and cross-border teamwork"]',
    3,
    1640000000000
  ),
  (
    'cexp004',
    'Data Science & AI Trainee',
    'Microsoft Elevate Training 2025 | Dicoding Microsoft',
    'Remote',
    'bootcamp',
    '2025-08',
    '2025-08',
    0,
    'Learned foundational concepts in Data Science pipelines, data engineering, and cloud-based analytics workflows.',
    '["Learned Data Science pipelines and data engineering concepts", "Gained hands-on experience with Microsoft Fabric and Azure", "Worked on cloud-based analytics and intelligent system integration"]',
    4,
    1640000000000
  ),
  (
    'cexp005',
    'Humanitarian Volunteer',
    'Disaster Relief Volunteer - Sibolga Landslide',
    'Sibolga, North Sumatera',
    'volunteer',
    '2025-12',
    '2025-12',
    0,
    'Assisted emergency relief operations for landslide victims by coordinating logistics and humanitarian aid distribution.',
    '["Assisted emergency relief operations for landslide victims", "Coordinated logistics and humanitarian aid distribution", "Partnered with local response teams for community recovery"]',
    5,
    1640000000000
  ),
  (
    'cexp006',
    'Active Member',
    'HIMATERA (Student Association)',
    'Toba, North Sumatera',
    'organization',
    '2023-09',
    NULL,
    1,
    'Actively contribute to department-level student collaboration programs, academic development initiatives, and community events.',
    '["Contribute to student collaboration programs", "Participate in academic development initiatives", "Developed teamwork and event coordination skills"]',
    6,
    1640000000000
  );

-- ========================================
-- Verification Queries
-- ========================================

-- Check data
SELECT 'Profile:', COUNT(*) as count FROM profile;
SELECT 'Education:', COUNT(*) as count FROM education;
SELECT 'Tech Stacks:', COUNT(*) as count FROM tech_stacks;
SELECT 'Projects:', COUNT(*) as count FROM projects;
SELECT 'Project Tech Stacks:', COUNT(*) as count FROM project_tech_stacks;
SELECT 'Experiences:', COUNT(*) as count FROM experiences;

-- ========================================
-- Summary
-- ========================================
-- Profile: 1 entry
-- Education: 1 entry
-- Tech Stacks: 25 entries (Backend, Frontend, Database, Tools, Data Analytics)
-- Projects: 4 entries (2 featured)
-- Project Tech Stacks: 10 relations
-- Experiences: 6 entries (2 currently active)
-- ========================================
