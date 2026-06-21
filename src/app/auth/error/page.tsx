import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification token has expired or has already been used.",
    Default: "An error occurred during authentication.",
  };

  const message = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/50 via-background to-muted/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto rounded-full bg-red-100 dark:bg-red-900/20 p-4 w-fit">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-500" />
          </div>
          <div>
            <CardTitle className="text-2xl">Authentication Error</CardTitle>
            <CardDescription className="mt-2">
              {message}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {error === "Configuration" && (
            <div className="bg-muted p-4 rounded-lg text-sm">
              <p className="font-semibold mb-2">Possible causes:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>GitHub OAuth credentials are missing or invalid</li>
                <li>AUTH_SECRET is not configured</li>
                <li>Database connection failed</li>
              </ul>
            </div>
          )}
          
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/admin/signin">
                Try Again
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                Go to Homepage
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
