'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function BackButton() {
    return (
        <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
            <ChevronLeft
                className="w-4 h-4"
            />
            Back to Website
        </Link>
    )
}