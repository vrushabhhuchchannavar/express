const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

exports.vidateuser = async(req, res, next) => {
    try {
        const { token } = req.cookies;
        // console.log(token);

        if(!token) {
            res.status(403).send({error: true, message: 'please login'});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRETE);

        // console.log(decode);
        req.user = await User.findById(decode._id);
        next();

    } catch (err) {
        res.status(500).send({err});
    }
};

// module.exports = vidateuser();