'use client'

import { useAuth } from '@/lib/auth-context'
import { Loan } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Heart, Star, MapPin, Clock } from 'lucide-react'
import { LoanCardSkeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'

const LoanModal = dynamic(() => import('@/components/features/loan-modal').then(mod => ({ default: mod.LoanModal })), {
  loading: () => <div />,
})

const WishlistCanvas = dynamic(() => import('@/components/features/wishlist-offcanvas').then(mod => ({ default: mod.WishlistOffcanvas })), {
  loading: () => <div />,
})

export default function LoansPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')

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

    // Load wishlist from storage
    const saved = sessionStorage.getItem('mysoko_wishlist')
    if (saved) {
      setWishlist(JSON.parse(saved))
    }
  }, [])

  const handleSelectLoan = (loan: Loan) => {
    setSelectedLoanId(loan.id)
    setShowModal(true)
  }

  const handleToggleWishlist = (loanId: string) => {
    setWishlist(prev => {
      const updated = prev.includes(loanId)
        ? prev.filter(id => id !== loanId)
        : [...prev, loanId]
      sessionStorage.setItem('mysoko_wishlist', JSON.stringify(updated))
      return updated
    })
  }

  const selectedLoan = loans.find(l => l.id === selectedLoanId)
  const filteredLoans = filterCategory === 'all' ? loans : loans.filter(l => l.category === filterCategory)

  const categories = Array.from(new Set(loans.map(l => l.category)))

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Loans for You</h1>
            <p className="text-muted-foreground mt-1">Find the perfect loan for your business</p>
          </div>
          <button
            onClick={() => setShowWishlist(true)}
            className="relative p-3 bg-card border border-border rounded-lg hover:border-primary smooth-transition touch-feedback"
            aria-label="Open wishlist"
          >
            <Heart className="w-6 h-6 text-primary" fill={wishlist.length > 0 ? 'currentColor' : 'none'} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
        </div>

        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap smooth-transition ${
              filterCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-border'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap smooth-transition capitalize ${
                filterCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-border'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Loans Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <LoanCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredLoans.map(loan => (
              <div
                key={loan.id}
                className="bg-card rounded-xl border border-border p-4 hover:border-primary smooth-transition hover:shadow-lg cursor-pointer group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    {loan.featured && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
                        <span className="text-xs font-medium text-amber-600">Featured</span>
                      </div>
                    )}
                    <h3 className="font-bold text-foreground text-lg">{loan.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{loan.description}</p>
                  </div>
                  <button
                    onClick={() => handleToggleWishlist(loan.id)}
                    className="p-2 rounded-lg hover:bg-muted smooth-transition"
                    aria-label={wishlist.includes(loan.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={wishlist.includes(loan.id) ? 'hsl(var(--primary))' : 'none'}
                      color={wishlist.includes(loan.id) ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
                    />
                  </button>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="font-semibold text-foreground">
                      ₦{loan.minAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rate</p>
                    <p className="font-semibold text-foreground">{loan.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tenure</p>
                    <p className="font-semibold text-foreground">{loan.minTenure}-{loan.maxTenure}m</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Docs</p>
                    <p className="font-semibold text-foreground">{loan.requirements.length}</p>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleSelectLoan(loan)}
                  className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 smooth-transition touch-feedback text-sm group-hover:shadow-md"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Loan Modal */}
      {showModal && selectedLoan && (
        <LoanModal
          loan={selectedLoan}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false)
            setSelectedLoanId(null)
          }}
          isInWishlist={wishlist.includes(selectedLoan.id)}
          onToggleWishlist={() => handleToggleWishlist(selectedLoan.id)}
          userId={user?.id || ''}
        />
      )}

      {/* Wishlist Off-Canvas */}
      {showWishlist && (
        <WishlistCanvas
          isOpen={showWishlist}
          onClose={() => setShowWishlist(false)}
          wishlistItems={wishlist.map(id => loans.find(l => l.id === id)!).filter(Boolean)}
        />
      )}
    </div>
  )
}
