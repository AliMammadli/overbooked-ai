import { validateRecommendations } from '@/lib/schemas'
import { generateRecommendations } from '@/app/controller/recommendationsController'
import { NextRequest, NextResponse } from 'next/server'


export async function POST(request: NextRequest) {
    const req = await request.json()
    
    const { clientId, productInterests } = req

    const { error } = validateRecommendations.validate({ clientId, productInterests })
    if (error) return NextResponse.json({ error: error.details[0].message }, { status: 400 })

    return generateRecommendations(clientId, productInterests)
}