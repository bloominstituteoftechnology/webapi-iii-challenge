const posts = require("./data/helpers/postDb");
// const tag = require("./data/helpers/tagDb");
const users = require("./data/helpers/userDb");
const express = require("express");

const errorMaker = (code, message, res) => {
  res.status(code).json({ error: message });
};
const nameCheckMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    errorMaker(404, "Name must be included", res);
    next();
  } else {
    next();
  }
};

const server = express();
server.use(express.json());

//
///// POSTS ENDPOINTS
//

server.get("/api/posts", (req, res) => {
  posts
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  posts
    .get(id)
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        return errorMaker(404, "There is no post with that id", res);
      }
    })
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

server.post("/api/posts", (req, res) => {
  const newPost = req.body;

  if (newPost.userId) {
    users
      .get(newPost.userId)
      .then(response => {
        if (response) {
          posts.insert(newPost).then(response => res.status(201).json(newPost));
        } else {
          return errorMaker(404, "A user with that id does not exist", res);
        }
      })
      .catch(err => errorMaker(500, "Unable to reach server", res));
  } else {
    posts
      .insert(newPost)
      .then(response => {
        res.status(201).json(newPost);
      })
      .catch(err => errorMaker(500, "Unable to reach server", res));
  }
});

server.put("/api/posts/:id", (req, res) => {
  const updated = req.body;
  const { id } = req.params;

  if (updated.userId) {
    users
      .get(updated.userId)
      .then(response => {
        if (response) {
          posts.get(id).then(post => {
            if (post) {
              posts.update(id, updated).then(response => res.status(200).json(updated));
            } else {
              return errorMaker(404, "A post with that ID does not exist", res);
            }
          });
        } else {
          return errorMaker(404, "A user with that ID does not exist", res);
        }
      })
      .catch(err => errorMaker(500, "Unable to reach server", res));
  } else {
    posts
      .get(id)
      .then(post => {
        if (post) {
          posts.update(id, updated).then(response => {
            res.status(200).json(updated);
          });
        } else {
          return errorMaker(404, "A post with that ID does not exist", res);
        }
      })
      .catch(err => errorMaker(500, "Unable to reach server", res));
  }
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  posts
    .get(id)
    .then(response => {
      posts
        .remove(id)
        .then(info => res.status(200).json({ recordsDeleted: info }))
        .catch(err => {
          return res
            .status(404)
            .json({ errorMessage: "The post with the specified ID does not exist." });
        });
    })
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

//
///// USER ENDPOINTS
//

server.get("/api/users", (req, res) => {
  users
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

server.get("/api/users/:id", (req, res) => {
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

server.post("/api/users", nameCheckMiddleware, (req, res) => {
  const { name } = req.body;

  users
    .insert({ name })
    .then(response => res.json(response))
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

server.put("/api/users/:id", nameCheckMiddleware, (req, res) => {
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

server.delete("/api/users/:id", (req, res) => {
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

server.get("/api/users/posts/:userId", (req, res) => {
  const { userId } = req.params;
  users
    .get(userId)
    .then(user => {
      if (!user) {
        // res.status(404).json({ errorMessage: "A user with that ID does not exist" });
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

server.listen(5000, () => console.log("Server is listening on Port 5000"));
