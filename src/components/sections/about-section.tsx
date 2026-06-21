import { GraduationCap, MapPin, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getProfile } from "@/lib/actions/profile";

export async function AboutSection() {
  const profile = await getProfile();

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">About Me</h2>
            <p className="text-muted-foreground">
              Get to know more about my background and journey
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Bio */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-4 text-xl font-semibold">Biography</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {profile?.description || "I'm an Applied Software Engineering Technology student at Institut Teknologi Del with hands-on experience in fullstack web development, modern database management, and system analysis."}
                </p>
              </CardContent>
            </Card>

            {/* Details */}
            <div className="space-y-6">
              {/* Education */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-semibold">Education</h3>
                      <p className="text-sm text-muted-foreground">
                        Institut Teknologi Del
                      </p>
                      <p className="text-sm text-muted-foreground">
                        D4 Applied Software Engineering
                      </p>
                      <p className="text-sm text-muted-foreground">
                        GPA: 3.47/4.00 | 2023 - Present
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  {profile?.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">{profile.location}</span>
                    </div>
                  )}
                  {profile?.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-sm hover:text-primary transition-colors"
                      >
                        {profile.email}
                      </a>
                    </div>
                  )}
                  {profile?.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">{profile.phone}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
