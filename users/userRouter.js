const express = require("express");

const router = express.Router();

const db = require("./userDb.js");
const Posts = require("../posts/postDb.js");

router.use(express.json());

router.post("/", (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log("post error", err);
      res.status(500).json({ message: "user not added" });
    });
});

router.post("/:id/posts", (req, res) => {
  const rePost = req.body;
  rePost.user_id = req.params.id;

  if (rePost) {
    Posts.insert(rePost)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "no luck" });
      });
  }
});

router.get("/", (req, res) => {
  db.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "cant get him/her" });
    });
});

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
  db.getUserPosts(id)
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

router.put("/:id", validateUserId, (req, res) => {
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
  let users = req.params.id;

  db.getById(users)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(400).json({ message: "user not fouond" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "no way" });
    });
}

function validateUser(req, res, next) {
  //  const users = req.body;
  //  if (users.)
}

function validatePost(req, res, next) {}

module.exports = router;
