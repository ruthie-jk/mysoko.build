'use client'

import { AppProvider } from '@/components/layout/app-provider'
import { TopNav } from '@/components/layout/top-nav'
import { BottomNav } from '@/components/layout/bottom-nav'

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main className="pb-20 sm:pb-8 min-h-screen">{children}</main>
      <BottomNav />
    </>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </AppProvider>
  )
}
