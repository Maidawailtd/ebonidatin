import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Eboni Dating - Find Your Perfect Match",
  description:
    "Find genuine connections, explore verified profiles, and start dating today. Join thousands finding love on Eboni Dating - the premium platform for real relationships.",
  generator: "v0.app",
  keywords: [
    "dating",
    "relationships",
    "matches",
    "dating website",
    "online dating",
    "connections",
    "verified profiles",
    "singles",
    "eboni dating",
  ],
  authors: [{ name: "Eboni Dating" }],
  openGraph: {
    title: "Eboni Dating - Find Your Perfect Match",
    description: "Join thousands finding love on the premium platform for real relationships",
    type: "website",
    url: "https://ebonidating.com",
    siteName: "Eboni Dating",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eboni Dating - Find Your Perfect Match",
    description: "Join thousands finding love on the premium platform for real relationships",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Dynamically import to avoid breaking if Supabase not configured
  let user = null
  try {
    const { createClient } = await import("@/utils/supabase/server")
    const supabase = await createClient()
    if (supabase) {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      user = authUser
    }
  } catch (error) {
    // Continue without user if Supabase not configured
  }

  const { Header } = await import("@/components/layout/Header")
  const { Footer } = await import("@/components/layout/Footer")

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Header user={user} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
