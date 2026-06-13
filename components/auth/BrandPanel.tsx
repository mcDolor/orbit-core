import Image from "next/image"
import { Button } from "../ui/button"
import { LucideArrowLeft } from "lucide-react"

interface BrandPanelProps {
  headline?: string;
  subtext?: string;
}

const DEFAULTS = {
  headline: "Clear the Chaos. Connect the Campus. Built for VSU.",
  subtext: "The all-in-one platform that turns organization management from a semester-long headache into a streamlined, transparent experience.",
};

export default function BrandPanel({ headline, subtext }: BrandPanelProps) {
  return (
    <div className="hidden lg:flex z-20 flex-col flex-1 items-start justify-between px-8 lg:px-12 py-8 lg:py-12">
      <div className="flex flex-row w-full items-center justify-between px-2 py-2">
        <Image
          src="/orbit-logo.png"
          alt="Orbit Logo"
          width={60}
          height={62}
          className="h-12 lg:h-16 w-auto object-contain"
        />
        <div className="flex flex-row items-center gap-2">
          <LucideArrowLeft className="text-white w-4 h-4 lg:w-5 lg:h-5" />
          <Button variant="link" className="text-white text-xs p-0">Back to Website</Button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-white text-2xl lg:text-4xl font-heading font-bold">
          {headline ?? DEFAULTS.headline}
        </h1>
        <p className="text-xs lg:text-sm text-white font-medium font-sans">
          {subtext ?? DEFAULTS.subtext}
        </p>
      </div>
    </div>
  );
}