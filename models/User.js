const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
    googleId:{
        type: String,
        required:true,
    },
    username:{
        type: String,
    },
    projects:{
        type: Array,
        default: [],
    },
});

userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

module.exports = User;