"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { techStacks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTechStacks() {
  try {
    const db = await getDb();
    const allTechStacks = await db
      .select()
      .from(techStacks)
      .orderBy(techStacks.category, techStacks.order);
    return allTechStacks;
  } catch (error) {
    console.error("Error fetching tech stacks:", error);
    return [];
  }
}

export async function getTechStacksByCategory(category: string) {
  try {
    const db = await getDb();
    const stacks = await db
      .select()
      .from(techStacks)
      .where(eq(techStacks.category, category))
      .orderBy(techStacks.order);
    return stacks;
  } catch (error) {
    console.error("Error fetching tech stacks:", error);
    return [];
  }
}

export async function createTechStack(data: {
  name: string;
  category: string;
  icon?: string;
  proficiency?: number;
}) {
  try {
    const db = await getDb();
    
    const newTechStack = {
      id: `ts-${Date.now()}`,
      name: data.name,
      category: data.category,
      icon: data.icon || null,
      proficiency: data.proficiency || 50,
      order: 0,
      createdAt: Date.now(),
    };

    await db.insert(techStacks).values(newTechStack);

    revalidatePath("/");
    revalidatePath("/admin/tech-stack");
    
    return { success: true, message: "Tech stack created successfully" };
  } catch (error) {
    console.error("Error creating tech stack:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create tech stack";
    return { success: false, message: errorMessage };
  }
}

export async function updateTechStack(id: string, data: {
  name: string;
  category: string;
  icon?: string;
  proficiency?: number;
}) {
  try {
    const db = await getDb();
    
    await db
      .update(techStacks)
      .set({
        name: data.name,
        category: data.category,
        icon: data.icon || null,
        proficiency: data.proficiency || 50,
      })
      .where(eq(techStacks.id, id));

    revalidatePath("/");
    revalidatePath("/admin/tech-stack");
    
    return { success: true, message: "Tech stack updated successfully" };
  } catch (error) {
    console.error("Error updating tech stack:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update tech stack";
    return { success: false, message: errorMessage };
  }
}

export async function deleteTechStack(id: string) {
  try {
    const db = await getDb();
    
    await db.delete(techStacks).where(eq(techStacks.id, id));

    revalidatePath("/");
    revalidatePath("/admin/tech-stack");
    
    return { success: true, message: "Tech stack deleted successfully" };
  } catch (error) {
    console.error("Error deleting tech stack:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete tech stack";
    return { success: false, message: errorMessage };
  }
}
