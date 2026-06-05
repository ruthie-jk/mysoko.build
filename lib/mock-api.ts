import { Loan, User } from './types'

// Mock loans database
export const MOCK_LOANS: Loan[] = [
  {
    id: 'loan_001',
    name: 'Business Growth',
    description: 'Expand your business operations',
    minAmount: 50000,
    maxAmount: 500000,
    interestRate: 12.5,
    minTenure: 12,
    maxTenure: 60,
    requirements: [
      'Valid National ID',
      'Business Registration Certificate',
      'Phone Number',
      'Bank Statement (3 months)',
      'Business Tax Documents',
    ],
    icon: 'TrendingUp',
    category: 'growth',
    featured: true,
  },
  {
    id: 'loan_002',
    name: 'Equipment Finance',
    description: 'Get modern equipment for your business',
    minAmount: 100000,
    maxAmount: 1000000,
    interestRate: 11.0,
    minTenure: 24,
    maxTenure: 84,
    requirements: ['Valid National ID', 'Phone Number', 'Equipment Quotation', 'Business Registration'],
    icon: 'Zap',
    category: 'equipment',
  },
  {
    id: 'loan_003',
    name: 'Working Capital',
    description: 'Meet your day-to-day operational needs',
    minAmount: 30000,
    maxAmount: 300000,
    interestRate: 13.5,
    minTenure: 6,
    maxTenure: 36,
    requirements: ['Valid National ID', 'Phone Number', 'Bank Statement (6 months)'],
    icon: 'Wallet',
    category: 'working-capital',
    featured: true,
  },
  {
    id: 'loan_004',
    name: 'Inventory Stock',
    description: 'Stock up inventory without financial strain',
    minAmount: 50000,
    maxAmount: 750000,
    interestRate: 12.0,
    minTenure: 12,
    maxTenure: 48,
    requirements: [
      'Valid National ID',
      'Phone Number',
      'Business Registration',
      'Supplier Invoices',
      'Bank Statement (3 months)',
    ],
    icon: 'Package',
    category: 'inventory',
  },
  {
    id: 'loan_005',
    name: 'Business Expansion',
    description: 'Open new branches or markets',
    minAmount: 200000,
    maxAmount: 2000000,
    interestRate: 11.5,
    minTenure: 24,
    maxTenure: 72,
    requirements: [
      'Valid National ID',
      'Business Registration',
      'Phone Number',
      'Business Plan',
      'Financial Statements (2 years)',
      'Tax Compliance Certificate',
    ],
    icon: 'Globe',
    category: 'expansion',
  },
  {
    id: 'loan_006',
    name: 'Quick Loan',
    description: 'Fast approval, minimal documentation',
    minAmount: 10000,
    maxAmount: 100000,
    interestRate: 15.0,
    minTenure: 3,
    maxTenure: 24,
    requirements: ['Valid National ID', 'Phone Number'],
    icon: 'Zap',
    category: 'working-capital',
    featured: true,
  },
]

// Mock user database (for demo)
const MOCK_USERS: Record<string, User & { password: string }> = {
  'test@example.com': {
    id: 'user_001',
    email: 'test@example.com',
    password: 'password123', // In real app, this would be hashed
    firstName: 'John',
    lastName: 'Doe',
    businessName: 'Doe Enterprises',
    industry: 'Retail',
    createdAt: new Date().toISOString(),
  },
}

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function loginAPI(email: string, password: string): Promise<User> {
  await delay(800)

  const user = MOCK_USERS[email]
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password')
  }

  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function registerAPI(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  businessName: string
): Promise<User> {
  await delay(800)

  if (MOCK_USERS[email]) {
    throw new Error('Email already registered')
  }

  const newUser: User & { password: string } = {
    id: `user_${Date.now()}`,
    email,
    password,
    firstName,
    lastName,
    businessName,
    industry: 'Other',
    createdAt: new Date().toISOString(),
  }

  MOCK_USERS[email] = newUser

  const { password: _, ...userWithoutPassword } = newUser
  return userWithoutPassword
}

export async function updateProfileAPI(
  userId: string,
  firstName: string,
  lastName: string,
  businessName: string,
  industry: string
): Promise<User> {
  await delay(600)

  // Find user by ID
  const user = Object.values(MOCK_USERS).find(u => u.id === userId)
  if (!user) throw new Error('User not found')

  user.firstName = firstName
  user.lastName = lastName
  user.businessName = businessName
  user.industry = industry

  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function changePasswordAPI(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  await delay(600)

  const user = Object.values(MOCK_USERS).find(u => u.id === userId)
  if (!user) throw new Error('User not found')

  if (user.password !== currentPassword) {
    throw new Error('Current password is incorrect')
  }

  user.password = newPassword
}

export async function getLoansAPI(): Promise<Loan[]> {
  await delay(500)
  return MOCK_LOANS
}

export async function getLoanByIdAPI(id: string): Promise<Loan> {
  await delay(300)
  const loan = MOCK_LOANS.find(l => l.id === id)
  if (!loan) throw new Error('Loan not found')
  return loan
}

export async function applyForLoanAPI(
  userId: string,
  loanId: string,
  submittedRequirements: Record<string, string>
): Promise<{ success: boolean; applicationId: string }> {
  await delay(1000)

  const loan = MOCK_LOANS.find(l => l.id === loanId)
  if (!loan) throw new Error('Loan not found')

  // Simulate approval logic
  const applicationId = `app_${Date.now()}`

  return {
    success: true,
    applicationId,
  }
}

export async function resetPasswordAPI(email: string, newPassword: string): Promise<void> {
  await delay(800)

  const user = MOCK_USERS[email]
  if (!user) throw new Error('Email not found')

  user.password = newPassword
}

export async function verifyPasswordResetTokenAPI(
  email: string,
  token: string
): Promise<{ valid: boolean }> {
  await delay(300)

  // In a real app, this would verify an actual token
  // For demo, we'll just check if email exists and token is not empty
  const user = MOCK_USERS[email]

  return {
    valid: !!user && !!token,
  }
}
