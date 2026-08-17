"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
}

export function Pagination({ page, totalPages, total, perPage }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    return `${pathname}?${params.toString()}`;
  };

  const startRecord = (page - 1) * perPage + 1;
  const endRecord = Math.min(page * perPage, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3">
      <div className="text-xs text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{startRecord}</span> to{" "}
        <span className="font-semibold text-foreground">{endRecord}</span> of{" "}
        <span className="font-semibold text-foreground">{total}</span> items
      </div>

      <ShadcnPagination className="w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageUrl(page - 1)}
              aria-disabled={page <= 1}
              tabIndex={page <= 1 ? -1 : undefined}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          <PaginationItem>
            <span className="text-xs font-medium px-3 py-1.5 rounded-md border border-border bg-background">
              Page {page} of {totalPages}
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href={createPageUrl(page + 1)}
              aria-disabled={page >= totalPages}
              tabIndex={page >= totalPages ? -1 : undefined}
              className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>
    </div>
  );
}
