"use client";

import { FormField } from "@/components/auth/FormField";
import { SignUpData } from "@/app/(auth)/sign-up/page";

interface Props {
  data: SignUpData;
  onChange: (fields: Partial<SignUpData>) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function PersonalInformation({ data, onChange, onBack, onNext }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        Personal Information
      </p>

      <FormField
        id="firstName"
        label="First Name"
        type="text"
        value={data.firstName}
        onChange={(e) => onChange({ firstName: e.target.value })}
        placeholder="Juan"
        required
      />

      <FormField
        id="lastName"
        label="Last Name"
        type="text"
        value={data.lastName}
        onChange={(e) => onChange({ lastName: e.target.value })}
        placeholder="Dela Cruz"
        required
      />

      <FormField
        id="studentNumber"
        label="Student Number"
        type="text"
        value={data.studentNumber}
        onChange={(e) => onChange({ studentNumber: e.target.value })}
        placeholder="##-#-#####"
        required
      />

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 h-14 rounded-lg border border-slate-200 font-bold text-slate-600 text-base hover:bg-slate-50 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 bg-primary-500 h-14 rounded-lg font-bold text-white text-base hover:bg-primary-600 transition-colors"
        >
          Continue
        </button>
      </div>
    </form>
  );
}