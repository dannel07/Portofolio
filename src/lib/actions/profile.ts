"use server";

import { revalidatePath } from "next/cache";
import { getLocalDb } from "@/lib/db-local";
import { profile } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProfile() {
  try {
    const db = getLocalDb();
    const profiles = await db.select().from(profile).limit(1);
    return profiles[0] || null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export async function updateProfile(data: {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  description?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
}) {
  try {
    const db = getLocalDb();
    
    // Check if profile exists
    const existing = await db.select().from(profile).limit(1);
    
    if (existing.length > 0) {
      // Update existing profile
      await db
        .update(profile)
        .set({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          location: data.location || null,
          bio: data.bio || null,
          description: data.description || null,
          githubUrl: data.githubUrl || null,
          linkedinUrl: data.linkedinUrl || null,
          twitterUrl: data.twitterUrl || null,
          websiteUrl: data.websiteUrl || null,
          updatedAt: Date.now(),
        })
        .where(eq(profile.id, existing[0].id));
    } else {
      // Create new profile if doesn't exist
      const newProfile = {
        id: `prof-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        location: data.location || null,
        bio: data.bio || null,
        description: data.description || null,
        avatar: null,
        resumeUrl: null,
        githubUrl: data.githubUrl || null,
        linkedinUrl: data.linkedinUrl || null,
        twitterUrl: data.twitterUrl || null,
        websiteUrl: data.websiteUrl || null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await db.insert(profile).values(newProfile);
    }

    revalidatePath("/");
    revalidatePath("/admin/profile");
    
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating profile:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update profile";
    return { success: false, message: errorMessage };
  }
}

export async function updateProfileAvatar(avatarUrl: string) {
  try {
    const db = getLocalDb();
    const existing = await db.select().from(profile).limit(1);
    
    if (existing.length > 0) {
      await db
        .update(profile)
        .set({
          avatar: avatarUrl,
          updatedAt: Date.now(),
        })
        .where(eq(profile.id, existing[0].id));
      
      revalidatePath("/");
      revalidatePath("/admin/profile");
      
      return { success: true, message: "Avatar updated successfully" };
    }
    
    return { success: false, message: "Profile not found" };
  } catch (error) {
    console.error("Error updating avatar:", error);
    return { success: false, message: "Failed to update avatar" };
  }
}
