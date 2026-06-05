'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Zap, User } from 'lucide-react'

export function BottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border shadow-lg sm:hidden">
      <div className="flex items-center justify-around h-16">
        {/* Home */}
        <Link
          href="/home"
          className={`flex flex-col items-center justify-center flex-1 h-full smooth-transition ${
            isActive('/home')
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-current={isActive('/home') ? 'page' : undefined}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
          {isActive('/home') && (
            <div className="absolute bottom-0 w-12 h-1 bg-primary rounded-t-lg" />
          )}
        </Link>

        {/* Loans */}
        <Link
          href="/loans"
          className={`flex flex-col items-center justify-center flex-1 h-full smooth-transition ${
            isActive('/loans')
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-current={isActive('/loans') ? 'page' : undefined}
        >
          <Zap className="w-6 h-6" />
          <span className="text-xs mt-1">Loans</span>
          {isActive('/loans') && (
            <div className="absolute bottom-0 w-12 h-1 bg-primary rounded-t-lg" />
          )}
        </Link>

        {/* Profile */}
        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center flex-1 h-full smooth-transition ${
            isActive('/profile')
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-current={isActive('/profile') ? 'page' : undefined}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
          {isActive('/profile') && (
            <div className="absolute bottom-0 w-12 h-1 bg-primary rounded-t-lg" />
          )}
        </Link>
      </div>
    </nav>
  )
}
