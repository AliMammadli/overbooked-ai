import { connectDB } from "@/lib/database"
import { PromotionModel } from "../models/Promotion"
import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"



export async function getUserRecommendations(userRef: string) {
    const clientId = userRef

    try {
        await connectDB()
        const promotion = await PromotionModel.findOne({ clientId })

        if (!promotion) return NextResponse.json({ error: `No promotions found for client ${clientId}.` }, { status: 404 })

        return NextResponse.json({ clientId, promotions: promotion.promotions })
    } catch (error) {
        logger.error({ error }, 'Error fetching promotions')
        return NextResponse.json({ error: 'Unable to fetch promotions at this time. Please try again later.' }, { status: 500 })
    }
}