const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


exports.validateMerchnt = (values) => {
    const validate = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
        password: Joi.string().required()
    });

    return validate.validateAsync(values);
}


exports.validatepro = (values) => {
    const validate = Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
        value: Joi.string().required(),
        description: Joi.string().required()
    });

    return validate.validateAsync(values);
}

exports.getvalidate = (values) => {
    const validate = Joi.object({
        sort: Joi.string(),
        limit: Joi.number()
    });

    return validate.validateAsync(values);
}


exports.updateValidate = (values) => {
    const validate = Joi.object({
        id: Joi.objectId().required(),
        name: Joi.string().required(),
        type: Joi.string().required(),
        description: Joi.string().required()
    });

    return validate.validateAsync(values);
}

exports.deletevalidate = (value) => {
    const validate = Joi.object({
        id: Joi.objectId().required()
    });

    return validate.validateAsync(validate);
}