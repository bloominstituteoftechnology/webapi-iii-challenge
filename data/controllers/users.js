const express = require('express');

const users = require('../helpers/userDb.js');

const server = express.Router();

const errorHelper = (status, message, res) => {
  res.status(status).json({err: message });
}

// Custom Middle Ware
const nameUppercaseMiddleware = (req,res,next) => {
  let { name } = req.body;
    console.log("Name",name);
    name = name.toUpperCase();
    console.log(name);
    next();
};


// User endpoints
server.get('/', (req, res) => {
  users
    .get()
    .then(foundUsers => {
      console.log(foundUsers)
      res.json(foundUsers);
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    });
});

// Get by ID
server.get('/:id', (req,res) => {
  const { id } = req.params;
  users
    .getById(id)
    .then(user => {
      if (user === 0) {
        return errorHelper(404, 'No user found', res);
      }
      res.json(user);
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    });
});

// Insert/ Create
server.post('/', nameUppercaseMiddleware, (req,res) => {
  const { name } = req.body;
  users
    .insert({ name })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    });
});

//Delete
server.delete('/:id', (req,res) => {
  const { id } = req.params;
  users
    .remove(id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      return errorHelper(500, 'Internal Server Error', res);
    });
})

// edit
server.put('/:id', nameUppercaseMiddleware, (req,res) => {
  const { id } = req.params;
  const { name } = req.body;
  users
    .update(id, { name })
    .then(response => {
      if (response === 0){
        return errorHelper(404, 'No user by that id');
      } else {
        users.getById(id).then(user => {
          res.json(user);
        });
      }
    })
    .catch(err => {
      return errorHelper(500, 'Internal server error', res);
    });
});

// Get Posts by User ID
server.get('/posts/:userId', (req,res) =>{
  const { userId } = req.params;
  users
    .getUserPosts(userId)
    .then(usersPosts => {
      console.log(usersPosts)
      if (usersPosts === 0) {
        return errorHelper(404, "No posts by that user", res)
      }
      res.json(usersPosts);
    })
    .catch(err => {
      return errorHelper(500, "Internal Server Error", res);
    });
});

module.exports = server;
