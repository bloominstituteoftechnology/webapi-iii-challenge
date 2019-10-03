const express = require("express");
const userDb = require("./userDb.js");
const postDb = require("../posts/postDb.js");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  console.log(req.body);
  const { id, name } = req.body;
  if (!name) {
    res.status(400).json({
      errorMessage: "Please provide a name for the user."
    });
  }
  userDb
    .insert({ name })
    .then(({ id }) => {
      userDb
        .getById(id)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "There was an error while saving the user to the database"
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

router.post("/:id/posts", (req, res) => {
  console.log(req.body);
  const { text, user_id } = req.body;
  if (!text || !user_id) {
    res.status(400).json({
      errorMessage: "Please provide text and user ID for the post."
    });
  }
  postDb
    .insert({ text: req.body.text, user_id: req.user.id })
    .then(response => {
      userDb
        .getUserPosts(response.user_id)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "There was an error while saving the post to the database"
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

router.get("/", (req, res) => {
  userDb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  userDb
    .getById(id)
    .then(user => {
      console.log("user", user);
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/posts", validatePost, (req, res) => {
  const { id } = req.params;
  userDb
    .getUserPosts(id)
    .then(posts => {
      console.log("posts", posts);
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({
          message:
            "The posts for the user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then(deleted => {
      console.log(deleted);
      if (deleted) {
        res.status(200).end();
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The user could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      errorMessage: "Please provide name for the user."
    });
  }
  userDb
    .update(id, { name })
    .then(updated => {
      if (updated) {
        userDb
          .getById(id)
          .then(user => res.status(200).json(user))
          .catch(err => {
            console.log(err);
            res
              .status(500)
              .json({ error: "The user information could not be modified." });
          });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  userDb
    .getById(Number(id))
    .then(res => {
      if (res) {
        req.user = res;
        next();
      } else {
        res.status(500).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The user information could not be modified." });
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing body data" });
  }
  if (!req.body.name) {
    res.status(400).json({ messsage: "missing name data" });
  }
}

function validatePost(req, res, next) {
  if (!req.body.text) {
    res.status(400).json({ message: "missing name data" });
  }
  if (!req.body) {
    res.status(400).json({ message: "missing body data" });
  }
}

module.exports = router;