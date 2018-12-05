// Import Node Modules
const express = require('express');
const postDb = require('./data/helpers/postDb.js');
const userDb = require('./data/helpers/userDb.js');

const helmet = require('helmet')
const logger = require('morgan')
const server = express();
const PORT = 4400;

server.use(
    express.json(),
    helmet(),
    logger('tiny'),
    );

// Server calls
 server.get('/', (req, res) => res.json({message: "hello!"}))

 server.get('/user/', (req, res) => {
     userDb.find()
        .then(users => res.json(users))
        .catch(err =>
        res.status(500)
        .json({error: "The users info could not be retreived."}))
 })

 server.get('/posts', (req, res) => {
    postDb.find()
        .then(posts => res.json(posts))
        .catch(err => 
        res.status(500)
        .json({error: "The posts information could not be retrieved."})
        )
})

// Listening
server.listen(PORT, () => {
    console.log(`Server is running and listening to ${PORT}`);
})