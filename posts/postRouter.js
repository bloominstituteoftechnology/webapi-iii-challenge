const express = require("express");

const db = require("./postDb.js");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  db.get()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: "not here" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "got it" });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "cant delete" });
    });
});

router.put("/:id", validatePostId, (req, res) => {
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

// custom middleware

function validatePostId(req, res, next) {
  let posts = req.params.id;

  db.getById(posts)
    .then(post => {
      if (post) {
        next();
      } else {
        res.status(400).json({ message: "user not fouond" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "no way" });
    });
}

module.exports = router;
