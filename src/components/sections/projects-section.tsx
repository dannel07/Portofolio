import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjects } from "@/lib/actions/projects";

export async function ProjectsSection() {
  const allProjects = await getProjects();
  const projects = allProjects.filter(p => p.featured).slice(0, 4);

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Featured Projects
            </h2>
            <p className="text-muted-foreground">
              Some of my recent work and contributions
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Card
                  key={project.id}
                  className="flex flex-col hover:shadow-lg transition-all"
                >
                  {project.thumbnail && (
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="mb-2">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      {project.featured && (
                        <Badge variant="default">Featured</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    {project.longDescription && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.longDescription}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="gap-2">
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Link>
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </Link>
                      </Button>
                    )}
                    {project.startDate && (
                      <span className="ml-auto text-sm text-muted-foreground">
                        {new Date(project.startDate).getFullYear()}
                      </span>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="md:col-span-2 text-center py-12 text-muted-foreground">
                <p>No projects to display yet. Add projects from the admin dashboard!</p>
              </div>
            )}
          </div>

          {/* View All Projects */}
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="https://github.com/dannel07" target="_blank">
                View All Projects on GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
