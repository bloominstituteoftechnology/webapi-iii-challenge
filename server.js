
const express = require('express');
const server = express();
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');



 server.use(express.json());
 

 server.get('/', (req, res) => {
    res.send('Welcome to Node-Blog');
} );

server.get('/users', (req, res) => {
    userDb.get().then(users => {
      res.status(200).json(users)
    }).catch(err => {
      console.error('error', err);
       res.status(500).json({ message: 'Error retrieving user data'})
    });
  });

  server.get("/users/:id", (req,res) => {
    const id = req.params.id; 
    userDb.get(id).then(user => {
        if(user){
            res.status(200).json(user)
        }else {
            res.status(404).json({error: "User ID does not exist"})
        }
    }).catch(err => {
        res.status(500).status.json({error:"User information could not be retrieved"})
    })
}); 

server.post("/users", (req, res) => {
    const data = req.body
    if (data.name){
        userDb.insert(data).then(userId => {
            userDb.get(userId.id).then(user => {
                res.status(201).json(user)
            }).catch(err => {
                res.status(500).json({error: "Error recieving new user info"})
            })
        }).catch(err => {
            res.status(500).json({error: "Error uploading data"})
        })
    } else {res.status(400).json({error: "Name required"})}
}); 

server.put("/users/:id", (req, res) => {
    const id = req.params.id; 
    const updatedData = req.body; 
    if(updatedData.name){
        userDb.update(id, updatedData).then(count => {
            if(count > 0){
                res.status(200).json({message:"User information updated"})
            }else {
                res.status(404).json({error: "User ID does not exist"})
            }
        }).catch(err => {
            res.status(500).json({error: "Error updating"})
        })
    }else {
        res.status(400).json({message: "Must provide Name"})
    }
})

server.delete("/users/:id", (req, res) => {
    const id = req.params.id; 
    userDb.remove(id).then(count => {
        if(count > 0){
            res.status(200).json({message: "Deleted user"})
        }
    }).catch(err => {
        res.status(500).json({error: "Error deleting user"})
    })
}); 

 server.listen(8000, () => console.log('/n== API on port 8000 ==/n') )