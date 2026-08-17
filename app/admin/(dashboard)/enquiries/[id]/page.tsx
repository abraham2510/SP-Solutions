import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminEnquiryById } from "@/lib/data/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  Building2,
  Calendar,
  Package,
  Wrench,
  ExternalLink,
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

export const dynamic = "force-dynamic";

interface EnquiryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EnquiryDetailPage({ params }: EnquiryDetailPageProps) {
  await requireAdmin();
  const { id } = await params;

  const enquiry = await getAdminEnquiryById(id);
  if (!enquiry) {
    notFound();
  }

  const cleanPhone = enquiry.phone?.replace(/[^0-9]/g, "");

  const getStatusBadgeVariant = (status: string) => {
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
    <div className="space-y-6 max-w-4xl pb-12">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button render={<Link href="/admin/enquiries" />} variant="outline" size="sm" className="h-9 w-9 p-0">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to enquiries</span>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {enquiry.name}
              </h1>
              <Badge variant={getStatusBadgeVariant(enquiry.status)} className="text-xs">
                {enquiry.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Enquiry ID: <span className="font-mono">{enquiry.id}</span>
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            render={
              <a
                href={`mailto:${enquiry.email}?subject=RE: SP Solutions Enquiry - ${
                  enquiry.subject || "Packaging Machinery"
                }`}
              />
            }
            size="sm"
            className="gap-1.5"
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
                className="gap-1.5"
              >
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <Button
                render={
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                variant="secondary"
                size="sm"
                className="gap-1.5 bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600/20"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Grid: Contact Info & Machine Interest */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Customer Information
            </CardTitle>
            <CardDescription>
              Client contact and company parameters.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex items-center gap-3 text-foreground">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <a
                href={`mailto:${enquiry.email}`}
                className="font-medium hover:underline text-primary"
              >
                {enquiry.email}
              </a>
            </div>

            <div className="flex items-center gap-3 text-foreground">
              <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium">
                {enquiry.phone || "No phone provided"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-foreground">
              <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium">
                {enquiry.company || "No company name specified"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-foreground">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium">
                {new Date(enquiry.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Interested Product / Service */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Interested Machine / Service
            </CardTitle>
            <CardDescription>
              Catalogue item requested in enquiry.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {enquiry.product ? (
              <div className="p-3.5 rounded-lg border border-primary/20 bg-primary/5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <Package className="h-4 w-4" />
                  <span>Packaging Machine</span>
                </div>
                <div className="text-sm font-bold text-foreground">
                  {enquiry.product.name}
                </div>
                <Button
                  render={
                    <Link
                      href={`/machines/${enquiry.product.category.slug}/${enquiry.product.slug}`}
                      target="_blank"
                    />
                  }
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs px-0 hover:bg-transparent text-primary flex items-center gap-1"
                >
                  View Product Page <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ) : enquiry.service ? (
              <div className="p-3.5 rounded-lg border border-border bg-accent/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <Wrench className="h-4 w-4" />
                  <span>Technical Service</span>
                </div>
                <div className="text-sm font-bold text-foreground">
                  {enquiry.service.name}
                </div>
                <Button
                  render={
                    <Link
                      href={`/services/${enquiry.service.slug}`}
                      target="_blank"
                    />
                  }
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs px-0 hover:bg-transparent flex items-center gap-1"
                >
                  View Service Page <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg border border-border bg-muted/30 text-xs text-muted-foreground">
                General inquiry submitted from website contact form.
              </div>
            )}

            {enquiry.subject && (
              <div className="text-xs pt-1">
                <span className="font-semibold text-muted-foreground">
                  Subject:{" "}
                </span>
                <span className="text-foreground">{enquiry.subject}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Full Message */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Enquiry Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-muted/40 border border-border text-sm text-foreground whitespace-pre-wrap leading-relaxed font-sans">
            {enquiry.message}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
