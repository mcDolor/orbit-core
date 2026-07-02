import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import { MailX } from "lucide-react";

export default function ConfirmExpiredPage() {
  return (
    <AuthLayout
      headline="Don't worry. We'll get you back on track."
      subtext="Request a new confirmation link and try again."
    >
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md px-8 py-10 flex flex-col items-center gap-6 text-center">
        <div className="bg-red-50 rounded-full p-4">
          <MailX size={32} className="text-red-500" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-slate-900 text-2xl">
            Link Expired
          </h2>
          <p className="font-medium text-slate-500 text-sm leading-relaxed">
            This confirmation link has already expired or been used. Please
            sign up again or request a new link.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Link
            href="/sign-up"
            className="bg-primary-500 h-14 rounded-lg w-full flex items-center justify-center font-bold text-white text-base hover:bg-primary-600 transition-colors"
          >
            Sign Up Again
          </Link>
          <Link
            href="/login"
            className="h-14 rounded-lg w-full flex items-center justify-center font-bold text-slate-500 text-base border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}