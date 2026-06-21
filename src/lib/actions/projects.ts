"use server";

import { revalidatePath } from "next/cache";
import { getLocalDb } from "@/lib/db-local";
import { projects, projectTechStacks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProjects() {
  try {
    const db = getLocalDb();
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(projects.order);
    return allProjects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProject(id: string) {
  try {
    const db = getLocalDb();
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);
    return project[0] || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function createProject(data: {
  title: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  githubUrl?: string;
  demoUrl?: string;
  status?: string;
  featured?: boolean;
  startDate?: string;
  endDate?: string;
  techStackIds?: string[];
}) {
  try {
    const db = getLocalDb();
    
    const projectId = `proj-${Date.now()}`;
    
    const newProject = {
      id: projectId,
      title: data.title,
      description: data.description,
      longDescription: data.longDescription || null,
      thumbnail: data.thumbnail || null,
      githubUrl: data.githubUrl || null,
      demoUrl: data.demoUrl || null,
      status: data.status || "completed",
      featured: data.featured ? 1 : 0,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      order: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await db.insert(projects).values(newProject);

    // Add tech stack relations
    if (data.techStackIds && data.techStackIds.length > 0) {
      const relations = data.techStackIds.map((techStackId) => ({
        id: `pts-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        projectId: projectId,
        techStackId,
      }));
      await db.insert(projectTechStacks).values(relations);
    }

    revalidatePath("/");
    revalidatePath("/admin/projects");
    
    return { success: true, message: "Project created successfully", projectId: projectId };
  } catch (error) {
    console.error("Error creating project:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create project";
    return { success: false, message: errorMessage };
  }
}

export async function updateProject(id: string, data: {
  title: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  githubUrl?: string;
  demoUrl?: string;
  status?: string;
  featured?: boolean;
  startDate?: string;
  endDate?: string;
  techStackIds?: string[];
}) {
  try {
    const db = getLocalDb();
    
    await db
      .update(projects)
      .set({
        title: data.title,
        description: data.description,
        longDescription: data.longDescription || null,
        thumbnail: data.thumbnail || null,
        githubUrl: data.githubUrl || null,
        demoUrl: data.demoUrl || null,
        status: data.status || "completed",
        featured: data.featured ? 1 : 0,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        updatedAt: Date.now(),
      })
      .where(eq(projects.id, id));

    // Update tech stack relations
    if (data.techStackIds) {
      // Delete existing relations
      await db.delete(projectTechStacks).where(eq(projectTechStacks.projectId, id));
      
      // Add new relations
      if (data.techStackIds.length > 0) {
        const relations = data.techStackIds.map((techStackId, index) => ({
          id: `pts-${Date.now()}-${index}`,
          projectId: id,
          techStackId,
        }));
        await db.insert(projectTechStacks).values(relations);
      }
    }

    revalidatePath("/");
    revalidatePath("/admin/projects");
    
    return { success: true, message: "Project updated successfully" };
  } catch (error) {
    console.error("Error updating project:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update project";
    return { success: false, message: errorMessage };
  }
}

export async function deleteProject(id: string) {
  try {
    const db = getLocalDb();
    
    // Delete tech stack relations first
    await db.delete(projectTechStacks).where(eq(projectTechStacks.projectId, id));
    
    // Delete project
    await db.delete(projects).where(eq(projects.id, id));

    revalidatePath("/");
    revalidatePath("/admin/projects");
    
    return { success: true, message: "Project deleted successfully" };
  } catch (error) {
    console.error("Error deleting project:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete project";
    return { success: false, message: errorMessage };
  }
}
