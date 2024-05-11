const mongoose = require("mongoose");
const { Schema } = mongoose

const BugSchema = new Schema({
    p_id: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    d_id: {
        type: Schema.Types.ObjectId,
        ref: 'Developer',
        required: true
    },
    sd_id: {
        type: Schema.Types.ObjectId,
        ref: 'Developer',
        required: true
    },
    error_code: {
        type: String,
        required: false
    },
    error_type: {
        type: String,
        required: false
    },
    error_message: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    error_severity_level: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Bug", BugSchema);