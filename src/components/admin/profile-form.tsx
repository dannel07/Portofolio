"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2 } from "lucide-react";
import { updateProfile } from "@/lib/actions/profile";
import { Profile } from "@/db/schema";
import { ImageUpload } from "@/components/admin/image-upload";

interface ProfileFormProps {
  profile: Profile | null;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || "");
  const [resumeUrl, setResumeUrl] = useState(profile?.resumeUrl || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || undefined,
      location: formData.get("location") as string || undefined,
      bio: formData.get("bio") as string || undefined,
      description: formData.get("description") as string || undefined,
      avatar: avatarUrl || undefined,
      resumeUrl: resumeUrl || undefined,
      githubUrl: formData.get("github") as string || undefined,
      linkedinUrl: formData.get("linkedin") as string || undefined,
      twitterUrl: formData.get("twitter") as string || undefined,
      websiteUrl: formData.get("website") as string || undefined,
    };

    const result = await updateProfile(data);
    
    setLoading(false);
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });

    if (result.success) {
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Photo & CV */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Photo & Resume</CardTitle>
          <CardDescription>
            Upload your profile photo and CV/Resume
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUpload
            label="Profile Photo"
            value={avatarUrl}
            onChange={setAvatarUrl}
            type="profile"
            accept="image/*"
          />
          
          <ImageUpload
            label="Resume/CV (PDF)"
            value={resumeUrl}
            onChange={setResumeUrl}
            type="cv"
            accept="application/pdf"
          />
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Your name and professional title
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Daniel Sinambela"
                defaultValue={profile?.name || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                defaultValue={profile?.email || ""}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+62 812 6316 7246"
                defaultValue={profile?.phone || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Toba, North Sumatera"
                defaultValue={profile?.location || ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Short Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Write a short bio about yourself..."
              rows={3}
              defaultValue={profile?.bio || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Write a detailed description about your background, skills, and interests..."
              rows={6}
              defaultValue={profile?.description || ""}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>
            Your social media and professional profiles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              name="github"
              type="url"
              placeholder="https://github.com/yourusername"
              defaultValue={profile?.githubUrl || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              name="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/yourusername"
              defaultValue={profile?.linkedinUrl || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter/X URL (Optional)</Label>
            <Input
              id="twitter"
              name="twitter"
              type="url"
              placeholder="https://twitter.com/yourusername"
              defaultValue={profile?.twitterUrl || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Personal Website (Optional)</Label>
            <Input
              id="website"
              name="website"
              type="url"
              placeholder="https://yourwebsite.com"
              defaultValue={profile?.websiteUrl || ""}
            />
          </div>
        </CardContent>
      </Card>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200" : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200"}`}>
          {message.text}
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
