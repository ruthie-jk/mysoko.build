import { getLoansAPI } from '@/lib/mock-api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const loans = await getLoansAPI()
    return NextResponse.json({ loans }, { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch loans'
    return NextResponse.json({ message }, { status: 500 })
  }
}
