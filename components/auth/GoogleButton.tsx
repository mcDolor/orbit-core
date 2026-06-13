"use client";

import { Google } from "@/components/icons/google";

interface GoogleButtonProps {
  onClick: () => void;
}

export function GoogleButton({ onClick }: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-white border border-slate-200 h-14 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
    >
      <Google className="size-7" />
      <span className="font-bold text-slate-700 text-base">
        Google
      </span>
    </button>
  );
}
