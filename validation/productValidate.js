const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


exports.validateMerchnt = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
    password: Joi.string().min(4).max(8).required()
});


exports.validatepro = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    value: Joi.string().required(),
    description: Joi.string().required()
});


exports.getvalidate = Joi.object({
    sort: Joi.string(),
    limit: Joi.number(),
    from: Joi.number(),
    to: Joi.number()
});


exports.updateValidate = Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().required()
});


exports.deletevalidate = Joi.object({
    id: Joi.objectId().required()
});
