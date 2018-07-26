//import express from express
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

//import files
// const users = require("./data/helpers/userDb");
// const posts = require("./data/helpers/postDb");
// const tags = require("./data/helpers/tagDb");

//import routes
const users = require("./data/routes/users");
const posts = require("./data/routes/posts");
const tags = require("./data/routes/tags");

//declare server
const server = express();
//parse JSON to objects
server.use(express.json());
//security
server.use(helmet());
//logger
server.use(morgan("dev"));
//custom middleware for uppercasing tags
function uppercaseTag(req, res, next) {
  if (req.method === "GET" && req.url === "/tags") {
    let tags = res.json;
    res.json = function(data) {
      data.forEach(response => (response.tag = response.tag.toUpperCase()));
      tags.apply(res, arguments);
    };
  }
  next();
}
//test home server
server.get("/", (req, res) => {
  res.send("<h1>Hello<h1>");
});
//use uppercase for tags
server.use(uppercaseTag);
//use users route
server.use("/users", users);
server.use("/posts", posts);
server.use("/tags", tags);

//get users

// server.get("/users", (req, res) => {
//   users
//     .get()
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ error: "The users information could not be retrieved." });
//     });
// });

//get user by id

// server.get("/users/:id", (req, res) => {
//   users
//     .get(req.params.id)
//     .then(user => {
//       if (user.length === 0) {
//         res
//           .status(404)
//           .json({ message: "The user with the specified ID does not exist." });
//       }
//       res.status(200).json(user);
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ error: "The user information could not be retrieved." });
//     });
// });

//get user posts

// server.get("/users/:id/posts", (req, res) => {
//   users
//     .getUserPosts(req.params.id)
//     .then(posts => {
//       if (posts.length === 0) {
//         res
//           .status(404)
//           .json({ message: "The posts with the specified ID does not exist." });
//       }
//       res.status(200).json(posts);
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ error: "The posts information could not be retrieved." });
//     });
// });

//create user

// server.post("/users", (req, res) => {
//   const { name } = req.body;
//   if (!name) {
//     res.status(400).json({
//       errorMessage: "Please provide name for the post."
//     });
//   }
//   users
//     .insert({ name })
//     .then(post => res.status(201).json({ name }))
//     .catch(error => {
//       res.status(500).json({
//         error: "There was an error while saving the post to the database"
//       });
//     });
// });

//delete user

// server.delete("/users/:id", (req, res) => {
//   const { id } = req.params;
//   users
//     .remove(id)
//     .then(users => {
//       if (users === 0) {
//         res
//           .status(404)
//           .json({ message: "The user with the specified ID does not exist." });
//       }
//       res.status(200).json({ message: "user deleted" });
//     })
//     .catch(error => {
//       res.status(500).json({ error: "The user could not be deleted." });
//     });
// });

//edit users

// server.put("/users/:id", (req, res) => {
//   const id = req.params.id;
//   const { name } = req.body;
//   if (!name) {
//     res.status(400).json({ errorMessage: "Please provide name for post." });
//   }
//   users
//     .update(id, { name })
//     .then(user => {
//       if (user.length === 0) {
//         res.status(404).json({
//           errorMessage: "The user with the specified ID does not exist."
//         });
//       }
//       res.status(200).json({ name });
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ error: "The user information could not be modified." });
//     });
// });

//get posts

// server.get("/posts", (req, res) => {
//   posts
//     .get()
//     .then(posts => {
//       res.status(200).json(posts);
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ error: "The posts information could not be retrieved." });
//     });
// });

//get post by id

// server.get("/posts/:id", (req, res) => {
//   posts
//     .get(req.params.id)
//     .then(post => {
//       if (post.length === 0) {
//         res
//           .status(404)
//           .json({ message: "The user with the specified ID does not exist." });
//       }
//       res.status(200).json(post);
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ error: "The user information could not be retrieved." });
//     });
// });

