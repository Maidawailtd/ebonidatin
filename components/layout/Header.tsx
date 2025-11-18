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
    <header className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Heart className="text-white" size={20} fill="white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                eboni
              </h1>
              <span className="text-[10px] text-muted-foreground -mt-1">dating</span>
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
                <div className="flex items-center gap-3">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
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
        <div className="md:hidden border-t border-border">
          <nav className="px-4 py-4 space-y-3" aria-label="Mobile navigation">
            {user ? (
              <>
                <Link
                  href="/discover"
                  className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Discover
                </Link>
                <Link
                  href="/matches"
                  className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Matches
                </Link>
                <Link
                  href="/messages"
                  className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Messages
                </Link>
                <Link
                  href="/profile"
                  className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button onClick={handleSignOut} variant="ghost" size="sm" className="w-full justify-start">
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/about"
                  className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/discover"
                  className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse
                </Link>
                <div className="pt-3 space-y-2">
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white">
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
