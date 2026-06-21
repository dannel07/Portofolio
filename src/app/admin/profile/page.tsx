import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProfile } from "@/lib/actions/profile";
import { ProfileForm } from "@/components/admin/profile-form";

export default async function ProfileAdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/signin");
  }

  const profile = await getProfile();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Update your personal information and contact details
        </p>
      </div>

      <ProfileForm profile={profile} />
    </div>
  );
}
