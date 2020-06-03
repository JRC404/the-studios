const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {type: String, required: true, unique: false},
    password: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: false}
})

module.exports = mongoose.model('users', User);