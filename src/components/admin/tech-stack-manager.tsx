"use client";

import { useState } from "react";
import { TechStack } from "@/db/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { TechStackDialog } from "./tech-stack-dialog";
import { deleteTechStack } from "@/lib/actions/tech-stack";
import { useRouter } from "next/navigation";

interface TechStackManagerProps {
  techStacks: TechStack[];
}

const categories = ["Frontend", "Backend", "Database", "Mobile", "Data Analytics", "Tools"];

export function TechStackManager({ techStacks }: TechStackManagerProps) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<TechStack | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Frontend");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const techStacksByCategory = categories.map((category) => ({
    category,
    stacks: techStacks.filter((t) => t.category === category),
  }));

  function handleAdd(category: string) {
    setSelectedCategory(category);
    setSelectedTech(null);
    setDialogOpen(true);
  }

  function handleEdit(tech: TechStack) {
    setSelectedCategory(tech.category);
    setSelectedTech(tech);
    setDialogOpen(true);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    const result = await deleteTechStack(id);
    
    if (result.success) {
      router.refresh();
    } else {
      alert(result.message);
    }
    setDeletingId(null);
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {techStacksByCategory.map(({ category, stacks }) => (
          <Card key={category}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <CardDescription>
                    {stacks.length} {stacks.length === 1 ? "technology" : "technologies"}
                  </CardDescription>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleAdd(category)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {stacks.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No technologies yet
                </div>
              ) : (
                <div className="space-y-2">
                  {stacks.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm">{tech.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {tech.proficiency}% proficiency
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(tech)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(tech.id, tech.name)}
                          disabled={deletingId === tech.id}
                          className="text-red-600 hover:text-red-700"
                        >
                          {deletingId === tech.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {dialogOpen && (
        <TechStackDialog
          techStack={selectedTech}
          category={selectedCategory}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </>
  );
}
