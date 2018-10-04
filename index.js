const express = require("express");

// middle ware pull-ins
const cors = require("cors"); // port-to-port interaction
const logger = require("morgan"); // http request logger
const helmet = require("helmet"); // encrypt res header...

// server helper functions
const userdb = require("./data/helpers/userDb");
const postdb = require("./data/helpers/postDb");

// init server
const server = express();

const yell = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
}

// middleware usage
server.use(
  express.json(),
  cors(),
  logger(":method :url :status :response-time ms"),
  helmet()
);

// route handlers

/* ======= USER ROUTES ======= */
server.get("/", (req, res) => {
  res.send(`
    <h1>Root Page</h1>
    <li><a href="http://localhost:${process.env.PORT}/users">All Users</a></li>
    <li><a href="http://localhost:${process.env.PORT}/posts">All Posts</a></li>
  `);
});

server.get("/users", (req, res) => {
  userdb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).send(err));
});

server.get("/users/:id", (req, res) => {
  const {id} = req.params;
  userdb
    .get(id)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err));
});

server.get("/users/:id/posts", (req, res) => {
  const {id} = req.params;
  userdb.getUserPosts(id)
    .then(posts => {
      if(posts.length < 1) {
        res.status(200).send(`User at id: ${id} does not have any posts.`)
        return;
      }
      res.status(200).send(posts);
    })
    .catch(err => res.status(500).send(err));
});

server.post("/users", yell, (req, res) => {
  const { name } = req.body;
  const newUser = { name };
  userdb
    .insert(newUser)
    .then(user => {
      userdb
        .get(user.id)
        .then(foundUser => res.status(201).send(foundUser))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userdb
    .remove(id)
    .then(user =>
      res.status(200).send(`User with id ${id} deleted sucessfully!`)
    )
    .catch(err => res.status(500).send(err));
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = { name, id };
  userdb
    .update(id, user)
    .then(editedUser => {
      userdb
        .get(id)
        .then(foundUser => res.status(200).send(foundUser))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
});

/* ======= POST ROUTES ======= */
server.get("/posts", (req, res) => {
  postdb
    .get()
    .then(posts => res.status(200).send(posts))
    .catch(err => res.status(500).send(err));
});

server.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postdb
    .get(id)
    .then(post => res.status(200).send(post))
    .catch(err => res.status(500).send(err));
});

server.get("/posts/:id/tags", (req, res) => {
  const {id} = req.params;
  postdb.getPostTags(id)
    .then(tags => {
      if(tags.length < 1) {
        res.status(200).send(`No tags associated with posts.`);
        return;
      }
      res.status(200).send(tags);
    })
    .catch(err => res.status(500).send(err));
})

server.post("/posts", (req, res) => {
  const { text, userId } = req.body;
  const newPost = { text, userId };
  console.log(req.body);
  postdb
    .insert(newPost)
    .then(post => {
      postdb
        .get(post.id)
        .then(foundPost => res.status(201).send(foundPost))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  postdb
    .remove(id)
    .then(post =>
      res.status(200).send(`Post at id ${id} removed successfully.`)
    )
    .catch(err => res.status(500).send(err));
});

server.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { text, userId } = req.body;
  const post = { text, userId, id };
  console.log(id);
  console.log(post);
  postdb
    .update(id, post)
    .then(updatedPost =>
      postdb
        .get(id)
        .then(foundPost => res.status(200).send(foundPost))
        .catch(err => res.status(500).send(err))
    )
    .catch(err => res.status(500).send(err));
});

// route handler listner
server.listen(process.env.PORT, () => console.log(`Port:${process.env.PORT}`));
