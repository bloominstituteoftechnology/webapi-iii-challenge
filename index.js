const express = require("express");
const uppercaseMW = require("./uppercaseMW");
const userDB = require("./data/helpers/userDb");
const postDb = require("./data/helpers/postDb");

const server = express();
server.use(express.json());
server.use(uppercaseMW.uppercase);

server.get("/users", async (req, res) => {
  try {
    const results = await userDB.get();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get("/users/:userID", async (req, res) => {
  if (!Number(req.params.userID)) {
    res.status(400).json({ errorMessage: "ID not a number" });
  }
  try {
    const results = await userDB.get(Number(req.params.userID));
    if (results) {
      res.status(200).json(results);
    }
    res.status(500).json({ errorMessage: "Invalid ID for lookup" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
server.delete("/users/:userID", async (req, res) => {
  if (!Number(req.params.userID)) {
    res.status(400).json({ errorMessage: "ID not a number" });
  }
  try {
    const results = await userDB.remove(Number(req.params.userID));
    if (results === 1) {
      res.status(200).json({ message: "Success" });
    }
    res.status(500).json({ errorMessage: "Invalid ID for removal" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

server.put("/users", async (req, res) => {
  //this is basically looking for an object to be in the body like {"name":"***SampleUserName***"}
  if (!req.body.name) {
    res.status(400).json({ errorMessage: "Username needed" });
  }
  try {
    const results = await userDB.insert(req.body);
    res.status(200).json({ results });
  } catch (err) {
    if (err.errno === 19) {
      res.status(500).json({ errorMessage: "Need a unique username" });
    }
    console.log(err);
    res.status(500).json(err);
  }
});
server.put("/users/:userID", async (req, res) => {
  if (!Number(req.params.userID)) {
    res.status(400).json({ errorMessage: "ID not a number" });
  }
  if (!req.body.name) {
    res.status(400).json({ errorMessage: "Username needed" });
  }
  try {
    const results = await userDB.update(Number(req.params.userID), req.body);
    if (results === 1) {
      res.status(200).json({ message: "Success" });
    }
    res.status(500).json({ errorMessage: "Invalid ID for removal" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

server.get("/posts", async (req, res) => {
  try {
    const results = await postDb.get();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get("/posts/:postID", async (req, res) => {
  if (!Number(req.params.postID)) {
    res.status(400).json({ errorMessage: "ID not a number" });
  }
  try {
    const results = await postDb.get(Number(req.params.postID));
    if (results) {
      res.status(200).json(results);
    }
    res.status(500).json({ errorMessage: "Invalid post for lookup" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

server.put("/posts/", async (req, res) => {
  if (!req.body.userId || !req.body.text) {
    res.status(400).json({ errorMessage: "Content missing" });
  }
  try {
    const results = await postDb.insert(req.body);
    console.log(results);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
server.get("/posts/user/:userid", async (req, res) => {
  try {
    const results = await postDb.getPostsForUser(req.params.userid);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});
server.put("/posts/:postID", async (req, res) => {
  if (!req.body.userId || !req.body.text) {
    res.status(400).json({ errorMessage: "Content missing" });
  }
  if (!Number(req.params.postID)) {
    res.status(400).json({ errorMessage: "ID not a number" });
  }
  try {
    const results = await postDb.update(req.params.postID, req.body);
    console.log(results);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



server.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);

server.listen(9001, () => console.log("API running on port 9001"));
