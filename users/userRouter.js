const express = require("express");

const db = require("./userDb");
const postdb = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  db.insert(req.body)
    .then(name => {
      res.status(201).json(name);
    })
    .catch(error => {
      res.status(500).json({ error: "there was an error" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  postdb
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: "error" });
    });
});

router.get("/", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: "User  could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(foundID => {
      res.status(200).json(foundID);
    })
    .catch(error => {
      res.status(500).json({ error: "could not be retrieved." });
    });
});

router.get("/:id/posts", (req, res) => {
  db.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: "error finding posts" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(numDeletedPosts => {
      res.status(200).json({ message: "post got deleted yo" });
    })
    .catch(error => {
      res.status(500).json({ error: "post couldn't delete" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  db.update(id, updates)
    .then(updated => {
      if (updated) {
        res
          .status(200)
          .json(updated)
          .end();
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  db.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = req.params.id;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "user not found" });
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing name" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
