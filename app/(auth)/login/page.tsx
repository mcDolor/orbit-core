"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { FormField, PasswordField } from "@/components/auth/FormField";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

// Separate component for anything that uses useSearchParams
function LoginNotice() {
  const searchParams = useSearchParams();
  const notice = searchParams.get("notice");

  if (notice === "already-confirmed") {
    return (
      <div className="mt-4 flex items-center gap-2 bg-green-50 border border-primary-500 rounded-lg p-3">
        <CheckCircle size={16} className="text-primary-500 shrink-0" />
        <p className="text-xs font-medium text-primary-500">
          Your email is already confirmed. Please log in.
        </p>
      </div>
    );
  }

  return null;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const supabase = createClient();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/protected` },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md px-8 py-8">
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="font-bold text-slate-900 text-2xl">Welcome Back, Officer</h2>
          <p className="font-medium text-slate-500 text-sm">
            Sign in to start managing your organization with ease.
          </p>
        </div>

        <AuthTabs active="login" />

        {/* Wrap useSearchParams usage in Suspense */}
        <Suspense>
          <LoginNotice />
        </Suspense>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
          <div className="flex flex-col gap-4">
            <FormField
              id="email"
              label="VSU Webmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student.number@vsu.edu.ph"
              required
              disabled={loading}
            />
            <PasswordField
              id="password"
              label={
                <span className="flex w-full justify-between">
                  <span>Password</span>
                  <Link
                    href="/forgot-password"
                    className="font-medium text-primary-500 text-xs hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </span>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <p role="alert" className="font-medium text-xs text-red-500">
              {error}
            </p>
          )}

          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(v) => setRememberMe(Boolean(v))}
              disabled={loading}
            />
            <Label htmlFor="remember" className="font-medium text-slate-600 text-xs cursor-pointer">
              Keep me logged in
            </Label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary-500 h-14 rounded-lg w-full font-bold text-white text-base hover:bg-primary-600 transition-colors disabled:opacity-70"
          >
            {loading ? "Signing in…" : "Login"}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="font-medium text-slate-400 text-xs uppercase whitespace-nowrap">
              or continue with
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <GoogleButton onClick={signInWithGoogle} />
        </form>

        <p className="mt-6 text-center font-medium text-slate-400 text-xs">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary-500 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}