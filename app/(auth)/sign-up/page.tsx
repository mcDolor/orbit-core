"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { AuthTabs } from "@/components/auth/AuthTabs";
import SignUpStep1 from "@/components/auth/signup/AccountSetup";
import SignUpStep2 from "@/components/auth/signup/PersonalInformation";
import SignUpStep3 from "@/components/auth/signup/Organization";
import SignUpSuccess from "@/components/auth/signup/SignUpSuccess";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  studentNumber: string;
  organization: string;
  officerRole: string;
};

const INITIAL_DATA: SignUpData = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  studentNumber: "",
  organization: "",
  officerRole: "",
};

export default function SignUpPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [data, setData] = useState<SignUpData>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const update = (fields: Partial<SignUpData>) =>
    setData((prev) => ({ ...prev, ...fields }));

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            student_number: data.studentNumber,
            organization: data.organization,
            officer_role: data.officerRole,
          },
        },
      });
      if (signUpError) throw signUpError;
      setStep(4);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      headline="Join the Orbit. Lead with Confidence."
      subtext="Create your officer account and start managing your organization from day one."
    >
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md px-8 py-8">
        {/* Header — hidden on success screen */}
        {step !== 4 && (
          <>
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="font-bold text-slate-900 text-2xl">
                Create Account
              </h2>
              <p className="font-medium text-slate-500 text-sm">
                Join thousands of VSU organization officers already using Orbit.
              </p>
            </div>
            <AuthTabs active="signup" />
          </>
        )}

        <div className="mt-8">
          {step === 1 && (
            <SignUpStep1
              data={data}
              onChange={update}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <SignUpStep2
              data={data}
              onChange={update}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <SignUpStep3
              data={data}
              onChange={update}
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          )}
          {step === 4 && (
            <SignUpSuccess onReturnToLogin={() => router.push("/login")} />
          )}
        </div>
      </div>
    </AuthLayout>
  );
}