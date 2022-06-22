const mongoose = require("mongoose");

const DeadlineSchema = new mongoose.Schema({
    type: {
        type: String,
    },
    Notification1: {
        type: String,
    },
    Notification2: {
        type: String,
    },
    Notification3: {
        type: String,
    },
});

module.exports = mongoose.model('Deadlines', DeadlineSchema, 'Deadlines');