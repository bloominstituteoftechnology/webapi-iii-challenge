// Node Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// Database Helpers
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();

server.use(express.json(), cors(), morgan('combined'), helmet());

///// ===============- SERVER CRUD ENDPOINTS -===============

//// ==========- USER DATABASE CRUD ENDPOINTS -==========

/// #####=- Root Server READ Endpoint -=#####
server.get('/', (request, response) => {
    response.status(200).send(`It's working!`);
})

/// #####=- READ All Users Endpoint -=#####
server.get('/users', (request, response) => {

    // Unique Error Message
    const error500 = { errorMessage: "Unable to retrieve users." };

    // Database Promise Method
    userDb.get()
    .then(users => response.status(200).send(users))
    .catch(() => response.status(500).send(error500))
})

/// #####=- READ Individual User Endpoint -=#####
server.get('/users/:userId', (request, response) => {

    const userId = request.params.userId;

    // Unique Error Message
    const error500 = { errorMessage: "Unable to retrieve user." };

    // Database Promise Method
    userDb.get(userId)
    .then(user => response.status(200).send(user))
    .catch(() => response.status(500).send(error500))
})

/// #####=- CREATE Individual User Endpoint -=#####
server.post('/users',  (request, response) => {

    // Database Promise Method
    userDb.insert()
    .then()
    .catch()
})

//// ==========- POST DATABASE CRUD ENDPOINTS -==========

/// #####=- READ All Posts Endpoint -=#####
server.get('/posts', (request, response) => {

    // Unique Error Message
    const error500 = { errorMessage: "Unable to retrieve posts." };

    // Database Promise Method
    postDb.get()
    .then(posts => response.status(200).send(posts))
    .catch(() => response.status(500).send(error500))
})

/// #####=- READ Individual Post Endpoint -=#####
server.get('/users/:postId', (request, response) => {

    const userId = request.params.userId;

    // Unique Error Message
    const error500 = { errorMessage: "Unable to retrieve post." };

    // Database Promise Method
    postDb.get(postId)
    .then(post => response.status(200).send(post))
    .catch(() => response.status(500).send(error500)) 
})

// #####=- Server Port Address and Listen Method -=#####
port = 9999;
server.listen(port, () => {console.log(`-=-=-=- Node Blog Server Active on Port ${port} -=-=-=-`)});