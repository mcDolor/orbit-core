import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/member/dashboard";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      redirect(next);
    }

    // Already confirmed
    if (error.message.toLowerCase().includes("already confirmed")) {
      redirect("/login?notice=already-confirmed");
    }

    // Expired or invalid token
    if (
      error.message.toLowerCase().includes("expired") ||
      error.message.toLowerCase().includes("invalid")
    ) {
      redirect("/confirm-expired");
    }

    // Fallback
    redirect(`/error?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/error?error=${encodeURIComponent("No token hash or type")}`);
}