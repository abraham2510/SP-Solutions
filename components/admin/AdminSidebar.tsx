"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  Tag,
  Wrench,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAdminSidebar } from "./layout/AdminSidebarContext";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function SidebarNavContent({
  isCollapsed = false,
  onItemClick,
}: {
  isCollapsed?: boolean;
  onItemClick?: () => void;
}) {
  const pathname = usePathname();
  const { toggleSidebar } = useAdminSidebar();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div className="flex flex-col h-full bg-[#00266A] text-white select-none overflow-hidden">
      {/* Brand Header */}
      <div
        className={`shrink-0 h-16 px-3 border-b border-white/10 flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {isCollapsed ? (
          /* When collapsed: Clean single-container logo box that swaps to Chevron on hover */
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  onClick={toggleSidebar}
                  className="group flex h-9 w-9 items-center justify-center rounded-xl bg-white hover:bg-[#D5BD66] transition-all duration-200 cursor-pointer shadow-xs p-1"
                  title="Expand sidebar"
                >
                  <img
                    src="/logo.png"
                    alt="SP Solutions Logo"
                    className="h-full w-full object-contain group-hover:hidden"
                  />
                  <ChevronRight className="hidden group-hover:block h-5 w-5 text-[#00266A] font-bold" />
                </button>
              }
            />
            <TooltipContent side="right" className="bg-[#001D52] text-white border-blue-950 font-medium text-xs">
              Expand Sidebar
            </TooltipContent>
          </Tooltip>
        ) : (
          /* When expanded: Full brand header with collapse toggle arrow */
          <div className="flex items-center justify-between w-full min-w-0">
            <Link
              href="/admin/dashboard"
              onClick={onItemClick}
              className="flex items-center gap-3 overflow-hidden min-w-0"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white p-1 shadow-xs shrink-0">
                <img
                  src="/logo.png"
                  alt="SP Solutions Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col truncate">
                <span className="font-bold text-sm tracking-wide text-white truncate">
                  SP SOLUTIONS
                </span>
                <span className="text-[11px] text-blue-200/70 font-medium truncate">
                  Admin Panel
                </span>
              </div>
            </Link>

            {!onItemClick && (
              <button
                onClick={toggleSidebar}
                className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg text-blue-200/70 hover:bg-white/10 hover:text-white transition-colors shrink-0"
                title="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Navigation Items */}
      <div className="flex-1 px-2 py-4 space-y-1.5 overflow-y-auto min-h-0 custom-scrollbar">
        {!isCollapsed && (
          <div className="px-3 mb-2 text-[10px] uppercase tracking-wider font-semibold text-blue-200/50">
            Management
          </div>
        )}
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);

          if (isCollapsed) {
            const linkEl = (
              <Link
                key={href}
                href={href}
                onClick={onItemClick}
                className={`relative flex items-center justify-center h-10 w-10 mx-auto rounded-xl transition-all duration-150 group ${
                  active
                    ? "bg-white/15 text-white shadow-xs font-semibold"
                    : "text-blue-100/70 hover:bg-white/8 hover:text-white"
                }`}
              >
                {/* Straight Vertical Left Gold Border Accent */}
                {active && (
                  <span className="absolute -left-2 top-2 bottom-2 w-1 bg-[#D5BD66] rounded-r-full shadow-xs" />
                )}
                <Icon
                  className={`h-5 w-5 shrink-0 ${
                    active
                      ? "text-[#D5BD66]"
                      : "text-blue-200/60 group-hover:text-white"
                  }`}
                />
              </Link>
            );

            return (
              <Tooltip key={href}>
                <TooltipTrigger render={linkEl} />
                <TooltipContent side="right" className="bg-[#001D52] text-white border-blue-950 font-medium text-xs">
                  {label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              onClick={onItemClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                active
                  ? "bg-white/12 text-white font-semibold shadow-xs border-l-4 border-[#D5BD66] pl-2.5"
                  : "text-blue-100/70 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  active
                    ? "text-[#D5BD66]"
                    : "text-blue-200/60 group-hover:text-white"
                }`}
              />
              <span className="truncate">{label}</span>
              {active && (
                <ChevronRight className="h-3.5 w-3.5 ml-auto text-[#D5BD66] shrink-0" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="shrink-0 p-2 border-t border-white/10 space-y-1">
        {isCollapsed ? (
          <>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center justify-center h-10 w-10 mx-auto text-blue-200/70 hover:text-white hover:bg-white/8 rounded-xl transition-colors"
                  />
                }
              >
                <ExternalLink className="h-5 w-5" />
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#001D52] text-white border-blue-950 font-medium text-xs">
                View Public Website
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="flex items-center justify-center h-10 w-10 mx-auto text-rose-200 hover:text-white hover:bg-rose-500/20 rounded-xl transition-colors"
                  />
                }
              >
                <LogOut className="h-5 w-5 text-rose-300" />
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#001D52] text-white border-blue-950 font-medium text-xs">
                Sign Out
              </TooltipContent>
            </Tooltip>
          </>
        ) : (
          <>
            <Link
              href="/"
              target="_blank"
              onClick={onItemClick}
              className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-blue-200/70 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
            >
              <ExternalLink className="h-4 w-4 shrink-0 text-blue-200/60" />
              <span className="truncate">View Public Website</span>
            </Link>
            <button
              onClick={() => {
                if (onItemClick) onItemClick();
                signOut({ callbackUrl: "/admin/login" });
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium text-rose-200 hover:text-white hover:bg-rose-500/20 rounded-lg transition-colors text-left"
            >
              <LogOut className="h-4 w-4 shrink-0 text-rose-300" />
              <span className="truncate">Sign Out</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const { collapsed, mobileOpen, setMobileOpen } = useAdminSidebar();

  return (
    <>
      {/* Desktop Sidebar Container (Fixed height, fixed positioning) */}
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 bg-[#00266A] shadow-md transition-all duration-300 ease-in-out ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <SidebarNavContent isCollapsed={collapsed} />
      </aside>

      {/* Mobile Drawer Sheet */}
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-64 border-r-0 bg-[#00266A]">
            <SheetHeader className="sr-only">
              <SheetTitle>Admin Navigation</SheetTitle>
            </SheetHeader>
            <SidebarNavContent onItemClick={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
