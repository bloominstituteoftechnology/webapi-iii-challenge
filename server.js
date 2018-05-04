const express = require('express');

const postDb = require('./data/helpers/postDb.js');
const userDb = require('./data/helpers/userDb.js');
const tagDb = require('./data/helpers/tagDb.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => { // TEST API 
    res.send('api running smoothly');
});


server.get('/users', (req, res) => { // GET USER BY ID (QUERY) 
    const { id } = req.query;
    let user;
    console.log("GET_USER_ID", user, id);
    userDb
    .get(id)
    .then(foundUser => {
        user = { ...foundUser[0] };
        userDb
        .get(id)
        .then((response) => res.status(200).json(response))
    })
    .catch((err) => res.status(500).send({ err: 'Error deleting users', err }))
});
server.get('/users', (req, res) => { // GET ALL USERS 
    userDb
    .get()
    .then((response) => res.status(200).send(response))
    .catch(() => res.status(500).send({ error: 'Error fetching users' }))
});
server.post('/users', (req, res) => { // POST NEW USER
    const userInput = req.body;
    console.log("POST_USER", userInput);
    userDb
    .insert(userInput)
    .then((response) => res.status(201).json(response))
    .catch((err) => res.status(500).send({ err: 'Error posting users', err }))
});
server.delete('/users', (req, res) => { // DELETE USERS 
    const { id } = req.query;
    let user;
    console.log("DELETE_USER", user, id);
    userDb
    .get(id)
    .then(foundUser => {
        user = { ...foundUser[0] };
        userDb
        .remove(id)
        .then((response) => res.status(200).json(response))
    })
    .catch((err) => res.status(500).send({ err: 'Error deleting users', err }))
});


server.get('/users', (req, res) => { // INCOMPLETE !!!!! GET POSTS BY ID (QUERY) 
    const { id } = req.query;
    let post;
    console.log("GET_USER_ID", post, id);
    postDb
    .get(id)
    .then(foundPost => {
        post = { ...foundPost[0] };
        postDb
        .get(id)
        .then((response) => res.status(200).json(response))
    })
    .catch((err) => res.status(500).send({ err: 'Error deleting users', err }))
});
server.get('/posts', (req, res) => { // GET ALL POSTS 
    postDb
    .get()
    .then((response) => res.status(200).send(response))
    .catch(() => res.status(500).send({ error: 'Error fetching posts' }))
});
server.post('/posts', (req, res) => { // POST NEW POST (MANUALLY INPUT USER_ID + TEXT)
    const userInput = req.body;
    console.log("POST_POSTS", userInput);
    postDb
    .insert(userInput)
    .then((response) => { res.status(201).json(response); })
    .catch(() => res.status(500).send({ error: 'Error posting post' }))
});
server.delete('/posts', (req, res) => { // DELETE POSTS 
    const { id } = req.query;
    let post;
    console.log("DELETE_POST", post, id);
    postDb
    .get(id)
    .then(foundPost => {
        user = { ...foundPost[0] };
        postDb
        .remove(id)
        .then((response) => res.status(200).json(response))
    })
    .catch((err) => res.status(500).send({ err: 'Error deleting post', err }))
});


server.get('/tags', (req, res) => { // GET ALL TAGS
    tagDb
    .get()
    .then((response) => res.status(200).send(response))
    .catch(() => res.status(500).send({ error: 'Error fetching tags' }))
});
server.post('/tags', (req, res) => { // POSTS NEW TAG 
    const userInput = req.body;
    console.log("POST_TAG", userInput);
    tagDb
    .insert(userInput)
    .then((response) => { res.status(201).json(response); })
    .catch(() => res.status(500).send({ error: 'Error posting post' }))
});
server.delete('/tags', (req, res) => { // DELETE TAGS 
    const { id } = req.query;
    let tag;
    console.log("DELETE_USER", tag, id);
    tagDb
    .get(id)
    .then(foundTag => {
        tag = { ...foundTag[0] };
        tagDb
        .remove(id)
        .then((response) => res.status(200).json(response))
    })
    .catch((err) => res.status(500).send({ err: 'Error deleting users', err }))
});




server.listen(3000, () => console.log('server NB2 running on port 3000'));  