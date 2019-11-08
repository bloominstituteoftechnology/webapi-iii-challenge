const express = require("express");
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

// Create a new User
router.post("/", validateUser, async (req, res) => {
  try {
    const user = await userDb.insert(req.body);
    return res.status(201).json(user);
  }
  catch (err) {
    return res.status(500).json({ errorMessage: "Internal Server Error", error: err });
  }
});

// Create new post for user at ID
router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postDb.insert({...req.body, user_id: id});
    return res.status(201).json(post);
  }
  catch (err) {
    return res.status(500).json({ errorMessage: "Unable to add post", error: err });
  }
});

router.get("/", (req, res) => {});

router.get("/:id", validateUserId, (req, res) => {});

router.get("/:id/posts", validateUserId, (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {});

router.put("/:id", validateUserId, (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
  const id = req.params.id;
  try {
    const user = await userDb.getById(id);
    user
      ? (req.user = user)
      : res.status(400).json({ message: "Invalid user ID" });
  } catch (err) {
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
  next();
}

function validateUser(req, res, next) {
  if (!req.body) return res.status(400).json({ message: "missing user data" });
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Missing required name field" });
  next();
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!req.body) return res.status(400).json({ message: "Missing post data" });
  if (!text) return res.status(400).json({ message: "Missing required text field" });
  next();
}

module.exports = router;
