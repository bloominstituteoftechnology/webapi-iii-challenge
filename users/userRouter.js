const express = require("express");
const db = require("./userDb");
const dbPosts = require("../posts/postDb");

const router = express.Router();

router.post("/", (req, res) => {
  const user = {
    name: req.body.name
  };
  db.insert(user)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json({ errorMessage: error });
    });
});

router.post("/:id/posts", [validateUserId, validateUser,validatePost], (req, res) => {
  const post = {
    text: req.body.text,
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
});

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

router.put("/:id", validateUserId, validateUser, (req, res) => {
  const { id } = req.params;
  const user = {
    name: req.body.name
  };
  db.update(id, user)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json({ errorMessage: error });
    });
});

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
    if(Object.keys(req.body).length) {
        next();
    }
    else {
        res.status(400).json({ message: "Please provide title of the post" });
    }
}

module.exports = router;
