"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function login(formData: FormData) {
    const supabase = await createClient()

    const credentials = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const { error } = await supabase.auth.signInWithPassword(credentials)

    if (error) {
        redirect("/login?error=Invalid email or password")
    }

    // Fetch user role and redirect accordingly
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect("/login")

    const { data: profile } = await supabase
        .from("User")
        .select("role")
        .eq("user_id", user.id)
        .single()

    revalidatePath("/", "layout")

    switch (profile?.role) {
        case "admin":
            redirect("/admin")
        case "officer":
            redirect("/officer")
        default:
            redirect("/member")
    }
}

export async function loginWithGoogle() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    })

    if (error) {
        redirect("/login?error=Could not authenticate with Google")
    }

    if (data.url) {
        redirect(data.url)
    }
}