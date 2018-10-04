const express = require('express');

const port = 8000;

const dbUsers = require("./data/helpers/userDb.js");
const dbPosts = require("./data/helpers/postDb.js");


const server = express();

const cors = require('cors');

server.use(cors());

server.use(express.json())

const upperCase = (req, res, next) => {
  req.name = req.body.name.toUpperCase();
  next();
};


//Get users

server.get('/api/users', (req, res) => {
  dbUsers.get().then(users => {
    res.json(users);
  }).catch(err => res.send(err))
});

server.get('/api/users/:id', (req, res) => {
  dbUsers.get(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() =>
      //  Error
      res.status(404)
        .json({ message: "The post with the specified ID does not exist." })
    )
})


// Get posts
server.get('/api/posts', (req, res) => {
  dbPosts.get().then(posts => {

    res.status(200).json(posts);
    
  }).catch(err => res.send(err))
});

server.get('/api/posts/:userId', (req, res) => {
  dbPosts.get(req.params.userId)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() =>
      res.status(404)
        .json({ message: "The post with the specified ID does not exist." })
    )
})


//Post users

server.post('/api/users', upperCase, (req, res) => {
  const name = req.name;
  const newUser = { name };
  dbUsers.insert(newUser)
    .then(userId => {
      const { id } = userId;
      res.status(201).json(user);
      dbUsers.get(id)
        .then(userName => res.status(200).json(userName))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});


//Post posts

server.post('/api/posts',  (req, res) => {
  const { text, userId } = req.body;
  const newPost = { text, userId };
  dbPosts.insert(newPost)
    .then(post => {
      
      res.status(201).json(post);
      dbUsers.get(post.id)
        .then(newPostConfirmed => res.status(200).json(newPostConfirmed))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});


// Delete users

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  dbUsers.remove(id)
    .then(removedUser => {
      res.status(200).json(removedUser);
    })
    .catch(err => console.error(err));
}); 

//Delete posts

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  dbPosts.remove(id)
    .then(removedPosts => {
      res.status(200).json(removedPosts);
    })
    .catch(err => console.error(err));
}); 



//Put users
server.put('/api/users/:id', upperCase, (req, res) => {
  const { id } = req.params;
  const name = req.name;
  const newUser = { name };
  dbUsers.update(id, newUser)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => console.error(err));
});



//Put posts

server.put('/api/posts/:id',(req, res) => {
  const { id } = req.params;
  const { text, userId } = req.body;
  const newPost = { text, userId };
  dbPosts.update(id, newPost)
    .then(editedPost => {
      res.status(200).json(editedPost);
    })
    .catch(err => console.error(err));
});



server.listen(port, () => console.log(`API running on port ${port}`)); 