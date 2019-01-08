const posts = require("./data/helpers/postDb");
// const tag = require("./data/helpers/tagDb");
const users = require("./data/helpers/userDb");
const express = require("express");

const nameCheckMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    errorHelper(404, "Name must be included", res);
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
    .catch(err => res.status(500).json({ errorMessage: "Unable to retrieve posts at this time" }));
});

// server.get("/api/posts/:id", (req, res) => {
//   const { id } = req.params;

//   post
//     .get(id)
//     .then(response => {
//       if (response === 0) {
//         return res
//           .status(404)
//           .json({ errorMessage: "A post with the specified ID does not exist" });
//       } else {
//         res.status(200).json(response);
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ errorMessage: "The post information could not be retrieved" });
//     });
// });

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  posts
    .get(id)
    .then(post => {
      if (!post) {
        return res.status(404).json({ errorMessage: "fuck you" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => res.status(500).json({ errorMessage: "no way hosea" }));
});

server.post("/api/posts", (req, res) => {
  const newPost = req.body;

  posts
    .insert(newPost)
    .then(doc => {
      res.status(201).json(newPost);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The post information could not be retrieved" });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const updated = req.body;
  const { id } = req.params;

  posts
    .get(id)
    .then(post => {
      if (post) {
        posts.update(id, updated).then(response => {
          res.status(200).json(updated);
        });
      } else {
        res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).send({ error: "The post information could not be modified." });
    });
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
    .catch(err => {
      res.status(500).json({ errorMessage: "The server could not be reached" });
    });
});

//
///// USER ENDPOINTS
//

server.get("/api/users", (req, res) => {
  users
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ errorMessage: "Unable to retrieve user information" }));
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  users
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

server.post("/api/users", nameCheckMiddleware, (req, res) => {
  const { name } = req.body;

  users
    .insert({ name })
    .then(response => res.json(response))
    .catch(err => res.status(500).json({ errorMessage: "Unable to reach server" }));
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
    .catch(err => res.status(500).json({ errorMessage: "Unable to reach server" }));
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
    .catch(err => res.status(500).json({ errorMessage: "Unable to reach server" }));
});

server.get("/api/users/posts/:userId", (req, res) => {
  const { userId } = req.params;
  users
    .get(userId)
    .then(user => {
      if (!user) {
        res.status(404).json({ errorMessage: "A user with that ID does not exist" });
      } else {
        users.getUserPosts(userId).then(response => {
          if (response.length === 0) {
            return res.send("This user has no posts");
          }
          res.json(response);
        });
      }
    })
    .catch(err => res.status(500).json({ errorMessage: "Unable to reach server" }));
});

server.listen(5000, () => console.log("Server is listening on Port 5000"));
