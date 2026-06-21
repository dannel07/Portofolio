import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { getExperiences } from "@/lib/actions/experience";

const typeColors: Record<string, string> = {
  internship: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  organization: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  freelance: "bg-green-500/10 text-green-700 dark:text-green-400",
  volunteer: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  bootcamp: "bg-pink-500/10 text-pink-700 dark:text-pink-400",
};

export async function ExperienceSection() {
  const experiences = await getExperiences();

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Experience</h2>
            <p className="text-muted-foreground">
              My professional journey and contributions
            </p>
          </div>

          {/* Timeline */}
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent md:before:ml-[8.75rem]">
            {experiences.length > 0 ? (
              experiences.map((exp) => (
                <Card
                  key={exp.id}
                  className="relative hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="md:grid md:grid-cols-5 md:gap-8">
                      {/* Date */}
                      <div className="mb-4 flex items-center md:col-span-2 md:mb-0 md:justify-end md:text-right">
                        <div className="flex items-center gap-4">
                          <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-primary md:left-[7.5rem]">
                            <div className="h-3 w-3 rounded-full bg-background" />
                          </div>
                          <div className="ml-16 md:ml-0">
                            <Badge
                              className={typeColors[exp.type] || ""}
                              variant="outline"
                            >
                              {exp.type}
                            </Badge>
                            <p className="mt-1 text-sm font-medium">
                              {formatDate(exp.startDate)} -{" "}
                              {exp.isCurrently ? "Present" : exp.endDate ? formatDate(exp.endDate) : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:col-span-3">
                        <h3 className="mb-1 text-xl font-semibold">
                          {exp.title}
                        </h3>
                        <p className="mb-1 font-medium text-primary">
                          {exp.company}
                        </p>
                        {exp.location && (
                          <p className="mb-3 text-sm text-muted-foreground">
                            {exp.location}
                          </p>
                        )}
                        {exp.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No experience added yet. Add your experience from the admin dashboard!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
