const express = require("express");

const Users = require("./userDb.js");
const Posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  res.status(201).json(req.user);
});

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
  const post = req.post;
  console.log(post);
  Posts.insert(post)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "Cannot create new post" });
    });
});

router.get("/", (req, res) => {
  Users.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Unable to get users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const userId = req.user.id;

  Users.getUserPosts(userId)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "The id for this post does not exsist" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const userId = req.user.id;
  Users.remove(userId)
    .then(user => {
      res.status(200).json({ message: "User Deleted" });
    })
    .catch(err => {
      res.status(500).json({ message: "Could not delete this user" });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  const userBody = req.body;
  const userId = req.user.id;
  console.log(userId);

  if (!userBody.name) {
    return res.status(400).json({ message: "Must add a name" });
  }

  Users.update(userId, userBody)
    .then(user => {
      if (user) {
        res.status(200).json({ message: "User has been updated" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not update this user" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "This id does not exsist" });
    });
}

function validateUser(req, res, next) {
  const userBody = req.body;
  console.log(userBody);

  if (Object.keys(userBody).length === 0) {
    return res.status(400).json({ message: "missing user data" });
  } else if (!userBody.name) {
    return res.status(400).json({ message: "missing required name field" });
  } else {
    Users.insert(userBody)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "There was a problem adding the user" });
      });
  }
}

function validatePost(req, res, next) {
  const postBody = { ...req.body, user_id: req.params.id };

  // console.log(postBody);
  console.log("req.body", postBody);

  if (Object.entries(postBody).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!postBody.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    Posts.insert(postBody).then(post => {
      if (post) {
        console.log(postBody);
        req.post = post;
        next();
      }
    });
  }
}

module.exports = router;
