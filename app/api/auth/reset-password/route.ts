import { resetPasswordAPI } from '@/lib/mock-api'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, token, newPassword } = await request.json()

    if (!email || !token || !newPassword) {
      return NextResponse.json(
        { message: 'Email, token, and new password are required' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    await resetPasswordAPI(email, newPassword)

    return NextResponse.json(
      { message: 'Password reset successful' },
      { status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Password reset failed'
    return NextResponse.json({ message }, { status: 400 })
  }
}
