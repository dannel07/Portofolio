import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getTechStacks } from "@/lib/actions/tech-stack";
import { ProjectForm } from "@/components/admin/project-form";

export default async function NewProjectPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/signin");
  }

  const techStacks = await getTechStacks();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New Project</h1>
        <p className="text-muted-foreground">
          Create a new project for your portfolio
        </p>
      </div>

      <ProjectForm techStacks={techStacks} />
    </div>
  );
}
