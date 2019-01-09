const express = require("express");
const router = express.Router();

const posts = require(".././data/helpers/postDb");
const users = require(".././data/helpers/userDb");

const errorMaker = (code, message, res) => {
  res.status(code).json({ error: message });
};

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await posts.get(id);
    return !post
      ? errorMaker(404, "A post with that id does not exist", res)
      : res.status(302).json(post);
  } catch (err) {
    errorMaker(500, "The server could not be reached", res);
  }
});

router.get("/", async (req, res) => {
  try {
    const postList = await posts.get();
    res.status(302).json(postList);
  } catch (err) {
    errorMaker(500, "Unable to reach server", res);
  }
});

router.post("/", async (req, res) => {
  const newPost = req.body;

  if (!newPost.userId || !newPost.text) {
    errorMaker(400, "Please include both a userId and text", res);
  } else {
    try {
      const user = await users.get(newPost.userId);
      if (!user) {
        return errorMaker(404, "A user with that id does not exist", res);
      }
      const post = await posts.insert(newPost);
      return post
        ? res.status(201).json(post)
        : errorMaker(404, "A user with that id does not exist", res);
    } catch (err) {
      errorMaker(500, "Unable to reach server", res);
    }
  }
});

router.put("/:id", async (req, res) => {
  const updated = req.body;
  const { id } = req.params;

  if (!updated.userId || !updated.text) {
    errorMaker(400, "Please include both a userId and text", res);
  } else {
    try {
      const user = await users.get(updated.userId);
      const success = await posts.update(id, updated);

      if (!user && !success) {
        return errorMaker(404, "Neither the userId nor the postId exist", res);
      }

      if (!user) {
        return errorMaker(404, "A user with that id does not exist", res);
      }

      return success
        ? res.status(202).json(updated)
        : errorMaker(404, "A post with that id does not exist", res);
    } catch (err) {
      errorMaker(500, "Unable to reach server", res);
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await posts.get(id);
    const success = await posts.remove(id);
    if (success) {
      res.status(200).json(post);
    } else {
      errorMaker(404, "A post with that id does not exist", res);
    }
  } catch (err) {
    errorMaker(500, "Unable to reach server", res);
  }
});

module.exports = router;
