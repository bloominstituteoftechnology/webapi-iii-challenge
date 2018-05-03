// Node Modules
const express = require("express");

// Router level middleware
const router = express.Router();

const db = require("../helpers/postDb");

// GET posts; root
router.get("/", (req, res) => {
  db
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error retrieving posts."
      });
    });
});

// GET post by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db;
  get(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error retrieving the specified post."
      });
    });
});

//  GET post tags by id; getPostTags
router.get("/:id/tags", (req, res) => {
  const { id } = req.params;

  db
    .getPostTags(id)
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error retrieving the specified post's tags."
      });
    });
});

// POST add new posts; insert
router.post("/", (req, res) => {
  const post = req.body;

  db
    .insert(post)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error adding a post."
      });
    });
});

// PUT update posts by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.get(id).then(updatedPost => {
          res.status(200).json(updatedPost);
        });
      } else {
        res.status(404).json({
          error: "Could not find specified post."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error updating the post."
      });
    });
});
