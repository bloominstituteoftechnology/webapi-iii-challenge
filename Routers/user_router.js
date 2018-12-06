//import requires for router
const express = require("express");
const router = express.Router();
const userDb = require("../data/helpers/userDb.js");

//user db gets
//get all users
router.get("/", (req, res) => {
   userDb.get()
      .then(users => {
         res.json(users);
      })
      .catch(err => {
         res.status(404).json({message: "users not found"});
      });
});

//get user by userid
router.get("/:id", (req, res) => {
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
router.post("/", (req, res) => {
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
router.delete("/:id", (req, res) => {
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
router.put("/:id", (req, res) => {
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

module.exports = router;