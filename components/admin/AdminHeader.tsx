"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, PanelLeftOpen, PanelLeftClose, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminUserMenu } from "./layout/AdminUserMenu";
import { useAdminSidebar } from "./layout/AdminSidebarContext";

function buildBreadcrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];
  let href = "";
  for (const part of parts) {
    href += `/${part}`;
    const label =
      part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ");
    crumbs.push({ label, href });
  }
  return crumbs;
}

export default function AdminHeader() {
  const pathname = usePathname();
  const breadcrumbs = buildBreadcrumbs(pathname);
  const { collapsed, toggleSidebar, toggleMobile } = useAdminSidebar();
  const currentPageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8 shrink-0 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile Toggle Button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleMobile}
          className="lg:hidden h-9 w-9 p-0 text-slate-700 hover:bg-slate-100"
          title="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>

        {/* Breadcrumb Trail */}
        <nav className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium ml-1">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.href}>
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
                {isLast ? (
                  <span className="font-semibold text-slate-900">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-[#00266A] transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Mobile Title */}
        <span className="sm:hidden font-bold text-sm text-slate-900">
          {currentPageTitle}
        </span>
      </div>

      {/* Right User Menu */}
      <div className="flex items-center gap-3">
        <AdminUserMenu />
      </div>
    </header>
  );
}
