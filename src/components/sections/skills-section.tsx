import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skillsData = {
  Frontend: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "HTML/CSS",
    "Tailwind CSS",
  ],
  Backend: [
    "Laravel",
    "Go",
    "PHP",
    "Node.js",
    "REST API",
    "MVC Architecture",
  ],
  Database: [
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "SQL Server",
    "Firebase",
  ],
  "Tools & Platforms": [
    "Git",
    "GitHub",
    "Postman",
    "Docker",
    "Figma",
    "Railway",
  ],
  "Data Analytics": [
    "Python",
    "Tableau",
    "Microsoft Excel",
    "Apache Spark",
    "EDA",
  ],
  "Methodologies": [
    "Agile/Scrum",
    "Waterfall",
    "SDLC",
    "Clean Architecture",
    "TDD",
  ],
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Skills & Technologies
            </h2>
            <p className="text-muted-foreground">
              Technologies and tools I work with
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skillsData).map(([category, skills]) => (
              <Card key={category} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Soft Skills */}
          <div className="mt-12 text-center">
            <h3 className="mb-6 text-2xl font-semibold">Soft Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Analytical Thinking",
                "Problem Solving",
                "Communication",
                "Team Collaboration",
                "Leadership",
                "Adaptability",
                "Time Management",
              ].map((skill) => (
                <Badge key={skill} className="px-4 py-2 text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
