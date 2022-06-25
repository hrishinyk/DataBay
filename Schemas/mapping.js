const mongoose = require("mongoose");

const mappingSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    branch: {
        type: String,
    },
    semester: {
        type: String
    },
    filename: {
        type: String,
    },
    subject: {
        type: String,
    }
});

module.exports = mappingSchema;