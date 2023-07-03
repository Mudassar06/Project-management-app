const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
    },
    deadline:{
        type: Date,
        required: true,
    },
    assignedBy:{
        type: String,
        required: true,
    },
    assignedTo:{
       type:String,
       required: true, 
    },
    tags:{
        type: String,
        required: false,
    },
});

const Task = new mongoose.model("Task", taskSchema);

module.exports = Task;