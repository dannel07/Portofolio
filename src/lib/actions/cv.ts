"use server";

import { revalidatePath } from "next/cache";
import { getLocalDb } from "@/lib/db-local";
import { cvFiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createId } from "@/lib/auth-utils";

export async function getCVFiles() {
  try {
    const db = getLocalDb();
    const files = await db
      .select()
      .from(cvFiles)
      .orderBy(cvFiles.uploadedAt);
    return files;
  } catch (error) {
    console.error("Error fetching CV files:", error);
    return [];
  }
}

export async function getActiveCV() {
  try {
    const db = getLocalDb();
    const files = await db
      .select()
      .from(cvFiles)
      .where(eq(cvFiles.isActive, true))
      .limit(1);
    return files[0] || null;
  } catch (error) {
    console.error("Error fetching active CV:", error);
    return null;
  }
}

export async function createCVFile(data: {
  filename: string;
  originalFilename: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}) {
  try {
    const db = getLocalDb();
    
    // Deactivate all other CVs
    await db
      .update(cvFiles)
      .set({ isActive: false });
    
    // Create new CV file
    const newCV = {
      id: createId(),
      filename: data.filename,
      originalFilename: data.originalFilename,
      fileUrl: data.fileUrl,
      fileSize: data.fileSize,
      mimeType: data.mimeType,
      isActive: true,
      uploadedAt: Date.now(),
    };

    await db.insert(cvFiles).values(newCV);

    revalidatePath("/admin/cv");
    revalidatePath("/");
    
    return { success: true, message: "CV uploaded successfully" };
  } catch (error) {
    console.error("Error creating CV file:", error);
    return { success: false, message: "Failed to upload CV" };
  }
}

export async function setActiveCV(id: string) {
  try {
    const db = getLocalDb();
    
    // Deactivate all CVs
    await db
      .update(cvFiles)
      .set({ isActive: false });
    
    // Activate selected CV
    await db
      .update(cvFiles)
      .set({ isActive: true })
      .where(eq(cvFiles.id, id));

    revalidatePath("/admin/cv");
    revalidatePath("/");
    
    return { success: true, message: "Active CV updated" };
  } catch (error) {
    console.error("Error setting active CV:", error);
    return { success: false, message: "Failed to update active CV" };
  }
}

export async function deleteCVFile(id: string) {
  try {
    const db = getLocalDb();
    
    await db.delete(cvFiles).where(eq(cvFiles.id, id));

    revalidatePath("/admin/cv");
    revalidatePath("/");
    
    return { success: true, message: "CV deleted successfully" };
  } catch (error) {
    console.error("Error deleting CV:", error);
    return { success: false, message: "Failed to delete CV" };
  }
}
