console.log('server.js');

const express = require('express');

const usersRouter = require('./users/usersRouter.js');

const postsRouter = require('./posts/postsRouter.js');

const server = express();

//middleware
 server.use(express.json());

server.use('/users', usersRouter);
server.use('/posts', postsRouter)
//routes

server.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    dbu.getUserPosts(id)
    .then(usersPosts => {
        res.status(200).json(usersPosts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = server;

// server.post('/posts', (req, res) => {
//     const newPost = req.body;
//     if(newPost.text && newPost.userId){
//         dbp.insert(newPost)
//         .then(p => {
//             res.status(201).json(p);
//         })
//         .catch(err => res.status(500).json({ error: err }));
//     } else {
//         res.status(400).json({ error: 'error' })
//     }
// })