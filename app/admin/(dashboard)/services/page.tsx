import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminServices } from "@/lib/data/admin";
import { ServiceTable } from "@/components/admin/services/ServiceTable";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import Link from "next/link";
import { Plus, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  await requireAdmin();
  const services = await getAdminServices();

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Services</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage repair services and technical maintenance offerings.
          </p>
        </div>

        <Button render={<Link href="/admin/services/new" />} size="sm" className="gap-1.5 !text-white self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      {services.length === 0 ? (
        <EmptyState
          title="No services found"
          description="Create service offerings to highlight technical repair capabilities."
          actionHref="/admin/services/new"
          actionLabel="Add Service"
          icon={<Wrench className="h-10 w-10 text-muted-foreground" />}
        />
      ) : (
        <ServiceTable services={services} />
      )}
    </div>
  );
}
