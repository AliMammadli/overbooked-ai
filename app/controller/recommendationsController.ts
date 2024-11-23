import { NextResponse } from 'next/server'
import { PromotionModel } from '../models/Promotion'
import { connectDB } from '@/lib/database'
import { logger } from '@/lib/logger'



export async function generateRecommendations(clientId: string, productInterests: [string]) {
    try {
        // Call the external recommendations service
        const res = await fetch('http://wiremock:8080/llm/generate', { method: 'POST', body: JSON.stringify({ preferences: productInterests }) })
        const data = await res.json()

        if (!data || !data.recommendations) throw new Error()
            
        // Save to the database
        await connectDB()
        const newPromotion = new PromotionModel({ clientId, promotions: data.recommendations })
        await newPromotion.save()

        // Send the response
        return NextResponse.json({ clientId, promotions: data.recommendations })
    } catch (error) {
        logger.error({ error }, 'Error generating recommendations')
        return NextResponse.json({ error: 'Unable to generate recommendations at this time. Please try again later.' }, { status: 500 })
    }
}