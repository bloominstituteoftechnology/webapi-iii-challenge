//Modules
const express = require("express");


//Databases
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter")



//Middleware
const server = express();
server.use(express.json());



//Route handlers
server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)

server.listen(5000, () => console.log("Listening on port 5000"));