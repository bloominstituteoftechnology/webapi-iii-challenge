const express = require("express");
const validateUserId = require("../middleware/validateUserId.js");
const validateUser = require("../middleware/validateUser.js");
const validatePost = require("../middleware/validatePost.js");
const router = express.Router();
const Users = require("./userDb.js");
router.post("/", validateUser, (req, res) => {
  URLSearchParams.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding the user."
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  Users.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log("error: ", err);
      res.status(500).json({
        message: "POST error!"
      });
    });
});

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving users." });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  Users.getById(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Error to retriving user." });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting user's posts." });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then(countDeleted => {
      if (countDeleted) {
        res
          .status(200)
          .json({ message: `User with ${id} has been deleted`, id: id });
      } else {
        res.status(404).json({ errorMessage: "No user found." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "internal Server Error" });
    });
});

router.put("/:id", validateUser, validateUserId, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Users.update(id, changes)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating user" });
    });
});

module.exports = router;
