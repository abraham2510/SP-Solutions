import type { Metadata } from "next";
import { SessionProvider } from "@/components/admin/layout/SessionProvider";
import { AdminSidebarProvider } from "@/components/admin/layout/AdminSidebarContext";
import { AdminWorkspaceWrapper } from "@/components/admin/layout/AdminWorkspaceWrapper";

export const metadata: Metadata = {
  title: "Admin — SP Solutions",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminSidebarProvider>
        <AdminWorkspaceWrapper>{children}</AdminWorkspaceWrapper>
      </AdminSidebarProvider>
    </SessionProvider>
  );
}
