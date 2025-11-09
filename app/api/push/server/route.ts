import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    { error: 'Push notifications are disabled' },
    { status: 501 }
  )
}

export const runtime = 'nodejs'
