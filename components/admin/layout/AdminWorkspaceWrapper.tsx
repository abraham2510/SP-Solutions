"use client";

import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAdminSidebar } from "./AdminSidebarContext";

export function AdminWorkspaceWrapper({ children }: { children: React.ReactNode }) {
  const { collapsed } = useAdminSidebar();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      {/* Desktop Fixed Left Sidebar */}
      <AdminSidebar />

      {/* Main Workspace (Offset by fixed sidebar width on desktop) */}
      <div
        className={`flex flex-col min-w-0 min-h-screen transition-all duration-300 ease-in-out ${
          collapsed ? "lg:pl-16" : "lg:pl-64"
        }`}
      >
        {/* Sticky Top Header */}
        <AdminHeader />

        {/* Scrollable Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
}
