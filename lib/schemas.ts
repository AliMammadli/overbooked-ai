import Joi from 'joi'


export const validateRecommendations = Joi.object({
    clientId: Joi.string().trim().required(),
    productInterests: Joi.array().min(1).items(Joi.string()).required()
})

export const validateUserRef = Joi.object({
    userRef: Joi.string().trim().required()
})