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

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params; //pull the id off the request 
    db.get(id) //call findbyid method, passing in id from above
      .then(user => { //then check for ...
        console.log(user)
        if (!user) { // status 200 - we found it!
        res.status(404).json({ message: "The post with the specified ID does not exist." });
        return  
        } else if (user){ // or oops - if we could retrieve it, we would but it's not here, status 404
        res.status(200).json(user);
        return  
        }
      })
      .catch(err => {
        res //if data can't be retrieved ... 
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
  });
//----- POST -----

server.post('/api/users', async (req, res) => {
    const userData = req.body;
    if (!userData.name || userData.name==="" ) {
        const errorMessage = "Please provide name for the user"; 
        res.status(400).json({ errorMessage});
        return
    }   
    //need to add character length conditional
    try {
        await db.insert(userData);
    } catch (error) {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
            return      
    }
    res.status(201).json({message: "user was added to database" });
    return
});
//----- PUT -----
server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const userChanges = req.body;
    db.get(id)
        .then(user => { 
        if (!user) { 
           res.status(404).json({ message: "The user with the specified ID does not exist." });
           return  
         }
         })
         .catch(err => {
          res //if data can't be retrieved ... 
            .status(500)
            .json({ error: "The post information could not be retrieved." });
         });
          
        if (!userChanges.name || userChanges.name==="" ) {
          const errorMessage = "Please provide name for the user"; 
          res.status(400).json({ errorMessage });
          return
        } 
        try {
          await db.update(id, userChanges)
        } catch (error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
        return      
      }
      res.status(201).json({message: "user was updated" });
      return
      });
//----- DELETE -----
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
        .then(user => { //then check for ...
          if (user && user.length) { // status 200 - we found it!
            db.remove(id) 
            res.status(200).json({ message: "The post with the specified ID was deleted." });
          } else { // or oops - if we could retrieve it, we would but it's not here, status 404
            res.status(404).json({ message: "The post with the specified ID does not exist." });
          }
        })
        .catch(err => {
          res //if data can't be retrieved ... 
            .status(500)
            .json({ error: "The post information could not be retrieved." });
        });
      });



module.exports = server;
  
