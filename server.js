
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

 server.listen(8000, () => console.log('/n== API on port 8000 ==/n') )