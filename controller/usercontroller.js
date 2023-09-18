const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const errorHandler = require('../middleware/errorclass');
const User = require('../models/userSchema');
const { validateUser, validatelogin, getAllusersValidate } = require('../validation/uservalidation');

// exports.getAll = async(req, res) => {
//     const users = await User.find();
//     res.json({ success: true, result: users });
// } 

// exports.getByName = async(req, res) => {
// // filtering, sorting, pagination

//     const name = req.query.name;
//     const sort = req.query.name;
//     const currPage = req.query.currPage;
//     const limit = req.query.limit;

//     // const name = req.query.name;
//     console.log(` name: ${name}`)
//     const user = await User.find({name});
//     console.log(`user: ${user}`);

//     res.send({ error: false, message: 'users with same name', result: user})
// }

exports.getUser = (req, res) => {
    try {

        // const user = req.user;
        // if(!user) {
        //     res.status(403).send({ error: true, message: 'please login.'});
        // }

        res.status(201).send({ success: true, result: req.user });

    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error', error })
    }
}


exports.getAllUsers = async(req, res, next) => {

    try {
        let page = req.query.page;
        let limit = req.query.limit;
        let skipCount = (page-1) * limit;
        
        const validate = await getAllusersValidate.validate({page, limit});
        
        if (validate.error) {
            return next(new errorHandler('please put valid credentials', 401));
        }
        
        if(page < 1) {
            return next(new errorHandler('page has to be greater than 1', 401));
        }
         
        const users = await User.find().skip(skipCount).limit(limit);
        
        res.status(200).send({ error: false, message: 'these are the users.', result: users });
    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error.', error });
    }
}


exports.createUser = async(req, res, next) => {
    try {
        let params = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        } 

        const validate = await validateUser.validate(params);
        if(validate.error) {
            return next(new errorHandler("please enter valid credentials.", 400));
        }
        
        let existUser = await User.findOne({ email: params.email });
        if(existUser) {
            return next(new errorHandler("user already exists.", 400));
            // res.status(401).send({ error: true, message: 'user alresdy exists' })
        }
       
        
        let hashedPassword = await bcrypt.hash(params.password, 10);
        params.password = hashedPassword; 

        const user = await User.create(params);
        
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRETE);

        res.status(201)
        .cookie("token", token, { 
            httpOnly: true, 
            maxAge: 15 * 60 * 1000 })
        .send({ error: false, message: 'registered successfully', result: user });

    } catch (error) { 
        res.status(500).send({ error: true, message: 'Internal server error', error });
    }
}


exports.updateUser = async(req, res, next) => {

    try {

        const params = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const validate = await validateUser.validate(params);
        if(validate.error) {
            return next(new errorHandler("please enter valid credentials.", 400));
        }

        const exist = await User.findOne({ email: params.email }).select("+password");

        if(!exist) {
            return next(new errorHandler('user does not exists', 404));
        }

        const user = await User.findByIdAndUpdate({ _id: exist._id });

        res.status(200)
        .cookie("token", token, { 
            httpOnly: true, 
            maxAge: 15 * 60 * 1000 })
        .send({ error: false, message: 'user updated successfully', result: user });
    } catch (error) {
        res.status(500).send({ error: true, message: 'internal server error', error });
    }
}


exports.deleteuser = async(req, res, next) => {

    try {

        const id = req.params.id;

        const user = await User.findById({ _id: mongoose.Types.ObjectId(id) });

        if(!user) {
            return next(new errorHandler('user is does not exists', 404));
        }

        await User.deleteOne(id);

        res.status(200).send({ error: true, message: 'user is deleted successfully', error });
    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error', error });
    }
}



exports.login = async(req, res, next) => {
    try {
        let { email, password } = req.body;

        const validate = await validatelogin.validate({ email, password });
        if(validate.error) {
            return next(new errorHandler("please enter valid credentials.", 400));
        }

        let user = await User.findOne({ email }).select("+password");
        
        if(!user) {
            return next(new errorHandler('invalid email or password', 400));
            // res.status(404).send({error: true, message: 'invalid email or password'});
        }
        
        // const matchpass = bcrypt.compare(password, user.password);
        
        // if(!matchpass) {
        //     return next(new errorHandler('does not match the password', 401));
        //     // res.send({error: true, message: 'does not match the password'});
        // }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRETE);

        res.status(201).cookie("token", token, { 
            httpOnly: true, maxAge: 15 * 60 * 1000 })
            .send({error: false, message: `welcome back ${user.name}`}); 
    
    } catch (error) {
        res.status(500).send({error: true, message: 'Internal server error', error });
    }
}

exports.logout = async(req, res) => {

    try {

        res.status(201)
        .cookie("token", "", { expires: new Date(Date.now()) })
        .send({ error: false, message: 'you logged out sucessfully.' });

    } catch (error) {
        res.status(500).send({ error: true, message: 'Internal server error', error });
    }
}




// exports.getProducts = async(req, res, next) => {

// }



// sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
// secure: process.env.NODE_ENV === "Development" ? false : true,