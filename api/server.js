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
 server.get('/api/02-users', (req, res) => {
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
    
/*
//----- GET -----

server.get('/api/02-users', (req, res) => {
    db.find() //calling find method from db.js file 
      .then(posts=> { 
        res.status(200).json(posts);
      }) // once you find them- communicated by 200 status code, display them
      .catch(err => {
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." });
      });//if you 'catch' an error as defined by status 500 - let the client know
  });

//----- GET -----

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params; //pull the id off the request 
    db.findById(id) //call findbyid method, passing in id from above
      .then(post => { //then check for ...
        if (post && post.length) { // status 200 - we found it!
          res.status(200).json(post);
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
  
