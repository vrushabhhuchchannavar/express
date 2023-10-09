const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, select: false },
    // createdAt: { type: Date, default: Date.now }
},  {
    timestamps: true
});

module.exports = mongoose.model('User', userScheme);