"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory, updateCategory } from "@/actions/categories";
import { uploadImageAction } from "@/actions/upload";
import { MultiImageUploader } from "../ui/MultiImageUploader";
import {
  ArrowLeft,
  Save,
  Loader2,
  FolderKanban,
  Image as ImageIcon,
  CheckCircle2,
  Star,
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

interface CategoryFormProps {
  mode: "create" | "edit";
  initialData?: {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    imageUrl?: string | null;
    images?: string[];
    sortOrder: number;
    status: "ACTIVE" | "INACTIVE";
  };
}

export function CategoryForm({ mode, initialData }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [images, setImages] = useState<string[]>(
    initialData?.images && initialData.images.length > 0
      ? initialData.images
      : initialData?.imageUrl
        ? [initialData.imageUrl]
        : [],
  );
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">(
    initialData?.status || "ACTIVE",
  );

  const handleNameChange = (val: string) => {
    setName(val);
    if (mode === "create" || !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required.");
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
        setUploadMessage(
          `Uploading image ${i + 1} of ${finalImages.length}...`,
        );
        const uploadRes = await uploadImageAction(img, "categories");
        if (!uploadRes.success || !uploadRes.url) {
          toast.error(
            uploadRes.error || "Failed to upload image to Cloudinary.",
          );
          setLoading(false);
          setUploadMessage(null);
          return;
        }
        finalImages[i] = uploadRes.url;
      }
    }

    setUploadMessage("Saving category to database...");

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      imageUrl: finalImages[0] || "",
      images: finalImages,
      sortOrder: initialData?.sortOrder ?? 0,
      status,
      type: "machine",
    };

    let res;
    if (mode === "create") {
      res = await createCategory(payload);
    } else if (initialData?.id) {
      res = await updateCategory(initialData.id, payload);
    } else {
      toast.error("Missing category ID");
      setLoading(false);
      setUploadMessage(null);
      return;
    }

    setLoading(false);
    setUploadMessage(null);

    if (res.success) {
      toast.success(
        mode === "create"
          ? "Category created successfully"
          : "Category updated successfully",
      );
      router.push("/admin/categories");
      router.refresh();
    } else {
      toast.error(res.error || "Failed to save category");
    }
  };

  const primaryCoverImage = images[0] || null;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 pb-24">
      {/* Top Header Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-4 z-30 backdrop-blur-md bg-white/95">
        <div className="flex items-center gap-3.5">
          <Link
            href="/admin/categories"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#00266A] border border-blue-100">
                Machine Category
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-500">
                {mode === "create" ? "New Entry" : "Editing"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              {mode === "create"
                ? name || "Create New Category"
                : name || "Edit Category"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/categories")}
            disabled={loading}
            className="h-10 text-xs font-semibold rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="h-10 gap-2 bg-[#00266A] text-white hover:bg-[#001D52] font-semibold rounded-xl shadow-xs transition-all cursor-pointer text-xs"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {loading
              ? uploadMessage || "Saving..."
              : mode === "create"
                ? "Create Category"
                : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Main Grid: Left Details & Media (2/3), Right Metadata (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Core Category Information */}
          <Card className="border-slate-200 bg-white shadow-2xs rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 border-b border-slate-100 p-5 bg-slate-50/50">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-[#00266A]">
                <FolderKanban className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Category Information
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Identify and define the packaging machine category
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Category Name */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="name"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Category Name <span className="text-rose-500">*</span>
                    </Label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {name.length}/200
                    </span>
                  </div>
                  <Input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Shrink Packaging Machines"
                    className="text-xs text-slate-900 h-10 rounded-xl border-slate-200 focus:border-[#00266A]"
                  />
                  <p className="text-[11px] text-slate-400">
                    The public display title used across the website &amp;
                    catalog.
                  </p>
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="slug"
                      className="text-xs font-semibold text-slate-700"
                    >
                      URL Slug <span className="text-rose-500">*</span>
                    </Label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {slug.length}/200
                    </span>
                  </div>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/70 overflow-hidden focus-within:border-[#00266A] focus-within:bg-white transition-all">
                    <span className="text-[11px] text-slate-400 pl-3 pr-1 select-none font-mono">
                      /machines/
                    </span>
                    <Input
                      id="slug"
                      required
                      value={slug}
                      onChange={(e) =>
                        setSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]+/g, ""),
                        )
                      }
                      placeholder="shrink-packaging"
                      className="border-0 bg-transparent text-xs text-slate-900 h-10 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    SEO friendly URL identifier (lowercase, hyphens only).
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="description"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Category Overview &amp; Description
                  </Label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {description.length}/2000
                  </span>
                </div>
                <Textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a comprehensive summary of this machine category, applications, packaging industries served..."
                  className="text-xs text-slate-900 rounded-xl border-slate-200 focus:border-[#00266A] resize-none"
                />
                <p className="text-[11px] text-slate-400">
                  Displayed as the header summary on the category listing page
                  (`/machines/[slug]`).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Category Images & Media */}
          <Card className="border-slate-200 bg-white shadow-2xs rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 border-b border-slate-100 p-5 bg-slate-50/50">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-700">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Category Images &amp; Media (800 × 600 px)
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Upload category banner and showcase images standardized to 800
                  × 600 px (1st image will be the primary cover)
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <MultiImageUploader
                label="Category Media Gallery"
                folder="categories"
                values={images}
                onChange={setImages}
              />
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
                  Publishing &amp; Visibility
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Control category visibility on the public site
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="status"
                  className="text-xs font-semibold text-slate-700"
                >
                  Publication Status
                </Label>
                <Select
                  value={status}
                  onValueChange={(val) =>
                    val && setStatus(val as "ACTIVE" | "INACTIVE")
                  }
                >
                  <SelectTrigger
                    id="status"
                    className="w-full text-xs text-slate-900 h-10 rounded-xl border-slate-200"
                  >
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
                  Thumbnail displayed on machines navigation
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-5 flex flex-col items-center justify-center">
              {primaryCoverImage ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-amber-500/40 shadow-2xs group bg-slate-900">
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
                  <span className="text-xs font-semibold text-slate-500">
                    No Cover Selected
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    Upload photos in media gallery
                  </span>
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
                    ? "Create Category"
                    : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/categories")}
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
