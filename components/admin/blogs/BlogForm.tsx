"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Image as ImageIcon,
  X,
  Loader2,
  Calendar,
  User,
  Tag as TagIcon,
  Eye,
  Save,
  CheckCircle,
  Link2,
  Lock,
  Unlock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BlogRichTextEditor } from "./BlogRichTextEditor";
import { BlogGalleryManager } from "./BlogGalleryManager";
import { BlogPreviewModal } from "./BlogPreviewModal";
import { createBlogPost, updateBlogPost } from "@/actions/blogs";
import {
  BLOG_CATEGORIES,
  type BlogPost,
  type BlogGalleryItem,
  type BlogPostStatus,
} from "@/lib/types/blog";

interface BlogFormProps {
  initialData?: BlogPost | null;
  mode: "create" | "edit";
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isSlugCustom, setIsSlugCustom] = useState(mode === "edit");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(
    initialData?.category || "Company News",
  );
  const [author, setAuthor] = useState(
    initialData?.author || "SP Solutions Team",
  );
  const [publishedAt, setPublishedAt] = useState<string>(
    initialData?.publishedAt
      ? new Date(initialData.publishedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  );
  const [coverImage, setCoverImage] = useState<string>(
    initialData?.coverImage || "",
  );
  const [gallery, setGallery] = useState<BlogGalleryItem[]>(
    initialData?.gallery || [],
  );
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [externalLink, setExternalLink] = useState(
    initialData?.externalLink || "",
  );
  const [externalLinkText, setExternalLinkText] = useState(
    initialData?.externalLinkText || "",
  );
  const [status, setStatus] = useState<BlogPostStatus>(
    initialData?.status || "DRAFT",
  );
  const [featured, setFeatured] = useState<boolean>(
    initialData?.featured || false,
  );

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

  // Handle title change with auto slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isSlugCustom) {
      setSlug(generateSlug(newTitle));
    }
  };

  // Cover image file handler
  const handleCoverFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Invalid image format. Please select JPEG, PNG, or WEBP.");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error("File exceeds 15MB limit.");
      return;
    }

    setCoverUploading(true);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      setCoverImage(base64);
      toast.success("Cover image loaded.");
    } catch {
      toast.error("Failed to read image file.");
    } finally {
      setCoverUploading(false);
      e.target.value = "";
    }
  };

  // Tags chip handlers
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const clean = tagInput.trim().replace(/^#/, "");
      if (clean && !tags.includes(clean)) {
        setTags([...tags, clean]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Submission handler
  const handleSubmit = async (submitStatus: BlogPostStatus) => {
    if (!title.trim()) {
      toast.error("Please enter a post title.");
      return;
    }

    if (!slug.trim()) {
      toast.error("Please enter a URL slug.");
      return;
    }

    if (!content.trim() || content === "<p></p>" || content === "<p><br></p>") {
      toast.error("Please write some article content.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content,
      coverImage: coverImage.trim() || null,
      category,
      author: author.trim() || "SP Solutions Team",
      tags,
      gallery,
      externalLink: externalLink.trim() || null,
      externalLinkText: externalLinkText.trim() || null,
      status: submitStatus,
      featured,
      publishedAt: new Date(publishedAt),
    };

    try {
      let res;
      if (mode === "create") {
        res = await createBlogPost(payload);
      } else if (initialData?.id) {
        res = await updateBlogPost(initialData.id, payload);
      }

      if (res && res.success) {
        toast.success(
          submitStatus === "PUBLISHED"
            ? "Post published successfully!"
            : "Post saved as draft.",
        );
        router.push("/admin/blogs");
        router.refresh();
      } else {
        toast.error(res?.error || "Failed to save blog post.");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00266A]">
            {mode === "create" ? "New Publication" : "Edit Publication"}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#10151C]">
            {mode === "create"
              ? "Create News & Update Post"
              : "Edit News & Update Post"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(true)}
            className="cursor-pointer gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>Live Preview</span>
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isSubmitting}
            onClick={() => handleSubmit("DRAFT")}
            className="cursor-pointer gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save Draft</span>
          </Button>

          <Button
            type="button"
            size="sm"
            disabled={isSubmitting}
            onClick={() => handleSubmit("PUBLISHED")}
            className="cursor-pointer gap-1.5 bg-[#00266A] hover:bg-[#001D52] text-white shadow-xs font-semibold"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span>Publish Post</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug Box */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Post Title *
              </label>
              <Input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. SP Solutions Unveils Next-Gen High-Speed Flow Wrapper at PackEx"
                className="text-base font-medium h-11 border-slate-200 focus-visible:ring-[#00266A]"
                required
              />
            </div>

            {/* Slug URL */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  URL Slug *
                </label>
                <button
                  type="button"
                  onClick={() => setIsSlugCustom(!isSlugCustom)}
                  className="text-[11px] text-[#00266A] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {isSlugCustom ? (
                    <Unlock className="w-3 h-3" />
                  ) : (
                    <Lock className="w-3 h-3" />
                  )}
                  <span>
                    {isSlugCustom ? "Custom URL Enabled" : "Auto-Generated URL"}
                  </span>
                </button>
              </div>
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 overflow-hidden text-xs text-slate-500">
                <span className="px-3 py-2.5 bg-slate-100 border-r border-slate-200 font-mono text-[11px] shrink-0">
                  /news/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setIsSlugCustom(true);
                    setSlug(generateSlug(e.target.value));
                  }}
                  placeholder="post-url-slug"
                  className="w-full px-3 py-2 bg-transparent text-slate-900 font-mono text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Short Summary / Excerpt */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Short Summary / Excerpt
                </label>
                <span className="text-[11px] text-slate-400">
                  {excerpt.length}/300 chars
                </span>
              </div>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief 1-2 sentence overview of this announcement shown on news cards and search snippets..."
                rows={3}
                maxLength={300}
                className="w-full p-3 text-xs sm:text-sm text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00266A] focus:ring-2 focus:ring-[#00266A]/10 resize-y"
              />
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Main Featured / Cover Image
              </label>
              <span className="text-[11px] text-slate-500">
                16:9 or 4:3 high-res photo
              </span>
            </div>

            {coverImage ? (
              <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-200 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setCoverImage("")}
                    className="gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Remove Cover</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50 hover:bg-slate-100/70 transition-all cursor-pointer group">
                  {coverUploading ? (
                    <div className="flex flex-col items-center py-2 text-slate-500">
                      <Loader2 className="h-8 w-8 animate-spin text-[#00266A] mb-2" />
                      <span className="text-xs font-semibold text-slate-800">
                        Reading image file...
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 mb-2 group-hover:text-[#00266A] group-hover:border-[#00266A]/30 transition-colors shadow-xs">
                        <Upload className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        Upload Cover Image
                      </span>
                      <span className="text-[11px] text-slate-500 mt-0.5">
                        High resolution banner photo • JPEG, PNG, WEBP (Max
                        15MB)
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleCoverFile}
                    disabled={coverUploading}
                    className="hidden"
                  />
                </label>

                {/* Direct URL input */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <ImageIcon className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      type="url"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="Or paste cover image URL (https://...)"
                      className="pl-8 text-xs h-8 bg-white border-slate-200"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Full Article Rich Text Editor */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Full Article Content *
              </label>
              <span className="text-[11px] text-slate-500">
                Format headings, paragraphs, lists &amp; links
              </span>
            </div>
            <BlogRichTextEditor value={content} onChange={setContent} />
          </div>

          {/* Photo Gallery Manager */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <BlogGalleryManager items={gallery} onChange={setGallery} />
          </div>
        </div>

        {/* Sidebar Settings Panel (1 col) */}
        <div className="space-y-6">
          {/* Publishing Settings */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
              Publishing Meta
            </h3>

            {/* Status Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Publication Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BlogPostStatus)}
                className="w-full h-9 px-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:border-[#00266A]"
              >
                <option value="DRAFT">Draft (Admin Only)</option>
                <option value="PUBLISHED">Published (Visible to Public)</option>
              </select>
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Category / Update Type *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-9 px-3 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:border-[#00266A]"
              >
                {BLOG_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Publication Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Publication Date
              </label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  type="date"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="pl-8 text-xs h-9 bg-white border-slate-200 text-slate-800"
                />
              </div>
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Author / Publisher
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. SP Solutions Team"
                  className="pl-8 text-xs h-9 bg-white border-slate-200 text-slate-800"
                />
              </div>
            </div>

            {/* Homepage Featured Toggle */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Feature on Highlights
                </span>
                <span className="text-[11px] text-slate-500">
                  Pin to top of news list
                </span>
              </div>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#00266A] focus:ring-[#00266A] cursor-pointer"
              />
            </div>
          </div>

          {/* Tags / Keywords */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
              Tags &amp; Keywords
            </h3>

            <div>
              <div className="relative">
                <TagIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type tag and press Enter..."
                  className="pl-8 text-xs h-9 bg-white border-slate-200 text-slate-800"
                />
              </div>
              <span className="text-[10.5px] text-slate-400 mt-1 block">
                Press Enter or comma to add tag
              </span>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#00266A]/8 text-[#00266A] px-2.5 py-1 rounded-full border border-[#00266A]/15"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(i)}
                      className="hover:text-red-600 cursor-pointer ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* External Reference Link */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
              External Reference Link
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Reference URL (Optional)
              </label>
              <div className="relative">
                <Link2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  type="url"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  placeholder="https://indiamart.com/..."
                  className="pl-8 text-xs h-9 bg-white border-slate-200 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Button Label (Optional)
              </label>
              <Input
                type="text"
                value={externalLinkText}
                onChange={(e) => setExternalLinkText(e.target.value)}
                placeholder="e.g. View Exhibition Schedule"
                className="text-xs h-9 bg-white border-slate-200 text-slate-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      <BlogPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        data={{
          title,
          excerpt,
          content,
          coverImage,
          category,
          author,
          tags,
          gallery,
          externalLink,
          externalLinkText,
          publishedAt,
          status,
        }}
      />
    </div>
  );
}
