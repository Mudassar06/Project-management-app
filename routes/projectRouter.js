const router = require("express").Router();
const session = require("express-session");
const {v4: uuidv4} = require("uuid");
const mongoose = require("mongoose");
const passport = require("passport");
const { ensureAuth } = require("../auth/auth");
const User = require("../models/User");
const Project = require("../models/Project");

router.get("/", async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id); //req.user._id
    const foundItem = await User.findById(id); //req.user._id 
    // console.log(foundItem);
    res.send(foundItem.projects); //Returns all the projects in the user at hand
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

router.post("/create",async (req,res)=>{
  try {
    const { name } = req.body; // Assuming you're sending the project name in the request body
    const adminid = req.body.id;
    
    // Create a new project instance
    const newProject = new Project({
      name: name,
      admin: adminid, // add this after testing [req.user._id] instead of adminid 
    });// Assign the current user as the admin of the project

    // Save the new project to the database
    const savedProject = await newProject.save();

    // Find the current user and update their projects array
    const currentUser = await User.findById(adminid); //add req.user._id instead of adminid
    currentUser.projects.push(savedProject._id);
    await currentUser.save();

    res.status(201).send(savedProject); // Return the created project
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/delete",async (req,res)=>{
  try{
    const projectid = req.body.projectid;

    const deletedProject = await Project.findOneAndDelete(projectid);

    if(!deletedProject){
      res.send("No such project exists");
    }
    else{
      res.send("Project deleted successfully!");
    }
  }catch(err){
    res.status(500).send(err);
  }
});

module.exports = router;