const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const posts = require("./data/helpers/postDb");
const users = require("./data/helpers/userDb");
const port = 9000




//middleware

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors({}));

//custom middleware

const upperCase = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};

//endpoints



// Get all users
server.get("/api/users", (req, res) => {
    users
      .get()
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: "The post info could not be received", err });
      });
  });


  // Get users by ID

  server.get("/api/users/:id", (req, res) => {
      const { id } = req.params;
      users
        .get(id)
        .then(users => {
            if (users) {
                res.status(200).json(users)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The post info could not be received", err });
        });
  });


  // create a new user 

  server.post("/api/users", upperCase, (req, res) => [
    users
      .insert(req.body)
      .then(user => {
          res.status(201).json(user)
      })
      .catch(err => {
         res.status(500).json({ message: "There was an error while saving the post to the database", err });
      })
  ])

  // Delete a user

  server.delete("/api/users/:id", (req, res) => {
      users
       .remove(req.params.id)
       .then(count => {
           res.status(200).json(count)
       })
       .catch(err => {
           res.status(500).json({ message: "Error deleting the post", err })
       })
  })








































server.listen(port, () => console.log(`Server listening on ${port}`));