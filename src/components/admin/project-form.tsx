"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2 } from "lucide-react";
import { createProject, updateProject } from "@/lib/actions/projects";
import { Project, TechStack } from "@/db/schema";
import { ImageUpload } from "@/components/admin/image-upload";

interface ProjectFormProps {
  project?: Project | null;
  techStacks: TechStack[];
}

export function ProjectForm({ project, techStacks }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(project?.thumbnail || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      longDescription: formData.get("longDescription") as string || undefined,
      thumbnail: thumbnailUrl || undefined,
      githubUrl: formData.get("githubUrl") as string || undefined,
      demoUrl: formData.get("demoUrl") as string || undefined,
      status: formData.get("status") as string || "completed",
      featured: formData.get("featured") === "on",
      startDate: formData.get("startDate") as string || undefined,
      endDate: formData.get("endDate") as string || undefined,
      techStackIds: formData.getAll("techStacks") as string[],
    };

    const result = project
      ? await updateProject(project.id, data)
      : await createProject(data);
    
    setLoading(false);
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });

    if (result.success) {
      setTimeout(() => {
        router.push("/admin/projects");
        router.refresh();
      }, 1000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Basic information about the project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="My Awesome Project"
              defaultValue={project?.title || ""}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="A brief description of the project..."
              rows={3}
              defaultValue={project?.description || ""}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDescription">Full Description</Label>
            <Textarea
              id="longDescription"
              name="longDescription"
              placeholder="A detailed description of the project, features, challenges, etc..."
              rows={6}
              defaultValue={project?.longDescription || ""}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                type="url"
                placeholder="https://github.com/username/repo"
                defaultValue={project?.githubUrl || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="demoUrl">Demo URL</Label>
              <Input
                id="demoUrl"
                name="demoUrl"
                type="url"
                placeholder="https://demo.example.com"
                defaultValue={project?.demoUrl || ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <ImageUpload
              label="Project Thumbnail"
              value={thumbnailUrl}
              onChange={setThumbnailUrl}
              type="project"
              accept="image/*"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Status</CardTitle>
          <CardDescription>Status and timeline</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                defaultValue={project?.status || "completed"}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="featured" className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  defaultChecked={!!project?.featured}
                  className="h-4 w-4"
                />
                Featured Project
              </Label>
              <p className="text-xs text-muted-foreground">
                Show this project on the homepage
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={project?.startDate || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                defaultValue={project?.endDate || ""}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technologies Used</CardTitle>
          <CardDescription>Select the tech stack used in this project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-3">
            {techStacks.map((tech) => (
              <Label key={tech.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="techStacks"
                  value={tech.id}
                  className="h-4 w-4"
                />
                {tech.name}
              </Label>
            ))}
          </div>
        </CardContent>
      </Card>

      {message && (
        <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200" : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200"}`}>
          {message.text}
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {project ? "Update Project" : "Create Project"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
