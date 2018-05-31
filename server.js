const express = require("express");
const cors = require("cors");
const server = express();

const users = require("./data/helpers/userDb.js");
const posts = require("./data/helpers/postDb.js");
const tags = require("./data/helpers/tagDb.js");

server.use(express.json());
server.use(cors());

//Helper Functions
const errorHandler = (status, message, res) => {
  return res.status(status).json({ error: message });
};

//CRUD Operations: Users
server.get("/api/users", (req, res) => {
  users
    .get()
    .then(users => {
      res.json({ users });
    })
    .catch(error => {
      errorHandler(500, "The user information could not be retrieved.", res);
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  users
    .get(id)
    .then(user => {
      if (user.length === 0) {
        errorHandler(
          404,
          "The user with the specified ID does not exist.",
          res
        );
      } else {
        res.json({ user });
      }
    })
    .catch(error => {
      errorHandler(500, "The user information could not be retrieved.", res);
    });
});

server.post("/api/users", (req, res) => {
  const { name } = req.body;
  if (!name) {
    errorHandler(400, "Please provide a name for the user.", res);
  } else {
    users
      .insert({ name })
      .then(response => {
        res.status(201).json({ response });
      })
      .catch(error => {
        errorHandler(500, "The user information could not be saved.", res);
      });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  users
    .remove(id)
    .then(response => {
      if (response === 0) {
        errorHandler(
          404,
          "The user with the specified ID does not exist.",
          res
        );
      } else {
        res.json({ response });
      }
    })
    .catch(error => {
      errorHandler(500, "The user could not be deleted.", res);
    });
});

server.put("/api/users/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (!name) {
    errorHandler(400, "Please provide a name for the user.", res);
  } else {
    users
      .update(id, { name })
      .then(response => {
        if (response === 0) {
          errorHandler(
            404,
            "The user with the specified ID does not exist.",
            res
          );
        } else {
          users
            .get(id)
            .then(user => {
              res.json({ user });
            })
            .catch(error => {
              errorHandler(
                500,
                "The user information could not be retrieved.",
                res
              );
            });
        }
      })
      .catch(error => {
        errorHandler(500, "The user could not be updated.", res);
      });
  }
});

//CRUD Operations: Posts
server.get("/api/posts", (req, res) => {
  posts
    .get()
    .then(posts => {
      res.json({ posts });
    })
    .catch(error => {
      errorHandler(500, "The post information could not be retrieved.");
    });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  posts
    .get(id)
    .then(post => {
      if (post.length === 0) {
        errorHandler(
          404,
          "The post with the specified ID does not exist.",
          res
        );
      } else {
        res.json({ post });
      }
    })
    .catch(error => {
      errorHandler(500, "The post information could not be retrieved.", res);
    });
});

server.post("/api/posts", (req, res) => {
  const { userId, text } = req.body;
  if (!userId || !text) {
    errorHandler(400, "Please provide a user id and text for the post.", res);
  } else {
    posts
      .insert({ userId, text })
      .then(response => {
        res.status(201).json({ response });
      })
      .catch(error => {
        errorHandler(500, "The post could not be saved to the database.", res);
      });
  }
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  posts
    .remove(id)
    .then(response => {
      if (response === 0) {
        errorHandler(
          404,
          "The post with the specified id does not exist.",
          res
        );
      } else {
        res.json({ response });
      }
    })
    .catch(error => {
      errorHandler(500, "The post could not be deleted", res);
    });
});

server.put("/api/posts/:id", (req, res) => {
  const { userId, text } = req.body;
  const { id } = req.params;
  if (!userId || !text) {
    errorHandler(400, "Please provide a user id and text for the post.", res);
  } else {
    posts
      .update(id, { userId, text })
      .then(response => {
        if (response === 0) {
          errorHandler(
            404,
            "The post with the specified id does not exist.",
            res
          );
        } else {
          posts
            .get(id)
            .then(user => {
              res.json({ user });
            })
            .catch(error => {
              errorHandler(
                500,
                "The post information could not be retrieved.",
                res
              );
            });
        }
      })
      .catch(error => {
        errorHandler(500, "The post could not be updated.", res);
      });
  }
});

server.listen(5000, () => console.log("Server started at port 5000"));
