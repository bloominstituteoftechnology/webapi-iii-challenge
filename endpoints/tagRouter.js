// Implementing CRUD for tags
const express = require("express");
const router = express.Router();
const tagDb = require("../data/helpers/tagDb.js");
// get(id)
// database functions all have insert(x), remove(id), and update(id, x)

// GET by id
server.get("/:id", (req, res) => {
  const { id } = req.params;

  tagDb
    .get(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        err:
          "Server error encountered while attempting to retrieve posts by tag.."
      });
    });
});

// POST
server.post("/", (req, res) => {
  const tag = req.body;

  tagDb
    .insert(tag)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        error: "Server error encountered while attempting to add post.."
      });
    });
});

// DELETE
server.delete("/:id", (req, res) => {
  const { id } = req.params;

  tagDb
    .remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Server error encountered while deleting post.." });
    });
});

// PUT
server.put("/:id", (req, res) => {
  const { id } = req.params;
  const tag = req.body;

  tagDb
    .update(id, tag)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: "Server error encountered while updating post.." });
    });
});

module.exports(router);
