const express = require("express");
const router = express.Router();

const tags = require("../helpers/tagDb");

router.get("/", (req, res) => {
  tags
    .get()
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The tags information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  tags
    .get(req.params.id)
    .then(tag => {
      if (!tag) {
        res
          .status(404)
          .json({ message: "The tag with the specified ID does not exist." });
      }
      res.status(200).json(tag);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The tag information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res.status(400).json({
      errorMessage: "Please provide tag for the post."
    });
  }
  tags
    .insert({ tag })
    .then(post => res.status(201).json({ tag }))
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the tag to the database"
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  tags
    .remove(id)
    .then(tags => {
      if (tags === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json({ message: "post deleted" });
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be deleted." });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { tag } = req.body;
  if (!tag) {
    res.status(400).json({ errorMessage: "Please provide tag for post." });
  }
  tags
    .update(id, { tag })
    .then(post => {
      if (!post) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        });
      }
      res.status(200).json({ tag });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

module.exports = router;
