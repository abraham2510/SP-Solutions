"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[15px] shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${className}`}
    >
      <ArrowLeft className="w-4 h-4 text-slate-500 transition-transform group-hover:-translate-x-1" />
      <span>Go Back</span>
    </button>
  );
}
