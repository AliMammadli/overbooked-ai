import { getUserRecommendations } from '@/app/controller/usersController'
import { NextRequest, NextResponse } from 'next/server'
import { validateUserRef } from "@/lib/schemas"


export async function GET(_request: NextRequest, { params }: { params: Promise<{ userRef: string }> }) {
    const userRef = (await params).userRef

    const { error } = validateUserRef.validate({ userRef })
    if (error) return NextResponse.json({ error: error.details[0].message }, { status: 400 })

    return await getUserRecommendations(userRef)
}