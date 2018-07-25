const users = require("./data/helpers/userDb.js");
const posts = require("./data/helpers/postDb.js");
const tags = require("./data/helpers/tagDb.js");

const express = require("express");

const server = express();
server.use(express.json());

// Users
server.get("/api/users", (req, res) => {
  users
    .get()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    );
});

server.get("/api/users/:id", (req, res) => {
  users
    .get(req.params.id)
    .then(user => {
      if (user.length !== 0) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name for the user" });
  }
  users
    .insert({ name })
    .then(user => res.status(201).json(user))
    .catch(err =>
      res
        .status(500)
        .json({ error: "There was an error saving the user to the database." })
    );
});

server.delete("/api/users/:id", (req, res) => {
  users
    .get(req.params.id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(response);
      users
        .remove(req.params.id)
        .then(count => {
          if (count === 0) {
            return res.status(404).json({
              message: "The user with the specified ID does not exist."
            });
          }
        })
        .catch(err => {
          res.status(500).json({ error: "The post could not be removed." });
        });
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed." });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  users
    .get(req.params.id)
    .then(posts => {
      if (posts.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        users
          .update(req.params.id, { name })
          .then(count => {
            console.log(count);
            users
              .get(req.params.id)
              .then(post => {
                res.status(200).json(post);
              })
              .catch(err => {
                res.status(500).json({
                  error: "The post information could not be retrieved."
                });
              });
          })

          .catch(err => {
            res
              .status(500)
              .json({ error: "The post information could not be modified." });
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

server.get("/api/users/:id/posts", (req, res) => {
  users
    .getUserPosts(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(404).json({ error: "The specified User ID does not exist." });
    });
});

// Posts
server.get("/api/posts", (req, res) => {
  posts
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    );
});

server.post("/api/posts", (req, res) => {
  const { userId, text } = req.body;
  if (!userId || !text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a userID and text for the post." });
  }
  posts
    .insert({ userId, text })
    .then(post => res.status(201).json(post))
    .catch(err =>
      res
        .status(500)
        .json({ error: "There was an error saving the user to the database." })
    );
});

server.get("/api/posts/:id", (req, res) => {
  posts
    .get(req.params.id)
    .then(post => {
      if (post.length !== 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  posts
    .get(req.params.id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(response);
      posts
        .remove(req.params.id)
        .then(count => {
          if (count === 0) {
            return res.status(404).json({
              message: "The user with the specified ID does not exist."
            });
          }
        })
        .catch(err => {
          res.status(500).json({ error: "The post could not be removed." });
        });
    })
    .catch(err => {
      res
        .status(404)
        .json({ error: "The user with the specified ID does not exist." });
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { userId, text } = req.body;
  if (!userId || !text) {
    res.status(400).json({
      errorMessage: "Please provide a userId and text for the post."
    });
  }
  posts
    .get(req.params.id)
    .then(response => {
      if (response.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        posts
          .update(req.params.id, { userId, text })
          .then(count => {
            console.log(count);
            posts
              .get(req.params.id)
              .then(post => {
                res.status(200).json(post);
              })
              .catch(err => {
                res.status(500).json({
                  error: "The post information could not be retrieved."
                });
              });
          })

          .catch(err => {
            res.status(500).json({ error: err.message });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

server.get("/api/posts/:id/tags", (req, res) => {
  posts
    .getPostTags(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(() =>
      res.status(404).json({ error: "The specified Post ID does not exist." })
    );
});

// Tags
server.get("/api/tags", (req, res) => {
  tags
    .get()
    .then(tags => res.status(200).json(tags))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The tags information could not be retrieved." })
    );
});

server.post("/api/tags", (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name for the user" });
  }
  tags
    .insert({ tag })
    .then(user => res.status(201).json(user))
    .catch(err =>
      res
        .status(500)
        .json({ error: "There was an error saving the user to the database." })
    );
});

server.get("/api/tags/:id", (req, res) => {
  tags
    .get(req.params.id)
    .then(tag => {
      if (tag.length !== 0) {
        res.status(200).json(tag);
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The tag with the specified ID does not exist." });
    });
});

server.delete("/api/tags/:id", (req, res) => {
  tags
    .get(req.params.id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The tag with the specified ID does not exist." });
      }
      res.status(200).json(response);
      tags
        .remove(req.params.id)
        .then(count => {
          if (count === 0) {
            return res.status(404).json({
              message: "The tag with the specified ID does not exist."
            });
          }
        })
        .catch(err => {
          res.status(500).json({ error: "The post could not be removed." });
        });
    })
    .catch(err => {
      res
        .status(404)
        .json({ error: "The tag with the specified ID does not exist." });
    });
});

server.put("/api/tags/:id", (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res.status(400).json({
      errorMessage: "Please provide a userId and text for the post."
    });
  }
  tags
    .get(req.params.id)
    .then(response => {
      if (response.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        tags
          .update(req.params.id, { tag })
          .then(count => {
            console.log(count);
            tags
              .get(req.params.id)
              .then(post => {
                res.status(200).json(post);
              })
              .catch(err => {
                res.status(500).json({
                  error: "The post information could not be retrieved."
                });
              });
          })

          .catch(err => {
            res.status(500).json({ error: err.message });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

server.listen(8000, () => console.log("API running on port 8000"));
