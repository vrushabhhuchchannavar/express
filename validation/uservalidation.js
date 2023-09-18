const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


exports.validateUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
    password: Joi.string().min(4).max(8).required()
});

    // return validate.validateAsync(params);
    // .then((validated) => {
    //     console.log('validated', validated)
    // })
    // .catch((err) => console.error( `validation failed`, err ));



exports.validatelogin = Joi.object({
    email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
    password: Joi.string().min(4).max(8).required()
});


exports.getAllusersValidate = Joi.object({
    page: Joi.number(),
    limit: Joi.number()
});

