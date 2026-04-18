import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const fontBody = Inter({ 
  subsets: ["latin"],
  variable: "--font-body",
});

const _montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "600",
})

export const metadata: Metadata = {
  title: 'Orbit - Streamlined Organization Management for VSU',
  description: 'Orbit is the all-in-one platform designed to simplify organization management for VSU. Say goodbye to semester-long headaches and hello to a streamlined, transparent experience.',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fontBody.variable} ${_montserrat.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
