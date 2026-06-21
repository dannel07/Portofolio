import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProject } from "@/lib/actions/projects";
import { getTechStacks } from "@/lib/actions/tech-stack";
import { ProjectForm } from "@/components/admin/project-form";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/signin");
  }

  const { id } = await params;
  const [project, techStacks] = await Promise.all([
    getProject(id),
    getTechStacks(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Project</h1>
        <p className="text-muted-foreground">
          Update project information
        </p>
      </div>

      <ProjectForm project={project} techStacks={techStacks} />
    </div>
  );
}
