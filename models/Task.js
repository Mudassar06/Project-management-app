const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    deadline:{
        type: Date,
    },
    assignedBy:{
        type: String,
        required: true,
    },
    assignedTo:{
       type:String, 
    },
    tags:{
        type: String,
        required: false,
    },
    position:{ //1)To Do, 2)In Progress, 3)Done
        type: Number,
        required: true,
    }
});

const Task = new mongoose.model("Task", taskSchema);

module.exports = Task;