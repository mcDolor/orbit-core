import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/dashboard/Sidebar";

async function SidebarData() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/login");

  const userId = data.claims.sub;

  const [userResult, membershipResult] = await Promise.all([
    supabase.from("User").select("email, role").eq("user_id", userId).single(),
    supabase
      .from("OrgMember")
      .select("role, Organization(name)")
      .eq("user_id", userId)
      .eq("is_deleted", false)
      .single(),
  ]);

  const orgName = membershipResult.data
    ? (membershipResult.data.Organization as unknown as { name: string }).name
    : null;

  return (
    <Sidebar
      role={userResult.data?.role ?? "member"}
      orgName={orgName}
      email={userResult.data?.email ?? ""}
      memberRole={membershipResult.data?.role ?? ""}
    />
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Suspense
        fallback={
          <div className="w-[220px] bg-white border-r border-slate-100 flex-shrink-0" />
        }
      >
        <SidebarData />
      </Suspense>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}