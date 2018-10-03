const express = require('express'); 
const userDb = require('../data/helpers/userDb.js');

//this router handles anything that begins with  /users
const router = express.Router();

//Middleware that transforms user name to UPPERCASE

const toUppercase = (req, res, next) => {
    const name = req.body.name.toUpperCase(); 
     req.body.name = name;
     next(); 
 }

router.get("/", (req,res) => {
    userDb.get().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        res.status(500).json({error: "There was an error retrieving the data"})
    })
}); 

router.get("/:id", (req,res) => {
    const id = req.params.id; 
    userDb.get(id).then(user => {
        if(user){
            res.status(200).json(user)
        }else {
            res.status(404).json({error: "A user with the specified ID does not exist"})
        }
    }).catch(err => {
        res.status(500).status.json({error:"The user information could not be retrieved"})
    })
}); 

router.get("/:id/posts", (req, res) => {
    const id = req.params.id; 
    userDb.getUserPosts(id).then(userPosts => {
        if(userPosts){
            res.status(200).json(userPosts); 
        }else {
            res.status(404).json({error: "The specified ID for users does not exist, therefore no posts"})
        }
    }).catch(err => {
        res.status(500).json({error: "The posts could not be retrieved from the database."})
    })
});

router.post("/", toUppercase, (req, res) => {
    const data = req.body
    if (data.name){
        userDb.insert(data).then(userId => {
            userDb.get(userId.id).then(user => {
                res.status(201).json(user)
            }).catch(err => {
                res.status(500).json({error: "Error accessing new user from database"})
            })
        }).catch(err => {
            res.status(500).json({error: "There was an error updating the information in the database"})
        })
    } else {res.status(400).json({error: "Please provide a name for the user"})}
}); 

router.delete("/:id", (req, res) => {
    const id = req.params.id; 
    userDb.remove(id).then(count => {
        if(count > 0){
            res.status(200).json({message: "Deleted user successfully!"})
        }
    }).catch(err => {
        res.status(500).json({error: "Database error in deleting user"})
    })
}); 

router.put("/:id", toUppercase, (req, res) => {
    const id = req.params.id; 
    const updatedData = req.body; 
    if(updatedData.name){
        userDb.update(id, updatedData).then(count => {
            if(count > 0){
                res.status(200).json({message:"User information updated"})
            }else {
                res.status(404).json({error: "The user with the specified ID does not exist"})
            }
        }).catch(err => {
            res.status(500).json({error: "Error when updating user information in database"})
        })
    }else {
        res.status(400).json({message: "Please provide name in updated data"})
    }
}); 

module.exports = router; 