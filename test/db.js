const mongoose = require('mongoose');

exports.connect = async(req, res) => {

    mongoose.connection.on('error', function (err) {
        console.log(err);
    });

    await mongoose.connect("mongodb://localhost:27017/backend", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // console.log('db is connected.');
}
