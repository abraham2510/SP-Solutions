import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { BlogForm } from "@/components/admin/blogs/BlogForm";

export default async function NewBlogPage() {
  await requireAdmin();

  return (
    <div className="py-2">
      <BlogForm mode="create" />
    </div>
  );
}
