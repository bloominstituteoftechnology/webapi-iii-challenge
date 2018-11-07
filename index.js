const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const port = 9000;

const userDb = require("./data/helpers/userDb.js");

const server = express();

// MIDDLEWARES

const allCaps = (req, res, next) => {
    console.log(req.body);
  
    Object.assign(req.body, { name: req.body.name.toUpperCase() });
  
    next();
  };


server.use(morgan("dev"), cors(), helmet(), express.json());
   
 
//=============== USER ENDPOINTS =============== //

//Get all users
server.get("/api/users", (req, res) => {
    userDb
      .get()
      .then(users => {
        res.json(users);
      })
      .catch(err =>
        res.status(500).json({
          error: "The users information could not be retrieved."
        })
      );
  });
  
  //Get posts of a specific user
  server.get("/api/users/:id/posts", (req, res) => {
    userDb
      .getUserPosts(req.params.id)
      .then(user => {
        if (user.length > 0) {
          res.json(user);
        } else
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The user information could not be retrieved." })
      );
  });
  
  //Add a new User
  server.post("/api/users", allCaps, (req, res) => {
    const newUser = req.body;
    userDb
      .insert(newUser)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the user to the database."
        });
      });
  });
  
  //delete a user
  server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    userDb
      .remove(id)
      .then(user => {
        if (user.length < 1) {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        } else {
          res.status(200).json(user);
        }
      })
      .catch(err =>
        res.status(500).json({
          error: "The user could not be removed."
        })
      );
  });
  
  //Update a user
  server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const newUser = req.body;
    userDb
      .update(id, newUser)
      .then(user => {
        if (user.length < 1) {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        } else {
          res.status(200).json(user);
        }
      })
      .catch(err =>
        res.status(500).json({
          error: "The user information could not be modified.."
        })
      );
  });
  
  //=============== POST ENDPOINTS =============== //
  
  // call server.listen w/ a port of your choosing
  server.listen(port, () => {
    console.log(`\n === API running on port ${port} ===\n`);
  });