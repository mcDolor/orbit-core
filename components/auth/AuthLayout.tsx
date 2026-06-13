import Image from "next/image";
import BrandPanel from "./BrandPanel";

interface AuthLayoutProps {
  children: React.ReactNode;
  headline?: string;
  subtext?: string;
}

export default function AuthLayout({ children, headline, subtext }: AuthLayoutProps) {
  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen w-full overflow-hidden">
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
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary-900/70 to-primary-900/20" />
      <BrandPanel headline={headline} subtext={subtext} />
      <div className="relative z-20 flex flex-1 min-h-screen lg:h-screen items-center justify-center">
        {children}
      </div>
    </div>
  );
}