const express = require("express");
const router = express.Router();

const users = require("../data/helpers/userDb");

const capitalizeName = (req, res, next) => {
  const { name } = req.body;
  const isUpperCase = name[0] === name[0].toUpperCase();
  if (!isUpperCase) {
    return errorMaker(404, "First letter of name must be capitalized", res);
  } else {
    next();
  }
};

const errorMaker = (code, message, res) => {
  res.status(code).json({ error: message });
};

router.get("/", (req, res) => {
  users
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  users
    .get(id)
    .then(user => {
      if (!user) {
        return errorMaker(404, "A user with that ID does not exist", res);
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

router.post("/", capitalizeName, (req, res) => {
  const { name } = req.body;

  users
    .insert({ name })
    .then(response => res.json(response))
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

router.put("/:id", capitalizeName, (req, res) => {
  const { id } = req.params;
  const updated = req.body;

  users
    .get(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ errorMessage: "A user with that ID does not exist" });
      } else {
        users.update(id, updated).then(response => res.json(response));
      }
    })
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  users
    .get(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ errorMessage: "A user with that ID does not exist" });
      } else {
        users.remove(id).then(response => res.json(response));
      }
    })
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

router.get("/posts/:userId", (req, res) => {
  const { userId } = req.params;
  users
    .get(userId)
    .then(user => {
      if (!user) {
        return errorMaker(404, "A user with that ID does not exist", res);
      } else {
        users.getUserPosts(userId).then(response => {
          if (response.length === 0) {
            return res.send("This user has no posts");
          }
          res.json(response);
        });
      }
    })
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

module.exports = router;
