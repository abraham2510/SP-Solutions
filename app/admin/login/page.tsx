"use client";

import { Suspense, useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/admin/dashboard";
  const errorParam = params.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    errorParam === "unauthorized"
      ? "Your account does not have admin access."
      : errorParam === "CredentialsSignin"
      ? "Invalid email or password."
      : null
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <Card className="shadow-xl border-slate-200 bg-white rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        <div className="flex flex-col items-center justify-center mb-6 text-center">
          <img
            src="/logo.png"
            alt="SP Solutions Logo"
            className="h-16 w-auto object-contain mb-3"
          />
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Admin Sign In
          </h1>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-lg p-3 mb-5 text-rose-700 text-xs font-medium">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@spsolutions.com"
                className="pl-9 text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="password"
                type={showPwd ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-9 pr-9 text-slate-900"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 text-slate-400 hover:text-slate-700"
              >
                {showPwd ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full mt-4"
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] space-y-6">
        <Suspense
          fallback={
            <Card className="p-8 text-center text-slate-500 text-sm">
              Loading sign in form...
            </Card>
          }
        >
          <LoginForm />
        </Suspense>

        <p className="text-center text-xs text-slate-400">
          © {new Date().getFullYear()} SP Solutions. Internal access only.
        </p>
      </div>
    </div>
  );
}
