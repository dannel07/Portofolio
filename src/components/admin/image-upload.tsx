"use client";

import { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "sonner";

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  type?: "profile" | "project" | "cv";
  accept?: string;
}

export function ImageUpload({
  label,
  value,
  onChange,
  type = "project",
  accept = "image/*",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 10MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();
      onChange(data.url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upload image"
      );
      setPreview(value || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    toast.success("Image removed");
  };

  const handleUrlChange = (url: string) => {
    onChange(url);
    setPreview(url);
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      {/* Preview */}
      {preview && type !== "cv" && (
        <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border-2 border-border">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized={preview.startsWith("data:")}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id={`file-upload-${type}`}
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() =>
              document.getElementById(`file-upload-${type}`)?.click()
            }
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload {type === "cv" ? "PDF" : "Image"}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Or use URL */}
      <div className="space-y-2">
        <Label htmlFor={`url-${type}`} className="text-sm text-muted-foreground">
          Or enter URL directly:
        </Label>
        <Input
          id={`url-${type}`}
          type="text"
          placeholder={
            type === "cv"
              ? "/cv/filename.pdf"
              : "/images/image.jpg or https://..."
          }
          value={value || ""}
          onChange={(e) => handleUrlChange(e.target.value)}
        />
      </div>

      {/* Helper Text */}
      <p className="text-xs text-muted-foreground">
        {type === "cv"
          ? "Upload PDF file (max 10MB) or enter URL like /cv/filename.pdf"
          : "Upload image (max 10MB) or enter URL like /images/image.jpg"}
      </p>
    </div>
  );
}
