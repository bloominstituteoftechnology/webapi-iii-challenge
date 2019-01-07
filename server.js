const post = require("./data/helpers/postDb");
// const tag = require("./data/helpers/tagDb");
const user = require("./data/helpers/userDb");
const express = require("express");

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get("Origin")}`
  );

  next();
}

const server = express();
server.use(express.json());
server.use(logger);

//
///// POSTS ENDPOINTS
//

server.get("/api/posts", (req, res) => {
  post
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ errorMessage: "Unable to retrieve posts at this time" }));
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  post
    .get(id)
    .then(res => {
      if (!post) {
        return res
          .status(404)
          .json({ errorMessage: "A post with the specified ID does not exist" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The post information could not be retrieved" });
    });
});

server.post("/api/posts", (req, res) => {
  const newPost = req.body;

  post
    .insert(newPost)
    .then()
    .catch(err =>
      res.status(500).json({ errorMessage: "The post information could not be retrieved" })
    );
});

//
///// USER ENDPOINTS
//

server.get("/api/users", (req, res) => {
  user
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ errorMessage: "Unable to retrieve user information" }));
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  user
    .get(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ errorMessage: "A user with this ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => res.status(500).json({ errorMessage: "Unable to retrieve user at this time" }));
});

server.listen(5000, () => console.log("Server is listening on Port 5000"));
