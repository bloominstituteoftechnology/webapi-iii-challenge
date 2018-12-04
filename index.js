const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const userDB = require("./data/helpers/userDb");
const postDB = require("./data/helpers/postDb");

const server = express();
const PORT = 4050;
const badDataRetreival = { message: "That data could not be retreived" };
const badDataInsert = {
  message: "That information could not be added to the database"
};

server.use(express.json(), helmet(), logger("dev"));

// - `get()`: calling find returns a promise that resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if found.
server.get("/users", (req, res) => {
  userDB
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(badDataRetreival);
    });
});

server.get("/posts", (req, res) => {
  postDB
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json(badDataRetreival);
    });
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userDB
    .get(id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json(badDataRetreival);
    });
});

server.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDB
    .get(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json(badDataRetreival);
    });
});

// The `userDb.js` helper includes an extra method called `getUserPosts()` that when passed a user id as it's only argument, returns a list of all the posts for the user.

server.get("/users/:id/posts", (req, res) => {
  const { id } = req.params;
  userDB
    .getUserPosts(id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json(badDataRetreival);
    });
});

// - `insert()`: calling insert passing it a resource object will add it to the database and return an object with the id of the inserted resource. The object looks like this: `{ id: 123 }`.

server.post("/users", (req, res) => {
  const newUser = req.body;
  if (newUser.name) {
    userDB
      .insert(newUser)
      .then(id => {
        userDB.get(id.id).then(user => {
          res.status(201).json(user);
        });
      })
      .catch(err => {
        res.status(500).json(badDataInsert);
      });
  } else {
    res.status(400).json({ message: "missing user name" });
  }
});

// - `update()`: accepts two arguments, the first is the `id` of the resource to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
// - `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
