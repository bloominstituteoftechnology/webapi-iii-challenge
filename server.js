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
  // console.log(id);
  posts
    .get(id)
    .then(post => {
      console.log(res);
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
      // console.log(doc);
      res.status(201).json(newPost);
    })
    .catch(err => {
      // console.log(err.errno);
      console.log(err);
      res.status(500).json({ errorMessage: "The post information could not be retrieved" });
    });
});

server.put("/api/posts/:postId", (req, res) => {
  const updated = req.body;
  const { postId } = req.params;

  posts
    .get(postId)
    .then(response => {
      console.log(response);
      if (response) {
        post.update(postId, updated).then(response => {
          // console.log(response);
          res.status(200).json(updated);
        });
      } else {
        res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ error: "The post information could not be modified." });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  posts
    .get(id)
    .then(response => {
      console.log(response);
      post
        .remove(id)
        .then(info => res.status(200).json({ recordsDeleted: info }))
        .catch(err => {
          return res
            .status(404)
            .json({ errorMessage: "The post with the specified ID does not exist." });
        });
    })
    .catch(err => {
      console.log(err);
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

server.listen(5000, () => console.log("Server is listening on Port 5000"));
