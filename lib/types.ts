export interface Loan {
  id: string
  name: string
  description: string
  minAmount: number
  maxAmount: number
  interestRate: number
  minTenure: number
  maxTenure: number
  requirements: string[]
  icon: string
  category: 'equipment' | 'growth' | 'working-capital' | 'expansion' | 'inventory'
  featured?: boolean
}

export interface UserPreferences {
  loanType: string
  amountNeeded: number
  industry: string
}

export interface WishlistItem {
  id: string
  loanId: string
  addedAt: string
}

export interface LoanApplication {
  id: string
  userId: string
  loanId: string
  status: 'pending' | 'approved' | 'rejected'
  appliedAt: string
  reviewedAt?: string
}

export interface StepModalState {
  isOpen: boolean
  currentStep: number
  selectedLoan: Loan | null
  selectedRequirements: string[]
}

export interface WishlistOffCanvasState {
  isOpen: boolean
  items: WishlistItem[]
}

export interface RequirementChecklistItem {
  label: string
  checked: boolean
  value?: string
}
