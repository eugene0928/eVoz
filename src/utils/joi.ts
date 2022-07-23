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

export const add_podcast_schema = Joi.object({
        category_id: Joi.string().guid({
                version: [
                    'uuidv4',
                    'uuidv5'
                ]
                })
                .required(),
        name: Joi.string()
                .min(2)
                .max(256)
                .required(),
        speaker: Joi.string()
                        .min(2)
                        .max(128)
                        .pattern(new RegExp(/^[a-zA-Z\s]*$/))
                        .required()
})