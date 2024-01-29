const mongoose = require('mongoose');

exports.connect = async(req, res) => {

    // mongoose.connection.on('error', function (err) {
    //     console.log(err);
    // });

    await mongoose.connect("mongodb+srv://vrushabh:vru1008@dev-vrushabh.t1isxps.mongodb.net/backend", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // console.log('db is connected.');
}


// confif file 
// {
//     "reporters": [
//       "default",
//       ["./node_modules/jest-html-reporters", {
//           "pageTitle": "Test Report"
//       }]
//     ]
//     }
