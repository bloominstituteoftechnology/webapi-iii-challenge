const express = require("express");
const db = require("./userDb");
const dbPost = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, async (req, res) => {
  try {
    const userId = await db.insert({ name: req.body.name });

    res.status(200).json(userId);
  } catch {
    res
      .status(500)
      .json({ error: "There was an error while creating the new user" });
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  try {
    const post = await dbPost.insert({
      text: req.body.text,
      user_id: req.params.id
    });

    res.status(200).json(post);
  } catch {
    res
      .status(500)
      .json({ error: "There was an error while creating a new post" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch {
    res
      .status(500)
      .json({ error: "There was an error while fetching the users" });
  }
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  try {
    const posts = await db.getUserPosts(req.user.id);
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(200).json({ message: "This user has no posts" });
    }
  } catch {
    res
      .status(500)
      .json({ error: "There was an error while fetching posts for the user" });
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  try {
    const deleted = await db.remove(req.params.id);
    deleted
      ? res.status(202).json({ message: "The user was successfully deleted" })
      : null;
  } catch {
    res
      .status(500)
      .json({ error: "There was an error while deleting the user" });
  }
});

router.put("/:id", validateUserId, validateUser, async (req, res) => {
  try {
    const updated = await db.update(req.params.id, { name: req.body.name });
    if (updated) {
      const user = await db.getById(req.params.id);
      res.status(200).json(user);
    }
  } catch {
    res.status(500).json({ error: "There was an error while updating user" });
  }
});

//custom middleware

async function validateUserId(req, res, next) {
  try {
    const user = await db.getById(req.params.id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "There's no user with that ID" });
    }
  } catch {
    res
      .status(500)
      .json({ error: "There was an error while handling the request" });
  }
}

function validateUser(req, res, next) {
  if (!Object.getOwnPropertyNames(req.body).length) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!Object.getOwnPropertyNames(req.body).length) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
