const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

exports.vidateuser = async(req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if(!token) {
            res.status(403).send({error: true, message: 'Authentication failed'});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRETE);

        const user = await User.findById(decode._id);
        if(!user) {
            res.status(404).send({ error: true, message: 'please login' });
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(500).send({ error:true, message: 'Internal server error', error });
    }
};

// module.exports = vidateuser();