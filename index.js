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

const capital = (req, res, next) => {
  req.newUser = { ...req.body };
  req.newUser.name = req.newUser.name.toUpperCase();
  next();
};

server.get("/api/users/", (req, res) => {
  userDb
    .get()
    .then(users => res.status(200).send(users))
    .cathc(err =>
      res.status(500).json({ error: "User's information could not be found." })
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
      res.status(500).json({ error: "User's information could not be found." })
    );
});

// server.get('/api/users/:id/posts', (req, res) => {
// 	const { id } = req.params.id;
// 	userDb.getUserPosts(parseInt(id))
// 		.then(posts => res.status(200).json(posts))
// 		.catch(err => res.status(500).json({ error: 'User's information could not be found.' }));
// });

server.post("/api/users", capital, (req, res) => {
  const newUser = req.newUser;
  userDb
    .insert(newUser)
    .then(id => {
      const newId = id.id;
      userDb
        .get(newId)
        .then(user => {
          if (!user) {
            return res.status(404).json({
              message: `New user, ID ${newId}, could not be retrieved.`
            });
          }
          return res.status(201).send(user);
        })
        .catch(err =>
          res.status(500).json({
            error: "New user information could not be retrieved."
          })
        );
    })
    .catch(err =>
      res.status(500).json({
        error: "An error has occured while saving user to the database."
      })
    );
});

server.listen(port, () => {
  console.log(`\n=== Listening on port ${port} ===\n`);
});
