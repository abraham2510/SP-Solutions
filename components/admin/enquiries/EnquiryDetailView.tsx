"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  Package,
  Wrench,
  ExternalLink,
  Trash2,
  User,
  Tag,
  Copy,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { updateEnquiryStatus, deleteEnquiry } from "@/actions/enquiries";
import { toast } from "sonner";
import type { EnquiryStatus } from "@prisma/client";

export interface DetailedEnquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  status: EnquiryStatus;
  createdAt: Date;
  product?: {
    id: string;
    name: string;
    slug: string;
    category: { slug: string; name?: string };
  } | null;
  service?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

interface EnquiryDetailViewProps {
  enquiry: DetailedEnquiryItem;
}

export function EnquiryDetailView({ enquiry }: EnquiryDetailViewProps) {
  const router = useRouter();
  const [status, setStatus] = useState<EnquiryStatus>(enquiry.status);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const cleanPhone = enquiry.phone?.replace(/[^0-9]/g, "");

  const handleStatusChange = async (newStatus: EnquiryStatus) => {
    setIsUpdatingStatus(true);
    const res = await updateEnquiryStatus(enquiry.id, newStatus);
    setIsUpdatingStatus(false);
    if (res.success) {
      setStatus(newStatus);
      toast.success(`Enquiry status updated to ${newStatus}`);
      router.refresh();
    } else {
      toast.error(res.error || "Failed to update status");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteEnquiry(enquiry.id);
    setIsDeleting(false);
    setShowDeleteDialog(false);
    if (res.success) {
      toast.success("Enquiry deleted successfully");
      router.push("/admin/enquiries");
    } else {
      toast.error(res.error || "Failed to delete enquiry");
    }
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`Copied ${fieldName} to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getStatusBadgeVariant = (s: EnquiryStatus) => {
    switch (s) {
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
    <div className="space-y-6 pb-16">
      {/* Top Header Navigation & Status Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3.5">
          <Button
            render={<Link href="/admin/enquiries" />}
            variant="outline"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to enquiries</span>
          </Button>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {enquiry.name}
              </h1>
              <Badge
                variant={getStatusBadgeVariant(status)}
                className="text-xs"
              >
                {status}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Enquiry ID:{" "}
              <span className="font-mono text-slate-700 font-semibold">
                {enquiry.id}
              </span>
            </p>
          </div>
        </div>

        {/* Status Dropdown & Delete Button */}
        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 hidden md:inline">
              Status:
            </span>
            <Select
              value={status}
              onValueChange={(val) => handleStatusChange(val as EnquiryStatus)}
              disabled={isUpdatingStatus}
            >
              <SelectTrigger className="w-[140px] h-9 text-xs font-semibold bg-white border-slate-200 focus:ring-[#00266A]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW">NEW</SelectItem>
                <SelectItem value="CONTACTED">CONTACTED</SelectItem>
                <SelectItem value="CLOSED">CLOSED</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            className="h-9 gap-1.5 border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>

      {/* Direct Contact Bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider mr-1">
          Quick Contact:
        </span>

        <Button
          render={
            <a
              href={`mailto:${enquiry.email}?subject=RE: SP Solutions Enquiry - ${
                enquiry.subject || "Packaging Machinery"
              }`}
            />
          }
          size="sm"
          className="gap-2 bg-[#00266A] hover:bg-[#001D52] !text-white font-semibold shadow-xs"
        >
          <Mail className="h-4 w-4" />
          Reply Email
        </Button>

        {enquiry.phone && (
          <>
            <Button
              render={<a href={`tel:${enquiry.phone}`} />}
              variant="outline"
              size="sm"
              className="gap-2 border-slate-200 text-slate-800 hover:bg-slate-100 font-semibold bg-white"
            >
              <Phone className="h-4 w-4 text-emerald-600" />
              Call Phone
            </Button>

            <Button
              render={
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noreferrer"
                />
              }
              size="sm"
              className="gap-2 bg-[#25D366] hover:bg-[#20ba5a] !text-white font-semibold shadow-xs"
            >
              <svg
                className="w-4 h-4 fill-current shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M11.999 2.004C6.477 2.004 2 6.481 2 12.003a9.945 9.945 0 001.38 5.098L2 22l5.032-1.363A9.944 9.944 0 0012 22c5.521 0 10-4.477 10-9.997 0-5.523-4.477-9.999-10.001-9.999zm.001 18.315a8.273 8.273 0 01-4.214-1.152l-.302-.179-3.126.847.85-3.044-.197-.313A8.285 8.285 0 013.716 12c0-4.586 3.698-8.312 8.284-8.312 4.585 0 8.283 3.726 8.283 8.312 0 4.587-3.698 8.319-8.283 8.319z" />
              </svg>
              WhatsApp Chat
            </Button>
          </>
        )}
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <Card className="border-slate-200 shadow-xs bg-white">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <User className="h-4 w-4 text-[#00266A]" />
                Customer Details
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500">
              Buyer contact information and business details
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5 space-y-4 text-sm">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400 font-medium block">
                  Full Name
                </span>
                <span className="font-bold text-slate-900">{enquiry.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-slate-400 hover:text-slate-700"
                onClick={() => copyToClipboard(enquiry.name, "Name")}
              >
                {copiedField === "Name" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>

            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400 font-medium block">
                  Email Address
                </span>
                <a
                  href={`mailto:${enquiry.email}`}
                  className="font-semibold text-[#00266A] hover:underline"
                >
                  {enquiry.email}
                </a>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-slate-400 hover:text-slate-700"
                onClick={() => copyToClipboard(enquiry.email, "Email")}
              >
                {copiedField === "Email" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>

            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400 font-medium block">
                  Phone Number
                </span>
                <span className="font-semibold text-slate-800">
                  {enquiry.phone || "Not provided"}
                </span>
              </div>
              {enquiry.phone && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-400 hover:text-slate-700"
                  onClick={() => copyToClipboard(enquiry.phone!, "Phone")}
                >
                  {copiedField === "Phone" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              )}
            </div>

            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400 font-medium block">
                  Company / Organization
                </span>
                <span className="font-semibold text-slate-800">
                  {enquiry.company || "Individual Buyer"}
                </span>
              </div>
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-400 font-medium block">
                  Submission Date
                </span>
                <span className="font-medium text-slate-700 text-xs">
                  {new Date(enquiry.createdAt).toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interested Product / Service */}
        <Card className="border-slate-200 shadow-xs bg-white">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Tag className="h-4 w-4 text-[#00266A]" />
              Inquiry Interest &amp; Subject
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Specific machine or service requested by buyer
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5 space-y-4">
            {enquiry.product ? (
              <div className="p-4 rounded-xl border border-[#00266A]/20 bg-[#00266A]/5 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#00266A]">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <Package className="h-4 w-4" />
                    Packaging Machinery
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-white border-[#00266A]/30 text-[#00266A] text-[10px]"
                  >
                    Catalogue Product
                  </Badge>
                </div>
                <div className="text-base font-bold text-slate-900">
                  {enquiry.product.name}
                </div>
                {enquiry.product.category?.name && (
                  <div className="text-xs text-slate-500 font-medium">
                    Category: {enquiry.product.category.name}
                  </div>
                )}
                <Button
                  render={
                    <Link
                      href={`/machines/${enquiry.product.category.slug}/${enquiry.product.slug}`}
                      target="_blank"
                    />
                  }
                  variant="outline"
                  size="sm"
                  className="mt-1 h-8 text-xs bg-white text-[#00266A] border-slate-200 hover:bg-slate-50 gap-1.5"
                >
                  View Public Machine Page <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ) : enquiry.service ? (
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <Wrench className="h-4 w-4 text-amber-600" />
                    Technical Service
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-white text-slate-700 text-[10px]"
                  >
                    Service Offer
                  </Badge>
                </div>
                <div className="text-base font-bold text-slate-900">
                  {enquiry.service.name}
                </div>
                <Button
                  render={
                    <Link
                      href={`/services/${enquiry.service.slug}`}
                      target="_blank"
                    />
                  }
                  variant="outline"
                  size="sm"
                  className="mt-1 h-8 text-xs bg-white text-slate-700 border-slate-200 hover:bg-slate-100 gap-1.5"
                >
                  View Service Page <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600 leading-relaxed font-medium">
                General inquiry submitted directly via website contact form.
              </div>
            )}

            {enquiry.subject && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Subject Line:
                </span>
                <span className="text-sm font-semibold text-slate-900 block">
                  {enquiry.subject}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Full Customer Message Card */}
      <Card className="border-slate-200 shadow-xs bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#00266A]" />
            Customer Message
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Full text submitted by buyer
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200 text-sm text-slate-900 whitespace-pre-wrap leading-relaxed font-sans shadow-2xs">
            {enquiry.message}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Enquiry Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this enquiry from{" "}
              <strong>{enquiry.name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete Enquiry"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
