/**
 * lib/auth-helpers.ts — Server-side auth helpers (server-only)
 *
 * Use requireAdmin() at the start of any Server Action or Server Component
 * that needs authentication. This enforces auth server-side, independent of middleware.
 */
import "server-only";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export type AdminUser = {
  id: string;
  name: string | null | undefined;
  email: string | null | undefined;
  role: string;
};

/**
 * Returns the current user session, or null if not authenticated.
 */
export async function getUser(): Promise<AdminUser | null> {
  const session = await auth();
  if (!session?.user) return null;
  return {
    id: session.user.id as string,
    name: session.user.name,
    email: session.user.email,
    role: (session.user as { role?: string }).role ?? "",
  };
}

/**
 * Returns the current admin user.
 * Redirects to /admin/login if not authenticated or not an admin/editor.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
  const role = (session.user as { role?: string }).role;
  if (role !== "ADMIN" && role !== "EDITOR") {
    redirect("/admin/login?error=unauthorized");
  }
  return {
    id: session.user.id as string,
    name: session.user.name,
    email: session.user.email,
    role: role ?? "ADMIN",
  };
}
