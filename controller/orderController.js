const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const { getvalidate, getAllOrdersValidate } = require('../validation/productValidate')
const errorHandler = require('../middleware/errorclass');

exports.getProductsByName = async(req, res, next) => {

    try {
        const params = {
            sort: req.query.sort, 
            limit: req.query.limit,
            from: req.query.from,
            to: req.query.to
        }
       
        const validate = await getvalidate.validate(params);
        if(validate.error) {
            return next(new errorHandler("credentials are invalid.", 400));
        }
        
        let read;
        if(params.from && params.to) {
          
            read = await Product.find({
                value: { $gte: params.from, $lte: params.to }
            },
            {
                name: 1, type: 1, value: 1, description: 1
            })
        } else {
            read = await Product.find({ name: params.sort });
        }
       
        if(!read) {
            return next(new errorHandler(`sorry, we cant find any products on this ${params.sort}`))
            // res.status(404).send({error: true, message: `Sorry, we dont have any products on theses ${sort}`});
        }

        const limitedData = read.slice(0, params.limit);

        res.status(201).send({ error: false, message: `we have these many on ${params.sort}`, result: limitedData });

    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error.', error });
    }
}


exports.getAllOrders = async(req, res) => {

    try {
        let page = req.query.page;
        let limit = req.query.limit;
        let skipCount = (page-1) * limit;
       
        const validate = await getAllOrdersValidate.validate({page, limit});
        if (validate.error) {
            return next(new errorHandler('please put valid credentials', 401));
        }

        if(page<1) {
            return next(new errorHandler('page has to be greater than or equal to 1', 401));
        }
        const orders = await Order.find().skip(skipCount).limit(limit);

        res.status(201).send({ error: false, data: orders });
    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error', error });
    }
}


exports.placeOrder = async(req, res) => {

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

    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error.', error });
    }
}


exports.cancelOrder = async(req, res) => {
    try {

        const id = req.params.id;
        // console.log(`id:`, id);
        // let order = req.order;
        // console.log(`order:`, order);
        // const find = await Order.find({ _id: id });

        const canceled = await Order.deleteOne({ _id: mongoose.Types.ObjectId(id) });
        // console.log(`can:`, canceled);
        res.status(201).send({ error: false, message: 'order is concelled', result: canceled });

    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error', error });
    }
}