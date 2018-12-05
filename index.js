const express = require("express");
const users = require("./data/helpers/userDb.js");
const posts = require("./data/helpers/postDb.js")
const PORT = 4000;
const helmet = require("helmet");
const logger = require("morgan");
// const myMW = require("./middleware.js")

//Express Server
const server = express();

//middleware
server.use(express.json(), logger("tiny"), helmet());

// custom middleware
const upperCassed = (req, res, next) => {
  //modify req.body.name to upper case
  const newName = req.body.name.toUpperCase();
  //set, new name upperCassed, on req.name
  req.body.name = newName;
  //move into next middleware
  next();
};


// USER ROUTES
server.get("/", (req, res) => {
  res.json({ message: "Working" });
});

server.get("/api/users", (req, res) => {
  users
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "The users could not be retrieved" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  users
    .get(id)
    .then(user => {
      user ?
        res.json(user)
      :
        res.status(400).json({
          message: "The user with the id does not exist"
        });

    })
    .catch(err => {
      res.status(500).json({
        error: "The user information could not be retrieved"
      });
    });
});



server.post("/api/users", upperCassed, (req, res) => {

req.body.name ?
    users
    .insert(req.body)
    .then(() => {
        users.get().then(user => {
        res.status(201).json(user);
        });
    })
    .catch(err => {
        res
        .status(500)
        .json({
            error: "There was an error while saving the post to the database"
        });
    })
:
    res
    .status(400)
    .json({ errorMessage: "Please provide username for the user" });

});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  users
    .remove(id)
    .then(count => {
      count
        ? users.get().then(users => {
            res.status(200).json(users);
          })
        : res.status(404).json({ error: "Invalid id" });
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to delete user" });
    });
});

server.put("/api/users/:id", upperCassed, (req, res) => {

const { id } = req.params;

req.body.name ?
    users
      .update(id, req.body)
      .then(count => {
        count
          ? users.get(id).then(user => {
              res.json(user);
            })
          : res
              .status(404)
              .json({ error: "The user with specified ID does not exist." });
      })
      .catch(err => {
        res.status(500).json({ error: "The username could not be update" });
      })
:
    res
      .status(400)
      .json({ errorMessage: "Please provide username for the user" });

});



// POST ROUTES BELLOW
server.get('/api/posts', (req, res) => {
    posts
        .get()
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "Can not retrieve posts" })
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params

    posts.get(id)
        .then(posts => {
            posts ?
                res.json(posts)
                :
                res
                    .status(404)
                    .json({ error: "The post with the specified ID does not exist" })

        })
        .catch(err => {
            res
                .status(500)
                .json({error: "This post information could not be retrieved"})
        })

})



server.listen(PORT, () => {
console.log(`server is up and running on port ${PORT}`);
});
