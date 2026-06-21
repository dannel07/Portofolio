/**
 * Database Seed Script
 * 
 * This script seeds the database with initial data from Daniel Sinambela's CV
 * Run with: npm run db:seed
 */

import { createId } from "@/lib/auth-utils";

// Profile Data
export const profileSeedData = {
  id: createId(),
  name: "Daniel Sinambela",
  email: "sinambeladaniel07@gmail.com",
  phone: "+6281263167246",
  location: "Toba, North Sumatera, Indonesia",
  bio: "Applied Software Engineering Technology student with hands-on experience in fullstack web development and system analysis",
  description: "An Applied Software Engineering Technology student at Institut Teknologi Del with hands-on experience in fullstack web development, modern database management, and system analysis. Proficient in building scalable applications using Laravel, Go, PHP, and JavaScript, with a strong understanding of MVC architecture and RESTful API design. Passionate about exploring modern development practices and eager to apply technical skills in backend engineering and digital business processes.",
  avatar: "/images/profile.jpg",
  githubUrl: "https://github.com/dannel07",
  linkedinUrl: "https://linkedin.com/in/daniel-sinambela-aaba18389",
};

// Education Data
export const educationSeedData = [
  {
    id: createId(),
    institution: "Institut Teknologi Del",
    degree: "Diploma 4, Bachelor of Applied Software Engineering Technology",
    field: "Software Engineering",
    startDate: "2023-08",
    endDate: null,
    gpa: "3.47",
    location: "Toba, North Sumatera",
    description: "Relevant Coursework: Web Development I & II, Object-Oriented Programming, Database Systems, Distributed Application Development, Software Requirement Analysis, Software Testing, Algorithms and Data Structures, Software Quality Assurance.",
    isCurrently: true,
    order: 0,
  },
];

// Tech Stacks Data
export const techStacksSeedData = [
  // Backend
  { id: createId(), name: "Laravel", category: "Backend", proficiency: 85, order: 1 },
  { id: createId(), name: "Go", category: "Backend", proficiency: 75, order: 2 },
  { id: createId(), name: "PHP", category: "Backend", proficiency: 85, order: 3 },
  { id: createId(), name: "REST API", category: "Backend", proficiency: 80, order: 4 },
  { id: createId(), name: "Node.js", category: "Backend", proficiency: 70, order: 5 },
  
  // Frontend
  { id: createId(), name: "JavaScript", category: "Frontend", proficiency: 80, order: 10 },
  { id: createId(), name: "TypeScript", category: "Frontend", proficiency: 70, order: 11 },
  { id: createId(), name: "React", category: "Frontend", proficiency: 75, order: 12 },
  { id: createId(), name: "Next.js", category: "Frontend", proficiency: 70, order: 13 },
  
  // Database
  { id: createId(), name: "MySQL", category: "Database", proficiency: 85, order: 20 },
  { id: createId(), name: "PostgreSQL", category: "Database", proficiency: 80, order: 21 },
  { id: createId(), name: "MongoDB", category: "Database", proficiency: 80, order: 22 },
  { id: createId(), name: "SQL Server", category: "Database", proficiency: 70, order: 23 },
  { id: createId(), name: "Firebase", category: "Database", proficiency: 75, order: 24 },
  
  // Programming Languages
  { id: createId(), name: "Python", category: "Tools", proficiency: 75, order: 30 },
  { id: createId(), name: "Java", category: "Tools", proficiency: 80, order: 31 },
  { id: createId(), name: "C", category: "Tools", proficiency: 70, order: 32 },
  
  // Tools & Platforms
  { id: createId(), name: "Git", category: "Tools", proficiency: 85, order: 40 },
  { id: createId(), name: "GitHub", category: "Tools", proficiency: 85, order: 41 },
  { id: createId(), name: "Postman", category: "Tools", proficiency: 80, order: 42 },
  { id: createId(), name: "Figma", category: "Tools", proficiency: 70, order: 43 },
  { id: createId(), name: "Docker", category: "Tools", proficiency: 65, order: 44 },
  
  // Data Analytics
  { id: createId(), name: "Tableau", category: "Data Analytics", proficiency: 75, order: 50 },
  { id: createId(), name: "Microsoft Excel", category: "Data Analytics", proficiency: 80, order: 51 },
  { id: createId(), name: "Apache Spark", category: "Data Analytics", proficiency: 70, order: 52 },
];

