import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        // Use token for session data
        if (token) {
          session.user.id = token.sub || "";
          (session.user as any).githubUsername = token.githubUsername;
        } else if (user) {
          session.user.id = user.id;
          (session.user as any).githubUsername = (user as any).githubUsername;
        }
        
        // Check if user is admin
        const githubUsername = (session.user as any).githubUsername;
        (session.user as any).isAdmin = 
          githubUsername === process.env.ADMIN_GITHUB_USERNAME;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Store GitHub username in token
        token.githubUsername = (profile as any).login;
      }
      return token;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        // Store GitHub username for admin check
        (profile as any).githubUsername = (profile as any).login;
      }
      return true;
    },
  },
  // Use JWT strategy
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/signin",
    error: "/auth/error",
  },
});

export async function isAdmin() {
  const session = await auth();
  return (session?.user as any)?.isAdmin === true;
}
