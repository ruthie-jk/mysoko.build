import { loginAPI } from '@/lib/mock-api'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await loginAPI(email, password)

    return NextResponse.json(
      { user, message: 'Login successful' },
      { status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed'
    return NextResponse.json({ message }, { status: 401 })
  }
}
