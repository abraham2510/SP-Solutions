import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminBlogPostById } from "@/lib/data/admin-blogs";
import { BlogForm } from "@/components/admin/blogs/BlogForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  await requireAdmin();
  const { id } = await params;

  const post = await getAdminBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-2">
      <BlogForm mode="edit" initialData={post} />
    </div>
  );
}
