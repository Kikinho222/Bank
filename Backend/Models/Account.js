const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const accounts = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    balance: { type: Number, default: 1000 },
    confirmationToken: {type: String, defaule: ''},
    isConfirmed: {type: Boolean, default: false},
});


accounts.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Account', accounts);
