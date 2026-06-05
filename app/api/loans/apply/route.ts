import { applyForLoanAPI } from '@/lib/mock-api'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId, loanId, requirements } = await request.json()

    if (!userId || !loanId) {
      return NextResponse.json(
        { message: 'User ID and Loan ID are required' },
        { status: 400 }
      )
    }

    const result = await applyForLoanAPI(userId, loanId, requirements || {})

    return NextResponse.json(
      { ...result, message: 'Loan application submitted successfully' },
      { status: 201 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to apply for loan'
    return NextResponse.json({ message }, { status: 400 })
  }
}
