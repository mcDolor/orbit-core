'use client';

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        startTransition((async () => {
            try {
                const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password, rememberMe }),
                });

                if (response.ok) { 
                    toast.success("Login successful! Redirecting...");
                } else {
                    const data = await response.json();
                    toast.error(data.message || "Login failed. Please try again.");
                }
            } catch (error) {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label 
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                >
                    Email
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Input your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isPending}
                    className="h-12 border-gray-300"
                />
            </div>

            <div className="space-y-2">
                <label 
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900"
                >
                    Password
                </label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Input your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isPending}
                    className="h-12 border-gray-300"
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="rememberMe"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(!!checked)}
                        disabled={isPending}
                    />
                    <label 
                        htmlFor="rememberMe"
                        className="text-sm font-medium text-gray-900 cursor-pointer"
                    >
                        Remember me
                    </label>
                </div>
                <Link 
                    href="/auth/forgot-password" 
                    className="text-sm font-medium text-gray-900 hover:underline"
                >
                    Forgot password?
                </Link>
            </div>

            <Button 
                type="submit" 
                disabled={isPending}
                className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full"
            >
                {isPending ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link 
                    href="/auth/signup" 
                    className="text-sm font-semibold text-gray-900 hover:underline"
                >
                    Sign up here
                </Link>
            </p>
        </form>
    );
}