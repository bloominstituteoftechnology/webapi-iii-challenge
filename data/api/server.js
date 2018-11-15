//import node mods
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userDb = require('../helpers/userDb.js');
const postDb = require('../helpers/postDb.js');


const nameUpper = require('../gatekeeper/middleware.js');

const server = express();

//middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

//custom middleware here
//global middleware
//server.use(nameUpper);

// configure endpoints (route handlers are middleware!!)
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

//get list of users
server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be retrieved." })
    })
});

//get user by id - not required
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params; //id is a parameter

  userDb.get(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist."});
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be retrieved."})
    })
});

//add user
server.post('/api/users', nameUpper, (req, res) => {
  userDb.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "error adding user", err })
    })
})

//delete user
server.delete('/api/users/:id', (req, res) => {
  userDb.remove(req.params.id)
    .then(count => {
      res.status(200).json(count)
    }).catch (err => {
      res.status(500).json({ message: 'error deleting user '})
    })
})

//update username
/* server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const change = req.body;

  userDb.update(id, change)
    .then(count => {
      if(count) {
        res.status(200).json({ message: `${count} user updated`})
      } else {
        res.status(404).json({ message: "user not found" })
      }
    })
}) */

//POST

// server.get('/all', (req, res) => {
//   res.json('the home server get!')
// })

server.get('/api/posts', (req, res) => {
  postDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." })
    })
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  postDb.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."});
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be retrieved."})
    })
});

server.post('/api/posts', async (req, res) => {
  console.log('body:', req.body);
  try {
    const postData = req.body;
    const postId = await postDb.insert(postData);

    res.status(201).json(postId);
  }catch (error) {
    let message = "error creating the post";

    if(error.errno === 19) {
      message = "you need both title and contents";
    }
    res.status(500).json({ message: "error creating post", error })
  }
})

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  postDb.update(id, changes)
    .then(count => {
      if(count) {
        res.status(200).json({ message: `${count} post updated`})
      } else {
        res.status(404).json({ message: "post not found" })
      }
    })
    .catch( err => {
      res.status(500).json({ message: "error updating the post "})
    });
});

server.delete('/api/posts/:id', (req, res) => {
  postDb.remove(req.params.id)
    .then(count => {
      res.status(200).json(count)
    }).catch (err => {
      res.status(500).json({ message: 'error deleting post' })
    })
})

module.exports = server;