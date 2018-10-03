//pull in express
const express = require("express");
//pull in morgan
const logger = require("morgan");
//pull in cors
const cors = require("cors");
//set port number
const port = 9000;
//import userDB
const userDb = require("./data/helpers/userDb.js");

//instantiate server
const server = express();

server.use(express.json());
/////////////////////MIDDLEWARES/////////////////////////////
const uppercase = (req, res, next) => {
  console.log(req.params);
//   console.log(req);


  next();
};

server.use(logger("tiny"), cors()); // Brock's Way
/////////////////////ROUTES/////////////////////////////////
server.get("/", (req, res) => {
  res.send(`Please work`);
});

server.get("/users", uppercase, (req, res) => {
  userDb
    .get()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.send({ err });
    });
});

server.post("/users", (req, res) => {
  let { name } = req.body;
  const newPerson = { name };
  userDb
    .insert(newPerson)
    .then(userId => {
      const { id } = userId;
      userDb.get(id).then(user => {
        console.log(user);
        res.status(200).json(req.body);
      });
    })
    .catch(err => {
      if (!name) {
        res.status(404).send({ error: "add a name" });
      } else {
        res.status(500).send({
          error: "There was an error while saving the post to the database"
        });
      }
    });
});

server.get("/users/:id", uppercase, (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      res.status(201).send(user);
    })
    .catch(err => {
      res.send({ err });
    });
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  console.log("id: " + id);

  userDb
    .remove(id)
    .then(removedName => {
      console.log("Removed name: " + removedName);
      if (!removedName) {
        return res
          .status(404)
          .send({ Error: "The name with the specified ID does not exist." });
      } else {
        res
          .status(200)
          .send({
            message:
              "you have done the impossible: deleted something off the internet"
          });
      }
    })
    .catch(err => {
      res.status(500).send({ error: "The post could not be removed" });
    });
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const nameChanged = { name };

  userDb
    .update(id, nameChanged)
    .then(user => {
      console.log("user is: " + user);
      if (!user) {
        res
          .status(404)
          .send({ message: "There is no name associated with that id" });
      } else {
        res.status(200).json(req.body);
      }
    })
    .catch(err => {
      if (!name) {
        res
          .status(400)
          .send({
            errorMessage: "please provide a name for value to be updated to"
          });
      } else res.status(500).send({ error: "The post could not be removed" });
    });
});

//call a server.listen on port
server.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
