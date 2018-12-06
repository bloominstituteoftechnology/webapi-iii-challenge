// outside resources
const express = require("express");
const userDB = require("../data/helpers/userDb");

// custom files
const custMW = require("../middleware");

// local constants
const router = express.Router();

// global middleware
router.use(custMW.capitalize);

// route handlers for /users
// // retreive
router.get("/", (req, res) => {
  userDB
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(custMW.badDataRetreival);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  userDB
    .get(id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json(custMW.badDataRetreival);
    });
});

router.get("/:id/posts", (req, res) => {
  const { id } = req.params;
  userDB
    .getUserPosts(id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json(custMW.badDataRetreival);
    });
});
// // create
router.post("/", (req, res) => {
  console.log(custMW.capUser);
  if (custMW.capUser.name) {
    userDB
      .insert(custMW.capUser)
      .then(id => {
        userDB.get(id.id).then(user => {
          res.status(201).json(user);
        });
      })
      .catch(err => {
        res.status(500).json(custMW.badDataInsert);
      });
  } else {
    res.status(400).json({ message: "missing user name" });
  }
});

// // delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  userDB
    .remove(id)
    .then(num => {
      if (!num) {
        res.status(404).json(custMW.badID);
      } else {
        res.json({ message: "deleted user successfully" });
      }
    })
    .catch(err => {
      res.status(500).json(custMW.badDataRemoval);
    });
});

// // update

// exports
module.exports = router;
