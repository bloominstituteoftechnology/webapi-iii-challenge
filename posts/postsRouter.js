const express = require("express");
const postDb = require("../data/helpers/postDb");

const router = express.Router();

router.get("/", (req, res) => {
  postDb
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

router.get("/:id", (req, res) => {
  postDb
    .get(req.params.id)
    .then(post => {
      post
        ? res.status(200).json(post)
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    );
});

router.post("/", (req, res) => {
  if (req.body.userId && req.body.text) {
    postDb
      .insert(req.body)
      .then(postId =>
        postDb.get(postId.id).then(post => res.status(201).json(post))
      )
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the post to the database."
        })
      );
  } else {
    res
      .status(400)
      .json({ message: "Please provide a userId and text for the post." });
  }
});

router.put("/:id", (req, res) => {
  if (req.body.userId && req.body.text) {
    postDb
      .update(req.params.id, req.body)
      .then(
        count =>
          count
            ? postDb.get(req.params.id).then(post => res.status(200).json(post))
            : res.status(404).json({
                message: "The post with the specified ID does not exist."
              })
      )
      .catch(err =>
        res.status(500).json({
          error: "The post information could not be modified."
        })
      );
  } else {
    res
      .status(400)
      .json({ message: "Please provide a userId and text for the user." });
  }
});

router.delete("/:id", (req, res) => {
  postDb
    .remove(req.params.id)
    .then(count => {
      count
        ? res.status(204).json(count)
        : res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed." })
    );
});

module.exports = router;
