const express = require("express");

const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");

const router = express.Router();

router.use(express.json());

router.post("/", validateUser, async (req, res) => {
  try {
    const newAcct = await Users.insert(req.body);
    res.status(200).json(newAcct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error adding User" });
  }
});

router.post("/:id/posts", validatePost, async (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  try {
    const newPost = await Posts.insert(postInfo);
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error posting" });
  }
});

router.get("/", async (req, res) => {
  try {
    const accounts = await Users.get(req.query);
    res.status(200).json(accounts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error retrieving Users" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const individualAcct = await Users.getById(req.params.id);
    res.status(200).json(individualAcct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "user not found" });
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    const posts = await Posts.getById(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "user not found" });
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  try {
    res.status(200).json(await Users.remove(req.params.id));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error removing" });
  }
});

router.put("/:id", validateUserId, async (req, res) => {
  try {
    res.status(200).json(await Users.update(req.params.id, req.body));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating" });
  }
});

//custom middleware

function validateUserId(req, res, next) {
  if (!req.params.id) {
    res.status(400).json({ message: "invalid user id" });
  } else {
    req.user = `${req.params.id}`;
  }
  next();
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field" });
  }
  next();
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  }
  next();
}

module.exports = router;
