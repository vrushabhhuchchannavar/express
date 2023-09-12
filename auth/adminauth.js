const jwt = require('jsonwebtoken');
const admin = require('../models/admin');

exports.adminValidation = async(req, res, next) => {

    try {
        const { token } = req.cookies;

        if(!token) {
            res.status(403).send({ errro: true, message: 'Authentication failed.'});
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);
        
        req.admin = await admin.findById(decoded._id);
        next();

    } catch (e) {
        res.status(500).send({ errro: true, mesage: 'Internal server error.'})
    }
}