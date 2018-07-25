//import express from express
const express = require("express");

//import files
const users = require("./data/helpers/userDb");
const posts = require("./data/helpers/postDb");
const tags = require("./data/helpers/tagDb");

//declare server
const server = express();
//parse JSON to objects
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Hello<h1>");
});

server.listen(8000, () => console.log("API running..."));
