"use client"

import { useEffect, useState } from "react"
import Images from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const slides = [
    {
        image: "/bg-1.webp",
        alt: "Background Image: full shot student library"
    },
    {
        image: "/bg-2.webp",
        alt: "Background Image: high angle students learning library"
    },
    {
        image: "/bg-3.webp",
        alt: "Background Image: female business leader with thumbs up"
    },
    {
        image: "/bg-4.webp",
        alt: "Background Image: gold silver chess board game business metaphor"
    }
]

export default function AuthCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative hidden lg:flex w-[55%] flex-col overflow-hidden bg-black">
            {/* Background Image */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                    <Images
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/30" />
                </div>
            ))}

            {/* Top bar */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4">
                {/* Orbit logo */}
                <div className="flex flex-col items-center">
                    <Link href="/">
                        <Images src="/logo.webp" alt="Orbit Logo" width={70} height={70} />
                    </Link>
                </div>

                {/* Back to Website */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-white text-sm hover:underline"
                    >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Website
                </Link>
            </div>

            {/* Carousel Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentSlide
                                ? "w-8 bg-white"
                                : "w-2 bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}