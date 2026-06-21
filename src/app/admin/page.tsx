import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  FileText, 
  Briefcase, 
  Code, 
  FolderGit2,
  Eye,
  Download,
  MousePointerClick
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/admin/signin");
  }

  // Check if user is admin
  const adminUsername = process.env.ADMIN_GITHUB_USERNAME;
  const isAdmin = session.user?.email === adminUsername || 
                  session.user?.name === adminUsername ||
                  (session.user as any)?.githubUsername === adminUsername;

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access the admin dashboard.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const stats = [
    {
      title: "Profile Views",
      value: "2,543",
      icon: Eye,
      description: "+12.5% from last month",
      color: "text-blue-600",
    },
    {
      title: "CV Downloads",
      value: "143",
      icon: Download,
      description: "+8.2% from last month",
      color: "text-green-600",
    },
    {
      title: "Project Clicks",
      value: "892",
      icon: MousePointerClick,
      description: "+23.1% from last month",
      color: "text-purple-600",
    },
    {
      title: "Total Projects",
      value: "12",
      icon: FolderGit2,
      description: "4 featured projects",
      color: "text-orange-600",
    },
  ];

  const quickLinks = [
    {
      title: "Profile",
      description: "Update your personal information",
      icon: Users,
      href: "/admin/profile",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Projects",
      description: "Manage your project portfolio",
      icon: FolderGit2,
      href: "/admin/projects",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: "Experience",
      description: "Add or edit work experience",
      icon: Briefcase,
      href: "/admin/experience",
      color: "bg-green-500/10 text-green-600",
    },
    {
      title: "Tech Stack",
      description: "Update your skills and technologies",
      icon: Code,
      href: "/admin/tech-stack",
      color: "bg-orange-500/10 text-orange-600",
    },
    {
      title: "CV Files",
      description: "Manage your resume files",
      icon: FileText,
      href: "/admin/cv",
      color: "bg-red-500/10 text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user?.name || session.user?.email}
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="group"
              >
                <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${link.color}`}>
                        <link.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{link.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {link.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest portfolio updates and interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Profile updated</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New project added</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">CV downloaded 5 times</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
