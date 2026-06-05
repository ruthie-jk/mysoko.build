import { AppProvider } from '@/components/layout/app-provider'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="min-h-screen">{children}</div>
    </AppProvider>
  )
}
