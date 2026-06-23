import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // "profile", "project", "cv"

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes: Record<string, string[]> = {
      profile: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
      project: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
      cv: ["application/pdf"],
    };

    if (!allowedTypes[type]?.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type for ${type}` },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${originalName}`;

    // Determine upload directory
    const uploadDir = type === "cv" ? "cv" : "images";
    const publicDir = join(process.cwd(), "public", uploadDir);

    // Create directory if it doesn't exist
    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true });
    }

    // Save file
    const filepath = join(publicDir, filename);
    await writeFile(filepath, buffer);

    // Return public URL
    const url = `/${uploadDir}/${filename}`;

    return NextResponse.json({
      success: true,
      url,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

// Get max file size (10MB)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
