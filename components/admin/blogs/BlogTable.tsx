"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  ExternalLink,
  CheckCircle,
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  Loader2,
  Newspaper,
  Layers,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteBlogPost, toggleBlogPostStatus } from "@/actions/blogs";
import { BlogPreviewModal } from "./BlogPreviewModal";
import { BLOG_CATEGORIES, type BlogPost, type BlogPostStatus } from "@/lib/types/blog";

interface BlogTableProps {
  initialPosts: BlogPost[];
  totalCount: number;
  publishedCount: number;
  draftCount: number;
}

export function BlogTable({
  initialPosts = [],
  totalCount,
  publishedCount,
  draftCount,
}: BlogTableProps) {
  const router = useRouter();

  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState<"ALL" | BlogPostStatus>("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);

  // Filter posts on client side for instant search
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchSearch =
        !search.trim() ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase()) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(search.toLowerCase())) ||
        (p.author && p.author.toLowerCase().includes(search.toLowerCase()));

      const matchCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      const matchStatus =
        selectedStatus === "ALL" || p.status === selectedStatus;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [posts, search, selectedCategory, selectedStatus]);

  // Handle Quick Status Toggle
  const handleToggleStatus = async (post: BlogPost) => {
    const newStatus: BlogPostStatus =
      post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

    setTogglingId(post.id);
    try {
      const res = await toggleBlogPostStatus(post.id, newStatus);
      if (res.success) {
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, status: newStatus } : p))
        );
        toast.success(
          newStatus === "PUBLISHED"
            ? "Post published to public website!"
            : "Post reverted to draft."
        );
      } else {
        toast.error(res.error || "Failed to update status.");
      }
    } catch {
      toast.error("Failed to toggle post status.");
    } finally {
      setTogglingId(null);
    }
  };

  // Handle Delete Post
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await deleteBlogPost(id);
      if (res.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Blog post deleted successfully.");
      } else {
        toast.error(res.error || "Failed to delete post.");
      }
    } catch {
      toast.error("Failed to delete post.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Metric Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Posts
            </span>
            <Newspaper className="w-4 h-4 text-[#00266A]" />
          </div>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">
            {posts.length}
          </span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              Published
            </span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-bold text-emerald-700 mt-1 block">
            {posts.filter((p) => p.status === "PUBLISHED").length}
          </span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
              Drafts
            </span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-2xl font-bold text-amber-700 mt-1 block">
            {posts.filter((p) => p.status === "DRAFT").length}
          </span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Categories
            </span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-bold text-blue-700 mt-1 block">
            {new Set(posts.map((p) => p.category)).size}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, author, slug..."
            className="pl-9 text-xs h-9 bg-slate-50 border-slate-200"
          />
        </div>

        {/* Filters and CTA */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Tabs */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
            {(["ALL", "PUBLISHED", "DRAFT"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  selectedStatus === st
                    ? "bg-[#00266A] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st === "ALL" ? "All Status" : st === "PUBLISHED" ? "Published" : "Drafts"}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-9 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:border-[#00266A]"
          >
            <option value="All">All Categories</option>
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Create Button */}
          <Link href="/admin/blogs/new">
            <Button size="sm" className="h-9 bg-[#00266A] hover:bg-[#001D52] text-white gap-1.5 cursor-pointer font-semibold shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Create Post</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-16">Cover</th>
                <th className="py-3 px-4">Title &amp; Slug</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Publish Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Cover Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {post.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Newspaper className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title & Slug */}
                    <td className="py-3 px-4 max-w-xs sm:max-w-md">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm line-clamp-1 hover:text-[#00266A]">
                          {post.title}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 truncate">
                          /news/{post.slug}
                        </span>
                        {post.featured && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 mt-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> Featured Pin
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#00266A]/8 text-[#00266A] border border-[#00266A]/15">
                        {post.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap font-medium">
                      {post.author || "SP Solutions"}
                    </td>

                    {/* Publish Date */}
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap font-medium">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Status Badge & Quick Toggle */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(post)}
                        disabled={togglingId === post.id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                          post.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                        }`}
                        title="Click to toggle status"
                      >
                        {togglingId === post.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : post.status === "PUBLISHED" ? (
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{post.status === "PUBLISHED" ? "Published" : "Draft"}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        {/* Preview Modal */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreviewPost(post)}
                          className="h-8 w-8 p-0 text-slate-600 hover:text-slate-900 cursor-pointer"
                          title="Preview Post"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        {/* View live public if published */}
                        {post.status === "PUBLISHED" && (
                          <a
                            href={`/news/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center h-8 w-8 rounded-md text-slate-600 hover:text-[#00266A] hover:bg-slate-100 transition-colors"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        {/* Edit Link */}
                        <Link href={`/admin/blogs/${post.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-600 hover:text-[#00266A] cursor-pointer"
                            title="Edit Post"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>

                        {/* Delete Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={deletingId === post.id}
                          onClick={() => handleDelete(post.id, post.title)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 cursor-pointer"
                          title="Delete Post"
                        >
                          {deletingId === post.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText className="w-8 h-8 text-slate-300" />
                      <span className="font-semibold text-slate-700">No blog posts found</span>
                      <span className="text-xs text-slate-400">
                        {search || selectedCategory !== "All" || selectedStatus !== "ALL"
                          ? "Try clearing filters to see more posts."
                          : "Create your first news update to publish to the website."}
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {previewPost && (
        <BlogPreviewModal
          isOpen={previewPost !== null}
          onClose={() => setPreviewPost(null)}
          data={{
            title: previewPost.title,
            excerpt: previewPost.excerpt || undefined,
            content: previewPost.content,
            coverImage: previewPost.coverImage,
            category: previewPost.category,
            author: previewPost.author || undefined,
            tags: previewPost.tags,
            gallery: previewPost.gallery,
            externalLink: previewPost.externalLink,
            externalLinkText: previewPost.externalLinkText,
            publishedAt: previewPost.publishedAt,
            status: previewPost.status,
          }}
        />
      )}
    </div>
  );
}
