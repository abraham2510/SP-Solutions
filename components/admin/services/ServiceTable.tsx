"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, Eye, Edit, Trash2, Star, Wrench } from "lucide-react";
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
import { deleteService } from "@/actions/services";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  imageUrl: string | null;
  featured: boolean;
  sortOrder: number;
  status: "ACTIVE" | "INACTIVE";
  updatedAt: Date;
}

interface ServiceTableProps {
  services: ServiceItem[];
}

export function ServiceTable({ services }: ServiceTableProps) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const res = await deleteService(deleteTarget.id);
    setIsDeleting(false);
    setDeleteTarget(null);
    if (res.success) {
      toast.success("Service deleted successfully");
      router.refresh();
    } else {
      toast.error(res.error || "Failed to delete service");
    }
  };

  return (
    <>
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 text-xs font-semibold uppercase tracking-wider">
                <TableHead className="w-[300px]">Service</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Sort Order</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((s) => (
                <TableRow key={s.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {s.imageUrl ? (
                        <img
                          src={s.imageUrl}
                          alt={s.name}
                          className="h-10 w-10 rounded-md object-cover border border-border bg-muted shrink-0"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground shrink-0">
                          <Wrench className="h-5 w-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <Link
                          href={`/admin/services/${s.id}/edit`}
                          className="font-semibold text-foreground hover:underline truncate block text-sm"
                        >
                          {s.name}
                        </Link>
                        <p className="text-xs text-muted-foreground font-mono truncate">
                          /{s.slug}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge
                      variant={s.status === "ACTIVE" ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {s.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-center font-mono text-xs text-muted-foreground">
                    {s.sortOrder}
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(s.updatedAt).toLocaleDateString("en-IN", {
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
                            <Link href={`/services/${s.slug}`} target="_blank" />
                          }
                        >
                          <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>View on site</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          render={
                            <Link href={`/admin/services/${s.id}/edit`} />
                          }
                        >
                          <Edit className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Edit service</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => setDeleteTarget(s)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Delete service</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
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
            <AlertDialogTitle>Delete Service?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete service "{deleteTarget?.name}"? If there are active enquiries associated with this service, it will be set to INACTIVE instead of permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Service"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
