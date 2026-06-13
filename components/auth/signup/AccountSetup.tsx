"use client";

import { FormField, PasswordField } from "@/components/auth/FormField";
import { SignUpData } from "@/app/(auth)/sign-up/page";

interface Props {
  data: SignUpData;
  onChange: (fields: Partial<SignUpData>) => void;
  onNext: () => void;
}

export default function AccountSetup({ data, onChange, onNext }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) return;
    onNext();
  };

  const passwordMismatch =
    data.confirmPassword.length > 0 && data.password !== data.confirmPassword;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center w-full pb-3 border-b border-slate-200">
        Account Setup
      </p>

      <FormField
        id="email"
        label="VSU Webmail"
        type="email"
        value={data.email}
        onChange={(e) => onChange({ email: e.target.value })}
        placeholder="student.number@vsu.edu.ph"
        required
      />

      <PasswordField
        id="password"
        label="Password"
        value={data.password}
        onChange={(e) => onChange({ password: e.target.value })}
        placeholder="••••••••••••"
        required
      />

      <PasswordField
        id="confirmPassword"
        label="Confirm Password"
        value={data.confirmPassword}
        onChange={(e) => onChange({ confirmPassword: e.target.value })}
        placeholder="••••••••••••"
        error={passwordMismatch ? "Passwords do not match" : undefined}
        required
      />

      <button
        type="submit"
        disabled={passwordMismatch}
        className="bg-primary-500 h-14 rounded-lg w-full font-bold text-white text-base hover:bg-primary-600 transition-colors disabled:opacity-50 mt-2"
      >
        Continue
      </button>
    </form>
  );
}