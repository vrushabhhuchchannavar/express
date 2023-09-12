const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const errorHandler = require('../middleware/errorclass');
const User = require('../models/userSchema');
const validate = require('../validation/uservalidation');

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

exports.getById = (req, res) => {
    try {

        res.status(201).send({ success: true, result: req.user });
    } catch (err) {
        res.status(500).send({ error: true, message: 'failed to read the user', err})
    }
}

exports.create = async(req, res, next) => {
    try {
        let params = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        } 

        await validate.validateUSer(params);
        let existUser = await User.findOne({ email: params.email });
        if(existUser) {
            return next(new errorHandler("user already exists.", 401));
            // res.status(401).send({ error: true, message: 'user alresdy exists' })
        }
       
        if(!params.name || !params.email || !params.password) {
            return next(new errorHandler('required all values', 401))
            // res.status(404).send({ error: true, message: 'required all values'});
        } 

        let hashedPassword = await bcrypt.hash(params.password, 10);
        params.password = hashedPassword; 

        const user = await User.create(params);
        
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRETE);

        res.status(201)
        .cookie("token", token, { 
            httpOnly: true, 
            maxAge: 15 * 60 * 1000, 
            sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .send({ error: false, message: 'registered successfully', result: user });
        

    } catch (err) { 
        res.status(500).send({ error: true, message: 'failed to create', err })
    }
    
}

exports.login = async(req, res, next) => {
    try {
        let { email, password } = req.body;

        await validate.validatelogin({ email, password });
        let user = await User.findOne({ email }).select("+password");
        
        if(!user) {
            return next(new errorHandler('invalid email or password', 404));
            // res.status(404).send({error: true, message: 'invalid email or password'});
        }
        
        const matchpass = bcrypt.compare(password, user.password);
        
        if(!matchpass) {
            return next(new errorHandler('does not match the password', 404));
            // res.send({error: true, message: 'does not match the password'});
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRETE);

        res.status(201).cookie("token", token, { 
            httpOnly: true, maxAge: 15 * 60 * 1000, 
            sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,})
            .send({error: false, message: `welcome back ${user.name}`}); 
    
    } catch (err) {
        res.status(500).send({error: true, err});
    }
}

exports.logout = async(req, res) => {

    res.status(201)
        .cookie("token", "", { expires: new Date(Date.now()) })
        .send({ error: false, message: 'you logged out sucessfully.' });
}




// exports.getProducts = async(req, res, next) => {

// }



// exports.update = async(req, res) => {
//     try {
//         const userId = req.params.id;
//         const { name, email } = req.body;
        
//         const user = await User.findOne({_id: userId});
//         if(!user) {
//             res.status(404).send({ error: true, message: 'user is not found'});
//         }

//         const response = await User.findByIdAndUpdate(userId, {
//             name: name,
//             email: email
//         }, { new: true });
        
//         res.status(201).json({
//             error: false, message: 'user is updated', result: response
//         });
//     } catch (err){
//         res.status(500).send({ error: true, message: 'failed to update', err });
//     }
// }

// exports.delete = async(req, res) => {
//     try { 
//         const id = req.query.id;
//         const user = await User.find({id});
//         if(!user) {
//             res.status(404).send({ error: true, message: 'user is not found' });
//         }

//         const response = await User.findByIdAndDelete(id);

//         res.status(201).send({
//             error: false,
//             message: 'user is deleted',
//             result: response
//         });
//     } catch (err) {
//         res.status(500).send({ error: true, message: 'failed to delete', err})
//     }
// }
