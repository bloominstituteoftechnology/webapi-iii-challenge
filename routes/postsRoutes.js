const express = require("express");
const route = express.Router();

// database
const postDb = require("../data/helpers/postDb");

route.get("/", async (req, res) => {
  try {
    const posts = await postDb.get();
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The posts cannot be retrieved from the database." });
  }
});
route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postDb.get(id);
    console.log("bt3", post);
    if (!post) {
      res.status(404).json({ message: "The post was not found" });
    } else {
      res.json(post);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error trying to find the post." });
  }
});

route.post("/addpost/:userId", async (req, res) => {
  const { userId } = req.params;
  const post = req.body;

  try {
    const user = await postDb.get(userId);
    if (!user) {
      res.status(404).json({ message: "User was not found." });
    } else {
      const newPost = await postDb.insert(post);
      res.json(newPost);
    }
  } catch (err) {
    res.status(500).json({ message: "Could not add a new post." });
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postDb.get(id);
    console.log("post", post);
    if (!post) {
      res.status(404).json({ message: "The post does not exist." });
    } else {
      await postDb.remove(id);
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({ message: "Could not delete post." });
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  try {
    const updatedPost = await postDb.update(id, post);
    if (!updatedPost) {
      res
        .status(404)
        .json({ message: "Cannot update a post that doesn't exist." });
    } else {
      res.json(updatedPost);
    }
  } catch (err) {
    res.status(500).json({ message: "Could not update post." });
  }
});

module.exports = route;
