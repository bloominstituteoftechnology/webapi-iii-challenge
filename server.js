const express = require('express');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDB = require('./data/helpers/userDB');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Blog Application');
})
// Users
server.get('/api/users', (req, res) => {
    userDB.get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "The users information could not be retrieved." }))
})
server.get('/api/users/:id', (req, res) => {
    userDb.get(Number(req.params.id))
        .then (response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } res.status(200).json(response);
        })
        .catch (err => res.status(500).json({ error: "The users information could not be retrieved." }))
})
// Posts
server.get('/api/posts', (req, res) => {
    postDb.get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})
server.get('/api/posts/:id', (req, res) => {
    postDb.get(Number(req.params.id))
        .then (response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } res.status(200).json(response);
        })
        .catch (err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})
// Tags
server.get('/api/tags', (req, res) => {
    tagDb.get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "The tags information could not be retrieved." }))
})
server.get('/api/tags/:id', (req, res) => {
    tagDb.get(Number(req.params.id))
        .then (response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The tag with the specified ID does not exist." })
            } res.status(200).json(response);
        })
        .catch (err => res.status(500).json({ error: "The tags information could not be retrieved." }))
})

server.listen(8000, () => console.log('API is running on port 8000'))