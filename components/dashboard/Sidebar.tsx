"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  BarChart2,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  role: string;
  orgName: string | null;
  email: string;
  memberRole: string;
}

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Members", href: "/protected/members", icon: Users },
  { label: "Events", href: "/protected/events", icon: CalendarDays },
  { label: "Analytics", href: "/protected/analytics", icon: BarChart2 },
  { label: "Documents", href: "/protected/documents", icon: FileText },
  { label: "Settings", href: "/protected/settings", icon: Settings },
];

function getInitials(email: string) {
  return email.slice(0, 2).toUpperCase();
}

export default function Sidebar({ role, orgName, email, memberRole }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="w-[220px] bg-white border-r border-slate-100 flex flex-col min-h-screen flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
        <Image
          src="/orbit-logo.png"
          alt="Orbit"
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
        <div>
          <p className="font-heading font-bold text-slate-900 text-sm leading-tight">
            Orbit
          </p>
          <p className="text-xs text-slate-400 leading-tight truncate max-w-[130px]">
            {orgName ?? "No organization"} · {memberRole}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 p-3 flex-1">
        <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest px-2 py-2">
          Main
        </p>
        {NAV_ITEMS.slice(0, 4).map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-500"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              )}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}

        <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest px-2 py-2 mt-2">
          Manage
        </p>
        {NAV_ITEMS.slice(4).map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-500"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              )}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-xs font-bold text-primary-500 flex-shrink-0">
            {getInitials(email)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-700 truncate">{email}</p>
            <p className="text-xs text-slate-400 capitalize">{role}</p>
          </div>
          <button
            onClick={handleLogout}
            aria-label="Log out"
            className="text-slate-300 hover:text-red-400 transition-colors"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}