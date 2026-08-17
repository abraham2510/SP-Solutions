"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Database,
  Key,
  Server,
  User,
  Settings as SettingsIcon,
  Lock,
  Cloud,
  CheckCircle2,
  Cpu,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updatePasswordAction } from "@/actions/settings";

export interface SystemDiagnostics {
  dbStatus: "CONNECTED" | "DISCONNECTED" | "ERROR";
  dbLatency: number;
  isAuthActive: boolean;
  isCloudinaryConfigured: boolean;
  nodeVersion: string;
  nodeEnv: string;
}

interface UserProfile {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
}

export function SettingsClient({
  user,
  diagnostics,
}: {
  user: UserProfile;
  diagnostics: SystemDiagnostics;
}) {
  const [activeTab, setActiveTab] = useState<"account" | "system">("account");
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  // Form State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);

    if (!newPassword || !confirmPassword) {
      setFeedback({
        type: "error",
        message: "Please fill in all password fields.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({
        type: "error",
        message: "New password and confirmation do not match.",
      });
      return;
    }

    if (newPassword.length < 6) {
      setFeedback({
        type: "error",
        message: "New password must be at least 6 characters long.",
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("newPassword", newPassword);
      formData.append("confirmPassword", confirmPassword);

      const res = await updatePasswordAction(formData);

      if (res.success) {
        setFeedback({ type: "success", message: res.message });
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setFeedback({ type: "error", message: res.message });
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err.message || "Failed to update password.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Settings & Administration
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your SP Solutions admin profile, security parameters, and live system diagnostics.
          </p>
        </div>
        <Badge
          variant="outline"
          className={`self-start md:self-auto text-xs px-3 py-1 font-semibold ${
            diagnostics.dbStatus === "CONNECTED"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-rose-50 text-rose-700 border-rose-200"
          }`}
        >
          {diagnostics.dbStatus === "CONNECTED" ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-600" />
              Live DB Online ({diagnostics.dbLatency}ms)
            </>
          ) : (
            <>
              <AlertCircle className="h-3.5 w-3.5 mr-1 text-rose-600" />
              Database Issue
            </>
          )}
        </Badge>
      </div>

      {/* Segmented Toggle Button Bar */}
      <div className="inline-flex items-center p-1 bg-slate-200/70 rounded-xl border border-slate-200 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => setActiveTab("account")}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
            activeTab === "account"
              ? "bg-[#00266A] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <User className="h-4 w-4" />
          <span>Account & Security</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("system")}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
            activeTab === "system"
              ? "bg-[#00266A] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Server className="h-4 w-4" />
          <span>System Diagnostics</span>
        </button>
      </div>

      {/* Account Tab: 2-Column Split Flex Layout */}
      {activeTab === "account" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column: Administrator Profile Card */}
          <Card className="border-slate-200 bg-white shadow-xs h-full">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-xl bg-[#00266A]/10 text-[#00266A]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Administrator Profile
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Authenticated session identity and privileges
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                    Full Name
                  </span>
                  <p className="text-base font-bold text-slate-900">
                    {user.name || "Administrator"}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                    Email Address
                  </span>
                  <p className="text-base font-bold text-slate-900">
                    {user.email}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                      Access Level
                    </span>
                    <div className="pt-0.5">
                      <Badge className="bg-[#00266A] text-white font-semibold text-xs px-2.5 py-0.5">
                        {user.role}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                      Account ID
                    </span>
                    <p className="font-mono text-xs text-slate-600 pt-1 truncate">
                      {user.id}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Direct Password Update Card */}
          <Card className="border-slate-200 bg-white shadow-xs h-full">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Update Password
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Set a new security password for your account
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Feedback Notification */}
              {feedback && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                    feedback.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-rose-50 text-rose-800 border-rose-200"
                  }`}
                >
                  {feedback.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPwd" className="text-xs font-semibold text-slate-700">
                    New Password
                  </Label>
                  <div className="relative flex items-center">
                    <Input
                      id="newPwd"
                      name="newPassword"
                      type={showNewPwd ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                      className="text-xs text-slate-900 pr-10 h-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPwd(!showNewPwd)}
                      className="absolute right-1.5 z-20 flex h-6 w-6 items-center justify-center rounded-md text-slate-500 hover:text-[#00266A] hover:bg-slate-100 transition-colors cursor-pointer"
                      title={showNewPwd ? "Hide password" : "Show password"}
                    >
                      {showNewPwd ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      <span className="sr-only">Toggle password visibility</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPwd" className="text-xs font-semibold text-slate-700">
                    Confirm New Password
                  </Label>
                  <div className="relative flex items-center">
                    <Input
                      id="confirmPwd"
                      name="confirmPassword"
                      type={showConfirmPwd ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                      className="text-xs text-slate-900 pr-10 h-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                      className="absolute right-1.5 z-20 flex h-6 w-6 items-center justify-center rounded-md text-slate-500 hover:text-[#00266A] hover:bg-slate-100 transition-colors cursor-pointer"
                      title={showConfirmPwd ? "Hide password" : "Show password"}
                    >
                      {showConfirmPwd ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      <span className="sr-only">Toggle password visibility</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00266A] text-white hover:bg-[#001D52]"
                  >
                    {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {loading ? "Updating Password..." : "Update Password"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* System Diagnostics Tab: 2-Column Split Flex Layout */}
      {activeTab === "system" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column: Database & Core */}
          <Card className="border-slate-200 bg-white shadow-xs h-full">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-700">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Database & Core Runtime
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  PostgreSQL connection pool & Next.js runtime environment
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Database className="h-4 w-4 text-[#00266A]" />
                    PostgreSQL Engine
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs px-2.5 py-0.5 font-semibold ${
                      diagnostics.dbStatus === "CONNECTED"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    {diagnostics.dbStatus}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">
                  Prisma 7 ORM with native `@prisma/adapter-pg` driver connection pool (Ping: {diagnostics.dbLatency}ms)
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-slate-700" />
                    Next.js Core ({diagnostics.nodeVersion})
                  </div>
                  <Badge variant="outline" className="bg-[#00266A] text-white border-transparent text-xs px-2.5 py-0.5 font-semibold">
                    READY
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">
                  React 19 Server Components, Server Actions, & Turbopack build engine ({diagnostics.nodeEnv} mode)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Authentication & Media Cloud */}
          <Card className="border-slate-200 bg-white shadow-xs h-full">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 border-b border-slate-100 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  Services & Cloud Providers
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Authentication engine & Cloudinary asset CDN status
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Key className="h-4 w-4 text-amber-600" />
                    Auth.js Engine (NextAuth v5)
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs px-2.5 py-0.5 font-semibold ${
                      diagnostics.isAuthActive
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {diagnostics.isAuthActive ? "ACTIVE" : "INACTIVE"}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">
                  Encrypted JWT Session strategy with bcryptjs password security validation
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Cloud className="h-4 w-4 text-sky-600" />
                    Cloudinary Media Engine
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs px-2.5 py-0.5 font-semibold ${
                      diagnostics.isCloudinaryConfigured
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {diagnostics.isCloudinaryConfigured ? "CONFIGURED" : "NOT CONFIGURED"}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">
                  High-resolution industrial machinery image CDN asset storage
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
