const express = require("express");
const usersdb = require("./userDb");
const posts = require("../posts/postDb");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  const user = req.body;
  usersdb
    .insert(user)
    .then(user => {
      if (user) {
        res.status(201).json({
          user
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "User not added."
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const newPost = { text: req.body.text, user_id: req.params.id };
  posts
  .insert(newPost)
  .then(response => {
    res.status(201).json(
      response
    );
  })
  .catch(error => {
    res.status(500).json({
      error: error}
    )
  })

});

router.get("/", (req, res) => {
  usersdb
    .get()
    .then(users => {
      res.status(201).json({
        users
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "no users"
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  usersdb
    .getById(id)
    .then(user => {
      if (user) {
        res.status(200).json({
          user
        });
      } else {
        res.status(404).json({
          message: "Cannot find the user"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "The user information could not be retrieved."
      });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  usersdb
    .getUserPosts(req.params.id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({
          message: "user post not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "some other error"
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  usersdb
    .remove(req.params.id)
    .then(response => {
      res.status(200).json({
        message: "user deleted"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "some other error"
      });
    });
});

router.put("/:id", validateUserId, (req, res) => {
    const id = req.params.id
    usersdb
    .update(id, req.body)
    .then(response => {
        res.status(200).json(
            response
        )
        })
        .catch(error => {
            res.status(500).json({
                message : "yet another error haha"
            });
        })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  usersdb
    .getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid User ID" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
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
