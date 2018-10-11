const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const postDb = require('./data/helpers/postDb');
const userDb = require('./data/helpers/userDb');
const port = 7000;

//const server = express();


server.use(express.json(), logger('combined'), cors(), helmet());

//Routes

server.get('/users', (req, res) => {
    res.send('users');
});
//server.listen() method creates a listner on the specified port
server.listen(port, () => console.log(`API is running on ${port}`));