//get post tags

// server.get("/posts/:id/tags", (req, res) => {
//   posts
//     .getPostTags(req.params.id)
//     .then(tags => {
//       if (tags.length === 0) {
//         res
//           .status(404)
//           .json({ message: "The tags with the specified ID does not exist." });
//       }
//       res.status(200).json(tags);
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ error: "The tags information could not be retrieved." });
//     });
// });

//create post

// server.post("/posts", (req, res) => {
//   const { text, userId } = req.body;
//   if (!text || !userId) {
//     res.status(400).json({
//       errorMessage: "Please provide post for the post."
//     });
//   }
//   posts
//     .insert({ text, userId })
//     .then(post => res.status(201).json({ text, userId }))
//     .catch(error => {
//       res.status(500).json({
//         error: "There was an error while saving the post to the database"
//       });
//     });
// });

//delete post

// server.delete("/posts/:id", (req, res) => {
//   const { id } = req.params;
//   posts
//     .remove(id)
//     .then(posts => {
//       if (posts === 0) {
//         res
//           .status(404)
//           .json({ message: "The post with the specified ID does not exist." });
//       }
//       res.status(200).json({ message: "post deleted" });
//     })
//     .catch(error => {
//       res.status(500).json({ error: "The post could not be deleted." });
//     });
// });

//edit post

// server.put("/posts/:id", (req, res) => {
//   const id = req.params.id;
//   const { text } = req.body;
//   if (!text) {
//     res.status(400).json({ errorMessage: "Please provide text for post." });
//   }
//   posts
//     .update(id, { text })
//     .then(post => {
//       if (post.length === 0) {
//         res.status(404).json({
//           errorMessage: "The post with the specified ID does not exist."
//         });
//       }
//       res.status(200).json({ text });
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ error: "The user information could not be modified." });
//     });
// });

//get tags

// server.get("/tags", (req, res) => {
//   tags
//     .get()
//     .then(tags => {
//       res.status(200).json(tags);
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ error: "The posts information could not be retrieved." });
//     });
// });

//get tags by id

// server.get("/tags/:id", (req, res) => {
//   tags
//     .get(req.params.id)
//     .then(tag => {
//       if (tag.length === 0) {
//         res
//           .status(404)
//           .json({ message: "The user with the specified ID does not exist." });
//       }
//       res.status(200).json(tag);
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ error: "The user information could not be retrieved." });
//     });
// });

//create tags

// server.post("/tags", (req, res) => {
//   const { tag } = req.body;
//   if (!tag) {
//     res.status(400).json({
//       errorMessage: "Please provide tag for the post."
//     });
//   }
//   tags
//     .insert({ tag })
//     .then(post => res.status(201).json({ tag }))
//     .catch(error => {
//       res.status(500).json({
//         error: "There was an error while saving the post to the database"
//       });
//     });
// });

//delete tag

// server.delete("/tags/:id", (req, res) => {
//   const { id } = req.params;
//   tags
//     .remove(id)
//     .then(tags => {
//       if (tags === 0) {
//         res
//           .status(404)
//           .json({ message: "The post with the specified ID does not exist." });
//       }
//       res.status(200).json({ message: "post deleted" });
//     })
//     .catch(error => {
//       res.status(500).json({ error: "The post could not be deleted." });
//     });
// });

//edit tag

// server.put("/tags/:id", (req, res) => {
//   const id = req.params.id;
//   const { tag } = req.body;
//   if (!tag) {
//     res.status(400).json({ errorMessage: "Please provide tag for post." });
//   }
//   tags
//     .update(id, { tag })
//     .then(post => {
//       if (post.length === 0) {
//         res.status(404).json({
//           errorMessage: "The post with the specified ID does not exist."
//         });
//       }
//       res.status(200).json({ tag });
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ error: "The user information could not be modified." });
//     });
// });

server.listen(8000, () => console.log("API running..."));
