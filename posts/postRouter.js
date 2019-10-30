const express = require("express");
const db = require("./postDb");

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await db.get();

  try {
    res.status(200).json(posts);
  } catch {
    res
      .status(500)
      .json({ error: "There was an error while fetching the posts" });
  }
});

router.get("/:id", validatePostId, async (req, res) => {
  const post = await db.getById(req.params.id);

  try {
    res.status(200).json(post);
  } catch {
    res
      .status(500)
      .json({ error: "There was an error while fetching the post" });
  }
});

router.delete("/:id", validatePostId, async (req, res) => {
  const deleted = await db.remove(req.params.id);

  try {
    if (deleted) {
      res.status(200).json({ message: "The post was successfully deleted" });
    }
  } catch {
    res
      .status(500)
      .json({ error: "There was an error while deleting the post" });
  }
});

router.put("/:id", validatePostId, async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ message: "Please provide a text" });
  }

  const updated = await db.update(req.params.id, {
    text: req.body.text,
    user_id: req.user_id
  });

  try {
    const post = await db.getById(req.params.id);
    res.status(202).json(post);
  } catch {
    res
      .status(500)
      .json({ error: "There was an error while updating the post" });
  }
});

// custom middleware

async function validatePostId(req, res, next) {
  const post = await db.getById(req.params.id);
  try {
    if (post) {
      req.user_id = post.user_id;
      next();
    } else {
      res.status(404).json({ message: "There's no post with that ID" });
    }
  } catch {
    res
      .status(500)
      .json({ error: "There was an error while handling the request" });
  }
}

module.exports = router;
