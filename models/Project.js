const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    admin:{
        type: Array,
        required: true,
        default:[],
    },
    name:{
        type: String,
        required: true,
    },
    members:{
        type: Array,
        default: [],
    }
});

const Project = new mongoose.model("Project", projectSchema);

module.exports = Project;