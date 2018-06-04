// ##### Posts

// * id: number, no need to provide it when creating posts, the database will automatically generate it.
// * userId: number, required, must be the id of an existing user.
// * text: string, no size limit, required.

const express = require("express");
const router = express.Router();
const db = require("../data/helpers/postDb.js");

// handles routes that start with: /api/posts

router.get("/", (req, res) => {
  // get data
  db
    .get()
    // send the data
    .then(posts => {
      res.json(posts);
    })
    // send error if there is one
    .catch(error => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  db
    .get(req.params.id)
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  const post = req.body;
  db
    .insert(post)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  //const post = req;
  db
    .remove(id)
    .then(response => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (post.text && typeof post.text !== "string") {
      res.status(400).json({ error: 'Text must be typeof string' });
  } else if (post.userId && typeof post.userId !== "number") {
    res.status(400).json({ error: 'userId must be typeof number' });
  }
  else {
    db
      .update(id, post)
      .then(count => {
        if (count > 0) {
          db
            .get(id)
            .then(post => {
              res.status(200).json(post);
            })
            .catch(error => {
              res.status(400).json(error);
            });
        } else {
          res.status(404).json({ errorMessage: "post not found" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

module.exports = router;
