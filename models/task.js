const mongoose = require('mongoose');

const taskScheme = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true, unique: true },
    isCompleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskScheme);