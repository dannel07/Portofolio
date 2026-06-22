-- =========================================
-- STEP 1: CREATE TABLES
-- Copy and run this entire block in Turso SQL Console
-- =========================================

CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`provider_account_id` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `analytics` (
	`id` text PRIMARY KEY NOT NULL,
	`event_type` text NOT NULL,
	`event_data` text,
	`ip_address` text,
	`user_agent` text,
	`referer` text,
	`timestamp` integer
);

CREATE TABLE `cv_files` (
	`id` text PRIMARY KEY NOT NULL,
	`filename` text NOT NULL,
	`original_filename` text NOT NULL,
	`file_url` text NOT NULL,
	`file_size` integer NOT NULL,
	`mime_type` text NOT NULL,
	`is_active` integer DEFAULT true,
	`uploaded_at` integer
);

CREATE TABLE `education` (
	`id` text PRIMARY KEY NOT NULL,
	`institution` text NOT NULL,
	`degree` text NOT NULL,
	`field` text,
	`start_date` text NOT NULL,
	`end_date` text,
	`gpa` text,
	`location` text,
	`description` text,
	`is_currently` integer DEFAULT false,
	`order` integer DEFAULT 0,
	`created_at` integer
);

CREATE TABLE `experiences` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`company` text NOT NULL,
	`location` text,
	`type` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text,
	`is_currently` integer DEFAULT false,
	`description` text,
	`responsibilities` text,
	`order` integer DEFAULT 0,
	`created_at` integer
);

CREATE TABLE `profile` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`location` text,
	`bio` text,
	`description` text,
	`avatar` text,
	`resume_url` text,
	`github_url` text,
	`linkedin_url` text,
	`twitter_url` text,
	`website_url` text,
	`created_at` integer,
	`updated_at` integer
);

