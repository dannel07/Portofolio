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

const projects = [
  {
    id: 1,
    title: "GJM & GKM Administrative Automation",
    description:
      "Web-based administrative automation system for academic quality assurance processes at Institut Teknologi Del.",
    longDescription:
      "Developed secure backend services with Laravel and MongoDB. Built high-throughput data processing modules and integrated Apache Spark for reporting.",
    techStack: ["Laravel", "MongoDB", "REST API", "Apache Spark"],
    featured: true,
    year: "2026",
  },
  {
    id: 2,
    title: "Hommie - Boarding House Booking",
    description:
      "Mobile-friendly accommodation booking platform for homestays in Lake Toba area.",
    longDescription:
      "Built with Laravel and PHP featuring JWT authentication, booking management, and optimized MySQL database.",
    techStack: ["Laravel", "PHP", "MySQL", "JWT", "Railway"],
    githubUrl: "",
    featured: true,
    year: "2025",
  },
  {
    id: 3,
    title: "Mutiara Kindergarten System",
    description:
      "Web-based information system for kindergarten management and operations.",
    longDescription:
      "Led project planning and requirements analysis. Coordinated development team through SDLC phases.",
    techStack: ["Project Management", "SDLC", "Requirements Analysis"],
    featured: false,
    year: "2024",
  },
  {
    id: 4,
    title: "E-Wallet Analysis Dashboard",
    description:
      "Interactive Tableau dashboard analyzing e-wallet adoption factors in Toba Regency.",
    longDescription:
      "Performed EDA on survey data and created visualizations to communicate consumer behavior insights.",
    techStack: ["Tableau", "Microsoft Excel", "EDA", "Data Analysis"],
    featured: false,
    year: "2025",
  },
];

export function ProjectsSection() {
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
            {projects.map((project) => (
              <Card
                key={project.id}
                className={`flex flex-col hover:shadow-lg transition-all ${
                  project.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
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
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
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
                  <span className="ml-auto text-sm text-muted-foreground">
                    {project.year}
                  </span>
                </CardFooter>
              </Card>
            ))}
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
