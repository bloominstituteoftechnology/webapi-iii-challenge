// outside resources
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const userDB = require("./data/helpers/userDb");
const postDB = require("./data/helpers/postDb");

// custom files
const custMW = require("./middleware");
const usersRouter = require('./routers/usersRouter');
const postsRouter = require('./routers/postsRouter');


// local constants
const server = express();
const PORT = 4050;

// global middleware
server.use(express.json(), helmet(), logger("dev"), custMW.capitalize);

// route handling
server.use('/users', usersRouter);
server.use('/posts', postsRouter);


server.get("/posts", (req, res) => {
  postDB
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json(custMW.badDataRetreival);
    });
});

server.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDB
    .get(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(custMW.badDataRetreival);
    });
});

server.post("/posts", (req, res) => {
  const newPost = req.body;
  if (newPost.userId && newPost.text) {
    postDB
      .insert(newPost)
      .then(id => {
        console.log(id);
        postDB.get(id.id).then(post => {
          res.status(201).json(post);
        });
      })
      .catch(err => {
        res.status(500).json(custMW.badDataInsert);
      });
  } else {
    res.status(400).json({ message: "missing user name" });
  }
});

server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  let deletedPost = {};
  userDB
    .get(id)
    .then(post => {
      deletedPost = post;
    })
    .then(post => {
      userDB
        .remove(id)
        .then(num => {
          console.log(num);
          if (!num) {
            res.status(404).json(custMW.badID);
          } else {
            res.json(deletedPost);
          }
        })
        .catch(err => {
          res.status(500).json(custMW.badDataRemoval);
        });
    });
});

// listen
server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
