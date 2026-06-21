import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getExperiences } from "@/lib/actions/experience";
import { ExperienceForm } from "@/components/admin/experience-form";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/signin");
  }

  const { id } = await params;
  const experiences = await getExperiences();
  const experience = experiences.find((exp) => exp.id === id);

  if (!experience) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Experience</h1>
        <p className="text-muted-foreground">
          Update experience information
        </p>
      </div>

      <ExperienceForm experience={experience} />
    </div>
  );
}
