
const express = require('express'); 
const server =  express(); 
const userDb = require('./data/helpers/userDb.js')


//Middleware that transforms user name to UPPERCASE

const toUppercase = (req, res, next) => {
    if(req.method === "POST" || req.method === "PUT"){
        const name = req.body.name.toUpperCase(); 
        req.body.name = name;
    }
    next(); 
}


server.use(express.json());
server.use(toUppercase); 


//User CRUD operations

server.get("/api/users", (req,res) => {
    userDb.get().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        res.status(500).json({error: "There was an error retrieving the data"})
    })
}); 

server.get("/api/users/:id", (req,res) => {
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

server.post("/api/users", (req, res) => {
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

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id; 
    userDb.remove(id).then(count => {
        if(count > 0){
            res.status(200).json({message: "Deleted user successfully!"})
        }
    }).catch(err => {
        res.status(500).json({error: "Database error in deleting user"})
    })
}); 

server.put("/api/users/:id", (req, res) => {
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



server.listen(5000); 