//Modules
const express = require("express");


//Databases
const postDb = require("./data/helpers/postDb.js");
const tagDb = require("./data/helpers/tagDb.js");
const userRouter = require("./users/userRouter")



//Middleware
const server = express();
server.use(express.json());



//Route handlers
server.use("/api", userRouter)

server.listen(5000, () => console.log("Listening on port 5000"));