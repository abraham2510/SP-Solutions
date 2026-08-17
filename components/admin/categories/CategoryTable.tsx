"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, Eye, Edit, Trash2, Tag } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteCategory } from "@/actions/categories";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  images?: string[];
  sortOrder: number;
  status: "ACTIVE" | "INACTIVE";
  updatedAt: Date;
  _count: {
    products: number;
  };
}

interface CategoryTableProps {
  categories: CategoryItem[];
}

export function CategoryTable({ categories }: CategoryTableProps) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<CategoryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const res = await deleteCategory(deleteTarget.id);
    setIsDeleting(false);
    setDeleteTarget(null);
    if (res.success) {
      toast.success("Category deleted successfully");
      router.refresh();
    } else {
      toast.error(res.error || "Failed to delete category");
    }
  };

  return (
    <>
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 text-xs font-semibold uppercase tracking-wider">
                <TableHead className="w-[300px]">Category</TableHead>
                <TableHead className="text-center">Products</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((c) => {
                const primaryImg = (c.images && c.images[0]) || c.imageUrl;
                const totalImgCount = c.images?.length || (c.imageUrl ? 1 : 0);

                return (
                  <TableRow key={c.id} className="hover:bg-muted/40 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          {primaryImg ? (
                            <img
                              src={primaryImg}
                              alt={c.name}
                              className="h-10 w-10 rounded-md object-cover border border-border bg-muted shrink-0"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground shrink-0">
                              <Tag className="h-5 w-5" />
                            </div>
                          )}
                          {totalImgCount > 1 && (
                            <span className="absolute -bottom-1 -right-1 bg-slate-900 text-white text-[9px] font-bold px-1 rounded-full border border-white">
                              +{totalImgCount - 1}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/admin/categories/${c.id}/edit`}
                            className="font-semibold text-foreground hover:underline truncate block text-sm"
                          >
                            {c.name}
                          </Link>
                          <p className="text-xs text-muted-foreground font-mono truncate">
                            /{c.slug}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                  <TableCell className="text-center">
                    <Badge variant="secondary" className="font-medium text-xs">
                      {c._count.products} products
                    </Badge>
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge
                      variant={c.status === "ACTIVE" ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {c.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(c.updatedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          render={
                            <Link href={`/machines/${c.slug}`} target="_blank" />
                          }
                        >
                          <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>View on site</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          render={
                            <Link href={`/admin/categories/${c.id}/edit`} />
                          }
                        >
                          <Edit className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Edit category</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => setDeleteTarget(c)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Delete category</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete category "{deleteTarget?.name}"? A category cannot be deleted if products are still assigned to it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Category"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
