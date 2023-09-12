const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


exports.validateUSer = async(params) => {
    const validate = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        password: Joi.string().required()
    });

    return validate.validateAsync(params);
}


exports.validatelogin = async(params) => {
    const validate = Joi.object({
        email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        password: Joi.string().required()
    });

    return validate.validateAsync(params);
}
