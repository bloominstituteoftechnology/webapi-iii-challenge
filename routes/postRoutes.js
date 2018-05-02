const express = require("express");

const db = require("../data/helpers/postDb");

const router = express.Router();

router.get("/", (req, res) => {
  db
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/tags", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(post => {
      if (post) {
        db.getPostTags(id).then(posts => res.json(posts));
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  db
    .insert(req.body)
    .then(post => {
      db
        .get(post.id)
        .then(newPost => {
          res.status(200).json(newPost);
        })
        .catch(err =>
          res
            .status(500)
            .json({ error: "The post with the specified ID does not exist." })
        );
    })
    .catch(err => {
      if (
        !req.body.hasOwnProperty("text" || !req.body.hasOwnProperty("userId"))
      ) {
        res.status(400).json({
          errorMessage: "Please provide text and a user id for this post."
        });
      } else {
        res.status(500).json({
          error: "There was an error while saving the post to the database."
        });
      }
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(post => {
      if (post) {
        db
          .get(id)
          .then(post => {
            db.remove(id).then(response => {
              res.status(200).json({ ...post });
            });
          })
          .catch(err =>
            res.status(500).json({ error: "The post could not be removed." })
          );
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(post => {
      if (!req.body.hasOwnProperty("name")) {
        res.status(400).json({
          errorMessage: "Please provide a name for the post."
        });
      } else if (post) {
        db
          .update(id, req.body)
          .then(post => {
            db.get(id).then(post => {
              res.status(200).json({ ...post });
            });
          })
          .catch(err =>
            res
              .status(500)
              .json({ error: "The post information could not be modified." })
          );
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

module.exports = router;
