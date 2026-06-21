import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDb } from "@/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(getDb(process.env.DB as any)),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // Check if user is admin
        const githubUsername = (user as any).githubUsername;
        (session.user as any).isAdmin = 
          githubUsername === process.env.ADMIN_GITHUB_USERNAME;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        // Store GitHub username for admin check
        (profile as any).githubUsername = profile?.login;
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});

export async function isAdmin() {
  const session = await auth();
  return (session?.user as any)?.isAdmin === true;
}
