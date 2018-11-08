const express = require("express");
const userDb = require("../data/helpers/userDb");

const router = express.Router();

const middleware = require("../middleware");
const utils = require("../utils");

router.get("/", (req, res) => {
  userDb
    .get()
    .then(users => {
      utils.sendUserSuccess(res, 200, users);
    })
    .catch(err => {
      utils.sendUserError(
        500,
        "The users' information could not be retrieved.",
        res,
        err
      );
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (user) {
        utils.sendUserSuccess(res, 200, user);
      } else {
        res.status(404).json({ error: `User id ${id} not found` });
      }
    })
    .catch(err => {
      utils.sendUserError(
        500,
        "The user's information could not be retrieved.",
        res,
        err
      );
    });
});

router.get("/:id/posts", (req, res) => {
  const { id } = req.params;
  userDb
    .getUserPosts(id)
    .then(posts => {
      if (posts.length > 0) {
        utils.sendUserSuccess(res, 200, posts);
      } else {
        res.status(404).json({ error: `User, id ${id} not found` });
      }
    })
    .catch(err => {
      utils.sendUserError(
        500,
        "The user's post information could not be retrieved.",
        res,
        err
      );
    });
});

router.post("/", middleware.upperCase, (req, res) => {
  const newUser = req.body;
  if (!newUser) {
    res.status(400).json({ message: "Please provide a username." });
    return;
  }
  userDb
    .insert(newUser)
    .then(userId => {
      utils.sendUserSuccess(res, 201, {
        message: `Added user with id of ${userId.id}.`
      });
    })
    .catch(err => {
      utils.sendUserError(
        500,
        "There was an error while saving the user to the database",
        res,
        err
      );
    });
});

router.put("/:id", middleware.upperCase, (req, res) => {
  const { id } = req.params;
  const newUser = req.body;
  userDb.get(id).then(user => {
    if (user) {
      userDb
        .update(id, newUser)
        .then(count => {
          utils.sendUserSuccess(
            res,
            200,
            `Updated ${count} user. User id ${id} successfully updated.`
          );
        })
        .catch(err =>
          utils.sendUserError(
            500,
            "The user information could not be modified.",
            res,
            err
          )
        );
    } else {
      res.status(404).json({ error: `User id ${id} not found` });
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  userDb.get(id).then(user => {
    if (user) {
      userDb
        .remove(id)
        .then(count => {
          utils.sendUserSuccess(
            res,
            200,
            `Deleted ${count} user. User id ${id} successfully deleted.`
          );
        })
        .catch(err => {
          utils.sendUserError(500, "The user could not be deleted.", res, err);
        });
    } else {
      res.status(404).json({ error: `User id ${id} not found` });
    }
  });
});

module.exports = router;
