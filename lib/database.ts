import mongoose from 'mongoose'
import { logger } from "@/lib/logger"


const DATABASE_URI = process.env.DATABASE_URI


export const connectDB = async () => {
    try {
        if (DATABASE_URI) {
            await mongoose.connect(DATABASE_URI)
            logger.info('Connected to the database')
        }
    } catch (error) {
        if (error) {
            logger.error({ error }, 'Database connection error')
            throw new Error('Database connection error:', error)
        }
    }
}