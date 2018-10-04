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

// ===============- SERVER CRUD ENDPOINTS -===============

// #####=- Root Server READ Endpoint -=#####
server.get('/', (request, response) => {
    response.status(200).send(`It's working!`);
})

// #####=- READ All Users Endpoint -=#####
server.get('/users', (request, response) => {

// Unique Error Message
const error500 = { errorMessage: "Unable to retrieve users." };

userDb.get()
.then(users => response.status(200).send(users))
.catch(() => response.status(500).send(error500))
})

// #####=- READ Individual User Endpoint -=#####
server.get('/users/:userId', (request, response) => {

const userId = request.params.userId;

// Unique Error Message
const error500 = { errorMessage: "Unable to retrieve users." };

userDb.get(userId)
.then(user => response.status(200).send(user))
.catch(() => response.status(500).send(error500))
})

// #####=- Server Port Address and Listen Method -=#####
port = 9999;
server.listen(port, () => {console.log(`-=-=-=- Node Blog Server Active on Port ${port} -=-=-=-`)});