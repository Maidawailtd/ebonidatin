'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Heart, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  user?: any
}

export function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-3 transition-transform">
              <Heart className="text-primary-foreground" size={20} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tight text-foreground">
                eboni
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {user ? (
              <>
                <Link href="/discover" className="text-sm font-medium hover:text-primary transition-colors">
                  Discover
                </Link>
                <Link href="/matches" className="text-sm font-medium hover:text-primary transition-colors">
                  Matches
                </Link>
                <Link href="/messages" className="text-sm font-medium hover:text-primary transition-colors">
                  Messages
                </Link>
                <Link href="/profile" className="text-sm font-medium hover:text-primary transition-colors">
                  Profile
                </Link>
                <Button onClick={handleSignOut} variant="ghost" size="sm">
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/discover" className="text-sm font-medium hover:text-primary transition-colors">
                  Browse
                </Link>
                <div className="flex items-center gap-3 ml-4">
                  <Link href="/auth/login">
                    <Button variant="ghost" className="font-medium">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-4 py-6 space-y-4" aria-label="Mobile navigation">
            {user ? (
              <>
                <Link
                  href="/discover"
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Discover
                </Link>
                <Link
                  href="/matches"
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Matches
                </Link>
                <Link
                  href="/messages"
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Messages
                </Link>
                <Link
                  href="/profile"
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button onClick={handleSignOut} variant="ghost" size="lg" className="w-full justify-start px-0">
                  <LogOut size={20} className="mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/about"
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/discover"
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse
                </Link>
                <div className="pt-6 space-y-3">
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="lg" className="w-full rounded-full">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="lg" className="w-full rounded-full bg-primary text-primary-foreground">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
