import { Mail } from "lucide-react";

interface Props {
  onReturnToLogin: () => void;
}

export default function SignUpSuccess({ onReturnToLogin }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      <div className="bg-primary-50 rounded-full p-5">
        <Mail size={32} className="text-primary-500" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-slate-900 text-2xl">
          Application Submitted
        </h2>
        <p className="font-medium text-slate-500 text-sm leading-relaxed">
          Your request to join as an officer has been sent to the
          administration. We will notify you via your VSU webmail as soon as
          your application is approved or if we need more information.
        </p>
      </div>

      <button
        onClick={onReturnToLogin}
        className="mt-2 font-semibold text-sm text-primary-500 hover:underline transition-colors"
      >
        Return to Login
      </button>
    </div>
  );
}