'use client'

import { AuthProvider } from '@/lib/auth-context'
import { OfflineProvider } from '@/lib/offline-context'
import { ThemeProvider } from '@/lib/theme-context'
import { ReactNode } from 'react'

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <OfflineProvider>{children}</OfflineProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
