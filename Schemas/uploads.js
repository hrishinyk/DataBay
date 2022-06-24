const mongoose = require("mongoose");
const uploadSchema = new mongoose.Schema({
    filename: { type: String, },
    branch: { type: String, },
    semester: { type: String },
    isUpdated: { type: String },
});
module.exports = uploadSchema;