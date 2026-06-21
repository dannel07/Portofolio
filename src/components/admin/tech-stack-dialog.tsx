"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2, X } from "lucide-react";
import { createTechStack, updateTechStack } from "@/lib/actions/tech-stack";
import { TechStack } from "@/db/schema";

interface TechStackDialogProps {
  techStack?: TechStack | null;
  category: string;
  onClose: () => void;
}

export function TechStackDialog({ techStack, category, onClose }: TechStackDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      category: category,
      icon: formData.get("icon") as string || undefined,
      proficiency: parseInt(formData.get("proficiency") as string) || 50,
    };

    const result = techStack
      ? await updateTechStack(techStack.id, data)
      : await createTechStack(data);
    
    setLoading(false);
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });

    if (result.success) {
      router.refresh();
      setTimeout(() => {
        onClose();
      }, 500);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {techStack ? "Edit Technology" : "Add Technology"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Technology Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="React"
              defaultValue={techStack?.name || ""}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon URL (Optional)</Label>
            <Input
              id="icon"
              name="icon"
              type="url"
              placeholder="https://example.com/icon.svg"
              defaultValue={techStack?.icon || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="proficiency">
              Proficiency: <span id="proficiency-value">{techStack?.proficiency || 50}%</span>
            </Label>
            <input
              id="proficiency"
              name="proficiency"
              type="range"
              min="0"
              max="100"
              defaultValue={techStack?.proficiency || 50}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                document.getElementById("proficiency-value")!.textContent = `${value}%`;
              }}
            />
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200" : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200"}`}>
              {message.text}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
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
                  {techStack ? "Update" : "Create"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