CREATE TABLE `project_tech_stacks` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`tech_stack_id` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tech_stack_id`) REFERENCES `tech_stacks`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`long_description` text,
	`thumbnail` text,
	`github_url` text,
	`demo_url` text,
	`status` text DEFAULT 'completed',
	`featured` integer DEFAULT false,
	`start_date` text,
	`end_date` text,
	`order` integer DEFAULT 0,
	`created_at` integer,
	`updated_at` integer
);

CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`session_token` text NOT NULL,
	`user_id` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `tech_stacks` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`icon` text,
	`proficiency` integer DEFAULT 50,
	`order` integer DEFAULT 0,
	`created_at` integer
);

CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`emailVerified` integer,
	`image` text,
	`github_username` text,
	`created_at` integer
);

CREATE UNIQUE INDEX `sessions_session_token_unique` ON `sessions` (`session_token`);

CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);

-- =========================================
-- STEP 2: INSERT SAMPLE DATA
-- After tables are created, run this block
-- =========================================

-- Insert Profile
INSERT INTO profile (id, name, email, phone, location, bio, description, github_url, linkedin_url, created_at, updated_at)
VALUES (
  'prof-1719014400000',
  'Daniel Sinambela',
  'daniel@example.com',
  '+62 812 3456 7890',
  'Indonesia',
  'Full Stack Developer & Tech Enthusiast',
  'Passionate about building scalable web applications with modern technologies. Experienced in React, Next.js, and Node.js.',
  'https://github.com/dannel07',
  'https://linkedin.com/in/daniel-sinambela',
  1719014400000,
  1719014400000
);

-- Insert Tech Stacks (Frontend)
INSERT INTO tech_stacks (id, name, category, proficiency, "order", created_at) VALUES
('ts-react', 'React', 'Frontend', 90, 0, 1719014400000),
('ts-nextjs', 'Next.js', 'Frontend', 85, 0, 1719014400000),
('ts-typescript', 'TypeScript', 'Frontend', 85, 0, 1719014400000),
('ts-tailwind', 'Tailwind CSS', 'Frontend', 90, 0, 1719014400000),
('ts-javascript', 'JavaScript', 'Frontend', 90, 0, 1719014400000),
('ts-html-css', 'HTML/CSS', 'Frontend', 95, 0, 1719014400000);

-- Insert Tech Stacks (Backend)
INSERT INTO tech_stacks (id, name, category, proficiency, "order", created_at) VALUES
('ts-nodejs', 'Node.js', 'Backend', 80, 0, 1719014400000),
('ts-express', 'Express.js', 'Backend', 75, 0, 1719014400000),
('ts-nextjs-api', 'Next.js API', 'Backend', 80, 0, 1719014400000),
('ts-rest-api', 'REST API', 'Backend', 85, 0, 1719014400000);

-- Insert Tech Stacks (Database)
INSERT INTO tech_stacks (id, name, category, proficiency, "order", created_at) VALUES
('ts-postgresql', 'PostgreSQL', 'Database', 75, 0, 1719014400000),
('ts-sqlite', 'SQLite', 'Database', 80, 0, 1719014400000),
('ts-mongodb', 'MongoDB', 'Database', 70, 0, 1719014400000),
('ts-prisma', 'Prisma', 'Database', 75, 0, 1719014400000),
('ts-drizzle', 'Drizzle ORM', 'Database', 80, 0, 1719014400000);

-- Insert Tech Stacks (Tools)
INSERT INTO tech_stacks (id, name, category, proficiency, "order", created_at) VALUES
('ts-git', 'Git', 'Tools', 85, 0, 1719014400000),
('ts-github', 'GitHub', 'Tools', 85, 0, 1719014400000),
('ts-vscode', 'VS Code', 'Tools', 90, 0, 1719014400000),
('ts-postman', 'Postman', 'Tools', 80, 0, 1719014400000),
('ts-figma', 'Figma', 'Tools', 70, 0, 1719014400000);

-- Insert Projects
INSERT INTO projects (id, title, description, long_description, status, featured, github_url, demo_url, start_date, end_date, "order", created_at, updated_at) VALUES
(
  'proj-1719014400001',
  'E-commerce Platform',
  'Full-stack e-commerce application with cart, checkout, and payment integration',
  'A complete e-commerce solution built with Next.js and PostgreSQL. Features include product catalog, shopping cart, user authentication, order management, and Stripe payment integration.',
  'completed',
  1,
  'https://github.com/dannel07/ecommerce',
  'https://ecommerce-demo.vercel.app',
  '2024-01',
  '2024-03',
  0,
  1719014400000,
  1719014400000
),
(
  'proj-1719014400002',
  'Task Management App',
  'Collaborative task management tool with real-time updates',
  'A Trello-like task management application with drag-and-drop functionality, real-time collaboration, and team workspaces.',
  'completed',
  1,
  'https://github.com/dannel07/task-manager',
  'https://tasks-demo.vercel.app',
  '2023-10',
  '2023-12',
  0,
  1719014400000,
  1719014400000
),
(
  'proj-1719014400003',
  'Weather Dashboard',
  'Real-time weather information with beautiful visualizations',
  'Weather dashboard showing current conditions, forecasts, and historical data with interactive charts and maps.',
  'completed',
  0,
  'https://github.com/dannel07/weather-app',
  'https://weather-demo.vercel.app',
  '2023-08',
  '2023-09',
  0,
  1719014400000,
  1719014400000
),
(
  'proj-1719014400004',
  'Blog Platform',
  'Modern blog platform with markdown support and SEO optimization',
  'A fast and SEO-friendly blog platform built with Next.js. Features include markdown editing, code syntax highlighting, tags, and full-text search.',
  'completed',
  0,
  'https://github.com/dannel07/blog-platform',
  'https://blog-demo.vercel.app',
  '2023-06',
  '2023-07',
  0,
  1719014400000,
  1719014400000
);

-- Insert Experiences
INSERT INTO experiences (id, title, company, location, type, start_date, end_date, is_currently, description, "order", created_at) VALUES
(
  'exp-1719014400001',
  'Frontend Developer Intern',
  'Tech Startup Indonesia',
  'Jakarta, Indonesia',
  'internship',
  '2024-01',
  NULL,
  1,
  'Developing and maintaining web applications using React and Next.js. Collaborating with design and backend teams to deliver high-quality features.',
  0,
  1719014400000
),
(
  'exp-1719014400002',
  'Web Developer',
  'Freelance',
  'Remote',
  'freelance',
  '2023-06',
  NULL,
  1,
  'Building custom websites and web applications for various clients. Specializing in React, Next.js, and modern web technologies.',
  0,
  1719014400000
),
(
  'exp-1719014400003',
  'IT Committee Member',
  'University Tech Community',
  'Indonesia',
  'organization',
  '2023-01',
  '2023-12',
  0,
  'Organized tech workshops and hackathons. Mentored junior students in web development.',
  0,
  1719014400000
);
