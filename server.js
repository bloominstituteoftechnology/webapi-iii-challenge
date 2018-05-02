// Imports node modules
const express = require('express');

const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

// Server setup
const server = express();


// Add middleware
server.use(express.json());

// GET method to send data to initial page
server.get('/', (req,res) => {
    res.send('Got a server set up');
})

// ------ USERS --------

// GET method for user
server.get('/api/users', (req, res) => {

    userDb
    .get()
    .then(response => {
        res.status(200).json({ response });
    })
    .catch(err => {
        res.status(500).json({ Error: err });
    })
}) 

// POST method for user
server.post('/api/users', (req, res) => {

})


// ------ POSTS --------

// GET method for post
server.get('/api/posts', (req, res) => {
     postDb
     .get()
     .then(response => {
        res.status(200).json({ response });
    })
    .catch(err => {
        res.status(500).json({ Error: err });
    })
})


// ------ TAGS --------

// GET method for tag
server.get('/api/tags', (req, res) => {
    tagDb
    .get()
    .then(response => {
        res.status(200).json({ response });
    })
    .catch(err => {
        res.status(500).json({ Error: err });
    })
})




// Server attached to a port

const port = 5000;
server.listen(port, () => {console.log(`Server is listening in port: ${port} `)})