const jwt = require('jsonwebtoken');

const Order = require('../models/order');




exports.validateOrder = async(req, res, next) => {

    try {

        const { token } = req.cookies;

        if(!token) {
            res.status(403).send({ error: true, message: 'Authentication failed'});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRETE);

        // console.log(`deco:`, decode);
        // console.log(`decoID:`, decode._id);
        // req.Orders = await Order.find(id);

        const response = await Order.findById(decode._id);
        // console.log(`response:`, response);
        req.orders = response;
        // console.log(`ord:`, req.order);
        next();

    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error', error });
    }
}