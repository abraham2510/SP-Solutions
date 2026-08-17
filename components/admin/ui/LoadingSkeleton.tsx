import React from "react";

export function LoadingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm animate-pulse">
      <div className="h-12 bg-slate-100 border-b border-slate-200" />
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-200 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
            </div>
            <div className="w-16 h-6 bg-slate-200 rounded-full" />
            <div className="w-20 h-8 bg-slate-100 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
