import { NextResponse } from "next/server";
import { getActiveCV } from "@/lib/actions/cv";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    // Try to get active CV from database
    const activeCV = await getActiveCV();
    
    if (activeCV && activeCV.fileUrl) {
      // If we have an active CV in database, redirect to it
      return NextResponse.redirect(activeCV.fileUrl);
    }
    
    // Otherwise, try to serve from /public/cv/resume.pdf
    const cvPath = path.join(process.cwd(), "public", "cv", "resume.pdf");
    
    if (fs.existsSync(cvPath)) {
      // Return the file URL
      return NextResponse.redirect(new URL("/cv/resume.pdf", process.env.NEXTAUTH_URL || "http://localhost:3000"));
    }
    
    // No CV found
    return NextResponse.json(
      { error: "CV not found. Please add your CV file or upload via admin panel." },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error serving CV:", error);
    return NextResponse.json(
      { error: "Failed to load CV" },
      { status: 500 }
    );
  }
}
