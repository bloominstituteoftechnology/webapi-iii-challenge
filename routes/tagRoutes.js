const express = require("express");
const router = express.Router();
const tagDb = require("../data/helpers/tagDb");

//! ==================== TAGS DB ====================

//* GET Request tagDB get()
router.get("/", (req, res) => {
  tagDb
    .get()
    .then(tags => res.status(200).json(tags))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The tags information could not be retrieved." })
    );
});

//* GET with id tagDb
router.get("/tags/:id", (req, res) => {
  const { id } = req.params;
  tagDb
    .get(id)
    .then(tag => {
      if (!tag) {
        res
          .status(404)
          .json({ message: "The tag with the specified ID does not exist." });
      } else {
        res.status(200).json(tag);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

//* POST Request tagDb insert()
router.post("/tags", (req, res) => {
  if (!req.body.tag) {
    return res.status(400).json({
      errorMessage: "Please provide the text for the post."
    });
  }

  tagDb
    .insert({
      text: req.body.tag
    })
    .then(id => res.status(201).json(id))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the tag to the database"
      })
    );
});

//* UPDATE Request postDb update().
router.put("/tags/:id", (req, res) => {
  const { tag } = req.body;
  const { id } = req.params;

  if (!tag) {
    res.status(400).json({
      errorMessage: "Please provide tag and user id for the posts."
    });
  }
  tagDb
    .update(id, { tag })
    .then(response => {
      if (!response) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json({ tag });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be updated" })
    );
});

//* DELETE Request postDb remove()
router.delete("/tags/:id", (req, res) => {
  const { id } = req.params;

  postDb
    .remove(id)
    .then(tag => {
      if (!tag) {
        res
          .status(404)
          .json({ message: "The tag with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "The tag has been deleted." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The tag could not be removed" })
    );
});

module.exports = router;
