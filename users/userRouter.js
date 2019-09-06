const express = require("express");

const router = express.Router();

const db = require("./userDb.js");
const Posts = require("../posts/postDb.js");

router.use(express.json());

router.post("/", validateUser, (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log("post error", err);
      res.status(500).json({ error: "user not added" });
    });
});

router.post("/:id/posts", validateUserId, (req, res) => {
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

router.get("/", validateUser, (req, res) => {
  db.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "cant get him/her" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
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

router.get("/:id/posts", validateUserId, (req, res) => {
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

router.delete("/:id", validateUserId, (req, res) => {
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
  // which is better to use
  // cont { id } = req.params;

  db.getById(users)
    .then(user => {
      if (user) {
        next();
        // by including req.user we have access to user object
        req.user = user;
      } else {
        res.status(400).json({ message: "user not fouond" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "no way" });
    });
}

function validateUser(req, res, next) {
  const users = req.body;
  if (!users) {
    res.status(500).json({ error: "must be in name format" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  //   const { id: user_id } = req.params;
  //   const { text } = req.body;
  //   if (!req.body) {
  //     return res.status(400).json({ error: "Post requires body" });
  //   }
  //   if (!text) {
  //     return res.status(400).json({ error: "Post requires text" });
  //   }
  //   req.body = { user_id, text };
  //   next();
}

module.exports = router;
