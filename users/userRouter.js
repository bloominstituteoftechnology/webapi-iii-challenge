const express = require("express");
const db = require("./userDb");
const dbPosts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUserToBePosted, (req, res) => {
  const user = {
    name: req.user
  };
  db.insert(user)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log(error);

      res.json({ errorMessage: error });
    });
});

router.post(
  "/:id/posts",
  [validateUserId, validateUser, validatePost],
  (req, res) => {
    const post = {
      text:  req.post,
      user_id: req.params.id
    };
    dbPosts
      .insert(post)
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        console.log(error);
        res.json({ errorMessage: error });
      });
  }
);

router.get("/", (req, res) => {
  db.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(400).json({ errorMessage: error });
    });
});

router.get("/:id", validateUserId, validateUser, (req, res) => {
  res.json(req.user);
});

router.get("/:id/posts", [validateUserId, validateUser], (req, res) => {
  const { id } = req.params;
  db.getUserPosts(id)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json({ errorMessage: error });
    });
});

router.delete("/:id", validateUserId, validateUser, (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log(error);
      res.json({ errorMessage: error });
    });
});

router.put(
  "/:id",
  [validateUserId, validateUser, validateUserToBePosted],
  (req, res) => {
    const { id } = req.params;
    const user = {
      name: req.user
    };
    db.update(id, user)
      .then(data => {
        res.json(user);
      })
      .catch(error => {
        res.json({ errorMessage: error });
      });
  }
);

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  if (Number(id)) {
    next();
  } else {
    res.status(400).json({ message: "Please provide a valid user id" });
  }
}

function validateUser(req, res, next) {
  const { id } = req.params;
  db.getById(id)
    .then(data => {
      if (data) {
        req.user = data;
        next();
      } else {
        res.status(404).json({ message: "This user does not exist" });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: error });
    });
}

function validatePost(req, res, next) {
  const postProperties = Object.keys(req.body);
  const titleFound = postProperties.find(keys => keys === "text");
  if (postProperties.length) {
    if (titleFound === "text") {
      req.post = req.body.text;
      next();
    } else {
      res.status(400).json({ message: "Please provide a title for the post" });
    }
  } else {
    res.status(400).json({ message: "Please provide title of the post" });
  }
}

function validateUserToBePosted(req, res, next) {
  const userProperties = Object.keys(req.body);
  const nameFound = userProperties.find(keys => keys === "name");
  console.log(nameFound);
  if (userProperties.length) {
    if (nameFound === "name") {
      req.user = req.body.name;
      next();
    } else {
      res.status(400).json({ message: "Please provide a name for the user" });
    }
  } else {
    res.status(400).json({ message: "Please provide a name for the user" });
  }
}

module.exports = router;
