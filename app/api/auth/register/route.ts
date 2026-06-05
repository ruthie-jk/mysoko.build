import { registerAPI } from '@/lib/mock-api'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, businessName } = await request.json()

    if (!email || !password || !firstName || !lastName || !businessName) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    const user = await registerAPI(email, password, firstName, lastName, businessName)

    return NextResponse.json(
      { user, message: 'Registration successful' },
      { status: 201 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed'
    return NextResponse.json({ message }, { status: 400 })
  }
}
