import Joi from "joi";

export const reg_schema = Joi.object({
    name: Joi.string()
            .min(2)
            .max(32)
            .required(),
    email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    password: Joi.string()
                .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
                .required()
})