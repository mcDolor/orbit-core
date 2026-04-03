import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Fetch role and redirect
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase
          .from("User")
          .select("role")
          .eq("user_id", user.id)
          .single()

        switch (profile?.role) {
          case "admin":
            return NextResponse.redirect(`${origin}/admin`)
          case "officer":
            return NextResponse.redirect(`${origin}/officer`)
          default:
            return NextResponse.redirect(`${origin}/member`)
        }
      }
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Authentication failed`)
}