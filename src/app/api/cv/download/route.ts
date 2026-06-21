import { NextResponse } from "next/server";
import { getActiveCV } from "@/lib/actions/cv";

export async function GET() {
  try {
    // Try to get active CV from database
    const activeCV = await getActiveCV();
    
    if (activeCV && activeCV.fileUrl) {
      // If we have an active CV in database, redirect to it
      return NextResponse.redirect(activeCV.fileUrl);
    }
    
    // Otherwise, try to serve from /public/cv/resume.pdf
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    return NextResponse.redirect(new URL("/cv/resume.pdf", baseUrl));
  } catch (error) {
    console.error("Error serving CV:", error);
    return NextResponse.json(
      { error: "Failed to load CV" },
      { status: 500 }
    );
  }
}
