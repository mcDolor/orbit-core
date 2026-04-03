import AuthCarousel from "@/components/auth/AuthCarousel"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login, loginWithGoogle } from "./actions"
import Link from "next/link"

export default function LoginPage() {
    return (
        <>
            {/* Left - Carousel */}
            <AuthCarousel />

            {/* Right - Login Form */}
            <div className="flex flex-1 items-center justify-center bg-white px-8 py-12 lg:px-16">
                <div className="w-full max-w-md space-y-8">
                {/* Heading */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-gray-900">
                    Welcome Back!
                    </h1>
                    <p className="text-gray-500 text-sm">
                    Log in to start managing your organization with ease.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5">
                    {/* Email */}
                    <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Input your email"
                        required
                        className="h-12 rounded-xl border-gray-300 focus:border-[#2D6A2D] focus:ring-[#2D6A2D]"
                    />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Input your password"
                        required
                        className="h-12 rounded-xl border-gray-300 focus:border-[#2D6A2D] focus:ring-[#2D6A2D]"
                    />
                    </div>

                    {/* Remember me + Forgot password */}
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox
                        id="remember"
                        name="remember"
                        className="border-gray-400 data-[state=checked]:bg-[#2D6A2D] data-[state=checked]:border-[#2D6A2D]"
                        />
                        <Label
                        htmlFor="remember"
                        className="text-sm text-gray-600 cursor-pointer"
                        >
                        Remember Me
                        </Label>
                    </div>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-gray-600 hover:text-[#2D6A2D] hover:underline"
                    >
                        Forgot Password?
                    </Link>
                    </div>

                    {/* Login button */}
                    <Button
                    formAction={login}
                    className="w-full h-12 rounded-full bg-[#2D6A2D] hover:bg-[#245824] text-white font-semibold text-base"
                    >
                    Login
                    </Button>
                </form>

                {/* Divider */}
                <div className="relative flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                    Or continue with:
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Google OAuth */}
                <form>
                    <Button
                    formAction={loginWithGoogle}
                    variant="outline"
                    className="w-full h-12 rounded-full border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 flex items-center justify-center gap-3"
                    >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                        />
                        <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                        />
                        <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                        />
                        <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                        />
                    </svg>
                    Continue with Google
                    </Button>
                </form>

                {/* Sign up link */}
                <p className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link
                    href="/signup"
                    className="font-bold text-gray-800 hover:text-[#2D6A2D] hover:underline"
                    >
                    Sign up here
                    </Link>
                </p>
                </div>
            </div>
        </>
    )
}