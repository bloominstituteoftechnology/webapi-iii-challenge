const express = require("express");
const cors = require("cors");
const postDB = require("./data/helpers/postDb");
const tagDB = require("./data/helpers/tagDB");
const userDB = require("./data/helpers/userDB");
const server = express();
const port = 5000;

//Routes

const userRoutes = require("./Users/UserRoutes")
const tagRoutes = require("./Tags/TagRoutes")
const postRoutes = require("./Posts/PostRoutes")

//MiddleWare

server.use(cors())
server.use(express.json())
server.use("/api/user" , userRoutes)
server.use("/api/post" , postRoutes)
server.use("/api/tags" , tagRoutes)



server.listen(port, () => console.log(`*** Server Running on Port ${port} ***`))