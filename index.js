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
    const id = req.params.id;
    const response = await postDb.getPostTags(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ message: "ERROR PROCESSING REQUEST", error: error });
  }
});

server.get("/api/post/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await postDb.get(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ message: "ERROR PROCESSING REQUEST", error: error });
  }
});

server.post("/api/post", async (req, res) => {
  if (
    !"text" in req.body &&
    // !"postedBy" in req.body &&
    !"tags" in request.body
  ) {
    res.status(400).send({
      message: "PLEASE CHECK THE STRUCTURE OF YOUR POST AND TRY AGAIN"
    });
  }
  try {
    const post = req.body;
    const response = await postDb.insert(post);
    res.status(200).send(response);
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
    res.status(200).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ message: "ERROR PROCESSING REQUEST", error: error.message });
  }
});

server.delete("/api/post/:id", async (req, res) => {
  try {
    const response = await postDb.remove(req.params.id);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ message: "ERROR PROCESSING REQUEST", error: error.message });
  }
});

// tagDb
server.get("/api/tag/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await tagDb.get(id);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ message: "ERROR PROCESSING REQUEST", error: error.message });
  }
});

server.post("/api/tag", async (req, res) => {
  try {
    const post = req.body;
    const response = await tagDb.insert(post);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ message: "ERROR PROCESSING REQUEST", error: error.message });
  }
});

server.put("/api/tag/:id", async (req, res) => {
  try {
    const post = req.body;
    const id = req.params.id;
    const response = await tagDb.update(post, id);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ message: "ERROR PROCESSING REQUEST", error: error.message });
  }
});

server.delete("/api/tag/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await tagDb.remove(id);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ message: "EROR PROCESSING REQUEST", error: error.message });
  }
});

// userDb
server.get("/api/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await userDb.get(id);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ message: "ERROR PROCESSING REQUEST", error: error.message });
  }
});

server.get("/api/user/:id/posts", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await userDb.getUserPosts(id);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ message: "ERROR PROCESSING REQUEST", error: error.message });
  }
});

server.post("/api/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = res.body;
    const response = await userDb.insert(id, user);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ message: "ERROR PROCESSING REQUEST", error: error.message });
  }
});

server.put("/api/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.params.user;
    const response = await userDb.update(id, user);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ message: "ERROR PROCESSING REQUEST", error: error.message });
  }
});

server.delete("/api/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await userDb.remove(id);
    res.status(200).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ message: "ERROR PROCESSING REQUEST", error: error.message });
  }
});

// catch all 404
server.use(function(req, res) {
  res.status(404).send("ERROR: FILE NOT FOUND");
});

server.listen(8000, () => console.log("\n ==API RUNNING ON PORT 8000== \n"));
