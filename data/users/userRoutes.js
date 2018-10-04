const express = require("express");

//PULL IN ROUTER
const router = express.Router();

//import userDB
const userDb = require("../helpers/userDb.js");
const uppercase = (req, res, next) => {
    console.log(req.body.name.toUpperCase());
    req.body.name = req.body.name.toUpperCase();
    next();
  };

//GET POST BY USERID
router.get("/userspost/:id", (req, res) => {
    const { id } = req.params;
    userDb
    .getUserPosts(id)
      .then(posts => {
        if (!posts) {
          res.status(404).send({ message: "no posts exist for this id" });
        } else {
          res.json(posts);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });

  //GET USER WITH PARTICULAR ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    userDb
      .get(id)
      .then(user => {
        if (!user) {
          res
            .status(404)
            .send({ errorMessage: "There is no user with that name" });
        }
        res.status(201).send(user);
      })
      .catch(err => {
        res.send({ err });
      });
  });
  

  //GET ALL USERS
router.get("/", (req, res) => {
    userDb
      .get()
      .then(users => {
        res.send(users);
      })
      .catch(err => {
        res.send({ err });
      });
  });

  //ADDING USERS
router.post("/", uppercase, (req, res) => {
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
  
  //CHANGE USER INFO FOR PARTICULAR ID
router.put("/:id", uppercase, (req, res) => {
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
          res.status(400).send({
            errorMessage: "please provide a name for value to be updated to"
          });
        } else res.status(500).send({ error: "The post could not be removed" });
      });
  });

//DELETE USER WITH PARTICULAR ID
router.delete("/:id", (req, res) => {
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
          res.status(200).send({
            message:
              "you have done the impossible: deleted something off the internet"
          });
        }
      })
      .catch(err => {
        res.status(500).send({ error: "The post could not be removed" });
      });
  });

//EXPORTS ROUTE TO SO INDEX.JS CAN PULL IT IN
  module.exports = router;