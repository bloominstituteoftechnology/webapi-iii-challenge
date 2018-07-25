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
server.get("/api/post/:id/tags", async (req, res) => {
  try {
    const response = await postDb.getPostTags(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: "ERROR PROCESSING REQUEST", error: error });
  }
});

server.get("/api/post/:id", async (req, res) => {
  try {
    const response = await postDb.get(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: "ERROR PROCESSING REQUEST", error: error });
  }
});

server.post("/api/post", async (req, res) => {
  if (
    !"text" in req.body &&
    !"postedBy" in req.body &&
    !"tags" in request.body
  ) {
    res.status(400).send({
      message: "PLEASE CHECK THE STRUCTURE OF YOUR POST AND TRY AGAIN"
    });
  }
  try {
    await postDb.insert(req.body);
    res.status(200).json(req.body);
  } catch (error) {
    res
      .status(500)
      .send({ message: "ERROR PROCESSING REQUEST", error: error.message });
  }
});

server.put("/api/post/:id", async (req, res) => {
  if (
    !"text" in req.body &&
    !"postedBy" in req.body &&
    !"tags" in request.body
  ) {
    res.status(400).send({
      message: "PLEASE CHECK THE STRUCTURE OF YOUR POST AND TRY AGAIN"
    });
  }
  try {
    const id = req.params.id;
    const post = req.body;
    const response = await postDb.update(id, post);
    res.status(200).json(req.body);
  } catch (error) {
    res
      .status(500)
      .send({ error: "ERROR PROCESSING REQUEST", error: error.message });
  }
});

// catch all 404
server.use(function(req, res) {
  res.status(404).send("ERROR: FILE NOT FOUND");
});

server.listen(8000, () => console.log("\n ==API RUNNING ON PORT 8000== \n"));