// Projects Data
export const projectsSeedData = [
  {
    id: createId(),
    title: "Web-Based Agent for GJM and GKM Administrative Automation",
    description: "Administrative automation system for academic quality assurance processes",
    longDescription: "Developed a web-based administrative automation system for GJM and GKM to streamline academic quality assurance processes and reduce manual workloads. Designed and implemented secure backend services, database structures, and workflow automation features using Laravel, MongoDB, and REST APIs. Built high-throughput data processing modules to manage large volumes of academic evaluation and questionnaire data for centralized information management.",
    thumbnail: "/images/projects/gjm-gkm.jpg",
    githubUrl: "",
    demoUrl: "",
    status: "completed",
    featured: true,
    startDate: "2026-01",
    endDate: "2026-06",
    order: 1,
  },
  {
    id: createId(),
    title: "Hommie: Boarding House and Homestay Booking System",
    description: "Mobile-friendly accommodation booking platform for Lake Toba area",
    longDescription: "Developed a mobile-friendly web accommodation booking system to help users search, view, and reserve homestays in the Lake Toba area. Designed and built core backend functionalities using Laravel and PHP, including JWT-based user authentication, accommodation management, and booking transactions. Formulated and optimized relational database structures in MySQL to ensure efficient storage and real-time retrieval of reservation data.",
    thumbnail: "/images/projects/hommie.jpg",
    githubUrl: "",
    demoUrl: "",
    status: "completed",
    featured: true,
    startDate: "2025-03",
    endDate: "2025-08",
    order: 2,
  },
  {
    id: createId(),
    title: "Mutiara Kindergarten Information System",
    description: "Web-based information system for kindergarten management",
    longDescription: "Coordinated project planning, task allocation, and team collaboration for the development of a web-based information system. Gathered and analyzed user requirements, translating business needs into functional and technical specifications. Collaborated with developers during database design, testing, deployment, and feature validation activities.",
    thumbnail: "/images/projects/mutiara.jpg",
    githubUrl: "",
    demoUrl: "",
    status: "completed",
    featured: false,
    startDate: "2024-06",
    endDate: "2024-12",
    order: 3,
  },
  {
    id: createId(),
    title: "E-Wallet Usage Analysis Dashboard in Toba Regency",
    description: "Interactive dashboard analyzing e-wallet adoption factors",
    longDescription: "Built an interactive dashboard to analyze key socio-economic factors affecting e-wallet adoption and transaction intensity. Collected, cleaned, and processed regional survey data using Microsoft Excel and Exploratory Data Analysis (EDA) techniques. Created data visualizations in Tableau to communicate insights on consumer behavior and digital payment trends to stakeholders.",
    thumbnail: "/images/projects/ewallet.jpg",
    githubUrl: "",
    demoUrl: "",
    status: "completed",
    featured: false,
    startDate: "2025-01",
    endDate: "2025-05",
    order: 4,
  },
];

