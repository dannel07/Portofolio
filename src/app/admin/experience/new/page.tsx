import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ExperienceForm } from "@/components/admin/experience-form";

export default async function NewExperiencePage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/signin");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New Experience</h1>
        <p className="text-muted-foreground">
          Add your work experience, internship, or volunteer work
        </p>
      </div>

      <ExperienceForm />
    </div>
  );
}
