import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SignInButton } from "@/components/admin/signin-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/50 via-background to-muted/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto rounded-full bg-primary/10 p-4 w-fit">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription className="mt-2">
              Sign in with your GitHub account to access the admin dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignInButton />
          <div className="text-center text-sm text-muted-foreground">
            <p>Only authorized users can access the admin panel</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
