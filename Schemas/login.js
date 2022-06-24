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
    Fname: {
        type: String,
    },
    Lname: {
        type: String,
    },
    phone: {
        type: String,
    },
    isAdmin: {
        type: String,
    },
    secretKey: {
        type: String,
    },
    loggedIn: {
        type: String,
    },
});

module.exports = loginSchema;

// module.exports = mongoose.model('Login', loginSchema, 'Login');