"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2 } from "lucide-react";
import { createExperience, updateExperience } from "@/lib/actions/experience";
import { Experience } from "@/db/schema";

interface ExperienceFormProps {
  experience?: Experience | null;
}

export function ExperienceForm({ experience }: ExperienceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isCurrently, setIsCurrently] = useState(!!experience?.isCurrently);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      location: formData.get("location") as string || undefined,
      type: formData.get("type") as string,
      startDate: formData.get("startDate") as string,
      endDate: !isCurrently ? (formData.get("endDate") as string || undefined) : undefined,
      isCurrently: isCurrently,
      description: formData.get("description") as string || undefined,
    };

    const result = experience
      ? await updateExperience(experience.id, data)
      : await createExperience(data);
    
    setLoading(false);
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });

    if (result.success) {
      setTimeout(() => {
        router.push("/admin/experience");
        router.refresh();
      }, 1000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Experience Details</CardTitle>
          <CardDescription>Add your work experience, internship, or volunteer work</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Software Engineer"
                defaultValue={experience?.title || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                name="company"
                placeholder="Tech Company Inc."
                defaultValue={experience?.company || ""}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Jakarta, Indonesia"
                defaultValue={experience?.location || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <select
                id="type"
                name="type"
                defaultValue={experience?.type || "internship"}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                required
              >
                <option value="internship">Internship</option>
                <option value="organization">Organization</option>
                <option value="freelance">Freelance</option>
                <option value="volunteer">Volunteer</option>
                <option value="bootcamp">Bootcamp</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={experience?.startDate || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                defaultValue={experience?.endDate || ""}
                disabled={!!isCurrently}
              />
              <Label className="flex items-center gap-2 text-sm font-normal">
                <input
                  type="checkbox"
                  checked={!!isCurrently}
                  onChange={(e) => setIsCurrently(e.target.checked)}
                  className="h-4 w-4"
                />
                Currently working here
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your role, responsibilities, and achievements..."
              rows={6}
              defaultValue={experience?.description || ""}
            />
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
              {experience ? "Update Experience" : "Create Experience"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
