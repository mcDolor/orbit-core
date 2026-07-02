import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";

async function AnalyticsContent() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims) redirect("/login");

  const userId = claims.claims.sub;

  const { data: membership } = await supabase
    .from("OrgMember")
    .select("org_id, role, Organization(name)")
    .eq("user_id", userId)
    .eq("is_deleted", false)
    .single();

  if (!membership) redirect("/");

  const orgId = membership.org_id;

  const { count: totalMembers } = await supabase
    .from("OrgMember")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId)
    .eq("is_deleted", false);

  const { data: events } = await supabase
    .from("Event")
    .select(`event_id, name, event_date, AttendanceLog(count)`)
    .eq("org_id", orgId)
    .eq("status", "active")
    .order("event_date", { ascending: true });

  const eventStats = (events ?? []).map((e) => ({
    name: e.name,
    date: e.event_date,
    attended:
      (e.AttendanceLog as unknown as { count: number }[])[0]?.count ?? 0,
    total: totalMembers ?? 0,
    rate:
      totalMembers
        ? Math.round(
            (((e.AttendanceLog as unknown as { count: number }[])[0]?.count ?? 0) /
              totalMembers) *
              100
          )
        : 0,
  }));

  const avgAttendance =
    eventStats.length > 0
      ? Math.round(
          eventStats.reduce((sum, e) => sum + e.rate, 0) / eventStats.length
        )
      : 0;

  const lowestEvent =
    eventStats.length > 0
      ? eventStats.reduce((min, e) => (e.rate < min.rate ? e : min), eventStats[0])
      : null;

  return (
    <AnalyticsDashboard
      orgName={(membership.Organization as unknown as { name: string }).name}
      totalMembers={totalMembers ?? 0}
      totalEvents={eventStats.length}
      avgAttendance={avgAttendance}
      lowestEvent={lowestEvent}
      eventStats={eventStats}
    />
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="p-7 max-w-5xl mx-auto animate-pulse">
      <div className="h-4 w-24 bg-slate-100 rounded mb-2" />
      <div className="h-8 w-48 bg-slate-100 rounded mb-6" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-slate-50 rounded-xl p-4 h-24" />
        ))}
      </div>
      <div className="bg-white border border-slate-100 rounded-2xl p-6 h-64 mb-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-6 h-48" />
        <div className="bg-white border border-slate-100 rounded-2xl p-6 h-48" />
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<AnalyticsSkeleton />}>
      <AnalyticsContent />
    </Suspense>
  );
}