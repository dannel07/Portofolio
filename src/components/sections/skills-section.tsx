import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTechStacks } from "@/lib/actions/tech-stack";

export async function SkillsSection() {
  const techStacks = await getTechStacks();
  
  // Group tech stacks by category
  const categories = ["Frontend", "Backend", "Database", "Mobile", "Data Analytics", "Tools"];
  const skillsData: Record<string, typeof techStacks> = {};
  
  categories.forEach(category => {
    skillsData[category] = techStacks.filter(t => t.category === category);
  });

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
              skills.length > 0 && (
                <Card key={category} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill) => (
                        <div key={skill.id} className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors">
                          {skill.icon && (
                            <div className="relative h-5 w-5 flex-shrink-0">
                              <Image 
                                src={skill.icon} 
                                alt={skill.name}
                                width={20}
                                height={20}
                                className="object-contain"
                              />
                            </div>
                          )}
                          <span className="text-sm font-medium">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
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
