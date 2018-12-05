const express = require('express');
const server = express();

const cors = require('cors')

const postDb = require('./data/helpers/postDb')
const userDB = require('./data/helpers/userDb')

const PORT = 5000;

server.use(
  express.json(),
  cors()
);

//CRUD endpoints for posts
//getting a list of all the posts
server.get('/api/posts', (req, res) => {
  postDb.get()
    .then( posts => {
      res.status(200).json(posts)
    }).catch( err => {
      res.status(400).json({message: 'unable to get posts'})
    })
})

//getting a specific post by id
server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params
  postDb.get(id)
    .then( post => {
      res.status(200).json(post)
    }).catch( err => {
      res.status(400).json({message: 'could not locate ID'})
    })
})

//getting tags by postID
server.get('/api/posts/tags/:id', (req, res) => {
  const { id } = req.params;
  postDb.getPostTags(id)
    .then( tags => {
      if (tags.length > 0 ) {
        res.status(200).json(tags);
      } else {
        res.status(404).json({message: 'could not locate the tags for that postID'})
      }
    })
    .catch( err => {
      res.status(400).json({message: 'could not process the request'})
    })
})

//creating a new post
server.post('/api/posts', (req, res) => {
  const post = req.body;
  postDb.insert(post)
    .then( postID => {
      postDb.get(postID.id)
        .then( post => {
          res.status(200).json(post)
        }).catch( err => {
          res.status(200).json({message: 'could not get newest post'})
        })
    })
    .catch( err => {
      res.status(400).json({message: 'could not create a new user'})
    })
})

//updating a specific post by ID
server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  postDb.update(id, changes)
    .then( count => {
      if (count) {
        res.status(200).json({message: 'update was successful'})
      } else {
        res.status(500).json({message: 'update to post failed'})
      }
    }).catch( err => {
      res.json({message: "could not update post"})
    })
})

server.delete('/api/posts/:id', (req, res) => {
  const {id} = req.params;

  postDb.remove(id)
    .then( count => {
      if(count) {
        res.status(200).json({message: 'successfully deleted the post'})
      } else {
        res.status(500).json({message: 'failed to delete the post'})
      }
    }).catch( err => {
      res.status(400).json({message: 'could not delete file'})
    })
})

//CRUD endpoints for users
//getting a list of all the users
server.get('/api/users', (req, res) => {
  userDB.get()
    .then( users => {
      res.status(200).json(users)
    }).catch( err => {
      res.status(400).json({message: 'unable to get the users'})
    })
})

//getting user by ID
server.get('/api/users/:id', (req, res) => {
  const {id} = req.params;

  userDB.get(id)
    .then( user => {
      res.status(200).json(user)
    }).catch( err => {
      res.status(400).json({message: 'unable to get user'})
    })
})

//getting user posts by ID
server.get('/api/users/posts/:userId', (req, res) => {
  const user = req.params;
  userDB.getUserPosts(user.userId)
    .then( posts => {
      res.status(200).json(posts)
    }).catch( err => {
      res.status(400).json({message: 'unable to get user posts'})
    })
})

//creating a new user
server.post('/api/users', (req, res) => {
  const user = req.body;

  userDB.insert(user)
    .then( newUser => {
      userDB.get(newUser.id)
        .then( user => {
          res.status(200).json(user)
        })
    }).catch( err => {
      res.status(400).json({message: 'unable to create a new user'})
    })
})

//updating a user
server.put('/api/users/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  userDB.update(id, changes)
    .then( count => {
      if(count) {
        res.status(200).json({message: 'successfully updated the user'})
      } else {
        res.status(500).json({message: 'failed to update the user'})
      }
    }).catch( err => {
      res.status(400).json({message: 'unable to processs an update'})
    })
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  userDB.remove(id)
    .then( count => {
      if (count) {
        res.status(200).json({message: 'successfully deleted the user'})
      } else {
        res.status(500).json({message: 'unable to delete the user'})
      }
    }).catch( err => {
      res.status(400).json({message: 'unable to process a delete'})
    })
})

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})