// Experiences Data
export const experiencesSeedData = [
  {
    id: createId(),
    title: "Head of Multimedia Division",
    company: "Department of Science and Technology (DIPTEK)",
    location: "Toba, North Sumatera",
    type: "organization",
    startDate: "2026-02",
    endDate: null,
    isCurrently: true,
    description: "Lead the multimedia division in designing, creating, and managing visual and digital content to support organizational branding and publications.",
    responsibilities: JSON.stringify([
      "Lead the multimedia division in designing, creating, and managing visual and digital content",
      "Coordinate cross-functional team workflows to ensure timely asset delivery for science and technology initiatives",
    ]),
    order: 1,
  },
  {
    id: createId(),
    title: "Gen AI Engineer Bootcamp Participant",
    company: "Dicoding x DBS Foundation - Coding Camp 2026 Progressive",
    location: "Remote",
    type: "bootcamp",
    startDate: "2026-04",
    endDate: "2026-04",
    isCurrently: false,
    description: "Completed an intensive training program focused on Artificial Intelligence, Generative AI fundamentals, and Machine Learning engineering.",
    responsibilities: JSON.stringify([
      "Completed intensive training on AI and Generative AI fundamentals",
      "Developed hands-on programming skills in Python and prompt engineering",
      "Built intelligent system workflows through project-based assessments",
    ]),
    order: 2,
  },
  {
    id: createId(),
    title: "International Collaborative Project Member",
    company: "Overseas Social Innovation Project (OSIP) | IT Del x SIT",
    location: "Parapat, North Sumatera",
    type: "internship",
    startDate: "2025-12",
    endDate: "2025-12",
    isCurrently: false,
    description: "Collaborated in cross-cultural teams with Singapore Institute of Technology (SIT) students to analyze real-world operational challenges faced by local MSMEs/UMKM.",
    responsibilities: JSON.stringify([
      "Collaborated with international teams from Singapore Institute of Technology",
      "Conducted field observations and stakeholder interviews",
      "Designed sustainable digital solution proposals for local businesses",
      "Enhanced interpersonal communication and cross-border teamwork",
    ]),
    order: 3,
  },
  {
    id: createId(),
    title: "Data Science & AI Trainee",
    company: "Microsoft Elevate Training 2025 | Dicoding Microsoft",
    location: "Remote",
    type: "bootcamp",
    startDate: "2025-08",
    endDate: "2025-08",
    isCurrently: false,
    description: "Learned foundational concepts in Data Science pipelines, data engineering, and cloud-based analytics workflows.",
    responsibilities: JSON.stringify([
      "Learned Data Science pipelines and data engineering concepts",
      "Gained hands-on experience with Microsoft Fabric and Azure",
      "Worked on cloud-based analytics and intelligent system integration",
    ]),
    order: 4,
  },
  {
    id: createId(),
    title: "Humanitarian Volunteer",
    company: "Disaster Relief Volunteer – Sibolga Landslide",
    location: "Sibolga, North Sumatera",
    type: "volunteer",
    startDate: "2025-12",
    endDate: "2025-12",
    isCurrently: false,
    description: "Assisted emergency relief operations for landslide victims by coordinating logistics and humanitarian aid distribution.",
    responsibilities: JSON.stringify([
      "Assisted emergency relief operations for landslide victims",
      "Coordinated logistics and humanitarian aid distribution",
      "Partnered with local response teams for community recovery",
    ]),
    order: 5,
  },
  {
    id: createId(),
    title: "Active Member",
    company: "HIMATERA (Student Association)",
    location: "Toba, North Sumatera",
    type: "organization",
    startDate: "2023-09",
    endDate: null,
    isCurrently: true,
    description: "Actively contribute to department-level student collaboration programs, academic development initiatives, and community events.",
    responsibilities: JSON.stringify([
      "Contribute to student collaboration programs",
      "Participate in academic development initiatives",
      "Developed teamwork and event coordination skills",
    ]),
    order: 6,
  },
];

console.log("✅ Seed data prepared for Daniel Sinambela's portfolio");
console.log("📊 Profile: 1 entry");
console.log("🎓 Education: " + educationSeedData.length + " entries");
console.log("💻 Tech Stacks: " + techStacksSeedData.length + " entries");
console.log("🚀 Projects: " + projectsSeedData.length + " entries");
console.log("💼 Experiences: " + experiencesSeedData.length + " entries");
