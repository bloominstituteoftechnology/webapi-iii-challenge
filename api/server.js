const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');
const tagDb = require('../data/helpers/tagDb');

const server = express();



// configure middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('short'));


// add custom middleware
// function toUpperCaseMiddleware
function toUpperCaseMiddleware(req, res, next){
  req.body.name = req.body.name.toUpperCase();

  next();
}


// configure endpoints

// GET /users
server.get('/users', (req, res) => {
  userDb.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => { 
      res
        .status(500)
        .json(err);
    });
});

// GET /users/:id
server.get('/users/:userId', (req, res) => {
  const { userId } = req.params;

  userDb.get(userId)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res
        .status(500)
        .json(err);
    })
})

// GET /users/:id/posts
server.get('/users/:userId/posts', (req, res) => {
  const { userId } = req.params;

  userDb.getUserPosts(userId)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res
        .status(500)
        .json(err);
    })
})

// GET /posts/:postId
server.get('/posts/:postId', (req, res) => {
  const { postId } = req.params;

  postDb.get(postId)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res
        .status(500)
        .json(err);
    })
})


// GET /posts
server.get('/posts', (req, res) => {
  postDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => { 
      res
        .status(500)
        .json(err);
    });
});


// POST /users
server.post('/users', toUpperCaseMiddleware, (req, res) => {
  const { name } = req.body;
  const newUser = { name };

  if(!newUser){
    res
      .status(400)
      .json({ errorMessage: "Ya gotta give me a name here" });
  } else {
    userDb.insert(newUser)
      .then(newUserRes => {
        res.status(201).json({ "post": "New User Added!" });
      })
      .catch(err => {
        res.send(err);
      });
  };
});


// POST /posts
server.post('/posts', toUpperCaseMiddleware, (req, res) => {
  const { text, userId } = req.body;
  const newPost = { text, userId };

  if(!newPost.text || !newPost.userId){
    res
      .status(400)
      .json({ errorMessage: "Ya gotta give me a message and who said it." });
  } else {
    postDb.insert(newPost)
      .then(newlyPosted => {
        res.status(201).json({ "post": "New Post Added!" });
      })
      .catch(err => {
        res.send(err);
      });
  }
})


// DELETE /users
server.delete("/users/:id", (req, res) => {
  userDb.remove(req.params.id)
    .then(count => {
      res.status(201).json(count)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})


// DELETE /posts
server.delete("/posts/:id", (req, res) => {
  postDb.remove(req.params.id)
    .then(count => {
      res.status(201).json(count)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})



// PUT /users
server.put('/users/:id', toUpperCaseMiddleware, (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  userDb.update(id, updatedUser)
    .then(updateUser => {
      res.status(201).json({ "User Updated": updateUser });
    })
    .catch(err => {
      res.send(err);
    });
});


// PUT /posts
server.put('/posts/:id', toUpperCaseMiddleware, (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;

  postDb.update(id, updatedPost)
    .then(updatePost => {
      res.status(201).json({ "Post Updated": updatePost });
    })
    .catch(err => {
      res.send(err);
    });
});



module.exports = server;