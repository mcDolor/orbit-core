"use client";

import { FormField } from "@/components/auth/FormField";
import { SignUpData } from "@/app/(auth)/sign-up/page";

interface Props {
  data: SignUpData;
  onChange: (fields: Partial<SignUpData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
}

export default function Organization({
  data,
  onChange,
  onBack,
  onSubmit,
  loading,
  error,
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        Organization
      </p>

      <FormField
        id="organization"
        label="Select Organization"
        type="text"
        value={data.organization}
        onChange={(e) => onChange({ organization: e.target.value })}
        placeholder="e.g. Supreme Student Council"
        required
      />

      <FormField
        id="officerRole"
        label="Officer Role"
        type="text"
        value={data.officerRole}
        onChange={(e) => onChange({ officerRole: e.target.value })}
        placeholder="e.g. President"
        required
      />

      {error && (
        <p role="alert" className="font-medium text-xs text-red-500">
          {error}
        </p>
      )}

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex-1 h-14 rounded-lg border border-slate-200 font-bold text-slate-600 text-base hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary-500 h-14 rounded-lg font-bold text-white text-base hover:bg-primary-600 transition-colors disabled:opacity-50"
        >
          {loading ? "Submitting…" : "Submit Application"}
        </button>
      </div>
    </form>
  );
}