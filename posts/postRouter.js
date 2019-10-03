const express = require("express");
const postDb = require("./postDb.js");

const router = express.Router();

router.get("/", (req, res) => {
  postDb
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  postDb
    .getById(id)
    .then(post => {
      console.log("post", post);
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then(deleted => {
      console.log(deleted);
      if (deleted) {
        res.status(200).end();
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text, user_id } = req.body;
  if (!text && !user_id) {
    res.status(400).json({
      errorMessage: "Please provide text and userID for the post."
    });
  }
  postDb
    .update(id, { text, user_id })
    .then(updated => {
      if (updated) {
        postDb
          .getById(id)
          .then(post => res.status(200).json(post))
          .catch(err => {
            console.log(err);
            res
              .status(500)
              .json({ error: "The post information could not be modified." });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  postDb
    .getById(id)
    .then(res => {
      if (res) {
        req.body = res;
        next();
      } else {
        res.status(500).json({ message: "invalid post id" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The post information could not be modified." });
    });
}

module.exports = router;