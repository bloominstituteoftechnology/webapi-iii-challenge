const express = require("express");
const morgan = require("morgan");
const userDb = require("./data/helpers/userDb");

const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send("Hello World");
});

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

server.listen(8000, () => console.log("\n === API Running... ===\n"));
