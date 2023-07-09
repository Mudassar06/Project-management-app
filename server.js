require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
// const auth = require("./auth/auth");
const authRouter = require("./routes/authRouter");
const projectRouter = require("./routes/projectRouter");
const taskRouter = require("./routes/taskRouter");
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173/",
}));

//Socket.io
const http = require("http");
const server = http.createServer(app);
// const { Server } = require("socket.io");
const io = require("socket.io")(server,{
    cors: true, 
    origins: ["http://localhost:5173/"]
})

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
app.use("/projects/tasks",taskRouter);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
});

let users = {}

io.on('connection', (socket) => {
    console.log('a user: ' +socket.id + 'has connected');
    let clientId = socket.id
    socket.on('disconnect', () => {

    //Update all the data in the user's table:
      
    console.log('user ' +socket.id + ' disconnected');
    
        delete users[`${socket.id}`]

    });

    socket.on("update-table",(initialState)=>{
        console.log(initialState);
    })

    socket.on("update-table", (socket) => {
        users =  { ...users, [clientId]: { clientData : socket.client_data }} 
        console.log(users)
    })


});




app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/client/index.html")
})

server.listen(process.env.PORT || 3030, (req,res)=>{
    console.log(`Server is running`);
})
