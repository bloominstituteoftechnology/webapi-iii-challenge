const express = require("express");
const morgan = require("morgan");
const userDb = require("./data/helpers/userDb");
const postDb = require("./data/helpers/postDb");

const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send("Hello World");
});

//! ==================== USER DB ====================

//* GET Request userDB get()
server.get("/users", (req, res) => {
  userDb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    );
});

//* GET with id
server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

//* POST Request userDb insert()
server.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      errorMessage: "Please provide a name for the user."
    });
  }

  userDb
    .insert({
      name: req.body.name
    })
    .then(id => res.status(201).json(id))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      })
    );
});

//* UPDATE Request userBd update().
server.put("/users/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name) {
    res.status(400).json({
      errorMessage: "Please provide name for the user."
    });
  }
  userDb
    .update(id, { name })
    .then(response => {
      if (!response) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json({ name });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be updated" })
    );
});

//* DELETE Request userDb remove()
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  userDb
    .remove(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "The user has been deleted." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be removed" })
    );
});

//! ==================== POST DB ====================

//* GET Request postDB get()
server.get("/posts", (req, res) => {
  postDb
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

//* GET with id postDb
server.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

//* POST Request postDb insert()
server.post("/posts", (req, res) => {
  if (!req.body.text && !req.body.userId) {
    return res.status(400).json({
      errorMessage: "Please provide the text for the post."
    });
  }

  postDb
    .insert({
      text: req.body.text,
      userId: req.body.userId
    })
    .then(id => res.status(201).json(id))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      })
    );
});

//* UPDATE Request postDb update().
server.put("/users/:id", (req, res) => {
  const { text, userId } = req.body;
  const { id } = req.params;

  if (!text && !userId) {
    res.status(400).json({
      errorMessage: "Please provide text and user id for the posts."
    });
  }
  postDb
    .update(id, { text, userId })
    .then(response => {
      if (!response) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json({ text, userId });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be updated" })
    );
});

//* DELETE Request postDb remove()
server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  postDb
    .remove(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "The post has been deleted." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

server.listen(8000, () => console.log("\n === API Running... ===\n"));
