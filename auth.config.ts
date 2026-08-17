import type { NextAuthConfig } from "next-auth";

/**
 * auth.config.ts — Edge-compatible Auth.js configuration
 *
 * Does NOT import Prisma, pg, or bcrypt so it can run safely in Next.js Middleware (Edge runtime).
 */
export const authConfig = {
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const { pathname } = nextUrl;
      const isAdminPath = pathname.startsWith("/admin");
      const isLoginPage =
        pathname === "/admin/login" || pathname === "/admin/forgot-password";

      if (!isAdminPath) return true;
      if (isLoginPage) return true;

      const isLoggedIn = !!auth?.user;
      if (!isLoggedIn) return false;

      const role = (auth?.user as { role?: string })?.role;
      if (role !== "ADMIN" && role !== "EDITOR") return false;

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  providers: [], // Configured with Credentials provider in auth.ts (Node.js runtime)
  trustHost: true,
} satisfies NextAuthConfig;
