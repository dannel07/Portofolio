import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getCVFiles } from "@/lib/actions/cv";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Download, Trash2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function CVAdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/signin");
  }

  const cvFiles = await getCVFiles();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CV Files</h1>
        <p className="text-muted-foreground">
          Upload and manage your resume files
        </p>
      </div>

      {/* Upload Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload New CV</CardTitle>
          <CardDescription>
            Upload your latest resume (PDF format recommended, max 5MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Upload your CV</h3>
            <p className="text-sm text-muted-foreground mb-4">
              For now, please add your CV file to <code className="bg-muted px-2 py-1 rounded">/public/cv/resume.pdf</code>
            </p>
            <p className="text-xs text-muted-foreground">
              File upload via UI will be implemented in the next version
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
          <CardDescription>
            Your previously uploaded CV files
          </CardDescription>
        </CardHeader>
        <CardContent>
          {cvFiles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No CV files uploaded yet</p>
              <p className="text-sm mt-2">Add your CV to /public/cv/resume.pdf to make it available for download</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cvFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{file.originalFilename}</p>
                        {file.isActive && (
                          <Badge className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {(file.fileSize / 1024).toFixed(2)} KB • Uploaded{" "}
                        {new Date(file.uploadedAt || 0).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={file.fileUrl} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                    {!file.isActive && (
                      <Button size="sm" variant="outline">
                        Set Active
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Add Your CV</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              1
            </div>
            <div>
              <p className="font-medium">Prepare your CV file</p>
              <p className="text-muted-foreground">
                Export your resume as PDF (recommended) or use DOCX format
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              2
            </div>
            <div>
              <p className="font-medium">Add file to project</p>
              <p className="text-muted-foreground">
                Create folder <code className="bg-muted px-2 py-1 rounded">/public/cv/</code> and add your file as <code className="bg-muted px-2 py-1 rounded">resume.pdf</code>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              3
            </div>
            <div>
              <p className="font-medium">Update download link</p>
              <p className="text-muted-foreground">
                The "Download CV" button will automatically link to <code className="bg-muted px-2 py-1 rounded">/cv/resume.pdf</code>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
