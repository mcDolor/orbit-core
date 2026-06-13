import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Google } from "@/components/icons/google";

export default function LoginForm() {
    return (
        <div className="flex flex-col w-full gap-8">
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
                        />

                        <p className="text-xs text-slate-500 font-medium font-sans opacity-0 peer-focus-visible:opacity-100 transition-opacity duration-200">
                            Use the password associated with your VSU student portal.
                        </p>
                    </div>
                </div>
                {/* Remember Me Checkbox */}
                <div className="flex flex-row w-full gap-2 items-center">
                    <Checkbox 
                        id="RememberMe"
                        className="peer-data-[state=checked]:bg-primary-500"
                    />
                    <label 
                        htmlFor="RememberMe"
                        className="text-xs text-slate-600 font-sans font-medium cursor-pointer"
                    >
                        Keep me logged in
                    </label>
                </div>
            </div>
            {/* Login Button */}
            <Button
                type="submit"
                className="w-full "
                variant={"primary"}
            >
                Login
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
                className="w-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-400"
                variant={"outline"}
            >
                <Google className="w-7 h-7" />
                Google
            </Button>
            <p className="flex w-full justify-center font-sans text-xs font-medium text-slate-400 gap-[2px]">Don&apos;t have an account?<a href="/signup" className="text-primary-500 ">Sign up</a></p>
        </div>
    )
}