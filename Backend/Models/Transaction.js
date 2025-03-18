const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const transactions = new mongoose.Schema({
    sender: {type: String, required: true},
    receiver: {type: String, required: true},
    amount: { type: Number, required: true },
    timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactions);
