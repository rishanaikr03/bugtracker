const mongoose = require("mongoose");
const { Schema } = mongoose

const AssignSchema = new Schema({
    p_id: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    d_id: {
        type: Schema.Types.ObjectId,
        ref: 'Developer',
        require: true
    },
    role: {
        type: String,
        require: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Assign", AssignSchema);