import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { SettingsClient, SystemDiagnostics } from "./SettingsClient";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await requireAdmin();

  // Perform real live database latency check
  let dbStatus: "CONNECTED" | "DISCONNECTED" | "ERROR" = "DISCONNECTED";
  let dbLatency = 0;
  const startTime = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "CONNECTED";
    dbLatency = Date.now() - startTime;
  } catch (error) {
    console.error("Database status check error:", error);
    dbStatus = "ERROR";
  }

  // Check real environment properties
  const isCloudinaryConfigured = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  );

  const isAuthActive = Boolean(
    process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  );

  const diagnostics: SystemDiagnostics = {
    dbStatus,
    dbLatency,
    isAuthActive,
    isCloudinaryConfigured,
    nodeVersion: process.version,
    nodeEnv: process.env.NODE_ENV || "development",
  };

  return <SettingsClient user={user} diagnostics={diagnostics} />;
}
