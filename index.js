//required imports
const express = require("express");
const userDb = require("./data/helpers/userDb.js");
const postDb = require("./data/helpers/postDb.js");
const tagDB = require("./data/helpers/tagDb.js");
const uppercase = require("./custom_middleware.js");

//set up server, parser and port
const server = express();
server.use(
   express.json(),
   uppercase.gatekeeper 
);

const PORT = 5000;

//user db gets
//get all users
server.get("/api/users", (req, res) => {
   userDb.get()
      .then(users => {
         res.json(users);
      })
      .catch(err => {
         res.status(404).json({message: "users not found"});
      });
});

//get user by userid
server.get("/api/users/:id", (req, res) => {
   const { id } = req.params;
   userDb.get(id)
      .then(user => {
         user ? res.json(user) : res.status(500).json({error: "User does not exist"})
      })
      .catch(err => {
         res.status(404).json({error: "User does not exist"})
      })
});

//add user
server.post("/api/users", (req, res) => {
   const user = req.body;
   if(user.name) {
      userDb.insert(user)
         .then(userId => {
            userDb.get(userId.id)
               .then(user => {
                  res.status(201).json(user);
               })
         })
         .catch(err => {
            res.status(500).json({message: "Error adding user"})
         })
   } else {
      res.status(400).json({Error: "Please provide user name"})
   }
});

//delete user
server.delete("/api/users/:id", (req, res) => {
   const { id } = req.params;
   userDb.remove(id)
      .then(count => {
         count ? res.json({message: `User ${id} deleted`}) : res.status(404).json({error: "user does not exist"})
      })
      .catch(err => {
         res.status(500).json({message: "Error deleting user"})
      });
});

//update user
server.put("/api/users/:id", (req, res) => {
   const { id } = req.params;
   const user = req.body;
   if (user.name) {
      userDb.update(id, user)
         .then(count => {
            count ? userDb.get(id)
               .then(user => {
                  res.json(user)
               }) : res.status(404).json({error: `User ${id} not found`});
         })
         .catch(err => {
            res.status(500).json({error: "error updating user"});
         })
   } else {
      res.status(400).json({error: "Please provide user name"});
   }
});

//listen
server.listen(PORT, () => {
   console.log(`server running on ${PORT}`)
});