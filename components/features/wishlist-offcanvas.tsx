'use client'

import { Loan } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle } from 'lucide-react'

interface WishlistOffcanvasProps {
  isOpen: boolean
  onClose: () => void
  wishlistItems: Loan[]
}

export function WishlistOffcanvas({ isOpen, onClose, wishlistItems }: WishlistOffcanvasProps) {
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

          {/* Off-Canvas */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 bg-card rounded-l-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Your Wishlist</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg smooth-transition"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                    <AlertCircle className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-foreground mb-1">No saved loans yet</p>
                  <p className="text-sm text-muted-foreground">
                    Add loans to your wishlist to keep track of them
                  </p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {wishlistItems.map(loan => (
                    <div
                      key={loan.id}
                      className="bg-muted rounded-lg p-4 space-y-2 hover:border hover:border-primary smooth-transition"
                    >
                      {/* Loan Name */}
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-foreground">{loan.name}</h3>
                        {loan.featured && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-medium">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Quick Info */}
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Amount</p>
                          <p className="font-semibold text-foreground">
                            ₦{(loan.maxAmount / 1000).toFixed(0)}K
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Rate</p>
                          <p className="font-semibold text-foreground">{loan.interestRate}%</p>
                        </div>
                      </div>

                      {/* Requirements Summary */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Required Documents:</p>
                        <div className="space-y-1">
                          {loan.requirements.slice(0, 3).map(req => (
                            <div key={req} className="flex items-center gap-2 text-xs">
                              <CheckCircle className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                              <span className="text-muted-foreground">{req}</span>
                            </div>
                          ))}
                          {loan.requirements.length > 3 && (
                            <p className="text-xs text-muted-foreground">
                              +{loan.requirements.length - 3} more
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Apply Button */}
                      <button className="w-full mt-3 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 smooth-transition touch-feedback text-sm">
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Info */}
            {wishlistItems.length > 0 && (
              <div className="border-t border-border p-4 bg-primary/5">
                <p className="text-xs text-muted-foreground text-center">
                  {wishlistItems.length} loan{wishlistItems.length !== 1 ? 's' : ''} saved. You can apply to any of them.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
