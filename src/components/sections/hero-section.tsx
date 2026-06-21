import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 md:h-40 md:w-40">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-5xl font-bold text-primary">
                DS
              </div>
            </div>
          </div>

          {/* Name & Title */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Daniel Sinambela
            </span>
          </h1>

          <p className="mb-6 text-xl text-muted-foreground md:text-2xl">
            Software Engineering Student
          </p>

          <p className="mb-10 text-base text-muted-foreground md:text-lg max-w-2xl mx-auto">
            Passionate about building scalable web applications with modern
            technologies. Experienced in fullstack development, backend
            engineering, and system analysis.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/#contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link href="/cv/download">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-10 w-10"
            >
              <Link
                href="https://github.com/dannel07"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-10 w-10"
            >
              <Link
                href="https://linkedin.com/in/daniel-sinambela-aaba18389"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-10 w-10"
            >
              <Link href="mailto:sinambeladaniel07@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl opacity-30">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary to-blue-600" />
        </div>
      </div>
    </section>
  );
}
