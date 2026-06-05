import { updateProfileAPI } from '@/lib/mock-api'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  try {
    const { userId, firstName, lastName, businessName, industry } = await request.json()

    if (!userId || !firstName || !lastName || !businessName || !industry) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    const user = await updateProfileAPI(userId, firstName, lastName, businessName, industry)

    return NextResponse.json(
      { user, message: 'Profile updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update profile'
    return NextResponse.json({ message }, { status: 400 })
  }
}
