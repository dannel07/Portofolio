"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { experiences } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getExperiences() {
  try {
    const db = await getDb();
    const allExperiences = await db
      .select()
      .from(experiences)
      .orderBy(experiences.order);
    return allExperiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export async function createExperience(data: {
  title: string;
  company: string;
  location?: string;
  type: string;
  startDate: string;
  endDate?: string;
  isCurrently?: boolean | number;
  description?: string;
  responsibilities?: string[];
}) {
  try {
    const db = await getDb();
    
    const newExperience = {
      id: `exp-${Date.now()}`,
      title: data.title,
      company: data.company,
      location: data.location || null,
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate || null,
      isCurrently: data.isCurrently ? 1 : 0,
      description: data.description || null,
      responsibilities: data.responsibilities ? JSON.stringify(data.responsibilities) : null,
      order: 0,
      createdAt: Date.now(),
    };

    await db.insert(experiences).values(newExperience);

    revalidatePath("/");
    revalidatePath("/admin/experience");
    
    return { success: true, message: "Experience created successfully" };
  } catch (error) {
    console.error("Error creating experience:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create experience";
    return { success: false, message: errorMessage };
  }
}

export async function updateExperience(id: string, data: {
  title: string;
  company: string;
  location?: string;
  type: string;
  startDate: string;
  endDate?: string;
  isCurrently?: boolean | number;
  description?: string;
  responsibilities?: string[];
}) {
  try {
    const db = await getDb();
    
    await db
      .update(experiences)
      .set({
        title: data.title,
        company: data.company,
        location: data.location || null,
        type: data.type,
        startDate: data.startDate,
        endDate: data.endDate || null,
        isCurrently: data.isCurrently ? 1 : 0,
        description: data.description || null,
        responsibilities: data.responsibilities ? JSON.stringify(data.responsibilities) : null,
      })
      .where(eq(experiences.id, id));

    revalidatePath("/");
    revalidatePath("/admin/experience");
    
    return { success: true, message: "Experience updated successfully" };
  } catch (error) {
    console.error("Error updating experience:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update experience";
    return { success: false, message: errorMessage };
  }
}

export async function deleteExperience(id: string) {
  try {
    const db = await getDb();
    
    await db.delete(experiences).where(eq(experiences.id, id));

    revalidatePath("/");
    revalidatePath("/admin/experience");
    
    return { success: true, message: "Experience deleted successfully" };
  } catch (error) {
    console.error("Error deleting experience:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete experience";
    return { success: false, message: errorMessage };
  }
}
