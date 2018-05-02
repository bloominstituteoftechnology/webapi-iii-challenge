const express = require("express");

const db = require("../data/helpers/userDB");

const router = express.Router();

router.get("/", (req, res) => {
  db
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// router GET, find by ID first, then return "post"
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db
    .getUserPosts(id)
    .then(user => {
      if (user.length === 0) {
        res.status(404).json({ message: "User is not found. Try again." });
      } else {
        res.json(user[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// router POST, Insert post, then give response, which is id of the post
router.post("/", (req, res, next) => {
  const user = req.body;

  db
    .insert(user)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: "Error; could not save post to database" });

      next(err);
    });
});

// http://localhost:5000?id=1 // for just using req.query
// write it using an URL parameter instead /:id
router.delete("/", (req, res) => {
  const { id } = req.query;
  let user;
  db
    .getUserPost(id)
    .then(userFound => {
      user = { ...userFound[0] };
      db
        .remove(id)
        .then(response => {
          res.status(200).json(user);
        })
        .catch(error => {
          res.status(500).json({ error: "Nothing to delete" });
        });
    })
});

router.put("/:id", (req, res) => {
  const id = req.parms.id;
  const updatedUser = req.body;

  db
    .update(id, updatedUser)
    .then(response => {
      if (response !== 0) {
        db
          .getUserPost(id)
          .then(user => {
            res.stat(200).json(user[0]);
          })
          .catch(error => {
            res.status(500).json({ error: "Cannot update this user" });
          });
      } else {
        res.staus(404).json({ msg: "User is not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Cannot update this user" });
    });
});

module.exports = router;
