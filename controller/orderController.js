const Order = require('../models/order');
const jwt = require('jsonwebtoken');


exports.placeOrd = async(req, res) => {

    try {
        const params = {
            name: req.body.name,
            mobile: req.body.mobile,
            address: req.body.address
        }

        const order = await Order.create(params);
       
        // const token = jwt.sign({_id: order._id}, process.env.JWT_SECRETE);
        // console.log('ordertken:', token);

        res.status(201)
            .send({ error: false, message: 'order placed successfully.', result: order});

    } catch (err) {
        res.status(500).send({ error: true, message: 'Internal server error.'});
    }
}


exports.cancel = async(req, res) => {
    try {

        const id = req.params.id;
        // console.log(`id:`, id);
        // let order = req.order;
        // console.log(`order:`, order);
        // const find = await Order.find({ _id: id });

        const canceled = await Order.deleteOne({ _id: id });
        // console.log(`can:`, canceled);
        res.status(201).send({ error: false, message: 'order is concelled', result: canceled });
    } catch (err) {
        res.status(500).send({ error: true, message: 'Internal server error'});
    }
}