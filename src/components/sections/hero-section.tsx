import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProfile } from "@/lib/actions/profile";
import { getTechStacks } from "@/lib/actions/tech-stack";

export async function HeroSection() {
  const profile = await getProfile();
  const techStacks = await getTechStacks();
  const topTechStacks = techStacks.slice(0, 5); // Show top 5 tech stacks

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            {/* Left Side - Profile Image */}
            <div className="order-2 md:order-1 flex justify-center md:justify-start">
              <div className="relative group">
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                
                {/* Main Photo Container */}
                <div className="relative h-[320px] w-[320px] md:h-[400px] md:w-[400px] overflow-hidden rounded-3xl border-4 border-background shadow-2xl">
                  {profile?.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt={profile.name || "Profile Photo"}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="relative h-full w-full bg-gradient-to-br from-primary/20 via-blue-500/20 to-purple-500/20">
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="text-center">
                          <div className="text-8xl font-bold text-primary mb-4">DS</div>
                          <p className="text-sm text-muted-foreground">Add your photo in</p>
                          <p className="text-sm text-muted-foreground font-mono">Admin → Profile</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Floating Badges */}
                <div className="absolute -bottom-4 -right-4 bg-background border-2 border-primary/20 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium">Available for work</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="order-1 md:order-2 text-center md:text-left">
              {/* Greeting Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Software Engineering Student
              </div>

              {/* Name & Title */}
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {profile?.name || "Daniel Sinambela"}
                </span>
              </h1>

              <p className="mb-6 text-lg text-muted-foreground md:text-xl leading-relaxed">
                {profile?.bio || "Software Engineering Student passionate about building scalable web applications"}
              </p>

              {/* Quick Info */}
              <div className="mb-8 flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span>Institut Teknologi Del</span>
                </div>
                {profile?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>

              {/* Tech Stack Badges */}
              <div className="mb-8 flex flex-wrap gap-2 justify-center md:justify-start">
                {topTechStacks.length > 0 ? (
                  topTechStacks.map((tech) => (
                    <Badge key={tech.id} variant="secondary">{tech.name}</Badge>
                  ))
                ) : (
                  <>
                    <Badge variant="secondary">Laravel</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">Go</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">React</Badge>
                  </>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
                <Button asChild size="lg" className="group">
                  <Link href="/#contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group"
                >
                  <Link href="/cv/download">
                    <Download className="mr-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                    Download CV
                  </Link>
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 justify-center md:justify-start">
                {profile?.githubUrl && (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </Button>
                )}
                {profile?.linkedinUrl && (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </Button>
                )}
                {profile?.email && (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link href={`mailto:${profile.email}`}>
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>
    </section>
  );
}
