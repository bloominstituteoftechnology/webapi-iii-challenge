const express = require("express");
const db = require("../data/helpers/postDb.js");

const postRouter = express.Router();
const genericError = { err: "There was a problem completing the request" };

postRouter.get("/", async (req, res) => {
  try {
    const getPosts = await db.get();
    res.status(200).json(getPosts);
  } catch {
    res.status(500).json(genericError);
  }
});

postRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getPost = await db.getById(id);
    if (getPost) {
      res.status(200).json(getPost);
    } else {
      res.status(404).json({ err: "Post does not exist" });
    }
  } catch {
    res.status(500).json(genericError);
  }
});

postRouter.post("/", async (req, res) => {
  try {
    if (!req.body.user_id) {
      res.status(400).json({ err: "Please provide a user id" });
    } else if (!req.body.text) {
      res.status(400).json({ err: "Please provide text to post." });
    } else {
      const newPost = await db.insert(req.body);
      if (newPost) {
        res.status(201).json(newPost);
      } else {
        res.status(400).json({ err: "Please provide an existing user id" });
      }
    }
  } catch {
    res.status(500).json(genericError);
  }
});

postRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const editPost = await db.update(id, req.body);
    if (editPost) {
      res.status(201).json({ message: "Post edited successfully" });
    } else {
      res.status(400).json({ err: "Post could not be edited" });
    }
  } catch {
    res.status(500).json(genericError);
  }
});

postRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await db.remove(id);
    if (deleted) {
      res.status(200).json({ message: "Post succesfully deleted!" });
    } else {
      res.status(400).json({ err: "Could not find post to be deleted" });
    }
  } catch {
    res.status(500).json(genericError);
  }
});

module.exports = postRouter;
