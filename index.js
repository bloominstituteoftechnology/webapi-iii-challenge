const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const postDb = require('./data/helpers/postDb');
const userDb = require('./data/helpers/userDb');
const port = 7000;

const server = express();

//Third party middleware
//express.json returns json objects of the response
//All global middlewares that will be used across enpoints must also be plugged into the server

server.use(express.json(), logger('combined'), cors(), helmet());

//Custom middleware

const capitalizeNames = (req, res, next) => {
    console.log(req.body.name);
    req.params.name = req.params.name.toUpperCase();
    next();
}

//Routes

server.get('/users', (req, res) => {
    userDb.get()
        .then(users => res.json(users))
            .catch(err => res.status(500).json({ error: "User not found"}));
});



//server.listen() method creates a listner on the specified port
server.listen(port, () => console.log(`API is running on ${port}`));

