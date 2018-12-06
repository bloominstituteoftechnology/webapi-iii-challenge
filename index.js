const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const dbUsers = require('./data/helpers/userDb');

const server = express();
const PORT = '4500';

server.use(express.json());
server.use(helmet());
server.use(logger('dev'));



server.get('/', (req,res) => {
     res.json({Message: "Working now"});
});

server.get('/users', (req,res) => {
    dbUsers.get()
           .then(users => {
                console.log(users);
                res.send(users);
           })
           .catch();
});

server.listen(PORT, () => {
     console.log(`Server is running at ${PORT}`);
})