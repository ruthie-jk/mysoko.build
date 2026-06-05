'use client'

import { useAuth } from '@/lib/auth-context'
import { useOffline } from '@/lib/offline-context'
import { Loan } from '@/lib/types'
import { LoanCarousel } from '@/components/features/loan-carousel'
import { StatsSkeleton, CardSkeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TrendingUp, Send, Plus, Clock } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const MOCK_STATS = {
  totalBalance: 2135054,
  availableBalance: 45054,
  activeLoans: 1,
  pendingApplications: 2,
}

const MOCK_CHART_DATA = [
  { month: 'Jan', income: 40000, expense: 24000 },
  { month: 'Feb', income: 30000, expense: 13000 },
  { month: 'Mar', income: 20000, expense: 98000 },
  { month: 'Apr', income: 27000, expense: 39000 },
  { month: 'Jun', income: 20000, expense: 80000 },
  { month: 'Jul', income: 30000, expense: 20000 },
]

export default function HomePage() {
  const { user } = useAuth()
  const { isOnline } = useOffline()
  const router = useRouter()
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch('/api/loans')
        const data = await response.json()
        setLoans(data.loans)
      } catch (error) {
        console.error('[v0] Failed to fetch loans:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLoans()
  }, [])

  const handleSelectLoan = (loan: Loan) => {
    router.push(`/loans?selected=${loan.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Offline Indicator */}
      {!isOnline && (
        <div className="bg-destructive/10 border-b border-destructive/30 px-4 py-2">
          <p className="text-xs sm:text-sm text-destructive font-medium">
            You&apos;re offline. Some features may be limited.
          </p>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Greeting */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {user?.businessName} | {user?.industry}
          </p>
        </div>

        {/* Statistics Card */}
        {loading ? (
          <StatsSkeleton />
        ) : (
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 sm:p-8 text-primary-foreground space-y-6">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-foreground rounded-full blur-3xl" />
            </div>

            {/* Available Balance */}
            <div className="relative z-10">
              <p className="text-primary-foreground/80 text-sm mb-1">Available Balance</p>
              <h2 className="text-4xl sm:text-5xl font-bold">
                ₦{MOCK_STATS.availableBalance.toLocaleString()}
              </h2>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <button className="flex items-center justify-between bg-primary-foreground/20 hover:bg-primary-foreground/30 backdrop-blur-sm px-4 py-3 rounded-lg smooth-transition touch-feedback group">
                <span className="font-medium text-sm">Top Up</span>
                <Plus className="w-4 h-4 group-hover:scale-110 smooth-transition" />
              </button>
              <button className="flex items-center justify-between bg-primary-foreground/20 hover:bg-primary-foreground/30 backdrop-blur-sm px-4 py-3 rounded-lg smooth-transition touch-feedback group">
                <span className="font-medium text-sm">Send</span>
                <Send className="w-4 h-4 group-hover:scale-110 smooth-transition" />
              </button>
              <button
                onClick={() => router.push('/loans')}
                className="flex items-center justify-between bg-primary-foreground/20 hover:bg-primary-foreground/30 backdrop-blur-sm px-4 py-3 rounded-lg smooth-transition touch-feedback group col-span-2"
              >
                <span className="font-medium text-sm">Apply for Loan</span>
                <TrendingUp className="w-4 h-4 group-hover:scale-110 smooth-transition" />
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20 relative z-10">
              <div>
                <p className="text-primary-foreground/70 text-xs">Total Balance</p>
                <p className="font-semibold">₦{MOCK_STATS.totalBalance.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-primary-foreground/70 text-xs">Active Loans</p>
                <p className="font-semibold">{MOCK_STATS.activeLoans}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loan Carousel */}
        {loading ? (
          <CardSkeleton />
        ) : (
          <LoanCarousel loans={loans} onSelectLoan={handleSelectLoan} />
        )}

        {/* Chart Section */}
        {loading ? (
          <CardSkeleton />
        ) : (
          <div className="bg-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Monthly Overview</h3>
              <select className="text-sm px-3 py-1 bg-muted rounded-lg border border-border">
                <option>This Month</option>
              </select>
            </div>

            <div className="w-full h-64 -mx-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_CHART_DATA} margin={{ left: -20, right: 0, top: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="income" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="expense" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Recent Activity */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-foreground">Pending Applications</h4>
            </div>
            <p className="text-3xl font-bold text-primary">{MOCK_STATS.pendingApplications}</p>
            <p className="text-xs text-muted-foreground mt-2">Review status in profile</p>
          </div>

          {/* Quick Tip */}
          <div className="bg-accent/10 rounded-xl p-4 border border-accent/30">
            <h4 className="font-semibold text-foreground mb-2">Quick Tip</h4>
            <p className="text-sm text-muted-foreground">
              Complete your KYC documentation to unlock higher loan limits and faster approvals.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
