"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";

function ErrorContent() {
  const params = useSearchParams();
  const message = params.get("error") ?? "Something went wrong.";

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md px-8 py-10 flex flex-col items-center gap-6 text-center">
      <div className="bg-red-50 rounded-full p-4">
        <AlertCircle size={32} className="text-red-500" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-slate-900 text-2xl">
          Something went wrong
        </h2>
        <p className="font-medium text-slate-500 text-sm leading-relaxed">
          {message}
        </p>
      </div>
      <Link
        href="/login"
        className="bg-primary-500 h-14 rounded-lg w-full flex items-center justify-center font-bold text-white text-base hover:bg-primary-600 transition-colors"
      >
        Back to Login
      </Link>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <AuthLayout
      headline="Don't worry. We'll get you back on track."
      subtext="If this keeps happening, please contact your organization administrator."
    >
      <Suspense>
        <ErrorContent />
      </Suspense>
    </AuthLayout>
  );
}