import Joi from "joi";

export const insertMenuSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    href: Joi.string().min(0).required(),
})