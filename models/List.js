const mongoose = require("mongoose");

const listModel = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    userDef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    default: {
        type: Number,
        required: true
    },
    pagado: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("List", listModel);