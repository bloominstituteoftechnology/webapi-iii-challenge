const express = require("express");
const router = express.Router();
const userDb = require("../data/helpers/userDb");

/* ======= CUSTOM CAPITALIZE MIDDLEWARE ====== */
function capitalize(req, res, next) {
  console.log(req.body.name);
  if (req.body.name.charAt(0) != req.body.name.charAt(0).toUpperCase()) {
    req.body.name = req.body.name
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    next();

    console.log(req.body.name);
  } else {
    console.log(12324987496743);
  }
}

/* ======= GET  ALL USERS ====== */
router.get("/", (req, res) => {
  userDb.get().then(users => {
    res.status(200).json(users);
  });
});

/* ======= GET USER BY ID ====== */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  userDb.get(id).then(users => {
    res.status(200).json(users);
  });
});

/* ======= POST NEW USER ====== */
router.post("/", capitalize, (req, res) => {
  let newUser = req.body;
  console.log(newUser);

  if (!newUser.name) {
    res.status(400).json({ errorMessage: "Please add a Username" });
  } else {
    userDb.insert(newUser).then(user => {
      res.status(201).json(user.id);
    });
  }
});

/* ======= EDIT USER ====== */
router.put("/:id", (req, res) => {
  userDb
    .update(req.params.id, req.body)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ errorMessage: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "err" });
    });
});

/* ======= DELETE USER ====== */
router.delete("/:id", (req, res) => {
  userDb
    .remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error deleting user" });
    });
});

module.exports = router;
