const jwt = require('jsonwebtoken');

exports.token = async(user) => {

    const secretekey = process.env.JWT_SECRETE;
    console.log(secretekey);
    console.log(user);
    
    const token = jwt.sign({ _id: user._id}, secretekey);
    console.log(token);
}