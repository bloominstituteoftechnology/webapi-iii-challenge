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

module.exports = postRouter;
