// const server = require("./api/server");
const port = 8000;
const express = require("express");
const cors = require("cors");
const postDb = require("./data/helpers/postDb");
const userDb = require("./data/helpers/userDb");
const server = express();

server.use(express.json());
server.use(cors());
// server.use(helmet());
// server.use(morgan("short"));

function uppercase(req, res, next) {
  req.body.uppercaseName = req.body.name.toUpperCase();
  next();
}
// ======== USERS ==========
// GET ALL
server.get("/users", (req, res) => {
  userDb
    .get()
    .then(users => {
      // console.log(users);
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({error: "error"});
    });
});

// GET BY USER ID
server.get("/users/:id", (req, res) => {
  userDb.get(req.params.id).then(user => {
    if (!user) {
      res.status(404).json({error: "user doesn't exist"});
    } else {
      res.status(200).send(user);
    }
  });
});

// ADD USER
server.post("/users", uppercase, (req, res) => {
  userDb.insert({name: req.body.uppercaseName}).then(user => {
    res.status(200).json({message: "success! user added"});
  });
});

// USER POSTS
server.get("/users/:id/posts", (req, res) => {
  userDb.getUserPosts(req.params.id).then(posts => {
    console.log(posts);
    res.status(200).send(posts);
  });
});

// PUT
server.put("/users/:id", uppercase, (req, res) => {
  const id = req.params.id;
  const changes = req.body.uppercaseName;
  console.log(id);
  console.log(changes);
  userDb
    .update(id, {name: changes})
    .then(count => {
      if (count > 0) {
        res.status(201).json(count);
      } else {
        res.status(404).json({error: "user doesn't exist"});
      }
    })
    .catch(err => {
      res.status(500).json({error: "something went wrong"});
    });
});

// DELETE
server.delete("/users/:id", (req, res) => {
  userDb
    .remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res
          .status(404)
          .json({error: "can't delete a user that doesn't exist yo"});
      }
    })
    .catch(err => {
      res.status(500).json({error: "something went wrong"});
    });
});

// ######### POSTS #########
// - id: number, no need to provide it when creating posts, the database will automatically generate it.
// - userId: number, required, must be the id of an existing user.
// - text: string, no size limit, required.
server.get("/posts", (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({error: "something went wrong"});
    });
});

server.get("/posts/:id", (req, res) => {
  postDb
    .get(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({error: "something went wrong"});
    });
});

// server.get("/posts/:tag", (req, res) => {
//   console.log(req.params.tag);
//   postDb
//     .getPostTags(req.params.tag)
//     .then(posts => {
//       res.status(200).json(posts);
//     })
//     .catch(err => {
//       res.status(500).json({error: "something went wrong"});
//     });
// });

server.post("/posts", (req, res) => {
  console.log(req.body.text);
  postDb
    .insert({text: req.body.text, userId: req.body.userId})
    .then(post => {
      // console.log(post);
      res.status(200).json({message: "post added"});
    })
    .catch(err => {
      res.status(500).json({error: "something went wrong"});
    });
});

server.delete("/posts/:id", (req, res) => {
  postDb
    .remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({success: `${count} post deleted`});
      } else {
        res.status(404).json({error: "post doesn't exist"});
      }
    })
    .catch(err => {
      res.status(500).json({error: "something went wrong"});
    });
});

server.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const change = req.body;
  postDb
    .update(id, {text: change.text, userId: change.userId})
    .then(count => {
      if (count > 0) {
        res.status(201).json({success: `${count} post updated`});
      } else {
        res.status(404).json({error: "post doesn't exist"});
      }
    })
    .catch(err => {
      res.status(500).json({error: "something went wrong"});
    });
});

server.use(uppercase);
// server.post("/users");

server.listen(port, () =>
  console.log(`\nServer is listening on port ${port}\n`)
);
