"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, Eye, Trash2, Mail, MessageSquare } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateEnquiryStatus, deleteEnquiry } from "@/actions/enquiries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { EnquiryStatus } from "@prisma/client";

export interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  status: EnquiryStatus;
  createdAt: Date;
  product?: { id: string; name: string; slug: string } | null;
  service?: { id: string; name: string; slug: string } | null;
}

interface EnquiryTableProps {
  enquiries: EnquiryItem[];
}

export function EnquiryTable({ enquiries }: EnquiryTableProps) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<EnquiryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    setUpdatingId(id);
    const res = await updateEnquiryStatus(id, newStatus);
    setUpdatingId(null);
    if (res.success) {
      toast.success(`Enquiry marked as ${newStatus}`);
      router.refresh();
    } else {
      toast.error(res.error || "Failed to update enquiry status");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const res = await deleteEnquiry(deleteTarget.id);
    setIsDeleting(false);
    setDeleteTarget(null);
    if (res.success) {
      toast.success("Enquiry deleted successfully");
      router.refresh();
    } else {
      toast.error(res.error || "Failed to delete enquiry");
    }
  };

  const getStatusBadgeVariant = (status: EnquiryStatus) => {
    switch (status) {
      case "NEW":
        return "destructive";
      case "CONTACTED":
        return "secondary";
      case "CLOSED":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <>
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 text-xs font-semibold uppercase tracking-wider">
                <TableHead className="w-[260px]">Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Interested In</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.map((e) => (
                <TableRow key={e.id} className="hover:bg-muted/40 transition-colors">
                  {/* Contact Info */}
                  <TableCell className="font-medium">
                    <div>
                      <Link
                        href={`/admin/enquiries/${e.id}`}
                        className="font-semibold text-foreground hover:underline block text-sm truncate"
                      >
                        {e.name}
                      </Link>
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5 truncate">
                        <span>{e.email}</span>
                        {e.phone && <span>• {e.phone}</span>}
                      </div>
                    </div>
                  </TableCell>

                  {/* Company */}
                  <TableCell className="text-xs text-muted-foreground">
                    {e.company || "—"}
                  </TableCell>

                  {/* Interested In */}
                  <TableCell>
                    {e.product ? (
                      <Badge variant="outline" className="font-normal text-xs bg-primary/5 text-primary border-primary/20">
                        Machine: {e.product.name}
                      </Badge>
                    ) : e.service ? (
                      <Badge variant="outline" className="font-normal text-xs bg-accent text-accent-foreground">
                        Service: {e.service.name}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-xs">General Enquiry</span>
                    )}
                  </TableCell>

                  {/* Status Dropdown */}
                  <TableCell className="text-center">
                    <Select
                      value={e.status}
                      disabled={updatingId === e.id}
                      onValueChange={(val) => val && handleStatusChange(e.id, val as EnquiryStatus)}
                    >
                      <SelectTrigger className="w-[120px] h-7 text-xs mx-auto">
                        <SelectValue>
                          <Badge variant={getStatusBadgeVariant(e.status)} className="text-[10px]">
                            {e.status}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NEW" className="text-xs">NEW</SelectItem>
                        <SelectItem value="CONTACTED" className="text-xs">CONTACTED</SelectItem>
                        <SelectItem value="CLOSED" className="text-xs">CLOSED</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Received */}
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(e.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  {/* Actions */}
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
                          render={<Link href={`/admin/enquiries/${e.id}`} />}
                        >
                          <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>View enquiry details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          render={<a href={`mailto:${e.email}`} />}
                        >
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Send email</span>
                        </DropdownMenuItem>
                        {e.phone && (
                          <DropdownMenuItem
                            render={
                              <a
                                href={`https://wa.me/${e.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noreferrer"
                              />
                            }
                          >
                            <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>WhatsApp chat</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => setDeleteTarget(e)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Delete enquiry</span>
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
            <AlertDialogTitle>Delete Enquiry?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the enquiry from "{deleteTarget?.name}" ({deleteTarget?.email})? This operation cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Enquiry"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
