"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuthTabProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AuthTab({ activeTab, onTabChange }: AuthTabProps) {
    return (
        <div className="relative flex flex-row w-full border-b border-slate-200">
            {/* Login Button */}
            <Button 
                variant="secondary"
                onClick={() => onTabChange("login")}
                className={cn(
                    "relative z-10 flex-1 transition-all rounded-none duration-300 border-b-2",
                    activeTab === "login" ? "text-slate-900 font-body border-b-primary-500" : "text-slate-500 hover:bg-transparent border-b-transparent"
                )}
            >
            Login
            </Button>

            {/* Sign Up Button */}
            <Button
                variant="secondary"
                onClick={() => onTabChange("signup")}
                className={cn(
                    "relative z-10 flex-1 transition-all rounded-none duration-300 border-b-2",
                    activeTab === "signup" ? "text-slate-900 border-b-primary-500" : "text-slate-500 hover:bg-transparent border-b-transparent"
                )}
            >
            Sign up
            </Button>
        </div>
  );
}