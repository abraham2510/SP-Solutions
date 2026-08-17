"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Star,
  Package,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";
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
import { deleteProduct, updateProduct } from "@/actions/products";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  model: string | null;
  imageUrl: string | null;
  images?: string[];
  featured?: boolean;
  status: "ACTIVE" | "INACTIVE";
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

interface ProductTableProps {
  products: ProductItem[];
}

export function ProductTable({ products }: ProductTableProps) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<ProductItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const res = await deleteProduct(deleteTarget.id);
    setIsDeleting(false);
    setDeleteTarget(null);
    if (res.success) {
      toast.success("Product deleted successfully");
      router.refresh();
    } else {
      toast.error(res.error || "Failed to delete product");
    }
  };

  const handleToggleStatus = async (product: ProductItem) => {
    const nextStatus = product.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const res = await updateProduct(product.id, {
      name: product.name,
      slug: product.slug,
      categoryId: product.category.id,
      status: nextStatus,
      featured: false,
    });
    if (res.success) {
      toast.success(`Product status set to ${nextStatus}`);
      router.refresh();
    } else {
      toast.error(res.error || "Failed to update status");
    }
  };

  return (
    <>
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 text-xs font-semibold uppercase tracking-wider">
                <TableHead className="w-[300px]">Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Model</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => {
                const primaryImg = (p.images && p.images[0]) || p.imageUrl;
                const totalImgCount = p.images?.length || (p.imageUrl ? 1 : 0);

                return (
                  <TableRow key={p.id} className="hover:bg-muted/40 transition-colors">
                    {/* Product Cell */}
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          {primaryImg ? (
                            <img
                              src={primaryImg}
                              alt={p.name}
                              className="h-10 w-10 rounded-md object-cover border border-border bg-muted shrink-0"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground shrink-0">
                              <Package className="h-5 w-5" />
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
                            href={`/admin/products/${p.id}/edit`}
                            className="font-semibold text-foreground hover:underline truncate block text-sm"
                          >
                            {p.name}
                          </Link>
                          <p className="text-xs text-muted-foreground font-mono truncate">
                            /{p.slug}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Badge variant="outline" className="font-normal text-xs">
                      {p.category.name}
                    </Badge>
                  </TableCell>

                  {/* Model */}
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {p.model || "—"}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    <Badge
                      variant={p.status === "ACTIVE" ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {p.status}
                    </Badge>
                  </TableCell>

                  {/* Updated */}
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(p.updatedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  {/* Actions Dropdown */}
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
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          render={
                            <Link
                              href={`/machines/${p.category.slug}/${p.slug}`}
                              target="_blank"
                            />
                          }
                        >
                          <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>View on website</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          render={
                            <Link
                              href={`/admin/products/${p.id}/catalogue`}
                              target="_blank"
                            />
                          }
                        >
                          <FileText className="h-4 w-4 mr-2 text-sky-600" />
                          <span className="font-semibold text-sky-700">View Catalogue</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          render={
                            <Link href={`/admin/products/${p.id}/edit`} />
                          }
                        >
                          <Edit className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Edit details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(p)}>
                          {p.status === "ACTIVE" ? (
                            <>
                              <XCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Set as Inactive</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Set as Active</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => setDeleteTarget(p)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Delete product</span>
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

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteTarget?.name}"? This action cannot be undone. If there are existing customer enquiries linked to this product, it will be set to INACTIVE instead of deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Product"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
