const express = require('express');
const postdb = require('./data/helpers/postDb.js');
const tagdb = require('./data/helpers/tagDb.js');
const userdb = require('./data/helpers/userDb');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());


const capitalizeUserName = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
}


server.get('/', (req, res) => {
  res.send('Hello')
})


// All Users
server.get('/users', (req, res) => {
  userdb.get().then(users => {
    res.status(200).json(users)
  }).catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error getting users'})
  });
})


// All Posts
server.get('/posts', (req, res) => {
  postdb.get().then(posts => {
    res.status(200).json(posts)
  }).catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error getting posts'})
  });
})


// User Posts
server.get('/users/:id', (req, res) => {
  const {id} = req.params;
  userdb.getUserPosts(id)
    .then(users => {
      users === undefined || users.length === 0 ?
      res.status(400).json({message:'This ID does not exist'})
      :
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error getting users'})
    });
})


// Add User
server.post('/users', capitalizeUserName, (req, res) => {
  const { name } = req.body;
  !name ?
  res.status(400).json({message: 'You need a name'}) : null
  const body = {name}
  userdb.insert(body)
  .then(userId => {
    res.status(200).json(userId)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({messege: 'The user could not added'});
  });
});

// Add Post
server.post('/posts', (req, res) => {
  const { userId, text } = req.body;
  !text || !userId ?
  res.status(400).json({message: 'You need a userId and content'}) : null
  const body = {text, userId}
  postdb.insert(body)
  .then(postId => {
    res.status(200).json(postId)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({messege: 'The post could not added'});
  });
});


// Delete User
server.delete('/users/:id', (req, res) => {
  const {id} = req.params;
  userdb.remove(id)
    .then(users => {
      users === 0 ?
      res.status(400).json({message:'This ID does not exist'})
      :
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error removing user'})
    });
})


// Delete Post
server.delete('/posts/:id', (req, res) => {
  const {id} = req.params;
  postdb.remove(id)
    .then(users => {
      users === 0 ?
      res.status(400).json({message:'This ID does not exist'})
      :
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error removing post'})
    });
})


// Update User
server.put('/users/:id', capitalizeUserName, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  !name ? res.status(400).json({message: "Please provide a name."}) 
  :
  null
  const body = { name }
  userdb.update(id, body)
    .then(users => {
      users === 0 ?
      res.status(400).json({message:'This ID does not exist'})
      :
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error updating user'})
    });
})


// Update Post
server.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { userId, text } = req.body;
  !userId && !text ? res.status(400).json({message: "Please provide a name."}) 
  :
  null
  const body = { userId, text }
  postdb.update(id, body)
    .then(posts => {
      posts === 0 ?
      res.status(400).json({message:'This ID does not exist'})
      :
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error updating post'})
    });
})


server.listen(7000, () => console.log('Hello'))
