const express = require('express');
const cors = require('cors');

const dbUsers = require('./data/helpers/userDb');
const dbPosts = require('./data/helpers/postDb');

const server = express();
const PORT = 5050;
server.use(express.json(), cors());

server.get('/api/users', (req, res)=>{
    dbUsers.get()
        .then(users => users.length ? res.json(users) : res.json({message: "We don't have any user for you right now, please try again later!"}))
        .catch(err => res.status(500).json({error: 'We have an unexpected error while retrieving your users!'}))
})

server.get('/api/posts', (req, res)=>{
    dbPosts.get()
        .then(posts => posts.length ? res.json(posts) : res.json({message: "We don't have any post for you right now, please try again later!"}))
        .catch(err => res.status(500).json({error: 'We have an unexpected error while retrieving your posts!'}))
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    dbUsers.get(id)
        .then(user => user? res.json(user) : res.status(404).json({error: 'There is no user with the specified ID!'}))
        .catch(err => res.status(500).json({error: 'We have an unexpected error while retrieving your user!'}))
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    dbPosts.get(id)
        .then(post => post ? res.json(post) : res.status(404).json({error: "There is no post with the specified ID"}))
        .catch(err => res.status(500).json({error: 'Something went wrong retrieving your post!'}))
        
})

server.get('/api/users/:id/posts', (req, res) => {
    const { id } = req.params;
    dbUsers.getUserPosts(id)
        .then(userPosts => userPosts.length ? res.json(userPosts) : res.json({message: 'This user has no post yet!'}))
        .catch(err => res.status(500).json({error: "Something went wrong retrieving your user's posts"}))
})

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if(!name){res.status(400).json({error: 'Add a valid Name!'})}
    dbUsers.insert({ name })
        .then(idInfo => dbUsers.get(idInfo.id).then(user => res.status(201).json(user)))
        .catch(err => res.status(500).json({error: 'Something went wrong trying to add the new user!'}))
})

server.post('/api/posts', (req, res) => {
    const post  = req.body;
    dbPosts.insert(post)
        .then(idInfo => dbPosts.get(idInfo.id)
            .then(post => post ? res.json(post) : res.status(404).json({error: "There is no post with the specified ID"})))
        .catch(err => res.status(500).json({error: 'Something went wrong adding your post!'}))
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    dbUsers.update(id, user)
        .then(count => count ? dbUsers.get(id)
            .then(user => res.json(user)) : res.status(404).json({error: 'There is no user with the specified ID!'}))
        .catch(err => res.status(500).json({error: "Something went wrong updating your user's info"}))
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;
    dbPosts.update(id, post)
        .then(count => count ? dbPosts.get(id)
            .then(post => res.json(post)) : res.status(404).json({error: "There is no post with the specified ID!"}))
        .catch(err => res.status(500).json({error: "Something went wrong updating your post's info"}))
})

server.listen(PORT, () => console.log(`Server up and running on port: ${PORT}`))