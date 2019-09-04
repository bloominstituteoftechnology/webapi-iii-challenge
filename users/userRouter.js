const express = require("express");

const router = express.Router();

const db = require("../data/dbConfig.js");

router.post("/", (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "user added" });
    });
});

router.post("/:id/posts", (req, res) => {});

// router.get("/", (req, res) => {
//   db.get()
//     .then(user => {
//       res.status(200).json(users);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: "cant get him/her" });
//     });
// });

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "cant get that id" });
    });
});

router.get("/:id/posts", (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ error: "cant get posts" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: "he gone" });
      } else {
        res.status(404).json({ error: "that didn didnt work" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "no way" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(err => {
      res.status(500).json({ error: "did not get changed" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  let user = req.params.id;
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
