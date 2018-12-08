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
        res.status(404).json({ message: "user does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to get user" });
    });
});
router.post("/", (req, res) => {
  const user = req.body;
  if (user.name) {
    db.insert(user)
      .then(idInfo => {
        db.getUserPosts(idInfo.id).then(user => {
          res.status(201).json(user);
        });
      })
      .catch(err => {
        res.status(500).json({ message: "failed insert user in db" });
      });
  } else {
    res.status(400).json({ message: "missing info, try again" });
  }
});

router.put("/:id", (req, res) => {
  const user = req.body;
  const { id } = req.params;

  if (user.name) {
    db.update(id, user)
      .then(count => {
        if (count) {
          db.getUserPosts(id).then(user => {
            res.json(user);
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
      res.status(500).json({ message: "failed to delete user" });
    });
});


module.exports = router;