"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createService, updateService } from "@/actions/services";
import { uploadImageAction } from "@/actions/upload";
import { MultiImageUploader } from "../ui/MultiImageUploader";
import {
  ArrowLeft,
  Save,
  Loader2,
  Wrench,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  AlertCircle,
  Star,
  Info,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ServiceFormProps {
  mode: "create" | "edit";
  initialData?: {
    id?: string;
    name: string;
    slug: string;
    shortDescription?: string | null;
    description?: string | null;
    imageUrl?: string | null;
    images?: string[];
    featured?: boolean;
    sortOrder?: number;
    status: "ACTIVE" | "INACTIVE";
  };
}

export function ServiceForm({ mode, initialData }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [shortDescription, setShortDescription] = useState(
    initialData?.shortDescription || ""
  );
  const [description, setDescription] = useState(initialData?.description || "");
  const [images, setImages] = useState<string[]>(
    initialData?.images && initialData.images.length > 0
      ? initialData.images
      : initialData?.imageUrl
      ? [initialData.imageUrl]
      : []
  );
  const [sortOrder, setSortOrder] = useState<number>(
    initialData?.sortOrder ?? 0
  );
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">(
    initialData?.status || "ACTIVE"
  );

  const handleNameChange = (val: string) => {
    setName(val);
    if (mode === "create" || !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Service name is required.");
      return;
    }
    if (!slug.trim()) {
      toast.error("URL Slug is required.");
      return;
    }

    setLoading(true);
    setUploadMessage(null);

    let finalImages = [...images];

    // Upload any pending base64 data URLs to Cloudinary individually
    for (let i = 0; i < finalImages.length; i++) {
      const img = finalImages[i];
      if (img.startsWith("data:image/")) {
        setUploadMessage(`Uploading image ${i + 1} of ${finalImages.length}...`);
        const uploadRes = await uploadImageAction(img, "services");
        if (!uploadRes.success || !uploadRes.url) {
          toast.error(uploadRes.error || "Failed to upload image to Cloudinary.");
          setLoading(false);
          setUploadMessage(null);
          return;
        }
        finalImages[i] = uploadRes.url;
      }
    }

    setUploadMessage("Saving service to database...");

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      imageUrl: finalImages[0] || "",
      images: finalImages,
      featured: false,
      sortOrder: Number(sortOrder) || 0,
      status,
    };

    let res;
    if (mode === "create") {
      res = await createService(payload);
    } else if (initialData?.id) {
      res = await updateService(initialData.id, payload);
    } else {
      toast.error("Missing service ID");
      setLoading(false);
      setUploadMessage(null);
      return;
    }

    setLoading(false);
    setUploadMessage(null);

    if (res.success) {
      toast.success(
        mode === "create"
          ? "Service created successfully"
          : "Service updated successfully"
      );
      router.push("/admin/services");
      router.refresh();
    } else {
      toast.error(res.error || "Failed to save service");
    }
  };

  const primaryCoverImage = images[0] || null;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 pb-24">
      {/* Top Header Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-4 z-30 backdrop-blur-md bg-white/95">
        <div className="flex items-center gap-3.5">
          <Link
            href="/admin/services"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to services</span>
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {mode === "create" ? "Add New Service" : "Edit Service"}
              </h1>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                  status === "ACTIVE"
                    ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                    : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                {status === "ACTIVE" ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3 text-slate-500" /> Draft
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {mode === "create"
                ? "Create a new technical service or maintenance offering."
                : `Updating ${initialData?.name || "service"} configuration.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/services")}
            disabled={loading}
            className="px-4 text-xs font-semibold rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={loading}
            className="gap-2 px-6 bg-[#00266A] text-white hover:bg-[#001D52] font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {loading
              ? uploadMessage || "Saving..."
              : mode === "create"
              ? "Create Service"
              : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* 2-Column Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Main Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Basic Service Information */}
          <Card className="border-slate-200 bg-white shadow-2xs rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 border-b border-slate-100 p-5 bg-slate-50/50">
              <div className="p-2.5 rounded-xl bg-[#00266A]/10 text-[#00266A]">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Basic Service Information
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Service title, unique URL identifier, and display sequence
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-semibold text-slate-700">
                    Service Name <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Shrink Tunnel Repair & Maintenance"
                    className="text-xs text-slate-900 h-10 rounded-xl border-slate-200 focus:border-[#00266A]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>URL Slug <span className="text-rose-500">*</span></span>
                    <span className="text-[10px] text-slate-400 font-normal">Auto-generated</span>
                  </Label>
                  <Input
                    id="slug"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="shrink-tunnel-repair-maintenance"
                    className="text-xs text-slate-900 font-mono h-10 rounded-xl border-slate-200 focus:border-[#00266A]"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="sortOrder" className="text-xs font-semibold text-slate-700">
                    Sort Order (Display Priority)
                  </Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    min={0}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
                    placeholder="0"
                    className="text-xs text-slate-900 font-mono h-10 rounded-xl border-slate-200 focus:border-[#00266A]"
                  />
                  <p className="text-[11px] text-slate-400">
                    Lower numbers appear first in the service catalog (0 is top priority).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Service Images & Media Gallery */}
          <Card className="border-slate-200 bg-white shadow-2xs rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 p-5 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-700">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    Service Photos & Banner Gallery
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Upload service photos, crop (16:9, 4:3), set cover photo, and preview
                  </CardDescription>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/10 text-sky-700 border border-sky-500/20">
                {images.length}/10 Images
              </span>
            </CardHeader>
            <CardContent className="p-6">
              <MultiImageUploader
                label="Service Photos & Gallery"
                folder="services"
                values={images}
                onChange={setImages}
                maxImages={10}
              />
            </CardContent>
          </Card>

          {/* Card 3: Descriptions */}
          <Card className="border-slate-200 bg-white shadow-2xs rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 border-b border-slate-100 p-5 bg-slate-50/50">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-700">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Service Descriptions
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Short summary for service cards and detailed scope of work for the service page
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="shortDescription" className="text-xs font-semibold text-slate-700">
                  Short Description (Catalog Summary)
                </Label>
                <Textarea
                  id="shortDescription"
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief summary displayed on service cards and overview listings..."
                  className="text-xs text-slate-900 rounded-xl border-slate-200 focus:border-[#00266A]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-semibold text-slate-700">
                  Full Scope of Work & Details
                </Label>
                <Textarea
                  id="description"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive description of service scope, on-site diagnostics, OEM spare parts replacement, response SLA, and AMC maintenance contracts..."
                  className="text-xs text-slate-900 rounded-xl border-slate-200 focus:border-[#00266A]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar Column (1/3 width, sticky) */}
        <div className="space-y-6 lg:sticky lg:top-24">
          {/* Card 1: Publishing & Status */}
          <Card className="border-slate-200 bg-white shadow-2xs rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 border-b border-slate-100 p-5 bg-slate-50/50">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Publishing & Visibility
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Service visibility and status
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-xs font-semibold text-slate-700">
                  Publication Status
                </Label>
                <Select
                  value={status}
                  onValueChange={(val) => val && setStatus(val as "ACTIVE" | "INACTIVE")}
                >
                  <SelectTrigger id="status" className="w-full text-xs text-slate-900 h-10 rounded-xl border-slate-200">
                    <SelectValue placeholder="Select Status">
                      {(val) =>
                        val === "ACTIVE"
                          ? "ACTIVE (Public Website)"
                          : val === "INACTIVE"
                          ? "INACTIVE (Hidden Draft)"
                          : val || "Select Status"
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="ACTIVE" className="text-xs">
                      ACTIVE (Public Website)
                    </SelectItem>
                    <SelectItem value="INACTIVE" className="text-xs">
                      INACTIVE (Hidden Draft)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Cover Photo Preview Badge */}
          <Card className="border-slate-200 bg-white shadow-2xs rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 border-b border-slate-100 p-5 bg-slate-50/50">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Primary Cover Photo
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Thumbnail displayed on service cards
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-5 flex flex-col items-center justify-center">
              {primaryCoverImage ? (
                <div className="relative w-full aspect-video rounded-xl border border-amber-500/40 shadow-2xs group bg-slate-900 overflow-hidden">
                  <img
                    src={primaryCoverImage}
                    alt="Primary Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-white" /> Primary Cover
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
                  <ImageIcon className="w-6 h-6 text-slate-300 mb-1" />
                  <span className="text-xs font-semibold text-slate-500">No Cover Selected</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Upload photos in media gallery</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Card 3: Action Footer Buttons */}
          <Card className="border-slate-200 bg-white shadow-2xs rounded-2xl overflow-hidden">
            <CardContent className="p-5 space-y-3">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 gap-2 bg-[#00266A] text-white hover:bg-[#001D52] font-semibold rounded-xl shadow-xs transition-all cursor-pointer text-xs"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {loading
                  ? uploadMessage || "Saving..."
                  : mode === "create"
                  ? "Create Service"
                  : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/services")}
                disabled={loading}
                className="w-full h-9 text-xs font-semibold rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
