
import Joi from "joi";

export const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    })

    return schema.validate(user)
}