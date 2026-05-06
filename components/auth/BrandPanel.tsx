import Image from "next/image"
import { Button } from "../ui/button"
import { LucideArrowLeft } from "lucide-react"

export default function BrandPanel() {
    return (
        <div className="flex z-20 flex-col flex-1 items-start justify-between px-12 py-12">
        {/* Top Nav */}
            <div className="flex flex-row w-full items-center justify-between px-2 py-2">
                <Image
                    src="/orbit-logo.png"
                    alt="Orbit Logo"
                    width={60}
                    height={62}
                    className="h-16 w-auto object-contain"
                />
                <div className="flex flex-row items-center gap-2">
                    <LucideArrowLeft className="text-white" />
                    <Button variant="link" size="sm" className="text-white text-xs p-0">Back to Website</Button>
                </div>
            </div>
        {/* Brand Quote */}
            <div className="flex flex-col w-full gap-2">
                <h1 className="text-white text-4xl font-heading font-bold">Clear the Chaos. Connect the Campus. Built for VSU.</h1>
                <p className="text-sm text-white font-medium font-sans">The all-in-one platform that turns organization management from a semester-long headache into a streamlined, transparent experience.</p>
            </div>
        </div>
    )
}