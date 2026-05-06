"use client";


import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AuthTab() {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <div className="relative flex flex-row w-full">
            <motion.div
                className="absolute inset-y-1 left-1 rounded-lg bg-white shadow-sm w-[calc(50%-4px)"
                initial={{ x: "-100%" }}
                animate={{ x: activeTab === "login" ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Login Button */}
            <Button 
                variant="secondary"
                onClick={() => setActiveTab("login")}
                className={cn(
                    "relative z-10 flex-1 transition-colors rounded-tl-lg duration-300",
                    activeTab === "login" ? "text-slate-900" : "text-slate-500 hover:bg-transparent"
                )}
            >
            Login
            </Button>

            {/* Sign Up Button */}
            <Button
                variant="secondary"
                onClick={() => setActiveTab("signup")}
                className={cn(
                    "relative z-10 flex-1 transition-colors rounded-tr-lg duration-300",
                    activeTab === "signup" ? "text-slate-900" : "text-slate-500 hover:bg-transparent"
                )}
            >
            Sign up
            </Button>
        </div>
  );
}