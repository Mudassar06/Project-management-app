require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const auth = require("./auth/auth");
const authRouter = require("./routes/authRouter");
const projectRouter = require("./routes/projectRouter");

app.use(
    session({
      secret: uuidv4(),
      resave: false,
      saveUninitialized: false,
    //   cookie: { maxAge: 1000 * 60 * 60 * 24 },
    })
);
  
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth",authRouter);
app.use("/projects",projectRouter);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
});

app.listen(process.env.PORT || 3030, (req,res)=>{
    console.log(`Server is running`);
})
