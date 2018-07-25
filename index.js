// initialize server
const express = require("express");
const server = express();

// import databases
const postDb = require("./data/helpers/postDb");
const tagDb = require("./data/helpers/tagDb");
const userDb = require("./data/helpers/userDb");

// use middleware
server.use(express.json());

// create endpoints
// postDb
server.get("/api/post/:id", async (req, res) => {
  try {
    const response = await postDb.get(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ error: "ERROR PROCESSING REQUEST", error });
  }
});

// catch all 404
server.use(function(req, res) {
  res.status(404).send("ERROR: FILE NOT FOUND");
});

server.listen(8000, () => console.log("\n ==API RUNNING ON PORT 8000== \n"));
