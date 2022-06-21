const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        // minlength: [8, "Password too short. Should be minimum 8 characters in length"],
        // maxlength: [15, "Password too long. Password should maximum contain 15 characters"]
    },
    isUpdated: {
        type: String,
    },
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    isAdmin: {
        type: String,
    },
    // picture: {
    //     type: Binary,
    // }

});

module.exports = mongoose.model('Login', loginSchema, 'Login');