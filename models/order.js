const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    name: { type: String, require: true },
    mobile: { type: Number, require: true },
    address: { type: String, require: true },
    orederedAt: { type: Date, default: Date.now() },
    custId: [{ type: String }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
