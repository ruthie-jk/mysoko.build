'use client'

import { Loan } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import dynamic from 'next/dynamic'

interface LoanCarouselProps {
  loans: Loan[]
  onSelectLoan?: (loan: Loan) => void
}

export function LoanCarousel({ loans, onSelectLoan }: LoanCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const featuredLoans = loans.filter(l => l.featured)
  const displayLoans = featuredLoans.length > 0 ? featuredLoans : loans.slice(0, 3)

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + displayLoans.length) % displayLoans.length)
  }

  const currentLoan = displayLoans[currentIndex]
  const IconComponent = getLoanIcon(currentLoan.icon)

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">Featured Loans</h2>

      {/* Carousel */}
      <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 overflow-hidden h-56 sm:h-64">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-foreground rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
            className="absolute inset-0 flex flex-col justify-between p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium">Featured Offer</p>
                <h3 className="text-2xl font-bold text-primary-foreground mt-1">
                  {currentLoan.name}
                </h3>
              </div>
              {IconComponent && (
                <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <IconComponent className="w-6 h-6 text-primary-foreground" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-3 relative z-10">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-primary-foreground/70 text-xs">Amount Range</p>
                  <p className="text-primary-foreground font-semibold">
                    {formatAmount(currentLoan.minAmount)} - {formatAmount(currentLoan.maxAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-primary-foreground/70 text-xs">Interest Rate</p>
                  <p className="text-primary-foreground font-semibold">
                    {currentLoan.interestRate.toFixed(1)}%
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectLoan?.(currentLoan)}
                className="w-full py-2 bg-primary-foreground text-primary font-medium rounded-lg hover:bg-primary-foreground/90 smooth-transition touch-feedback text-sm"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {displayLoans.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-lg backdrop-blur-sm smooth-transition touch-feedback"
              aria-label="Previous loan"
            >
              <ChevronLeft className="w-5 h-5 text-primary-foreground" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-lg backdrop-blur-sm smooth-transition touch-feedback"
              aria-label="Next loan"
            >
              <ChevronRight className="w-5 h-5 text-primary-foreground" />
            </button>
          </>
        )}
      </div>

      {/* Indicators */}
      {displayLoans.length > 1 && (
        <div className="flex justify-center gap-2">
          {displayLoans.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1)
                setCurrentIndex(idx)
              }}
              className={`w-2 h-2 rounded-full smooth-transition ${
                idx === currentIndex ? 'bg-primary w-6' : 'bg-muted'
              }`}
              aria-label={`Go to loan ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function getLoanIcon(iconName: string) {
  const icons: Record<string, any> = {
    TrendingUp: require('lucide-react').TrendingUp,
    Zap: require('lucide-react').Zap,
    Wallet: require('lucide-react').Wallet,
    Package: require('lucide-react').Package,
    Globe: require('lucide-react').Globe,
  }
  return icons[iconName] || null
}

function formatAmount(amount: number) {
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(1)}M`
  } else if (amount >= 1000) {
    return `₦${(amount / 1000).toFixed(0)}K`
  }
  return `₦${amount}`
}
