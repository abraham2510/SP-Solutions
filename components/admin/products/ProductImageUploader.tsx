"use client";

import React, { useState } from "react";
import { Upload, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { uploadImageAction } from "@/actions/upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
}

export function ProductImageUploader({ value, onChange }: ProductImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      const errMsg = "Please select a valid image (JPEG, PNG, or WEBP).";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      const errMsg = "Image size must be less than 5MB.";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const res = await uploadImageAction(base64, "products");
        setUploading(false);
        if (res.success && res.url) {
          onChange(res.url);
          toast.success("Image uploaded successfully");
        } else {
          const errStr = res.error || "Failed to upload image.";
          setError(errStr);
          toast.error(errStr);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setUploading(false);
      const errStr = "Failed to process image file.";
      setError(errStr);
      toast.error(errStr);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider">
        Product Image
      </label>

      {value ? (
        <div className="relative group w-full max-w-sm rounded-lg overflow-hidden border border-border bg-muted aspect-video">
          <img src={value} alt="Product preview" className="w-full h-full object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 h-7 w-7 p-0 rounded-full shadow-xs opacity-90 hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove image</span>
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-sm">
          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg bg-muted/30 hover:bg-muted/60 border-muted-foreground/30 transition-all cursor-pointer group">
            {uploading ? (
              <div className="flex flex-col items-center py-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <span className="text-xs font-medium">Uploading image...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border text-muted-foreground mb-2 group-hover:text-primary group-hover:border-primary/30 transition-colors shadow-xs">
                  <Upload className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-foreground">Click to upload image</span>
                <span className="text-[11px] text-muted-foreground mt-0.5">JPEG, PNG, WEBP up to 5MB</span>
              </div>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Manual URL fallback input */}
      <div className="max-w-sm">
        <div className="text-[11px] font-medium text-muted-foreground mb-1">Or enter image URL:</div>
        <div className="relative">
          <ImageIcon className="h-3.5 w-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            type="url"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className="pl-8 text-xs h-8"
          />
        </div>
      </div>

      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
}
