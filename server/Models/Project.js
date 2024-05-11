const mongoose = require("mongoose");
const { Schema } = mongoose

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    client_name: {
        type: String,
        required: false
    },
    frontend: {
        type: String,
        required: false
    },
    backend: {
        type: String,
        required: false
    },
    project_type: {
        type: String,
        required: false
    },
    start_date: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        require: false
    },
    image: {
        type: String,
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Project", ProjectSchema);