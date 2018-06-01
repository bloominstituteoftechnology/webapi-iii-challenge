const express = require('express');
const cors = require('cors');
const dbConfig = require('./data/dbConfig');


const port = 5000;
const server = express();
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));


server.get('/', (req, res) => {
    res.send('hello');
})

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


server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    postDb
    .remove(id)
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})


server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    userDb
    .remove(id)
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})


server.delete('/api/tags/:id', (req, res) => {
    const id = req.params.id;
    tagDb
    .remove(id)
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})


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

server.get("/api/users/:id/posts", (req, res) => {
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






server.listen(port, () => {console.log(`Server running on port ${port}`)});
