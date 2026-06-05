import { changePasswordAPI } from '@/lib/mock-api'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  try {
    const { userId, currentPassword, newPassword } = await request.json()

    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: 'New password must be at least 6 characters' },
        { status: 400 }
      )
    }

    await changePasswordAPI(userId, currentPassword, newPassword)

    return NextResponse.json(
      { message: 'Password changed successfully' },
      { status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to change password'
    return NextResponse.json({ message }, { status: 400 })
  }
}
