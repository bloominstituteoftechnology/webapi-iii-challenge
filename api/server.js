const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
// npm i express helmet morgan
// yarn add express helmet morgan
// IN POSTS - userId: number, required, must be the id of an existing user.

const idMatcher = require('../gatekeeper/idMatcher');
const gatekeeper = require('../gatekeeper/gatekeeperMiddleware.js');
const tooLong = require('../gatekeeper/tooLong.js');
const userDb = require('../data/helpers/userDb.js');
const postDb = require('../data/helpers/postDb')
const server = express();

// configure middleware
// ORDER MATTERS! they will execute top to bottom
server.use(express.json()); // built in
server.use(helmet()); // third party
server.use(morgan('short')); // third party

// custom

// server.use(gatekeeper); // using middleware globally

// configure endpoints (route handlers are middleware!!)
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

//can use as many middleware as desired before the homies.
server.get('/secret', gatekeeper, (req, res) => { 
  res.send(req.welcomeMessage);
});

// USERS: GET ALL
server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "we failed you, can't get the users", error: err });
    });
});

// USERS: GET BY ID
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb.get(id)
    .then(user => {
      return user 
      ? res.status(200).json(user)
      : res.status(404).json({ message: 'user not found' });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "we failed you, can't get the user", error: err });
    });
});


// USERS: GET USER POSTS -- getUserPosts 

// USERS: POST -- insert
server.post('/api/users', tooLong, async (req, res) => {
  try {
    const userName = req.body;
    const userId = await userDb.insert(userName);
    const user = await userDb.get(userId.id);
    res.status(201).json(user);
  } catch (error) {
    let message = 'error creating the user';

    if (error.errno === 19) {
      message = 'please provide a new name';
    }

    if (error.errno === 1) {
      message = 'please provide name only';
    }

    res.status(500).json({ message, error });
  }
});

// USERS: PUT -- update
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  userDb.update(id, changes)
    .then(count => {
      count 
      ? res.status(200).json({ message: `${count} user(s) updated`})
      : res.status(404).json({ message: 'user not found' })
    })
  
    .catch(err => {
    res.status(500).json({message: 'error updating the user'})
  })
})

// USER: DELETE -- remove
server.delete('/api/users/:id', (req, res) => {
  userDb.remove(req.params.id)
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json({ message: "error deleting user" })
  })
})





// POSTS: GET ALL
server.get('/api/posts', (req, res) => {
  postDb.get()
    .then(posts => {
      return res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({
        message: "The posts information can not be retrieved.",
        error: err })
    })
})

// POSTS: GET BY ID
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  console.log('id:', id);
  postDb.get(id)
    .then(post => {
      console.log(post); // text: blah, postedBy: blah, tags: blah
      return post
      ? res.status(200).json(post)
      : res.status(404).json({ message: "The post with the specified ID does not exist."});
    })
    .catch(err => {
      res.status(500).json({
        message: "The posts information can not be retrieved.",
        error: err })
    })
})

//POST: POST
server.post('/api/posts', idMatcher, async (req, res) => {
  console.log('body', req.body);
  try {
    const userData = req.body;
    const userId = await postDb.insert(userData);
    const user = await postDb.get(userId.id);
    // text: 'blah', postedBy: 'nameOfPoster', tags: []
    console.log('userData', userData);
    console.log('userId', userId);
    console.log('user', user);
    res.status(201).json(user);
  } catch (error) {
    let message = 'error creating the user';

    if (error.errno === 19) {
      message = 'please provide both the name and the bio';
    }

    res.status(500).json({ message, error });
  }
});

// POSTS: PUT
server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  postDb.update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} posts updated` });
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'error updating the user' });
    });
});

//POST: DELETE
server.delete('/api/posts/:id', (req, res) => {
  postDb.remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: 'error deleting user' });
    });
});


module.exports = server;