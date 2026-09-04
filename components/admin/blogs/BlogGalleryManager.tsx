"use client";

import React, { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  X,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Plus,
  Eye,
  MessageSquare,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { BlogGalleryItem } from "@/lib/types/blog";

interface BlogGalleryManagerProps {
  items: BlogGalleryItem[];
  onChange: (items: BlogGalleryItem[]) => void;
  maxImages?: number;
}

export function BlogGalleryManager({
  items = [],
  onChange,
  maxImages = 15,
}: BlogGalleryManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState("");
  const [customCaption, setCustomCaption] = useState("");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (items.length + files.length > maxImages) {
      toast.error(`Maximum limit is ${maxImages} images.`);
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    for (const file of files) {
      if (!validTypes.includes(file.type)) {
        toast.error(`Invalid file type (${file.name}). Select JPEG, PNG, or WEBP.`);
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        toast.error(`File ${file.name} exceeds 15MB limit.`);
        return;
      }
    }

    setUploading(true);

    try {
      const newItems: BlogGalleryItem[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(`Loading image ${i + 1} of ${files.length}...`);

        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        newItems.push({
          url: base64,
          caption: "",
          sortOrder: items.length + i,
        });
      }

      if (newItems.length > 0) {
        onChange([...items, ...newItems]);
        toast.success(`Added ${newItems.length} gallery image(s).`);
      }
    } catch {
      toast.error("Failed to process image files.");
    } finally {
      setUploading(false);
      setUploadProgress(null);
      e.target.value = "";
    }
  };

  const handleAddCustomUrl = () => {
    if (!customUrl.trim()) return;
    try {
      new URL(customUrl);
      if (items.length >= maxImages) {
        toast.error(`Maximum limit is ${maxImages} images.`);
        return;
      }
      onChange([
        ...items,
        {
          url: customUrl.trim(),
          caption: customCaption.trim(),
          sortOrder: items.length,
        },
      ]);
      setCustomUrl("");
      setCustomCaption("");
      toast.success("Image added to gallery.");
    } catch {
      toast.error("Please enter a valid image URL (e.g. https://...)");
    }
  };

  const handleRemove = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    onChange(next);
  };

  const handleMove = (index: number, direction: "left" | "right") => {
    const newIdx = direction === "left" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= items.length) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    onChange(updated);
  };

  const handleCaptionChange = (index: number, caption: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], caption };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          Article Photo Gallery ({items.length}/{maxImages})
        </label>
        <span className="text-[11px] text-slate-500 font-medium">
          Add captions and reorder event / product photos
        </span>
      </div>

      {/* Gallery Cards Grid */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <div
              key={`${item.url.slice(0, 30)}-${idx}`}
              className="relative group rounded-xl overflow-hidden border border-slate-200 bg-white shadow-2xs hover:border-[#00266A]/40 transition-all flex flex-col"
            >
              {/* Image Preview Thumbnail */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.caption || `Gallery Image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Index badge */}
                <div className="absolute top-2 left-2 bg-[#00143B]/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                  #{idx + 1}
                </div>

                {/* Overlay Action Buttons */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 z-20">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setPreviewSrc(item.url)}
                    className="h-7 w-7 p-0 rounded-full bg-white text-slate-900 hover:bg-white/90 cursor-pointer"
                    title="Preview Full Image"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Button>

                  {idx > 0 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => handleMove(idx, "left")}
                      className="h-7 w-7 p-0 rounded-full bg-white text-slate-900 hover:bg-white/90 cursor-pointer"
                      title="Move Left"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </Button>
                  )}

                  {idx < items.length - 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => handleMove(idx, "right")}
                      className="h-7 w-7 p-0 rounded-full bg-white text-slate-900 hover:bg-white/90 cursor-pointer"
                      title="Move Right"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(idx)}
                    className="h-7 w-7 p-0 rounded-full shadow-xs cursor-pointer"
                    title="Remove Photo"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Caption Input */}
              <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={item.caption || ""}
                  onChange={(e) => handleCaptionChange(idx, e.target.value)}
                  placeholder="Add image caption..."
                  className="w-full text-xs bg-transparent border-0 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Box */}
      {items.length < maxImages && (
        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50 hover:bg-slate-100/70 transition-all cursor-pointer group">
          {uploading ? (
            <div className="flex flex-col items-center py-2 text-slate-500">
              <Loader2 className="h-8 w-8 animate-spin text-[#00266A] mb-2" />
              <span className="text-xs font-semibold text-slate-800">
                {uploadProgress || "Uploading..."}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 mb-2 group-hover:text-[#00266A] group-hover:border-[#00266A]/30 transition-colors shadow-xs">
                <Upload className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-slate-900">
                Click to add event / product gallery photos
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5">
                Upload up to {maxImages} images • JPEG, PNG, WEBP
              </span>
            </div>
          )}
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFilesChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}

      {/* Manual URL Input */}
      <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        <div className="relative flex-1">
          <ImageIcon className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="Or enter image URL (https://...)"
            className="pl-8 text-xs h-8 bg-white border-slate-200 text-slate-900"
          />
        </div>
        <Input
          type="text"
          value={customCaption}
          onChange={(e) => setCustomCaption(e.target.value)}
          placeholder="Caption (optional)"
          className="text-xs h-8 bg-white border-slate-200 text-slate-900 sm:w-48"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddCustomUrl}
          disabled={!customUrl.trim() || items.length >= maxImages}
          className="h-8 text-xs gap-1 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add</span>
        </Button>
      </div>

      {/* Lightbox Preview Modal */}
      {previewSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreviewSrc(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-xl bg-slate-900 border border-white/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewSrc} alt="Preview" className="max-w-full max-h-[85vh] object-contain" />
            <button
              onClick={() => setPreviewSrc(null)}
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
