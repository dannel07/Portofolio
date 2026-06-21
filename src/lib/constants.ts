export const SITE_CONFIG = {
  name: "Daniel Sinambela",
  title: "Daniel Sinambela - Software Engineer",
  description:
    "Applied Software Engineering Technology student specializing in fullstack web development, backend engineering, and system analysis.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/dannel07",
    linkedin: "https://linkedin.com/in/daniel-sinambela-aaba18389",
    email: "mailto:sinambeladaniel07@gmail.com",
  },
};

export const TECH_CATEGORIES = [
  { value: "Frontend", label: "Frontend" },
  { value: "Backend", label: "Backend" },
  { value: "Database", label: "Database" },
  { value: "Mobile", label: "Mobile" },
  { value: "Data Analytics", label: "Data Analytics" },
  { value: "Tools", label: "Tools & Platforms" },
] as const;

export const PROJECT_STATUS = [
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
] as const;

export const EXPERIENCE_TYPES = [
  { value: "internship", label: "Internship" },
  { value: "organization", label: "Organization" },
  { value: "freelance", label: "Freelance" },
  { value: "volunteer", label: "Volunteer" },
  { value: "bootcamp", label: "Bootcamp" },
] as const;

export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  CV_DOWNLOAD: "cv_download",
  GITHUB_CLICK: "github_click",
  LINKEDIN_CLICK: "linkedin_click",
  PROJECT_CLICK: "project_click",
  CONTACT_SUBMIT: "contact_submit",
} as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = ["application/pdf"];
