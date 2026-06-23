import { getProfile } from "@/lib/actions/profile";
import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const profile = await getProfile();
    
    if (!profile?.resumeUrl) {
      return new NextResponse("CV not found", { status: 404 });
    }

    // Read the CV file from public directory
    const filePath = join(process.cwd(), "public", profile.resumeUrl);
    const fileBuffer = await readFile(filePath);
    
    // Get filename from path
    const filename = profile.resumeUrl.split("/").pop() || "CV.pdf";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error downloading CV:", error);
    return new NextResponse("Error downloading CV", { status: 500 });
  }
}
