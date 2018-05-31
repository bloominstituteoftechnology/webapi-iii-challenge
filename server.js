const express = require("express");
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

server.listen(port, () => console.log(`*** Server Running on Port ${port} ***`))