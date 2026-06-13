"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Google } from "@/components/icons/google";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            
            // Supabase automatically handles session persistence
            router.push("/protected");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/protected`,
                },
            });
            if (error) throw error;
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An error occurred");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col w-full gap-8">
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col w-full gap-2">
                    {/* Email Field */}
                    <div className="flex flex-col w-full gap-2">
                        <p className="font-sans text-sm font-medium text-slate-700">VSU Webmail</p>

                        <Input 
                            type="email" 
                            placeholder="student.number@vsu.edu.ph"
                            required
                            className="peer"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />

                        <p className="text-xs text-slate-500 font-medium font-sans opacity-0 peer-focus-visible:opacity-100 transition-opacity duration-200">
                            Please use your official VSU Webmail.
                        </p>
                    </div>
                    {/* Password Field */}
                    <div className="flex flex-col w-full gap-2">
                        <p className="font-sans text-sm font-medium text-slate-700">Password</p>

                        <Input 
                            type="password" 
                            placeholder="••••••••"
                            required
                            className="peer"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />

                        <p className="text-xs text-slate-500 font-medium font-sans opacity-0 peer-focus-visible:opacity-100 transition-opacity duration-200">
                            Use the password associated with your VSU student portal.
                        </p>
                    </div>
                </div>
                {/* Remember Me Checkbox */}
                <div className="flex flex-row w-full gap-3 items-center">
                    <Checkbox 
                        id="RememberMe"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        disabled={isLoading}
                    />
                    <label 
                        htmlFor="RememberMe"
                        className="text-xs text-slate-600 font-sans font-medium cursor-pointer flex-1"
                    >
                        Keep me logged in
                    </label>
                </div>
            </div>
            
            {/* Error Display */}
            {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            {/* Login Button */}
            <Button
                type="submit"
                className="w-full"
                variant={"primary"}
                disabled={isLoading}
            >
                {isLoading ? "Logging in..." : "Login"}
            </Button>
            {/* Divider */}
            <div className="relative flex items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase font-sans font-medium">OR CONTINUE WITH</span>
                <div className="flex-grow border-t border-slate-200"></div>
            </div>
            {/* Google Button */}
            <Button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-400"
                variant={"outline"}
            >
                <Google className="w-7 h-7" />
                Google
            </Button>
            <p className="flex w-full justify-center font-sans text-xs font-medium text-slate-400 gap-[2px]">Don&apos;t have an account?<a href="/auth/sign-up" className="text-primary-500 ">Sign up</a></p>
        </form>
    )
}