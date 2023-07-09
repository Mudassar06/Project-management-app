const router = require("express").Router();
const mongoose = require("mongoose");
const { ensureAuth } = require("../auth/auth");
const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");

router.post("/create", async (req,res)=>{
    try{
        const {project, description, deadline, assignedBy, position} = req.body;
        const newTask = new Task({
            project : project,
            description: description,
            deadline: deadline,
            assignedBy: assignedBy, //req.user._id
            position: position,
        })

        const savedTask = await newTask.save();

        res.send(savedTask);
    }catch(err){
        res.send(err);
    }
});


module.exports = router;

//Auth
//Sockets 
//Gmail: nodemailer
//Server and data ka reconciliation(client server reconciliation)