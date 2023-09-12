const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Admin = require('../models/admin');
const User = require('../models/userSchema');
const Product = require('../models/product');
const { validateMerchnt, validatepro, getvalidate, updateValidate, deletevalidate } = require('../validation/productValidate');
const errorHandler = require('../middleware/errorclass');


exports.create = async(req, res, next) => {

    try {
        const params = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        
        const validate = await validateMerchnt.validate(params);
        if(validate.error) {
            return next(new errorHandler("credentials are invalid.", 400));
        }

        const hashedPassword = await bcrypt.hash(params.password, 10);
        params.password = hashedPassword;
        
        const admin = await Admin.create(params);
        
        const token = jwt.sign({_id: admin._id}, process.env.JWT_SECRETE);

        res.status(201).cookie("token", token, { 
            httpOnly: true, 
            maxAge: 15 * 60 * 1000, }).send({ error: false, message: 'admin createc successfully.'})
        

    } catch (err) {
        res.status(500).send({ error: true, message: 'Internal server error'})
    }
}

exports.add = async(req, res) => {

    try {
        const params = {
            name: req.body.name,
            type: req.body.type,
            value: req.body.value,
            description: req.body.description
        }

        let admin = req.admin;
        if(!admin) {
            return next(new errorHandler('you dont have access to add or remove the products.', 403));
            // res.status(403).send({ error: true, message: 'you dont have the access to Add the product.'})
        }
        
        const validate = await validatepro.validate(params);
        if(validate.error) {
            return next(new errorHandler("credentials are invalid.", 400));
        }

        const product = await Product.create(params);
        // console.log(`product:`, product)
        res.status(201).send({error: false, message: 'product added successfully.', result: product })
    } catch (e) {
        res.status(500).send({ error: true, message: 'Internal server errro.'})
    }
}

exports.get = async(req, res) => {

    try {
        const params = {
            sort: req.query.sort, 
            limit: req.query.limit
        }

        const validate = await getvalidate.validate(params);
        if(validate.error) {
            return next(new errorHandler("credentials are invalid.", 400));
        }

        const get = await Product.find({ name: params.sort });

        if(!get) {
            return next(new errorHandler(`sorry, we cant find any products on this ${params.sort}`))
            // res.status(404).send({error: true, message: `Sorry, we dont have any products on theses ${sort}`});
        }

        const limitedData = get.slice(0, params.limit);

        res.status(201).send({ error: false, message: `we have these many on ${params.sort}`, result: limitedData});

    } catch (err) {
        res.status(500).send({ error: true, message: 'Internal server error.'});
    }
}

exports.update = async(req, res) => {

    try {
        const id = req.params.id;
        const params = {
            name: req.body.name,
            type: req.body.type,
            value: req.body.value,
            description: req.body.description
        }

        const validate = await updateValidate.validate({ id, params });
        if(validate.error) {
            return next(new errorHandler("credentials are invalid.", 400));
        }

        const exists = await Product.findById({ _id: id });

        if(!exists) {
            res.status(404).send({ error: true, message: `product is not present on this ${params.name}`});
        }

        const product = await Product.updateOne(params);
        // console.log(product);

        res.status(201).send({ error: false, message: 'product is updated successfully.', resulr: product });
    } catch (e) {
        res.status(500).send({ error: true, message: 'Internal server error.' });
    }
}

exports.delete = async(req, res) => {

    try {

        const id = req.params.id;
        const validate = await validate.deletevalidate(id);
        if(validate.error) {
            return next(new errorHandler("credentials are invalid.", 400));
        }
        
        const exists = await Product.findById({ _id: id });

        if(!exists) {
            return next(new errorHandler(`product is not found`, 404))
            // res.status(404).send({ error: true, message: `product is not present on this ${params.name}`});
        }

        const product = await Product.deleteOne({ _id: id });
        // console.log(product)

        res.status(201).send({ error: false, message: 'product is deleted.', result: product });

    } catch (e) {
        res.status(500).send({ error: true, message: 'Internal server error.' });
    }
}

exports.getUser = async(req, res, next) => {

    try {

        const users = await User.find();

        res.status(200).send({ error: false, message: 'these are the users.', result: users });
    } catch (e) {
        res.status(500).send({ error: true, message: 'Internal server error.'});
    }
}