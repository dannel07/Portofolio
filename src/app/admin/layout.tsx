import { auth } from "@/lib/auth";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Only add nav if logged in, otherwise let individual pages handle redirect
  if (session) {
    return (
      <div className="min-h-screen">
        <AdminNav session={session} />
        <main>{children}</main>
      </div>
    );
  }

  // No session, render without nav (signin page will show)
  return <>{children}</>;
}
