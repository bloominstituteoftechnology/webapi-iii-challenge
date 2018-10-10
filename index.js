const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { postDb, tagDb, userDb } = require("./data/helpers");

const server = express();
const port = 4000;

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("tiny"));

server.get("/api/users/", (req, res) => {
  userDb
    .get()
    .then(users => res.status(200).send(users))
    .cathc(err =>
      res
        .status(500)
        .json({ error: "The users information could not be found." })
    );
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ message: `User ID ${id} does not exist. ` });
      }
      return res.status(200).send(user);
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "Users information could not be retrieved." })
    );
});

server.listen(port, () => {
  console.log(`\n=== Listening on port ${port} ===\n`);
});
