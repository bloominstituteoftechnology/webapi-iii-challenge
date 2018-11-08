const db = require('../data/helpers/userDb.js');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('short')); 

// configure endpoints (route handlers are middleware!!)
/*
----Users------
id: number, no need to provide it when creating users, 
the database will generate it.
name: up to 128 characters long, required.

Create GET, POST, PUT, and DELETE functionality for users 
 
  */

//----- GET -----

 server.get('/api/users', (req, res) => {
    db.get() //calling find method from db.js file 
    .then(users=> { 
      res.status(200).json(users);
    }) // once you find them- communicated by 200 status code, display them
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });//if you 'catch' an error as defined by status 500 - let the client know
});

//----- POST -----

server.post('/api/users', async (req, res) => {
    const userData = req.body;
    if (!userData.name || userData.name==="" ) {
        const errorMessage = "Please provide name for the user"; 
        res.status(400).json({ errorMessage});
        return
    }   
    try {
        await db.insert(userData);
    } catch (error) {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
            return      
    }
    res.status(201).json({message: "user was added to database" });
    return
});

/*

//----- POST -----

server.post('/api/posts', async (req, res) => {
    
  });
  
//----- PUT -----
server.put('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  
});

//----- DELETE -----

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  
  
  */


module.exports = server;
  
