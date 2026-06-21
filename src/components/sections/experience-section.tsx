import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const experiences = [
  {
    id: 1,
    title: "Head of Multimedia Division",
    company: "Department of Science and Technology (DIPTEK)",
    type: "Organization",
    location: "Toba, North Sumatera",
    startDate: "2026-02",
    endDate: null,
    current: true,
    description:
      "Leading multimedia division in creating digital content for organizational branding and science initiatives.",
  },
  {
    id: 2,
    title: "Gen AI Engineer Bootcamp",
    company: "Dicoding x DBS Foundation",
    type: "Bootcamp",
    location: "Remote",
    startDate: "2026-04",
    endDate: "2026-04",
    current: false,
    description:
      "Intensive training on AI, Generative AI, and ML engineering. Developed Python skills and intelligent system workflows.",
  },
  {
    id: 3,
    title: "International Project Member",
    company: "OSIP | IT Del x Singapore Institute of Technology",
    type: "Project",
    location: "Parapat, North Sumatera",
    startDate: "2025-12",
    endDate: "2025-12",
    current: false,
    description:
      "Cross-cultural collaboration analyzing MSME challenges and designing sustainable digital solutions.",
  },
  {
    id: 4,
    title: "Data Science & AI Trainee",
    company: "Microsoft Elevate Training | Dicoding",
    type: "Bootcamp",
    location: "Remote",
    startDate: "2025-08",
    endDate: "2025-08",
    current: false,
    description:
      "Learned Data Science pipelines and cloud analytics with Microsoft Fabric and Azure.",
  },
  {
    id: 5,
    title: "Humanitarian Volunteer",
    company: "Disaster Relief - Sibolga Landslide",
    type: "Volunteer",
    location: "Sibolga, North Sumatera",
    startDate: "2025-12",
    endDate: "2025-12",
    current: false,
    description:
      "Coordinated logistics and humanitarian aid distribution for landslide victims.",
  },
  {
    id: 6,
    title: "Active Member",
    company: "HIMATERA (Student Association)",
    type: "Organization",
    location: "Toba, North Sumatera",
    startDate: "2023-09",
    endDate: null,
    current: true,
    description:
      "Contributing to student programs, academic development, and community events.",
  },
];

const typeColors: Record<string, string> = {
  Organization: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  Bootcamp: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  Project: "bg-green-500/10 text-green-700 dark:text-green-400",
  Volunteer: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
};

export function ExperienceSection() {
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
            {experiences.map((exp) => (
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
                            {exp.current ? "Present" : formatDate(exp.endDate)}
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
                      <p className="mb-3 text-sm text-muted-foreground">
                        {exp.location}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
