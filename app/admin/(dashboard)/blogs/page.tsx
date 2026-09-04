import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAllAdminBlogPosts } from "@/lib/data/admin-blogs";
import { BlogTable } from "@/components/admin/blogs/BlogTable";

export const revalidate = 0;

export default async function AdminBlogsPage() {
  await requireAdmin();

  const { posts, total, publishedCount, draftCount } = await getAllAdminBlogPosts({
    limit: 100,
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#10151C]">News &amp; Company Updates</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage company news, product launches, events, exhibitions, and industry innovations.
          </p>
        </div>
      </div>

      <BlogTable
        initialPosts={posts}
        totalCount={total}
        publishedCount={publishedCount}
        draftCount={draftCount}
      />
    </div>
  );
}
