const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    admin: {
        type: String,
        default: "GENERAL"
    },
    answer: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    }
}, {
    timestamps: true,
    minimize: false
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;