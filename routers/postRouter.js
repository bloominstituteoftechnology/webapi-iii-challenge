const express = require("express");
const db = require("../data/helpers/postDb.js");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  try {
    const getPosts = await db.get();
    res.status(200).json(getPosts);
  } catch {
    res.status(500).json({ err: "There was a problem completing the request" });
  }
});

postRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getPost = await db.getById(id);
    res.status(200).json(getPost);
  } catch {
    res.status(500).json({ err: "There was a problem completing the request" });
  }
});

module.exports = postRouter;
