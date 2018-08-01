const express = require("express");
const morgan = require("morgan");
const userDb = require("./data/helpers/userDb");

const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.send("Hello World");
});

//* GET Request
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

server.listen(8000, () => console.log("\n === API Running... ===\n"));
