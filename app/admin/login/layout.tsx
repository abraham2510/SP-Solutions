/**
 * app/admin/login/layout.tsx
 * Login page needs its own layout that bypasses the requireAdmin() shell layout.
 * We override the admin layout here so unauthenticated users see a clean login page.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login — SP Solutions",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
