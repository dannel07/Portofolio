import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getTechStacks } from "@/lib/actions/tech-stack";
import { TechStackManager } from "@/components/admin/tech-stack-manager";

export default async function TechStackAdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/signin");
  }

  const techStacks = await getTechStacks();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tech Stack</h1>
        <p className="text-muted-foreground">
          Manage your skills and technologies by category
        </p>
      </div>

      <TechStackManager techStacks={techStacks} />
    </div>
  );
}
