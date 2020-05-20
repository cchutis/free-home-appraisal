const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_prefix: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone_number: String,
    city: String,
    state: String,
    professional: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model('user', userSchema);

module.exports.get = User;