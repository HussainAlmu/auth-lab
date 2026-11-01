const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    entry: {
        type: String,
        required: true,
        maxlength: 1000
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;