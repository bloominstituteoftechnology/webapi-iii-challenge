const express = require("express");
const router = express.Router();
const postDb = require("../data/helpers/postDb");

//! ==================== POST DB ====================

//* GET Request postDB get()
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

//* GET with id postDb
router.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

//* POST Request postDb insert()
router.post("/posts", (req, res) => {
  if (!req.body.text && !req.body.userId) {
    return res.status(400).json({
      errorMessage: "Please provide the text for the post."
    });
  }

  postDb
    .insert({
      text: req.body.text,
      userId: req.body.userId
    })
    .then(id => res.status(201).json(id))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      })
    );
});

//* UPDATE Request postDb update().
router.put("/posts/:id", (req, res) => {
  const { text, userId } = req.body;
  const { id } = req.params;

  if (!text && !userId) {
    res.status(400).json({
      errorMessage: "Please provide text and user id for the posts."
    });
  }
  postDb
    .update(id, { text, userId })
    .then(response => {
      if (!response) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json({ text, userId });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be updated" })
    );
});

//* DELETE Request postDb remove()
router.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  postDb
    .remove(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "The post has been deleted." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

module.exports = router;
