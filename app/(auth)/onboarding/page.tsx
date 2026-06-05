'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronRight, TrendingUp, Zap, Wallet, Globe } from 'lucide-react'

type Step = 'loan-type' | 'amount' | 'industry' | 'complete'

interface Preferences {
  loanType: string
  amountNeeded: number
  industry: string
}

const LOAN_TYPES = [
  { id: 'business-growth', name: 'Business Growth', icon: TrendingUp, color: 'text-blue-600' },
  { id: 'equipment', name: 'Equipment Finance', icon: Zap, color: 'text-orange-600' },
  { id: 'working-capital', name: 'Working Capital', icon: Wallet, color: 'text-purple-600' },
  { id: 'expansion', name: 'Expansion', icon: Globe, color: 'text-green-600' },
]

const INDUSTRIES = [
  'Retail',
  'Manufacturing',
  'Service',
  'Agriculture',
  'Technology',
  'Food & Beverage',
  'Healthcare',
  'Education',
  'Other',
]

const AMOUNT_RANGES = [
  { label: '10K - 50K', value: 30000 },
  { label: '50K - 100K', value: 75000 },
  { label: '100K - 500K', value: 300000 },
  { label: '500K - 1M', value: 750000 },
  { label: '1M+', value: 1000000 },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [step, setStep] = useState<Step>('loan-type')
  const [preferences, setPreferences] = useState<Preferences>({
    loanType: '',
    amountNeeded: 0,
    industry: '',
  })

  const handleLoanTypeSelect = (id: string) => {
    setPreferences(prev => ({ ...prev, loanType: id }))
    setStep('amount')
  }

  const handleAmountSelect = (amount: number) => {
    setPreferences(prev => ({ ...prev, amountNeeded: amount }))
    setStep('industry')
  }

  const handleIndustrySelect = (industry: string) => {
    setPreferences(prev => ({ ...prev, industry }))
    // Save preferences and complete onboarding
    sessionStorage.setItem('mysoko_preferences', JSON.stringify(preferences))
    setStep('complete')
  }

  const handleComplete = () => {
    router.push('/home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted pb-20 sm:pb-8">
      {/* Progress Bar */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <div className={`h-2 flex-1 rounded-full ${step !== 'loan-type' ? 'bg-primary' : 'bg-primary'}`} />
            <div className={`h-2 flex-1 rounded-full ${['amount', 'industry', 'complete'].includes(step) ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-2 flex-1 rounded-full ${['industry', 'complete'].includes(step) ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-2 flex-1 rounded-full ${step === 'complete' ? 'bg-primary' : 'bg-muted'}`} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {step === 'loan-type' && 'Step 1: What loan type do you need?'}
            {step === 'amount' && 'Step 2: How much do you need?'}
            {step === 'industry' && 'Step 3: What industry are you in?'}
            {step === 'complete' && 'All set!'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            Let&apos;s set up your profile to find the best loan options for you.
          </p>
        </div>

        {/* Loan Type Step */}
        {step === 'loan-type' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-foreground font-medium mb-4">What loan type do you need?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LOAN_TYPES.map(type => {
                const IconComponent = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => handleLoanTypeSelect(type.id)}
                    className="p-6 bg-card border border-border rounded-lg hover:border-primary smooth-transition touch-feedback text-left group"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10 smooth-transition`}>
                      <IconComponent className={`w-6 h-6 ${type.color}`} />
                    </div>
                    <h3 className="font-medium text-foreground">{type.name}</h3>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Amount Step */}
        {step === 'amount' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-foreground font-medium mb-4">How much do you need?</p>
            <div className="space-y-2">
              {AMOUNT_RANGES.map(range => (
                <button
                  key={range.value}
                  onClick={() => handleAmountSelect(range.value)}
                  className="w-full p-4 bg-card border border-border rounded-lg hover:border-primary hover:bg-primary/5 smooth-transition touch-feedback flex items-center justify-between group"
                >
                  <span className="font-medium text-foreground">{range.label}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary smooth-transition" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Industry Step */}
        {step === 'industry' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-foreground font-medium mb-4">What industry are you in?</p>
            <div className="grid grid-cols-2 gap-2">
              {INDUSTRIES.map(industry => (
                <button
                  key={industry}
                  onClick={() => handleIndustrySelect(industry)}
                  className="p-3 bg-card border border-border rounded-lg hover:border-primary hover:bg-primary/5 smooth-transition touch-feedback text-center"
                >
                  <span className="font-medium text-foreground text-sm">{industry}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Complete Step */}
        {step === 'complete' && (
          <div className="space-y-8 animate-fadeIn text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">You&apos;re all set!</h2>
              <p className="text-muted-foreground">
                We&apos;ve personalized your experience. Let&apos;s find the perfect loan for your business.
              </p>
            </div>

            <button
              onClick={handleComplete}
              className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 smooth-transition touch-feedback"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
