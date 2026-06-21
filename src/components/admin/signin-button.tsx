"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <Button
      onClick={() => signIn("github", { callbackUrl: "/admin" })}
      size="lg"
      className="w-full gap-2"
    >
      <Github className="h-5 w-5" />
      Sign in with GitHub
    </Button>
  );
}
