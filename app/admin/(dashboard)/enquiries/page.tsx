import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminEnquiries } from "@/lib/data/admin";
import { EnquiryTable } from "@/components/admin/enquiries/EnquiryTable";
import { SearchInput } from "@/components/admin/ui/SearchInput";
import { FilterDropdown } from "@/components/admin/ui/FilterDropdown";
import { Pagination } from "@/components/admin/ui/Pagination";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { MessageSquare } from "lucide-react";
import type { EnquiryStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

interface EnquiriesPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function EnquiriesPage({ searchParams }: EnquiriesPageProps) {
  await requireAdmin();
  const params = await searchParams;

  const page = parseInt(params.page || "1", 10);
  const search = params.search;
  const status = (params.status?.toUpperCase() as EnquiryStatus) || undefined;

  const { enquiries, total, totalPages, perPage } = await getAdminEnquiries({
    search,
    status,
    page,
    perPage: 15,
  });

  const statusOptions = [
    { label: "NEW", value: "NEW" },
    { label: "CONTACTED", value: "CONTACTED" },
    { label: "CLOSED", value: "CLOSED" },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Enquiries</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage customer enquiries, machine quotes, and follow-ups.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 bg-card p-4 rounded-lg border border-border shadow-xs">
        <SearchInput placeholder="Search name, email, or company..." defaultValue={search} />
        <FilterDropdown paramName="status" label="All Statuses" options={statusOptions} defaultValue={params.status} />
      </div>

      {enquiries.length === 0 ? (
        <EmptyState
          title="No enquiries found"
          description="Customer quote requests and service inquiries will appear here."
          icon={<MessageSquare className="h-10 w-10 text-muted-foreground" />}
        />
      ) : (
        <div className="space-y-4">
          <EnquiryTable enquiries={enquiries} />
          <Pagination page={page} totalPages={totalPages} total={total} perPage={perPage} />
        </div>
      )}
    </div>
  );
}
