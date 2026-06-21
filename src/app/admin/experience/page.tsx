import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getExperiences } from "@/lib/actions/experience";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, MapPin, Calendar, Briefcase } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function ExperienceAdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/signin");
  }

  const experiences = await getExperiences();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Experience</h1>
          <p className="text-muted-foreground">
            Manage your work experience and internships
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/experience/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Link>
        </Button>
      </div>

      {experiences.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-4">No experience added yet</p>
              <Button asChild variant="outline">
                <Link href="/admin/experience/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Experience
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <Card key={exp.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {exp.type}
                      </Badge>
                      {exp.isCurrently && (
                        <Badge className="text-xs">Current</Badge>
                      )}
                    </div>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{exp.company}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {exp.startDate} - {exp.isCurrently ? "Present" : exp.endDate || "N/A"}
                        </span>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/experience/${exp.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {exp.description && (
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {exp.description}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
