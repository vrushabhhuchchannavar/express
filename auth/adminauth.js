const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

exports.adminValidation = async(req, res, next) => {

    try {
        const { token } = req.cookies;
       
        if(!token) {
            res.status(403).send({ errro: true, message: 'Authentication failed.'});
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);
       
        const admin = await Admin.findById(decoded._id);
       
        if(!admin) {
            res.status(404).send({ error: true, message: 'regester with admin' });
        }

        req.admin = admin;
        next();

    } catch (error) {
        res.status(500).send({ errro: true, mesage: 'Internal server error.', error });
    }
}