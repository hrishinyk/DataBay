const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "email ID is required"],
    },
    password: {
        type: String,
        required: true,
        // minlength: [8, "Password too short. Should be minimum 8 characters in length"],
        // maxlength: [15, "Password too long. Password should maximum contain 15 characters"]
    }
});

module.exports = new mongoose.model("login", loginSchema);