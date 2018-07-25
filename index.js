const express = require("express");
const server = express();

const postDb = require("./data/helpers/postDb.js");
const tagDb = require("./data/helpers/tagDb.js");
const UserDb = require("./data/helpers/userDb.js");


server.use(express.json());


server.listen(8000, () => {console.log("Server is listening on port 8000")})
