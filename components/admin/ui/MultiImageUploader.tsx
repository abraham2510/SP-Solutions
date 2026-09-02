"use client";

import React, { useState } from "react";
import { Upload, Image as ImageIcon, X, Loader2, Star, ArrowLeft, ArrowRight, Plus, Eye, Crop } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ImageCropModal } from "@/components/ImageCropModal";
import { ImagePreviewModal } from "./ImagePreviewModal";

interface MultiImageUploaderProps {
  label?: string;
  folder?: string;
  values?: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

async function processImageTo800x600(file: File, quality = 0.9): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const targetWidth = 800;
        const targetHeight = 600;
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        // Fill background with clean white (ideal for machine transparent cutouts)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // Calculate aspect cover ratio to fit perfectly into 800x600 without distortion
        const hRatio = targetWidth / img.width;
        const vRatio = targetHeight / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShiftX = (targetWidth - img.width * ratio) / 2;
        const centerShiftY = (targetHeight - img.height * ratio) / 2;

        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShiftX,
          centerShiftY,
          img.width * ratio,
          img.height * ratio,
        );

        const webpData = canvas.toDataURL("image/webp", quality);
        resolve(webpData);
      };
      img.onerror = reject;
      img.src = event.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function MultiImageUploader({
  label = "Images Gallery",
  values = [],
  onChange,
  maxImages = 10,
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState("");

  // Modal States
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const [cropIdx, setCropIdx] = useState<number | null>(null);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (values.length + files.length > maxImages) {
      const msg = `Maximum limit is ${maxImages} images.`;
      setError(msg);
      toast.error(msg);
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    for (const file of files) {
      if (!validTypes.includes(file.type)) {
        const msg = `Invalid file type (${file.name}). Select JPEG, PNG, or WEBP.`;
        setError(msg);
        toast.error(msg);
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        const msg = `File ${file.name} exceeds 15MB size limit.`;
        setError(msg);
        toast.error(msg);
        return;
      }
    }

    setError(null);
    setUploading(true);

    try {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(`Formatting image ${i + 1} of ${files.length} to 800x600...`);

        const formattedBase64 = await processImageTo800x600(file);
        newUrls.push(formattedBase64);
      }

      if (newUrls.length > 0) {
        onChange([...values, ...newUrls]);
        toast.success(`Loaded ${newUrls.length} image(s) formatted to 800x600.`);
      }
    } catch {
      toast.error("An error occurred while formatting image files.");
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
      if (values.length >= maxImages) {
        toast.error(`Maximum limit is ${maxImages} images.`);
        return;
      }
      onChange([...values, customUrl.trim()]);
      setCustomUrl("");
      toast.success("Image URL added");
    } catch {
      toast.error("Please enter a valid image URL (e.g. https://...)");
    }
  };

  const handleRemoveImage = (index: number) => {
    const next = values.filter((_, i) => i !== index);
    onChange(next);
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    const target = values[index];
    const rest = values.filter((_, i) => i !== index);
    onChange([target, ...rest]);
    toast.success("Primary cover image set");
  };

  const handleMove = (index: number, direction: "left" | "right") => {
    const newIdx = direction === "left" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= values.length) return;
    const updated = [...values];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    onChange(updated);
  };

  const handleApplyCroppedImage = (croppedBase64: string) => {
    if (cropIdx === null) return;
    const updated = [...values];
    updated[cropIdx] = croppedBase64;
    onChange(updated);
    toast.success("Cropped image updated");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          {label} ({values.length}/{maxImages})
        </label>
        {values.length > 0 && (
          <span className="text-[11px] text-slate-500 font-medium">
            First image is the primary cover photo
          </span>
        )}
      </div>

      {/* Image Grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {values.map((url, idx) => (
            <div
              key={`${url.slice(0, 30)}-${idx}`}
              className={`relative group rounded-xl overflow-hidden border bg-slate-900 aspect-video transition-all shadow-xs ${
                idx === 0 ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200 hover:border-sky-500"
              }`}
            >
              <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />

              {/* Cover badge */}
              {idx === 0 ? (
                <div className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 z-10">
                  <Star className="h-3 w-3 fill-white" />
                  <span>Cover</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSetPrimary(idx)}
                  className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100 bg-white/90 text-slate-900 hover:bg-amber-500 hover:text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs transition-all z-10 cursor-pointer"
                >
                  Make Cover
                </button>
              )}

              {/* Quick action buttons overlay */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 z-20">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setPreviewIdx(idx)}
                  className="h-7 w-7 p-0 rounded-full bg-white/90 text-slate-900 hover:bg-white cursor-pointer"
                  title="Preview Full Image"
                >
                  <Eye className="h-3.5 w-3.5" />
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setCropIdx(idx)}
                  className="h-7 w-7 p-0 rounded-full bg-sky-500 text-white hover:bg-sky-600 cursor-pointer"
                  title="Crop Image"
                >
                  <Crop className="h-3.5 w-3.5" />
                </Button>

                {idx > 0 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleMove(idx, "left")}
                    className="h-7 w-7 p-0 rounded-full bg-white/90 text-slate-900 hover:bg-white cursor-pointer"
                    title="Move left"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </Button>
                )}

                {idx < values.length - 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleMove(idx, "right")}
                    className="h-7 w-7 p-0 rounded-full bg-white/90 text-slate-900 hover:bg-white cursor-pointer"
                    title="Move right"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                )}

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveImage(idx)}
                  className="h-7 w-7 p-0 rounded-full shadow-xs cursor-pointer"
                  title="Remove image"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File Upload Box */}
      {values.length < maxImages && (
        <div className="w-full">
          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50 hover:bg-slate-100/70 border-slate-300 transition-all cursor-pointer group">
            {uploading ? (
              <div className="flex flex-col items-center py-2 text-slate-500">
                <Loader2 className="h-8 w-8 animate-spin text-[#00266A] mb-2" />
                <span className="text-xs font-semibold text-slate-800">
                  {uploadProgress || "Reading files..."}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 mb-2 group-hover:text-[#00266A] group-hover:border-[#00266A]/30 transition-colors shadow-xs">
                  <Upload className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-slate-900">
                  Click to select machine photos (800 x 600 px)
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  Automatically standardized to 800 x 600 px • JPEG, PNG, WEBP
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
        </div>
      )}

      {/* Manual URL input option */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <ImageIcon className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddCustomUrl();
              }
            }}
            placeholder="Or enter image URL (https://...)"
            className="pl-8 text-xs h-8 bg-white border-slate-200 text-slate-900"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddCustomUrl}
          disabled={!customUrl.trim() || values.length >= maxImages}
          className="h-8 text-xs gap-1 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add</span>
        </Button>
      </div>

      {error && <p className="text-xs text-destructive font-medium">{error}</p>}

      {/* Lightbox Preview Modal */}
      {previewIdx !== null && (
        <ImagePreviewModal
          isOpen={previewIdx !== null}
          imageSrc={values[previewIdx] || null}
          imageIndex={previewIdx}
          totalImages={values.length}
          isCover={previewIdx === 0}
          onClose={() => setPreviewIdx(null)}
          onCropRequest={() => {
            setCropIdx(previewIdx);
            setPreviewIdx(null);
          }}
          onSetCoverRequest={() => handleSetPrimary(previewIdx)}
          onDeleteRequest={() => handleRemoveImage(previewIdx)}
        />
      )}

      {/* Image Cropper Modal */}
      {cropIdx !== null && (
        <ImageCropModal
          open={cropIdx !== null}
          imageSrc={values[cropIdx] || null}
          onClose={() => setCropIdx(null)}
          onCropSave={(_file, croppedDataUrl) => {
            handleApplyCroppedImage(croppedDataUrl);
          }}
          aspectRatio={4 / 3}
          targetWidth={800}
          targetHeight={600}
          title="Crop Machine Image"
        />
      )}
    </div>
  );
}
