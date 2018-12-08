const express = require('express');
const router = express.Router();
const db = require('../data/helpers/postDb');



router.get("/", (req, res) => {
  db.get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "failed to get posts" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "post does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to get post" });
    });
});

router.post("/", (req, res) => {
  const post = req.body;
  if (post.text && post.userId) {
    db.insert(post)
      .then(idInfo => {
        db.get(idInfo.id).then(post => {
          res.status(201).json(post);
        });
      })
      .catch(err => {
        res.status(500).json({ message: "failed to create post" });
      });
  } else {
    res.status(400).json({ message: "missing info, try again" });
  }
});

router.put("/:id", (req, res) => {
  const post = req.body;
  const { id } = req.params;

  if (post.text && post.postId) {
    db.update(id, post)
      .then(count => {
        if (count) {
          db.get(id).then(post => {
            res.json(post);
          });
        } else {
          res.status(404).json({ message: "invalid id" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "failed" });
      });
  } else {
    res.status(400).json({ message: "missing info!" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count => {
      if (count) {
        // we would like to send back the user
        res.json({ message: "successfully deleted" });
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to delete post" });
    });
});


module.exports = router;