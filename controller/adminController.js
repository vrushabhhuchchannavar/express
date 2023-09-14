const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Admin = require('../models/admin');
const User = require('../models/userSchema');
const Product = require('../models/product');
const Order = require('../models/order');
const errorHandler = require('../middleware/errorclass');
const { validateAdmin, validateproduct, updateValidate, deletevalidate } = require('../validation/productValidate');


exports.createAdmin = async(req, res, next) => {

    try {
        const params = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        
        const validate = await validateAdmin.validate(params);
        if(validate.error) {
            return next(new errorHandler("credentials are invalid.", 400));
        }

        const hashedPassword = await bcrypt.hash(params.password, 10);
        params.password = hashedPassword;
        
        const admin = await Admin.create(params);
        
        const token = jwt.sign({_id: admin._id}, process.env.JWT_SECRETE);

        res.status(201).cookie("token", token, { 
            httpOnly: true, 
            maxAge: 15 * 60 * 1000, }).send({ error: false, message: 'admin created successfully.'});

    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error', error })
    }
}

exports.addProducts = async(req, res, next) => {

    try {
        const params = {
            name: req.body.name,
            type: req.body.type,
            value: req.body.value,
            description: req.body.description
        }

        let admin = req.admin;

        const validate = await validateproduct.validate(params);
        if(validate.error) {
            return next(new errorHandler("credentials are invalid.", 400));
        }

        if(!admin) {
            return next(new errorHandler('Sorry, you dont have access to add and remove the products.', 403));
            // res.status(403).send({ error: true, message: 'you dont have the access to Add the product.'})
        }

        const product = await Product.create(params);
        // console.log(`product:`, product)
        res.status(201).send({error: false, message: 'product added successfully.', result: product })
    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server errro.', error });
    }
}

exports.updateProduct = async(req, res, next) => {

    try {
        const params = {
            id: req.params.id,
            name: req.body.name,
            type: req.body.type,
            value: req.body.value,
            description: req.body.description
        }

        const validate = await updateValidate.validate(params);
        if(validate.error) {
            return next(new errorHandler("credentials are invalid.", 400));
        }

        const exists = await Product.findById({ _id: mongoose.Types.ObjectId(params.id)});

        if(!exists) {
            return next(new errorHandler(`sorry, product is not found on this ${params.name}`, 404));
            // res.status(404).send({ error: true, message: `product is not present on this ${params.name}`});
        }

        const product = await Product.updateOne(params);
        // console.log(product);

        res.status(201).send({ error: false, message: 'product is updated successfully.', resulr: product });
    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error.', error });
    }
}

exports.deleteProduct = async(req, res, next) => {

    try {

        const id = req.params.id;
        const validate = await deletevalidate.validate(id);
        if(validate.error) {
            return next(new errorHandler("credentials are invalid.", 400));
        }
        
        const exists = await Product.findById({ _id: mongoose.Types.ObjectId(id) });

        if(!exists) {
            return next(new errorHandler(`product is not found`, 404));
            // res.status(404).send({ error: true, message: `product is not present on this ${params.name}`});
        }

        const product = await Product.deleteOne({ _id: mongoose.Types.ObjectId(id) });
        // console.log(product)

        res.status(201).send({ error: false, message: 'product is deleted.', result: product });

    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error.', error });
    }
}

exports.getAllUsers = async(req, res) => {

    try {

        const users = await User.find();

        res.status(200).send({ error: false, message: 'these are the users.', result: users });
    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error.', error });
    }
}


exports.getAllOrders = async(req, res) => {

    try {

        const orders = await Order.find();
        // console.log(`orders:`, orders);

        res.status(201).send({ error: false, data: orders });
    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error', error });
    }
}