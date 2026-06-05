'use client'

import { Loan } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, Heart, Check } from 'lucide-react'
import { useState } from 'react'

interface LoanModalProps {
  loan: Loan
  isOpen: boolean
  onClose: () => void
  isInWishlist: boolean
  onToggleWishlist: () => void
  userId: string
}

export function LoanModal({
  loan,
  isOpen,
  onClose,
  isInWishlist,
  onToggleWishlist,
  userId,
}: LoanModalProps) {
  const [step, setStep] = useState(0)
  const [checkedRequirements, setCheckedRequirements] = useState<Record<string, boolean>>({})
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)

  const handleRequirementToggle = (req: string) => {
    setCheckedRequirements(prev => ({
      ...prev,
      [req]: !prev[req],
    }))
  }

  const handleApply = async () => {
    setApplying(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const response = await fetch('/api/loans/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          loanId: loan.id,
          requirements: checkedRequirements,
        }),
      })

      if (response.ok) {
        setApplied(true)
        setTimeout(() => {
          onClose()
          setStep(0)
          setApplied(false)
          setCheckedRequirements({})
        }, 2000)
      }
    } catch (error) {
      console.error('[v0] Failed to apply:', error)
    } finally {
      setApplying(false)
    }
  }

  const allRequirementsMet = loan.requirements.every(req => checkedRequirements[req])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl max-h-[90vh] overflow-y-auto sm:absolute sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg sm:rounded-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-card rounded-t-2xl">
              <h2 className="font-bold text-foreground">
                {step === 0 && 'Loan Details'}
                {step === 1 && 'Requirements'}
                {step === 2 && 'Review & Apply'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg smooth-transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-4 pt-4 flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full smooth-transition ${
                    i <= step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <AnimatePresence mode="wait">
                {/* Step 0: Details */}
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Loan Name</p>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{loan.name}</h3>
                      <p className="text-sm text-muted-foreground">{loan.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Amount Range</p>
                        <p className="font-bold text-foreground">
                          ₦{loan.minAmount.toLocaleString()} - ₦{loan.maxAmount.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Interest Rate</p>
                        <p className="font-bold text-foreground">{loan.interestRate}% p.a.</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Tenure</p>
                        <p className="font-bold text-foreground">
                          {loan.minTenure} - {loan.maxTenure} months
                        </p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Required Docs</p>
                        <p className="font-bold text-foreground">{loan.requirements.length}</p>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <p className="text-sm font-medium text-foreground mb-3">Key Features:</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          Fast approval within 48 hours
                        </li>
                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          Flexible repayment terms
                        </li>
                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          No hidden charges
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Requirements */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Please have the following documents ready:
                      </p>
                      <div className="space-y-2">
                        {loan.requirements.map(req => (
                          <label
                            key={req}
                            className="flex items-center gap-3 p-3 border border-border rounded-lg hover:border-primary hover:bg-primary/5 smooth-transition cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={checkedRequirements[req] || false}
                              onChange={() => handleRequirementToggle(req)}
                              className="w-5 h-5 rounded border-border accent-primary cursor-pointer"
                            />
                            <span className="font-medium text-foreground group-hover:text-primary smooth-transition">
                              {req}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                      <p className="text-xs font-medium text-accent mb-1">Pro Tip</p>
                      <p className="text-sm text-muted-foreground">
                        Ensure all documents are clear, valid, and within expiry dates for faster processing.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Review */}
                {step === 2 && !applied && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="bg-muted p-4 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Loan Amount</span>
                        <span className="font-bold text-foreground">
                          ₦{loan.maxAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Interest Rate</span>
                        <span className="font-bold text-foreground">{loan.interestRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tenure</span>
                        <span className="font-bold text-foreground">{loan.maxTenure} months</span>
                      </div>
                      <div className="border-t border-border pt-3 flex justify-between">
                        <span className="font-medium text-foreground">Est. Monthly Payment</span>
                        <span className="font-bold text-primary">
                          ₦{Math.round(loan.maxAmount / (loan.maxTenure * 0.75)).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Documents Provided:</p>
                      <div className="space-y-1">
                        {Object.entries(checkedRequirements)
                          .filter(([_, checked]) => checked)
                          .map(([req]) => (
                            <div key={req} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-primary" />
                              <span className="text-foreground">{req}</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-primary/5 smooth-transition cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded border-border accent-primary cursor-pointer mt-0.5"
                      />
                      <span className="text-xs text-muted-foreground">
                        I agree to the terms and conditions and authorize MySoko to process my application
                      </span>
                    </label>
                  </motion.div>
                )}

                {/* Success State */}
                {applied && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Check className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-foreground mb-1">Application Submitted</h3>
                      <p className="text-sm text-muted-foreground">
                        We&apos;ll review your application and get back to you within 24 hours
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 border-t border-border p-4 bg-card rounded-b-2xl space-y-3">
              <div className="flex gap-2">
                {/* Back Button */}
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 py-2.5 border border-border text-foreground font-medium rounded-lg hover:bg-muted smooth-transition touch-feedback flex items-center justify-center gap-2"
                    disabled={applying}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                )}

                {/* Next/Apply Button */}
                {!applied && (
                  <button
                    onClick={() => {
                      if (step < 2) {
                        setStep(step + 1)
                      } else {
                        handleApply()
                      }
                    }}
                    disabled={step === 1 && !allRequirementsMet || applying}
                    className="flex-1 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition touch-feedback flex items-center justify-center gap-2"
                  >
                    {applying ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Applying...
                      </>
                    ) : step === 2 ? (
                      <>
                        Apply Now
                        <Check className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={onToggleWishlist}
                className="w-full py-2.5 border border-border text-foreground font-medium rounded-lg hover:bg-muted smooth-transition touch-feedback flex items-center justify-center gap-2"
              >
                <Heart
                  className="w-4 h-4"
                  fill={isInWishlist ? 'currentColor' : 'none'}
                  color={isInWishlist ? 'hsl(var(--primary))' : 'currentColor'}
                />
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
