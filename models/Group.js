const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    num_group: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("Group", groupSchema);