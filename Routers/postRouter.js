const express = require("express");

const router = express.Router();

const db = require("../data/helpers/postDb");

router.get("/", (req, res) => {
  db
    .get()
    .then(post => {
      res.send(post);
    })
    .catch(error => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(post => {
      res.send(post);
    })
    .catch(error => {
      res.status(500).json({ message: "cant find post" });
    });
});

router.post("/", (req, res) => {
  const posts = req.body;
  db
    .insert(posts)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res
        .status(500)
        .send({ message: "there was an error while saving the post" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let post;

  db
    .get(id)
    .then(response => {
      post = { ...response[0] };
      db
        .remove(id)
        .then(response => {
          res.status(200).send(post);
        })
        .catch(error => {
          res.status(500).send(error);
        });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;

  let post;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.findById(id).then(updatedPost => {
          res.status(200).send(updatedPost[0]);
        });
      } else {
        res
          .status(404)
          .send({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
