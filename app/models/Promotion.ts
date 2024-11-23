import mongoose from 'mongoose'


export interface PromotionDocument extends mongoose.Document {
    clientId: string
    promotions: string[]
}


const PromotionSchema = new mongoose.Schema({
    clientId: { type: String, required: true },
    promotions: { type: [String], required: true }
})


export const PromotionModel = mongoose.models.Promotion || mongoose.model<PromotionDocument>('Promotion', PromotionSchema)