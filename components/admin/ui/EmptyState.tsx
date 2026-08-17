import React from "react";
import { FolderOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "No records found",
  description = "Get started by adding your first record.",
  actionHref,
  actionLabel = "Add Record",
  icon = <FolderOpen className="h-10 w-10 text-muted-foreground" />,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center bg-card rounded-lg border border-border shadow-xs my-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted border border-border mb-4">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
      {actionHref && (
        <Button render={<Link href={actionHref} />} size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
