"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Label } from "@/components/ui/label";
import { SignUpData } from "@/app/(auth)/sign-up/page";

interface Props {
  data: SignUpData;
  onChange: (fields: Partial<SignUpData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
}

type Org = { org_id: string; name: string };

export default function SelectOrganization({
  data,
  onChange,
  onBack,
  onSubmit,
  loading,
  error,
}: Props) {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchOrgs = async () => {
      const supabase = createClient();
      const { data: result } = await supabase
        .from("Organization")
        .select("org_id, name")
        .eq("status", "active")
        .eq("is_delete", false)
        .order("name");
      setOrgs(result ?? []);
      setFetching(false);
    };
    fetchOrgs();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const selectClass =
    "w-full h-11 rounded-lg border border-input bg-background px-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 disabled:opacity-50";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center w-full pb-3 border-b border-slate-200">
        Organization
      </p>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="organization"
          className="font-medium text-slate-700 text-sm"
        >
          Select Organization
        </Label>
        <select
          id="organization"
          value={data.organization}
          onChange={(e) => onChange({ organization: e.target.value })}
          disabled={fetching || loading}
          required
          className={selectClass}
        >
          <option value="" disabled>
            {fetching ? "Loading organizations…" : "Select your organization"}
          </option>
          {orgs.map((org) => (
            <option key={org.org_id} value={org.org_id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>

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
          disabled={loading || fetching}
          className="flex-1 bg-primary-500 h-14 rounded-lg font-bold text-white text-base hover:bg-primary-600 transition-colors disabled:opacity-50"
        >
          {loading ? "Submitting…" : "Submit"}
        </button>
      </div>
    </form>
  );
}