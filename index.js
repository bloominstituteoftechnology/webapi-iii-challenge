const express = require("express");
const postDb = require("./data/helpers/postDb.js");
const userDb = require("./data/helpers/userDb.js");
const server = express();
server.use(express.json());

const upercaseChecker = (req, res, next) => {
  word = req.body.name;
  if (word[0] === word[0].toUpperCase()) {
    next();
  } else
    res
      .status(400)
      .json({ error: "Please enter a capitilized/propercase name" });
};

//TEST=========================
server.get("/", (req, res) => {
  res.send("Hello");
});
//==============================
// USER===================================================================
server.get("/users", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ error: "The USERS data could not be retrieved." });
    });
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userDb
    .get(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ error: "The USER data could not be retrieved" });
    });
});

server.get("/users/:id/posts", (req, res) => {
  const id = req.params.id;
  userDb
    .getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "The USER POST data could not be retrieved" });
    });
});

server.post("/users", upercaseChecker, (req, res) => {
  const userContents = req.body;
  const response = userDb.insert(postContents);
  userDb
    .insert(userContents)
    .then(() => {
      res.status(203).json(response);
    })
    .catch(err => {
      console.error("error", err);
      res.status(422).json({ error: "Unable to create user" });
    });
});

server.put("/users/:id", (req, res) => {
  userDb
    .update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ error: "Unable to PUT" });
    });
});

server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userDb
    .remove(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ error: "UNABLE TO DELETE" });
    });
});
// ===================================================================

//POSTS===============================================================
server.get("/posts", (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ error: "There was an error accessing the posts" });
    });
});

server.get("/posts/:id", (req, res) => {
  id = req.params.id;
  postDb
    .get(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ error: "Can't gather post" });
    });
});

server.post("/posts", (req, res) => {
  const postContents = req.body;
  postDb
    .insert(postContents)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ error: "Something went wrong with your post" });
    });
});

server.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const postContents = req.body;
  postDb
    .update(id, postContents)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ message: "Unable to UPDATE post" });
    });
});

server.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  postDb
    .remove(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({
        message: "There was an error when trying to delete this post"
      });
    });
});

// ===================================================================
const port = 8000;

server.listen(port, err => {
  console.log(`\n=== The server is up and running on ${port} ===\n`);
});
