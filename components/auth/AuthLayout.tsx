import Image from "next/image";
import BrandPanel from "./BrandPanel";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex flex-row h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/auth-bg.webp"
                    alt="VSU Campus"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
            </div>
            {/* Linear Gradient Overlay */}
            <div
                className="absolute inset-0 z-10 bg-gradient-to-t from-primary-900/70 to-primary-900/20 "
            />
            <BrandPanel  />
            {/* Form Panel */}
            <div className="relative z-20 flex flex-1 h-screen">
                {children}
            </div>
        </div>
    )
}