//importing
const express = require('express');

//server run
const server = express();

//databases
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

// middleware
server.use(express.json());

//get method initial
server.get('/', (req, res) => {
    console.log('Running');
    res.send('Running now!');
})

//get -- user
server.get('/api/users', (req, res) => {
    userDb
    .get()
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//get -- post
server.get('/api/posts', (req, res) => {
    postDb
    .get()
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//get -- tag 
server.get('/api/tags', (req, res) => {
    tagDb
    .get()
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//post -- users 
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);
    userDb
    .insert(userInfo)
    .then(response => {
        res.status(201).json({ userInfo })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//post -- posts 
server.post('/api/posts', (req, res) => {
    const postInfo = req.body;
    console.log(postInfo);
    postDb
    .insert(postInfo)
    .then(response => {
        res.status(201).json({ postInfo })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//post -- tag 
server.post('/api/tags', (req, res) => {
    const tagInfo = req.body;
    console.log(tagInfo);
    tagDb
    .insert(tagInfo)
    .then(response => {
        res.status(201).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//delete -- posts
server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    postDb
    .remove(Number(id))
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//delete -- users
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    userDb
    .remove(Number(id))
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//delete -- tag 
server.delete('/api/tags/:id', (req, res) => {
    const id = req.params.id;
    tagDb.remove(Number(id))
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//put -- user 
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    userDb.update(id, user)
    .then(response => {
        res.status(200).json({ user })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//put -- post 
server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;
    postDb
    .update(id, post)
    .then(response => {
        res.status(200).json({ post })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//put -- tags
server.put('/api/tags/:id', (req, res) => {
    const id = req.params.id;
    const tag = req.body;
    tagDb
    .update(id, tag)
    .then(response => {
        res.status(200).json({ tag })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//retrieve list of posts for a user
server.get('/api/users/:id/posts', (req, res) => {
    const { id } = req.params;
    console.log(id);
    userDb
      .getUserPosts(id)
      .then(posts => {
        res.send(posts);
      })
      .catch(error => {
        res.status(500).json({ message: "no posts found for this user" });
      });
  });

  // retrieve list of tags for a post

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    postDb
    .getPostTags(id)
    .then(response => {
        console.log(response);
        console.log(id);
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})



//server attached to a port
const port = 5000;
server.listen(port, () => {console.log('== Server is listening on port 5000 ==')});