import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@/lib/auth-utils";

// Users table (for authentication)
export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  githubUsername: text("github_username"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => Date.now()),
});

// Accounts table (for OAuth)
export const accounts = sqliteTable("accounts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

// Sessions table
export const sessions = sqliteTable("sessions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  sessionToken: text("session_token").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

// Profile table
export const profile = sqliteTable("profile", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  location: text("location"),
  bio: text("bio"),
  description: text("description"),
  avatar: text("avatar"),
  resumeUrl: text("resume_url"),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  twitterUrl: text("twitter_url"),
  websiteUrl: text("website_url"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => Date.now()),
});

// Education table
export const education = sqliteTable("education", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  field: text("field"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  gpa: text("gpa"),
  location: text("location"),
  description: text("description"),
  isCurrently: integer("is_currently", { mode: "boolean" }).default(false),
  order: integer("order").default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => Date.now()),
});

// Tech Stacks table
export const techStacks = sqliteTable("tech_stacks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  category: text("category").notNull(), // Frontend, Backend, Database, Mobile, Data Analytics, Tools
  icon: text("icon"), // URL to icon or icon name
  proficiency: integer("proficiency").default(50), // 0-100
  order: integer("order").default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => Date.now()),
});

// Projects table
export const projects = sqliteTable("projects", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  thumbnail: text("thumbnail"),
  githubUrl: text("github_url"),
  demoUrl: text("demo_url"),
  status: text("status").default("completed"), // in-progress, completed, archived
  featured: integer("featured", { mode: "boolean" }).default(false),
  startDate: text("start_date"),
  endDate: text("end_date"),
  order: integer("order").default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => Date.now()),
});

// Project Tech Stack (many-to-many)
export const projectTechStacks = sqliteTable("project_tech_stacks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  techStackId: text("tech_stack_id")
    .notNull()
    .references(() => techStacks.id, { onDelete: "cascade" }),
});

// Experiences table
export const experiences = sqliteTable("experiences", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location"),
  type: text("type").notNull(), // internship, organization, freelance, volunteer, bootcamp
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isCurrently: integer("is_currently", { mode: "boolean" }).default(false),
  description: text("description"),
  responsibilities: text("responsibilities"), // JSON array
  order: integer("order").default(0),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => Date.now()),
});

// CV Files table
export const cvFiles = sqliteTable("cv_files", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  filename: text("filename").notNull(),
  originalFilename: text("original_filename").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  uploadedAt: integer("uploaded_at", { mode: "timestamp_ms" })
    .$defaultFn(() => Date.now()),
});

// Analytics table
export const analytics = sqliteTable("analytics", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  eventType: text("event_type").notNull(), // page_view, cv_download, github_click, linkedin_click, project_click
  eventData: text("event_data"), // JSON data
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  referer: text("referer"),
  timestamp: integer("timestamp", { mode: "timestamp_ms" })
    .$defaultFn(() => Date.now()),
});

// Relations
export const projectsRelations = relations(projects, ({ many }) => ({
  techStacks: many(projectTechStacks),
}));

export const techStacksRelations = relations(techStacks, ({ many }) => ({
  projects: many(projectTechStacks),
}));

export const projectTechStacksRelations = relations(
  projectTechStacks,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectTechStacks.projectId],
      references: [projects.id],
    }),
    techStack: one(techStacks, {
      fields: [projectTechStacks.techStackId],
      references: [techStacks.id],
    }),
  })
);

// Types
export type User = typeof users.$inferSelect;
export type Profile = typeof profile.$inferSelect;
export type Education = typeof education.$inferSelect;
export type TechStack = typeof techStacks.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type CVFile = typeof cvFiles.$inferSelect;
export type Analytics = typeof analytics.$inferSelect;
