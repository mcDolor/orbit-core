"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Tab = "login" | "signup";

interface AuthTabsProps {
  active: Tab;
}

const TABS: { id: Tab; label: string; href: string }[] = [
  { id: "login", label: "Login", href: "/login" },
  { id: "signup", label: "Sign up", href: "/sign-up" },
];

export function AuthTabs({ active }: AuthTabsProps) {
  return (
    <div className="flex h-10 items-center w-full">
      {TABS.map(({ id, label, href }, idx) => {
        const isActive = active === id;
        return (
          <Link
            key={id}
            href={href}
            className={cn(
              "flex-1 flex items-center justify-center px-4 py-3 border-b-[3px] border-solid transition-colors",
              idx === 0 ? "rounded-tl-2xl" : "rounded-tr-2xl",
              isActive
                ? "border-primary-500 cursor-default pointer-events-none"
                : "border-slate-200 hover:border-primary-500",
            )}
          >
            <span
              className={cn(
                "font-medium text-sm whitespace-nowrap",
                isActive ? "text-slate-900" : "text-slate-300",
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
