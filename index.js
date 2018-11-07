// modules
const express = require('express');
const helmet = require ('helmet');
const cors = require('cors');
const logger = require('morgan');

const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');


// server
const server = express();

// middlewares
server.use(express.json());
server.use(logger(`combined`));
server.use(cors());
server.use(helmet());

// custom middleware
const upperCaseIt = (req, res, next) => {
    // set new name , modify name to uppercase
    req.body.name = req.body.name.toUpperCase();
    // move in to next piece of middleware
    next();
  };

// routes
server.get('/', (req, res) => {
    res.send('Blog');
})

// USERS - CRUD
server.get('/api/users', (req, res) => {
    userDb.get().then(users => {
        console.log('\n*** user **', users);
        res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: "The information of users could not be retrieved. "}))
})

server.get('/api/users/:userId', (req, res) => {
    const { userId } = req.params;
    userDb.get(userId)
    .then(user => {
        if (!user) {
            res.status(404).json({ error: "The user with this ID does not exist."})
        }
        res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ error: "This user information could not be retrieved. "}))
})

server.post('/api/users/', upperCaseIt, (req,res) => {
    if (!req.body || !req.body.name) {
        res.status(400).json({ error: "Please provide the name of the user"})
    }
    const { name } = req.body;
    const newUser = { name };
    userDb.insert(newUser)
    .then(insertedUser => {
        res.status.json({ newUser, message: 'User added'});
    })
    .catch(err => { res.status(500).json({ error: "This user could not be added."});
    });
})

server.delete('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
      res.status(404).json({ message: "The user with this ID does not exist." });
    }
    userDb.remove(userId)
      .then(removedUser => {
        res.status(200).json(removedUser);
      })
      .catch(err => { res.status(500).json({ error: "This user could not be deleted."});
      });
  })

server.put('/api/users/:userId', (req,res) => {
    const userId = req.params.userId;
    const { name } = req.body;
    const newUser = { name };
    console.log(newUser);
    if (!req.body || !req.body.name) {
        res.status(400).json({ error: "Please provide name for this user." })
    }
    userDb.update(userId, newUser)
    .then( user => {
        console.log(newUser);
        res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ error: "The user information could not be modified." }));
})

// POSTS - CRUD
server.get('/api/posts', (req, res) => {
    postDb.get().then(posts => {
        console.log('\n*** post **', posts);
        res.status(200).json(posts);
    })
    .catch(err => res.status(500).json({ error: "The information of posts could not be retrieved. "}))
})

server.get('/api/posts/:postId', (req, res) => {
    const { postId } = req.params;
    postDb.get(postId)
    .then(post => {
        if (!post) {
            res.status(404).json({ error: "The post with this ID does not exist."})
        }
        res.status(200).json(post);
    })
    .catch(err => res.status(500).json({ error: "This post information could not be retrieved. "}))
})

server.post('/api/posts', (req, res) => {
    const { text, userId } = req.body;
    const newPost = { text, userId };
    postDb.insert(newPost)
    .then(postId => {
        const { id } = postId;
        postDb.get(id).then(post => {
            if (!post) {
                res.status(400).json({ error: "Please provide a text and user id for this post." });
            }
            res.status(201).json(post);
        });
    })
    .catch(err => { res.status(500).json({ error: "The post you added could not be saved." });
    })
});

server.delete('/api/posts/:postId', (req, res) => {
    const { postId } = req.params;
    if (!postId) {
      res.status(404).json({ message: "The post with this ID does not exist." });
    }
    postDb.remove(postId)
      .then(removedPost => {
        res.status(200).json(removedPost);
      })
      .catch(err => { res.status(500).json({ error: "This post could not be deleted."});
      });
  })

  server.put('/api/posts/:postId', (req, res) => {
    const postId = req.params.postId;
    const { text, userId } = req.body;
    const newPost = { text, userId };
    if (!postId) {
      res.status(404).json({ message: "The post with this ID does not exist." });
    }
    else if (!newPost) {
      res.status(400).json({ errorMessage: "Please provide text and a user id for this post." });
    }
    postDb.update(postId, newPost)
      .then(post => {
        res.status(200).json({ message: "The post has been updated."});
      })
      .catch(err => { res.status(500).json({ error: "The post information could not be updated."});
      });
});

const port = 9000;
server.listen(port, () => console.log(`Party in port ${port}`))