import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalized = status.toUpperCase();

  const styles: Record<string, string> = {
    ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
    INACTIVE: "bg-slate-100 text-slate-600 border-slate-200",
    NEW: "bg-amber-50 text-amber-700 border-amber-200",
    CONTACTED: "bg-blue-50 text-blue-700 border-blue-200",
    CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
  };

  const style = styles[normalized] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border uppercase tracking-wider",
        style,
        className
      )}
    >
      {status}
    </span>
  );
}
