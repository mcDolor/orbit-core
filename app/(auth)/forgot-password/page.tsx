"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import AuthLayout from "@/components/auth/AuthLayout";
import { FormField } from "@/components/auth/FormField";

const BRAND = {
  headline: "Recover Your Access. Stay in Command.",
  subtext:
    "We'll send a password reset link to your VSU webmail. Check your inbox and follow the instructions.",
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      headline="Recover Your Access. Stay in Command."
      subtext="We'll send a reset link to your VSU webmail so you can get back to leading."
    >
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md px-8 py-8">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-500 transition-colors mb-8 font-medium text-sm"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>

        {sent ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-green-50 border border-primary-500 rounded-lg p-4">
              <CheckCircle
                size={20}
                className="text-primary-500 shrink-0"
              />
              <div>
                <p className="font-bold text-primary-500 text-sm">
                  Check Your Email
                </p>
                <p className="font-medium text-slate-700 text-xs mt-0.5">
                  A reset link was sent to{" "}
                  <span className="text-primary-500">{email}</span>.
                </p>
              </div>
            </div>
            <Link
              href="/login"
              className="bg-primary-500 h-14 rounded-lg w-full flex items-center justify-center font-bold text-white text-base hover:bg-primary-600 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="font-bold text-slate-900 text-2xl">
                {BRAND.headline}
              </h2>
              <p className="font-medium text-slate-500 text-sm">
                {BRAND.subtext}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <FormField
                id="email"
                label="VSU Webmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student.number@vsu.edu.ph"
                error={error ?? undefined}
                required
                disabled={loading}
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-primary-500 h-14 rounded-lg w-full font-bold text-white text-base hover:bg-primary-600 transition-colors disabled:opacity-70"
              >
                {loading ? "Sending…" : "Send Reset Link"}
              </button>
            </form>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
