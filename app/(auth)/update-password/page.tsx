"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { PasswordField } from "@/components/auth/FormField";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.push("/login");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <AuthLayout
      headline="Set a New Password. Stay Secure."
      subtext="Choose a strong password to keep your Orbit account protected."
    >
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md px-8 py-8">
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="font-bold text-slate-900 text-2xl">Update Password</h2>
          <p className="font-medium text-slate-500 text-sm">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <PasswordField
            id="password"
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            disabled={loading}
          />
          <PasswordField
            id="confirmPassword"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••••••"
            error={passwordMismatch ? "Passwords do not match" : undefined}
            required
            disabled={loading}
          />

          {error && (
            <p role="alert" className="font-medium text-xs text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || passwordMismatch}
            className="bg-primary-500 h-14 rounded-lg w-full font-bold text-white text-base hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}