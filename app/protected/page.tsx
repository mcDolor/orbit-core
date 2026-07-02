import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CalendarDays, AlertCircle, Users } from "lucide-react";
import Link from "next/link";

async function DashboardContent() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/login");

  const userId = data.claims.sub;

  const { data: membership } = await supabase
    .from("OrgMember")
    .select("org_id, role, Organization(name)")
    .eq("user_id", userId)
    .eq("is_deleted", false)
    .single();

  const { data: userProfile } = await supabase
    .from("User")
    .select("email")
    .eq("user_id", userId)
    .single();

  const firstName = userProfile?.email?.split("@")[0] ?? "Officer";
  const orgId = membership?.org_id;

  const [
    { count: totalMembers },
    { data: upcomingEvents },
    { data: pendingApps },
    { count: pendingCount },
    { data: events },
    { count: unpaidFines },
  ] = await Promise.all([
    supabase
      .from("OrgMember")
      .select("*", { count: "exact", head: true })
      .eq("org_id", orgId)
      .eq("is_deleted", false),
    supabase
      .from("Event")
      .select("event_id, name, event_date, timein_start, timein_end")
      .eq("org_id", orgId)
      .eq("status", "active")
      .gte("event_date", new Date().toISOString().split("T")[0])
      .order("event_date", { ascending: true })
      .limit(3),
    supabase
      .from("OrgApplication")
      .select("application_id, officer_role, created_at, User(email)")
      .eq("org_id", orgId)
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("OrgApplication")
      .select("*", { count: "exact", head: true })
      .eq("org_id", orgId)
      .eq("status", "pending"),
    supabase
      .from("Event")
      .select("event_id, AttendanceLog(count)")
      .eq("org_id", orgId)
      .eq("status", "active"),
    supabase
      .from("Fine")
      .select("*", { count: "exact", head: true })
      .eq("is_paid", false),
  ]);

  const avgAttendance =
    events && events.length > 0 && totalMembers
      ? Math.round(
          (events.reduce(
            (sum, e) =>
              sum +
              ((e.AttendanceLog as unknown as { count: number }[])[0]?.count ?? 0),
            0
          ) /
            events.length /
            totalMembers) *
            100
        )
      : 0;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-7 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900">
            {greeting}, {firstName} 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Here&apos;s what&apos;s happening in your organization today.
          </p>
        </div>
        {(pendingCount ?? 0) > 0 && (
          <Link
            href="/protected/applications"
            className="flex items-center gap-2 bg-primary-50 text-primary-500 text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
          >
            <AlertCircle size={13} />
            {pendingCount} pending application{pendingCount !== 1 ? "s" : ""}
          </Link>
        )}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: "Total Members",
            value: totalMembers ?? 0,
            sub: "registered",
          },
          {
            label: "Upcoming Events",
            value: upcomingEvents?.length ?? 0,
            sub: upcomingEvents?.[0]
              ? `Next: ${new Date(upcomingEvents[0].event_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
              : "No upcoming events",
          },
          {
            label: "Avg. Attendance",
            value: `${avgAttendance}%`,
            sub: "across all events",
          },
          {
            label: "Unpaid Fines",
            value: unpaidFines ?? 0,
            sub: "members with fines",
          },
        ].map((m) => (
          <div
            key={m.label}
            className="bg-slate-50 rounded-xl p-4 flex flex-col gap-1"
          >
            <p className="text-xs font-medium text-slate-400">{m.label}</p>
            <p className="text-2xl font-heading font-bold text-slate-900 mt-0.5">
              {m.value}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Events */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-base text-slate-900">
              Upcoming events
            </h2>
            <Link
              href="/protected/events"
              className="text-xs font-semibold text-primary-500 hover:underline"
            >
              View all →
            </Link>
          </div>
          {!upcomingEvents || upcomingEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <CalendarDays size={28} className="text-slate-200" />
              <p className="text-sm text-slate-300 font-medium">No upcoming events</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-slate-50">
              {upcomingEvents.map((event) => {
                const d = new Date(event.event_date);
                return (
                  <div key={event.event_id} className="flex items-center gap-3 py-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary-500 leading-none">
                        {d.getDate()}
                      </span>
                      <span className="text-[9px] font-semibold text-primary-500 uppercase">
                        {d.toLocaleString("en-US", { month: "short" })}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {event.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {event.timein_start} – {event.timein_end}
                      </p>
                    </div>
                    <span className="text-xs font-semibold bg-primary-50 text-primary-500 px-2.5 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pending Applications */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-base text-slate-900">
              Pending applications
            </h2>
            <Link
              href="/protected/applications"
              className="text-xs font-semibold text-primary-500 hover:underline"
            >
              View all →
            </Link>
          </div>
          {!pendingApps || pendingApps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <Users size={28} className="text-slate-200" />
              <p className="text-sm text-slate-300 font-medium">
                No pending applications
              </p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-slate-50">
              {pendingApps.map((app) => {
                const email =
                  (app.User as unknown as { email: string })?.email ?? "";
                const initials = email.slice(0, 2).toUpperCase();
                const appliedDate = new Date(app.created_at).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric" }
                );
                return (
                  <div
                    key={app.application_id}
                    className="flex items-center gap-3 py-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {email}
                      </p>
                      <p className="text-xs text-slate-400">
                        {app.officer_role} · Applied {appliedDate}
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <Link
                        href={`/protected/applications?action=approve&id=${app.application_id}`}
                        className="text-xs font-semibold bg-primary-50 text-primary-500 px-3 py-1.5 rounded-lg hover:bg-primary-500 hover:text-white transition-colors"
                      >
                        Approve
                      </Link>
                      <Link
                        href={`/protected/applications?action=reject&id=${app.application_id}`}
                        className="text-xs font-semibold bg-red-50 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-400 hover:text-white transition-colors"
                      >
                        Reject
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Skeleton fallback while data loads
function DashboardSkeleton() {
  return (
    <div className="p-7 max-w-6xl mx-auto animate-pulse">
      <div className="h-8 w-64 bg-slate-100 rounded-lg mb-2" />
      <div className="h-4 w-48 bg-slate-100 rounded mb-6" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-slate-50 rounded-xl p-4 h-24" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 h-64" />
        <div className="bg-white border border-slate-100 rounded-2xl p-5 h-64" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}