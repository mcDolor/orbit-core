'use client';

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import Image from "next/image";

export const GoogleButton = () => {
    const [isPending, startTransition] = useTransition();

    const handleGoogleSignIn = () => {
        startTransition(async() => {
            // // Call sign in with OAuth endpoint
           const response = await fetch("/api/auth/oauth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ provider: "google" }),
            });

            if (response.ok) {
                const { url } = await response.json();
                // Redirect to the OAuth provider's authorization URL
                window.location.href = url;
            } else {
                console.error("Failed to initiate Google sign-in");
            }
        });
    };

    return (
        <Button
            onClick={handleGoogleSignIn}
            disabled={isPending}
            variant="outline"
            className="w-full h-12 border border-gray-300 hover:bg-gray-50"
        >
            <Image
                src="https://www.google.com/favicon.ico"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
            />
            {isPending ? "Connecting..." : "Continue with Google"}
        </Button>
    );
};