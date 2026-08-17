import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

/**
 * middleware.ts — Route protection for /admin/* paths running on Edge Runtime
 *
 * Uses authConfig without Prisma/Node.js dependencies to avoid Edge module loading errors.
 */
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*"],
};
