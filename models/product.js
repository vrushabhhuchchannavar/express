const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, require: true },
    type: { type: String, require: true },
    value: { type: Number, require: true },
    description: { type: String, require: true }
});

module.exports = mongoose.model("Product", productSchema);