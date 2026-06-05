'use client'

import { Moon } from 'lucide-react'

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Platform Name */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">MySoko</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Democratizing Credit for MSMEs
          </p>
        </div>

        {/* Theme Switcher Placeholder */}
        <button
          className="ml-auto p-2 rounded-lg bg-muted hover:bg-border smooth-transition touch-feedback"
          aria-label="Toggle theme"
          disabled
        >
          <Moon className="w-5 h-5 text-foreground opacity-50" />
        </button>
      </div>
    </header>
  )
}
