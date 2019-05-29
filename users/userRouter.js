const express = require("express");

const Users = require("./userDb.js");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  const user = req.body;
  Users.insert(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "cannot post this user idk"
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const user = req.body;
  Users.insert(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "what do i even put here?"
      });
    });
});

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: "am i getting it?"
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const user = req.user;
  res.status(200).json(user);
});

router.get("/:id/posts", validateUserId, validatePost, (req, res) => {
  const { id } = req.params;

  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "could not get it."
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(id => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "couldn't delete that user"
      });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  const addUser = req.body;

  Users.update(id, addUser)
    .then(addUser => {
      res.status(200).json(addUser);
    })
    .catch(err => {
      res.status(500).json({
        message: "unabele to update the user"
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.getById(id)
    .then(user => {
      // console.log(user);
      if (!user) {
        res.status(400).json({
          message: "invalid user id"
        });
      } else {
        req.user = user;
        next();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "ammmmmm it failed" });
    });
}

function validateUser(req, res, next) {
  // idk writing something random copying logic from above.
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // copying from above logic it works but not sure.
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
