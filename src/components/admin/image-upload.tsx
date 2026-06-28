"use client";

import { useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

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
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);

  // Update preview when value changes
  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const handleRemove = () => {
    setPreview(null);
    onChange("");
  };

  const handleUrlChange = (url: string) => {
    onChange(url);
    setPreview(url);
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      {/* Preview Image */}
      {preview && type !== "cv" && (
        <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border-2 border-border">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized={preview.startsWith("http") || preview.startsWith("data:")}
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

      {/* CV Preview */}
      {preview && type === "cv" && (
        <div className="flex items-center gap-2 p-4 bg-muted rounded-lg border-2 border-border">
          <div className="flex-1">
            <p className="text-sm font-medium">CV File</p>
            <p className="text-xs text-muted-foreground">{preview}</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* URL Input */}
      <div className="space-y-2">
        <Label htmlFor={`url-${type}`}>
          {type === "cv" ? "CV/Resume URL" : "Image URL"}
        </Label>
        <Input
          id={`url-${type}`}
          type="text"
          placeholder={
            type === "cv"
              ? "/cv/CV_YourName.pdf"
              : "/images/photo.jpg"
          }
          value={value || ""}
          onChange={(e) => handleUrlChange(e.target.value)}
        />
      </div>

      {/* Helper Text & Instructions */}
      <div className="space-y-2 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs font-medium text-blue-900 dark:text-blue-100">
          📁 Cara Upload File:
        </p>
        <ol className="text-xs text-blue-800 dark:text-blue-200 space-y-1 ml-4 list-decimal">
          <li>
            Copy file {type === "cv" ? "PDF" : "gambar"} ke folder{" "}
            <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">
              public/{type === "cv" ? "cv" : "images"}/
            </code>
          </li>
          <li>
            Commit & push ke GitHub:{" "}
            <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded text-[10px]">
              git add . && git commit -m "Add files" && git push
            </code>
          </li>
          <li>
            Tunggu Vercel deploy (~2 menit)
          </li>
          <li>
            Masukkan path di form ini: <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">
              /{type === "cv" ? "cv" : "images"}/filename
            </code>
          </li>
        </ol>
        <a
          href="https://github.com/dannel07/Portofolio/tree/main/public"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2"
        >
          <ExternalLink className="h-3 w-3" />
          Buka folder public di GitHub
        </a>
      </div>

      {/* Examples */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">
          Contoh path yang benar:
        </p>
        <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
          {type === "cv" ? (
            <>
              <li><code>/cv/CV_Daniel_Sinambela.pdf</code></li>
              <li><code>/cv/resume.pdf</code></li>
            </>
          ) : (
            <>
              <li><code>/images/profile.jpg</code></li>
              <li><code>/images/project-ecommerce.png</code></li>
              <li><code>https://cdn.example.com/image.jpg</code> (URL eksternal)</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
